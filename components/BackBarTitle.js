import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import AsyncStorage from '@react-native-community/async-storage';

import { colors } from '../envStyles';

const BackBarTitle = ({navigation, title, route}) => {

  //States
  const auth = useStoreState(state => state.auth);
  //Actions
  const newCardNumber = useStoreActions(actions => actions.newCardNumber);
  const newCardName = useStoreActions(actions => actions.newCardName);
  const newCardYear = useStoreActions(actions => actions.newCardYear);
  const newCardMonth = useStoreActions(actions => actions.newCardMonth);
  const newCardCvv = useStoreActions(actions => actions.newCardCvv);
  const newCardPristine = useStoreActions(actions => actions.newCardPristine);

  getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch(e) {
      Alert.alert('Error leyendo authToken')
    }
  };

  getToken();

  onBack = (route) => {
    if (route == 'PaymentMethods') {
      clearFields();
      navigation.navigate(route);
    }
    else if (getToken() === undefined) {
      navigation.replace('Login');
    }
    else {
      navigation.navigate(route);
    }
  }

  clearFields = () => {
    newCardNumber('');
    newCardYear('');
    newCardMonth('');
    newCardName('');
    newCardCvv('');
    newCardPristine(true);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onBack(route)}
      >
        <Image
          source={require('../assets/icons/Flecha.png')}
          style={{height: 28, width: 28}}
        />
      </TouchableOpacity>
      <Text style={styles.boldText}>{title}</Text>
      <View style={{height: 28, width: 28}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  boldText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
});

export default BackBarTitle;
