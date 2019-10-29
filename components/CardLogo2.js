import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TextInput
} from 'react-native';

const CardLogo2 = (props) => {

  identifier = (ccNumber) => {
    const numberStr = ccNumber.toString();
    if (numberStr.match(/^4[0-9]{12}(?:[0-9]{3})?$/)) {
      return 'VISA'
    }
    else if (numberStr.match(/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/)) {
      return 'MASTERCARD'
    }
    else if (numberStr.match(/^3(?:0[0-2]|[68][0-9])[0-9]{11}$/)) {
      return 'DINERS'
    }
    else if (numberStr.match(/^3[47][0-9]{13}$/)) {
      return 'AMEX'
    }
    else {
      return 'unknown'
    }
  };

  const cardType = this.identifier(props.card);

  if (cardType === 'VISA') {
    return(
      <Image
        source={require('../assets/icons/visa.png')}
        style={{width: 40, height: 40, marginRight: 2, marginTop: 5}}
      />
    );
  }
  else if (cardType === 'MASTERCARD') {
    return(
      <Image
        source={require('../assets/icons/mastercard.png')}
        style={{width: 40, height: 40, marginRight: 2, marginTop: 5}}
      />
    );
  }
  else if (cardType === 'DINERS') {
    return(
      <Image
        source={require('../assets/icons/diners.png')}
        style={{width: 40, height: 40, marginRight: 2, marginTop: 5}}
      />
    );
  }
  else if (cardType === 'AMEX') {
    return(
      <Image
        source={require('../assets/icons/amex.png')}
        style={{width: 40, height: 40, marginRight: 2, marginTop: 5}}
      />
    );
  }
  else {
    return(
      <Image
        source={require('../assets/icons/medios.png')}
        style={{width: 40, height: 40, marginRight: 2, marginTop: 5}}
      />
    );
  }
}

const styles = StyleSheet.create({

});

export default CardLogo2;
