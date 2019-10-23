import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import axios from 'axios';

import { colors } from '../envStyles';
import { env } from '../keys';


const VehicleSelection = ({navigation}) => {

  const currentVehicle = useStoreState(state => state.currentVehicle);
  const writeCurrentVehicle = useStoreActions(actions => actions.writeCurrentVehicle);

  return(
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <Text style={styles.boldText}>Escoge tu Vehículo</Text>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              writeCurrentVehicle('carro')
              // getServices('carro')
              navigation.navigate('Home')
            }}
          >
            <Image
              source={require('../assets/icons/carro.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.title}>Carro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              writeCurrentVehicle('moto')
              // getServices('moto')
              navigation.navigate('Home')
            }}
          >
            <Image
              source={require('../assets/icons/moto.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.title}>Moto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  boldText: {
    textAlign: 'left',
    marginTop: 140,
    marginLeft: 40,
    fontSize: 21,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  iconContainer: {
    marginTop: -80,
  },
  button: {
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    height: 154,
    width: 168,
    margin: 12,
    padding: 10,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    flex:1,
    height: undefined,
    width: undefined
  },
});

export default VehicleSelection;
