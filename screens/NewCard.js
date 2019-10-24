import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import axios from 'axios';
import luhn from 'fast-luhn';

import { colors } from '../envStyles';
import BackBarTitle from '../components/BackBarTitle';
import { env } from '../keys';
//import CardLogo2 from '../components/CardLogo2';

const NewCard = ({navigation}) => {

  // actions
  const newCardNumber = useStoreActions(actions => actions.newCardNumber);
  const newCardName = useStoreActions(actions => actions.newCardName);
  const newCardYear = useStoreActions(actions => actions.newCardYear);
  const newCardMonth = useStoreActions(actions => actions.newCardMonth);
  const newCardCvv = useStoreActions(actions => actions.newCardCvv);
  const newCardPristine = useStoreActions(actions => actions.newCardPristine);
  const getCards = useStoreActions(actions => actions.getCards);

  // states
  const newCard = useStoreState(state => state.newCard);
  const activeAddress = useStoreState(state => state.activeAddress);

  useEffect(() => {
    this.clearFields();
  }, []);

  identifier = (ccNumber) => {
    const numberStr = ccNumber;
    if (numberStr.match(/^4[0-9]{12}(?:[0-9]{3})?$/)) {
      return 'VISA'
    }
    else if (numberStr.match(/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/)) {
      return 'MASTERCARD'
    }
    else if (numberStr.match(/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/)) {
      return 'DINERS'
    }
    else if (numberStr.match(/^3[47][0-9]{13}$/)) {
      return 'AMEX'
    }
    else {
      return 'unknown'
    }
  };

  onSubmit = () => {
    const payload = {
      number: newCard.number,
      name: newCard.name,
      expiration_date: `${newCard.year}/${newCard.month}`,
      payment_method: this.identifier(newCard.number),
      cvv: newCard.cvv,
      city: activeAddress.city,
      country: activeAddress.country,
      postal_code: activeAddress.postalCode,
      state: activeAddress.state,
      address_text: activeAddress.text
    };
    if (luhn(payload.number) &&
      payload.payment_method !== 'unknown' &&
      payload.number.length >= 13 &&
      payload.number.length <= 16) {
      axios.post(`${env.localserver}/credit-cards/`, payload)
        .then(response => {
          this.clearFields();
          getCards();
          navigation.navigate('Medios');
        })
        .catch(error => {
          this.clearFields();
          Alert.alert('No pudimos guardar tu tarjeta', error.response.data.error);
        });
    }
    else {
      this.clearFields();
      Alert.alert('Tu tarjeta no es válida');
    }
  };

  clearFields = () => {
    newCardNumber('');
    newCardYear('');
    newCardMonth('');
    newCardName('');
    newCardCvv('');
    newCardPristine(true);
  }


  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <BackBarTitle navigation={navigation} title={'Mis tarjetas'} route={'PaymentMethods'} />
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Número de tarjeta</Text>
          <View style={styles.codeBox}>
            {
              //<CardLogo2 card={newCard.number}/>
            }
            <TextInput
              autoCompleteType={"off"}
              autoCorrect={false}
              style={styles.input}
              keyboardType='numeric'
              maxLength={16}
              onChangeText={(number) => newCardNumber(number)}
              value={newCard.number.toString()}
            />
          </View>
          <View style={styles.codeBox}>
            <View style={{maxWidth: '30%'}}>
              <Text style={styles.text}>AAAA</Text>
              <TextInput
                autoCompleteType={'off'}
                autoCorrect={false}
                style={styles.inputSmall}
                keyboardType='numeric'
                maxLength={4}
                onChangeText={(year) => newCardYear(year)}
                value={newCard.year.toString()}
              />
            </View>
            <View style={{maxWidth: '30%'}}>
              <Text style={styles.text}>MM</Text>
              <TextInput
                autoCompleteType={'off'}
                autoCorrect={false}
                style={styles.inputSmall}
                keyboardType='numeric'
                maxLength={2}
                onChangeText={(month) => newCardMonth(month)}
                value={newCard.month.toString()}
              />
            </View>
            <View style={{maxWidth: '30%'}}>
              <Text style={styles.text}>CVV</Text>
              <TextInput
                autoCompleteType={'off'}
                autoCorrect={false}
                style={styles.inputSmall}
                keyboardType='numeric'
                maxLength={4}
                onChangeText={(cvv) => newCardCvv(cvv)}
                value={newCard.cvv.toString()}
              />
            </View>
          </View>
          <View style={styles.codeBox}>
            <View style={{maxWidth: '47.5%'}}>
              <Text style={styles.text}>Nombre</Text>
              <TextInput
                autoCompleteType={'off'}
                autoCorrect={false}
                style={styles.input2}
                maxLength={150}
                onChangeText={(name) => newCardName(name)}
                value={newCard.name}
              />
            </View>

          </View>
        </View>
        {!newCard.isValid && !newCard.isPristine &&
          <Text style={styles.error}>{newCard.error}</Text>
        }
        {newCard.isValid &&
          <TouchableOpacity
            onPress={() => this.onSubmit()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 15,
    fontFamily: 'Montserrat-Regular',
  },
  container: {
    backgroundColor: colors.gray,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  codeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get("window").width - Dimensions.get('window').width * 0.14,
  },
  boldText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  button: {
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 300,
    height: 50,
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
    color: 'black'
  },
  input: {
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 0,
    paddingLeft: 5,
    width: Dimensions.get("window").width - Dimensions.get('window').width * 0.24,
    //height: hp('4%'),
    fontSize: 18,
    textAlign: 'left',
    borderRadius: 10,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: 'white',
    marginTop: 5,
  },
    input2: {
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 0,
    paddingLeft: 5,
    width: Dimensions.get("window").width - Dimensions.get('window').width * 0.14,
    //height: hp('4%'),
    fontSize: 18,
    textAlign: 'left',
    borderRadius: 10,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: 'white',
    marginTop: 5,
  },
  inputSmall: {
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 0,
    paddingLeft: 5,
    //height: hp('4%'),
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 10,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: 'white',
    marginTop: 5,
  },
  text: {
    width: Dimensions.get("window").width - Dimensions.get('window').width * 0.24,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 20,
  },
});

export default NewCard;
