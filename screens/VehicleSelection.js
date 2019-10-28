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
import AsyncStorage from '@react-native-community/async-storage';
import SafeAreaView from 'react-native-safe-area-view';

import { colors } from '../envStyles';
import { env } from '../keys';

const VehicleSelection = ({navigation}) => {

  const properties = useStoreState(state => state.properties);
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);
  const getServices = useStoreActions(actions => actions.getServices);

  storeVehicle = async (vehicle) => {
    try {
      await AsyncStorage.setItem('activeVehicle', vehicle);
    } catch (e) {
      Alert('Error', 'No fue posible realizar la operación');home
      navigation.replace('VehicleSelection');
    }
  };

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
      <View style={{flex: 1, backgroundColor: colors.gray}}>
        <Text style={styles.boldText}>Escoge tu Vehículo</Text>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                storeVehicle('carro');
                writePropertyState({name: 'currentVehicle', value: 'carro'});
                navigation.replace('DrawerNavigator');
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
                writePropertyState({name: 'currentVehicle', value: 'moto'});
                storeVehicle('moto');
                navigation.replace('DrawerNavigator');
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
    </SafeAreaView>
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
