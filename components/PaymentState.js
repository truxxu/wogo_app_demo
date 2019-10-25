import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import { colors } from '../envStyles';

const PaymentState = (props) => {

  if (props.state === 'ERROR') {
    return(
      <Text style={styles.text}>Error en el pago</Text>
    )
  }
  else if (props.state === 'APPROVED') {
    return(
      <Text style={styles.text}>Pago aprobado</Text>
    )
  }
  if (props.state === 'DECLINED') {
    return(
      <Text style={styles.text}>Pago declinado</Text>
    )
  }
  else if (props.state === '' || props.state === null) {
    return(
      <Text style={styles.text}>Sin Informacion</Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.green,
  },
});

export default PaymentState;
