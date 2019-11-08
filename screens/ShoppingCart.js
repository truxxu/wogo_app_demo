import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Alert,
  TextInput
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import * as _ from 'lodash';
import axios from 'axios';
import ModalSelector from 'react-native-modal-selector';
import Modal from "react-native-modal";
import SafeAreaView from 'react-native-safe-area-view';

import { colors } from '../envStyles';
import { env } from '../keys';
import BackBarTitle from '../components/BackBarTitle';
import CardLogo from '../components/CardLogo';
import BusinessInCart from '../components/BusinessInCart';

const ShoppingCart = ({navigation}) => {

  //States
  const shoppingCart = useStoreState(state => state.shoppingCart);
  const cards = useStoreState(state => state.cards);
  const properties = useStoreState(state => state.properties);
  const activeAddress = useStoreState(state => state.activeAddress);
  const activePaymentMethod = useStoreState(state => state.activePaymentMethod);
  //Actions
  const clearCart = useStoreActions(actions => actions.clearCart);
  const getOrders = useStoreActions(actions => actions.getOrders);
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);
  const toggleProperties = useStoreActions(actions => actions.toggleProperties);
  const writeActivePaymentMethod = useStoreActions(actions => actions.writeActivePaymentMethod);
  const getCards = useStoreActions(actions => actions.getCards);

  const grouped_businesses = _.groupBy(shoppingCart, business => business.business);
  let items = Object.keys(grouped_businesses);

  useEffect(() => {
    getCards();
  }, []);

  getTotal = () => {
    let sum = {'price': 0, 'quantity': 0};
    shoppingCart.map(product => {
      sum.price += product.price * product.quantity;
      sum.quantity += product.quantity;
    });
    return sum.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  };


  const payload = items.map(key =>
    {
      order = {};
      order.business = grouped_businesses[key][0].business;
      order.address_text = activeAddress.text;
      order.address_latitude = activeAddress.latitude;
      order.address_longitude = activeAddress.longitude;
      order.payment_method = activePaymentMethod.payment_method;
      order.credit_card_token_id = activePaymentMethod.token_id;
      order.installments_number = properties.installmentsNumber
      order.city = activeAddress.city
      order.country = activeAddress.country
      order.postal_code = activeAddress.postalCode
      order.address_state = activeAddress.state
      productArray = [];
      grouped_businesses[key].map(product => {
        productArray.push(
          {
            product: product.product,
            quantity: product.quantity
          }
        )
      });
      order.ordered_products = productArray;
      return order;
    }
  );

  render = (id) => {
    return (
      <BusinessInCart key={id} data={grouped_businesses[id]}/>
    )
  };

  clearAndGoToOrders = () => {
    getOrders();
    clearCart();
    navigation.navigate('OrderHistory');
    writePropertyState({name: 'loadingOrders', value: false});
  };

  onSubmit = (payload) => {
    if (properties.installmentsNumber > 0 && activePaymentMethod.token_id !== "") {
      writePropertyState({name: 'loadingOrders', value: true})
      payload.forEach(order => {
        axios.post(`${env.apiServer}/orders/`, order)
          .then(response => {
            if(response.data.payment_error == "Fondos Insuficientes") {
              Alert.alert(
                'Fondos insuficientes',
                'Tu pago fue rechazado. Intenta con otro método de pago',
                [
                  {text: 'OK', onPress: () => clearAndGoToOrders()},
                ],
                {cancelable: false},
              );
            } else {
              clearAndGoToOrders()
            }
          })
          .catch(error => {
            Alert.alert('Error', 'No se pudo realizar tu pedido');
            writePropertyState({name: 'loadingOrders', value: false});
          });
      })
    }
    else if ( (properties.installmentsNumber  > 0 && activePaymentMethod.token_id == "") ||
              (properties.installmentsNumber  > 0 && activePaymentMethod.token_id !== "") ||
              (properties.installmentsNumber  == "" && activePaymentMethod.token_id !== "") ) {
      if (activePaymentMethod.token_id == "") {
        Alert.alert('Datos incompletos', 'Completa el método de pago del pedido');
      }
      else if (properties.installmentsNumber  == 0 || properties.installmentsNumber  == "") {
          Alert.alert('Datos incompletos', 'Ingresa número de pagos del pedido');
        }
    }
    else if ( (properties.installmentsNumber  == 0 && activePaymentMethod.token_id == "") ||
              (properties.installmentsNumber == "" && activePaymentMethod.token_id == "") ) {
      Alert.alert('Datos incompletos','No se pudo realizar tu pedido, completa método de pago y número de pagos');
    }
  };

  const data = [];
  let index = 0;
  cards.map(card => {
    data.push({
      key: index++,
      data: card,
      label: card.masked_number,
      component:
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CardLogo card={card.payment_method}/>
          <Text style={styles.text}>{card.masked_number}</Text>
        </View>
    })
  });

  renderPaymentMethod = () => {
    if (activePaymentMethod.masked_number !== '') {
      return(
        activePaymentMethod.masked_number
      )
    }
    else {
      return('Agregar')
    }
  };

  renderCardList = () => {
    if (cards.length === 0) {
      return(
        <TouchableOpacity
          onPress={() => navigation.navigate('NewCard', {origin: 'ShoppingCart'})}
        >
          <Text style={styles.boldText}>Agregar</Text>
        </TouchableOpacity>
      )
    }
    else{
      return(
        <ModalSelector
          data={data}
          initValue={renderPaymentMethod()}
          cancelText={'Cancelar'}
          onChange={(option)=> writeActivePaymentMethod(option.data)}
          optionContainerStyle={{backgroundColor: colors.white}}
          keyboardShouldPersistTaps={'never'}
          selectStyle={styles.picker}
          initValueTextStyle={styles.boldText}
          selectTextStyle={styles.boldText}
          cancelStyle={{backgroundColor: colors.yellow}}
          cancelTextStyle={styles.boldText}
        />
      )
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
      <ScrollView style={{flex: 1, backgroundColor: colors.gray}}>
        <BackBarTitle navigation={navigation} title={'Carrito'} route={'Home'}/>
        <Modal
          isVisible={properties.displayClearCart}
          backdropOpacity={0.2}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innercontainer}>
              <View style={styles.modalContent}>
                <Image
                  source={require('../assets/icons/Error.png')}
                  style={{width: 75, height: 75, marginRight: 15}}
                />
                <Text style={styles.modalText}>¿Deseas limpiar el carrito?</Text>
              </View>
              <TouchableOpacity
                style={styles.modalbutton}
                onPress={() =>
                  {
                    toggleProperties('displayClearCart');
                    navigation.navigate('Home');
                    clearCart();
                  }
                }
              >
                <Text style={styles.modalButtonText}>Si, estoy seguro</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalbutton}
                onPress={() => toggleProperties('displayClearCart')}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <View>
            {
              items.map(key => render(key))
            }
            <View style={styles.content}>
              <Text style={styles.text}>Total</Text>
              <Text style={styles.boldText}>${getTotal()}</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.contentB}>
                <CardLogo card={activePaymentMethod.payment_method}/>
                <Text style={styles.textC}>Método de pago</Text>
              </View>
              <TouchableOpacity>
                {
                  renderCardList()
                }
              </TouchableOpacity>
            </View>
            <View style={styles.contentB}>
              <Text style={styles.textC}>Número de pagos</Text>
              <TextInput
                autoCompleteType={'off'}
                autoCorrect={false}
                style={styles.inputSmall}
                keyboardType='numeric'
                maxLength={2}
                onChangeText={(number) =>
                  writePropertyState({
                    name: 'installmentsNumber',
                    value: number
                  })}
                value={properties.installmentsNumber}
              />
            </View>
          </View>
          <View>
            {!properties.loadingOrders &&            
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  {
                    onSubmit(payload);
                  }
                }
              >
                <Text style={styles.buttonText}>Confirmar pedido</Text>                
              </TouchableOpacity>
            }
            {properties.loadingOrders &&
              <TouchableOpacity
                disabled={true}
                style={styles.button2}
              >
                <Text style={styles.buttonText2}>Confirmar pedido</Text>                
              </TouchableOpacity>
            }
            <TouchableOpacity
              onPress={() => toggleProperties('displayClearCart')}
            >
              <Text style={styles.link}>Limpiar carrito</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    height: 30
  },
  contentB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 211,
    height: 51,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: colors.yellow,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
  button2: {
    borderColor: 'gray',
    backgroundColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 211,
    height: 51,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonText2: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
  },
  boldText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: colors.black
  },
  text: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.black
  },
  textB: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 15,
    color: colors.black
  },
  textC: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.black
  },
  link: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.purple,
  },
  price: {
    fontSize: 14,
    color: colors.purple,
    fontFamily: 'Montserrat-Bold',
  },
  modalContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  innercontainer: {
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    maxWidth: '60%',
  },
  modalbutton: {
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 45,
    margin: 10,
    backgroundColor: colors.yellow,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  modalButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
  link: {
    fontFamily: 'Montserrat-Regular',
    color: colors.pruple,
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    padding: 0,
    borderColor: 'transparent',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 0,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  inputSmall: {
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 0,
    width: 30,
    fontSize: 14,
    textAlign: 'center',
    borderRadius: 7,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: 'white',
    marginTop: 5,
  },
  stretch: {
    height: 50,
    width: 60,
    resizeMode: 'contain',
  },
});

export default ShoppingCart;
