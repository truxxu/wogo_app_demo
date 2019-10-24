import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import { colors } from '../envStyles';

const StatusCard = (props) => {

  timeStr = (time) => {
    return time.slice(0, -3)
  };

  if (props.data === 'ACTIVE') {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/icons/Hecho.png')}
          style={{height: 150, width: 150,}}
        />
        <View style={{maxWidth: '60%'}}>
          <Text style={styles.boldText}>Pedido confirmado</Text>
          <Text style={styles.text}>Dirigete al punto de venta</Text>
          <Text style={styles.text2}>
            Horario: {props.open} - {props.close}
          </Text>
        </View>
      </View>
    );
  }
  else if (props.data === 'EXPIRED') {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/icons/vencido.png')}
          style={{height: 150, width: 150}}
        />
        <View style={{maxWidth: '60%'}}>
          <Text style={styles.boldText}>Pedido vencido</Text>
        </View>
      </View>
    );
  }
  else if (props.data === 'CANCELLED') {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/icons/cancelado.png')}
          style={{height: 150, width: 150}}
        />
        <View style={{maxWidth: '60%'}}>
          <Text style={styles.boldText}>Pedido cancelado</Text>
        </View>
      </View>
    );
  }
  else if (props.data === 'USED') {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/icons/realizado.png')}
          style={{height: 150, width: 150}}
        />
        <View style={{maxWidth: '60%'}}>
          <Text style={styles.boldText}>Pedido utilizado</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 10,
    height: 123,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  boldText: {
    fontSize: 25,
    marginBottom: 5,
    fontFamily: 'Montserrat-Bold',
    color: colors.purple,
  },
  text: {
    marginBottom: 5,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  text2: {
    fontSize: 12,
    marginBottom: 10,

    fontFamily: 'Montserrat-Regular',
    color: colors.purple,
  }

});

export default StatusCard;