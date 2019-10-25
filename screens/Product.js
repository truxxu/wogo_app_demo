import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { colors } from '../envStyles';
import FooterBar from '../components/FooterBar';
import ShareBar from '../components/ShareBar';
import CartBar from '../components/CartBar';

const Product = ({navigation}) => {

  //States
  const shoppingCart = useStoreState(state => state.shoppingCart);
  const properties = useStoreState(state => state.properties);
  //Actions
  const plusQuantity = useStoreActions(actions => actions.plusQuantity);
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);
  const addProduct = useStoreActions(actions => actions.addProduct);
  const minusQuantity = useStoreActions(actions => actions.minusQuantity);

  const data = navigation.getParam('product');
  const priceStr = data.price.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const product = shoppingCart.find(product => product.product === data.id);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imagecontainer}>
          <ShareBar navigation={navigation} product={data} />
          <Image
            style={styles.image}
            source={{uri: data.image}}
          />
        </View>
        <View style={styles.textcontainer}>
          <Text style={styles.boldText}>{data.name}</Text>
          <Text style={styles.price}>${priceStr}</Text>
          <Text style={styles.text}>{data.service}</Text>
          <Text style={styles.text}>{data.description}</Text>
          <View style={styles.quantitybox}>
            <View style={styles.quantity}>
              <TouchableOpacity
                onPress={() =>
                  {
                    if (properties.quantity > 1) {
                      minusQuantity()
                    }
                  }
                }
              >
                <View style={styles.quantitycontrolB}>
                  <Text style={styles.quantitytext}>-</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.quantitycontrolA}>
                <Text style={styles.quantitytext}>{properties.quantity}</Text>
              </View>
              <TouchableOpacity
                onPress={() => addProduct()}
              >
                <View style={styles.quantitycontrolB}>
                  <Text style={styles.quantitytext}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
              <TouchableOpacity
                onPress={() => plusQuantity({'product': data, 'quantity': properties.quantity})}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Agregar</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{position: 'absolute', bottom: 0}}>
        <CartBar navigation={navigation} />
        <FooterBar navigation={navigation} />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  imagecontainer: {
    width: Dimensions.get('window').width,
    height: 300,
    backgroundColor: colors.purple,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textcontainer: {
    padding: 20
  },
  quantitybox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantitycontrolB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
    height: 35,
    width: 50,
  },
    quantitycontrolA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
    height: 35,
    width: 75,
  },
  image: {
    height: 200,
    width: 200,
    // marginTop: 30,
    // marginBottom: 30,
  },
  heart: {
    position: 'absolute',
    height: 15,
    width: 15,
    left: 150,
    bottom: 15,
  },
  price: {
    fontSize: 16,
    color: colors.purple,
    fontFamily: 'Montserrat-Bold',
  },
  quantitytext: {
    fontSize: 18,
    color: colors.black,
  },
  boldText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  button: {
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
});

export default Product;
