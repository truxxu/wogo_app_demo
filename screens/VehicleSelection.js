import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import AsyncStorage from '@react-native-community/async-storage';
import SafeAreaView from 'react-native-safe-area-view';

import { colors } from '../envStyles';

const VehicleSelection = ({navigation}) => {

  const writePropertyState = useStoreActions(actions => actions.writePropertyState);
  const getServices = useStoreActions(actions => actions.getServices);

  storeVehicle = async (vehicle) => {
    try {
      await AsyncStorage.setItem('activeVehicle', vehicle);
    } catch (e) {
      Alert('Error', 'No fue posible realizar la operación');
      navigation.replace('VehicleSelection');
    }
  };

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
      <View style={{flex: 1, backgroundColor: colors.gray}}>
        <View style={styles.container}>
          <Text style={styles.boldText}>Escoge tu Vehículo</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                storeVehicle('carro');
                writePropertyState({name: 'currentVehicle', value: 'carro'});
                getServices('carro');
                navigation.navigate('Home');
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
                storeVehicle('moto');
                writePropertyState({name: 'currentVehicle', value: 'moto'});
                getServices('moto');
                navigation.navigate('Home');
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  boldText: {
    alignSelf: 'flex-start',
    marginBottom: 20,
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
