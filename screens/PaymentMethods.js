import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import Modal from "react-native-modal";
import { useStoreState, useStoreActions } from 'easy-peasy';

import { colors } from '../envStyles';
//import CreditCard from '../components/CreditCard';
import BackBarTitle from '../components/BackBarTitle';


const PaymentMethods = ({navigation}) => {
  // States
  const cards = useStoreState(state => state.cards);
  //const displayCardRemove = useStoreState(state => state.properties.displayCardRemove);
  const isLoading = useStoreState(state => state.properties.isLoading);
  //const cardToDelete = useStoreState(state => state.cardToDelete);
  // Actions
  const getCards = useStoreActions(actions => actions.getCards);
  //const activePaymentMethodWrite = useStoreActions(actions => actions.activePaymentMethodWrite);
  //const toggleCardRemove = useStoreActions(actions => actions.toggleCardRemove);
  //const setCardToDelete = useStoreActions(actions => actions.setCardToDelete);
  //const removeCard = useStoreActions(actions => actions.removeCard);
  //const removeCardObject = useStoreActions(actions => actions.removeCardObject);

  useEffect(() => {
    getCards();
  }, []);

  renderCards = (card, index) => {
    return(
      <TouchableOpacity
        key={index}
        onPress={() => activePaymentMethodWrite(card)}
      >
          <Text>Card</Text>
        <CreditCard index={index} data={card}/>
      </TouchableOpacity>
    )
  };

  gifRender = () => {
    if (isLoading === true) {
      return(
        <View style={styles.gifContainer}>
            <Image
              source={require('../assets/gifs/spinner.gif')}
              style={{height: 250, width: 250}}
            />
        </View>
      )
    }
    else if (isLoading === false && cards.length !== 0) {
      return <Text>asdf</Text>
    }
    else {
      return (
        <View style={styles.message}>
          <Text style={styles.messageText}>
            Aún no tienes medios de pago
          </Text>
        </View>
      )
    }
  };

  return (
    <View style={styles.cardList}>
      <BackBarTitle navigation={navigation} title={'Mis métodos de pago'} route={'Home'}/>
      {
      //<Modal
        //isVisible={displayCardRemove}
        //backdropOpacity={0.4}
      //>
        //<View style={styles.modalContainer}>
          //<View style={styles.innercontainer}>
            //<View style={styles.modalContent}>
              //<Image
                //source={require('../assets/icons/Error.png')}
                //style={{width: 80, height: 80, marginRight: 15}}
              ///>
              //<Text style={styles.modalText}>¿Quieres borrar tu tarjeta?</Text>
            //</View>
            //<TouchableOpacity
              //style={styles.button}
              //onPress={() =>
                //{
                  //removeCard(cardToDelete);
                  //toggleCardRemove();
                //}
              //}
            //>
              //<Text style={styles.buttonText}>Si, estoy seguro</Text>
            //</TouchableOpacity>
            //<TouchableOpacity
              //style={styles.button}
              //onPress={() => {
                //toggleCardRemove();
                //setCardToDelete({});
              //}}
            //>
              //<Text style={styles.buttonText}>Cancelar</Text>
            //</TouchableOpacity>
          //</View>
        //</View>
      //</Modal>
      }
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.instructions}>
            <Image
              source={require('../assets/icons/medios.png')}
              style={{width: 80, height: 80}}
            />
            <Text style={styles.instructionsText}>Agrega tu método de pago preferido</Text>
          </View>
          <View>
            {
              this.gifRender()
            }
          </View>
          {
          // <View style={styles.cardContainer}>
          //   <View style={{flexDirection: 'row', alignItems: 'center'}}>
          //     <Image
          //       source={require('../../assets/icons/medios.png')}
          //       style={{width: wp('10%'), height: wp('10%'), marginRight: 15}}
          //     />
          //     <Text style={styles.text}>Efectivo</Text>
          //   </View>
          // </View>
          }
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('AgregarMedio')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Agregar tarjeta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardList: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    width: Dimensions.get('window').width - Dimensions.get('window').width * 0.14,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    flexDirection: 'row',
  },
  boldText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  instructions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginBottom: 20,
    width: Dimensions.get('window').width - Dimensions.get('window').width * 0.25,
    padding: 20,
    borderColor: colors.white,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  instructionsText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    maxWidth: '50%'
  },
  button: {
    justifyContent: 'center',
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
    height: 50,
    marginTop: 30,
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
  text: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  message: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  messageText: {
    marginTop: 40,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: 'gray',
    maxWidth: '70%',
    textAlign: 'center'
  },
  gifContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  innercontainer: {
    backgroundColor: colors.white,
    //height: hp('25%'),
    //width: ,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    maxWidth: '60%',
  },
  button: {
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 50,
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
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
});

export default PaymentMethods;
