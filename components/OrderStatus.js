import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import { colors } from '../envStyles';

const OrderStatus = (props) => {

    if (props.data === 'ACTIVE') {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Pedido activo</Text>
          <Image
            source={require('../assets/icons/activo.png')}
            style={{height: 20, width: 20}}
          />
        </View>
      );
    }
    else if (props.data === 'EXPIRED') {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Pedido vencido</Text>
          <Image
            source={require('../assets/icons/vencido.png')}
            style={{height: 20, width: 20}}
          />
        </View>
      );
    }
    else if (props.data === 'CANCELLED') {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Pedido cancelado</Text>
          <Image
            source={require('../assets/icons/cancelado.png')}
            style={{height: 20, width: 20}}
          />
        </View>
      );
    }
    else if (props.data === 'USED') {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Pedido usado</Text>
          <Image
            source={require('../assets/icons/realizado.png')}
            style={{height: 20, width: 20}}
          />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text: {
      fontSize: 14,
      fontFamily: 'Montserrat-Regular',
      color: colors.black,
    },
  });
  
  export default OrderStatus;