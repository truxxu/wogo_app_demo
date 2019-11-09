import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import SafeAreaView from 'react-native-safe-area-view';

import { colors } from '../envStyles';


const Splash = ({navigation}) => {

  // States
  const auth_token = useStoreState(state => state.auth.token);

  // Actions
  const writeActiveAddress = useStoreActions(actions => actions.writeActiveAddress);
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);

  useEffect(() => {
    if(Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(
        (position) => { locationSuccessful(position) },
        (error) => { locationPermissionsNotGranted() },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
      PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then((response) => {
        if(response == 'granted') {
          Geolocation.getCurrentPosition(
            (position) => { locationSuccessful(position) },
            (error) => { locationPermissionsNotGranted() },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        } else {
          locationPermissionsNotGranted();
        }
      });
    }
  }, []);

  locationPermissionsNotGranted = () => {
    Alert.alert(
      'WOGO',
      'Debes activar el servicio de ubicación de tu dispositivo y permitir que WOGO acceda a tu ubicación para poder mostrarte la oferta de productos y servicios cerca de tí.',
      [
        { text: 'OK', onPress: () => navigation.replace('Splash') },
      ],
      {cancelable: false},
    );
  }

  geocodingNotSuccessful = () => {
    Alert.alert(
      'WOGO',
      'No fue posible determinar tu dirección a partir de tu ubicación. Verifica tu conexión a internet e intenta de nuevo.',
      [
        { text: 'OK', onPress: () => navigation.replace('Splash') },
      ],
      {cancelable: false},
    );
  }

  setActiveAddress = (geocodingObject, position) => {
    addressComponents = geocodingObject.results[0].address_components;
    // default values for preventing payments rejection if this data is not provided
    postalCode = '111111';
    city = 'Bogotá';
    state = 'Bogotá';
    country = 'CO';
    for(let i=0; i < addressComponents.length; i++) {
      if (addressComponents[i].types.includes('postal_code')) {
        postalCode = addressComponents[i].short_name;
      }
      if (addressComponents[i].types.includes('locality')) {
        city = addressComponents[i].short_name;
      }
      if (addressComponents[i].types.includes('administrative_area_level_1')) {
        state = addressComponents[i].short_name;
      }
      if (addressComponents[i].types.includes('country')) {
        country = addressComponents[i].short_name;
      }
    }
    writeActiveAddress({
      id: 0,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      text: geocodingObject.results[0].formatted_address.split(",", 1)[0],
      postalCode: postalCode,
      city: city,
      state: state,
      country: country
    });
  }

  getActiveVehicle = async () => {
    try {
      const activeVehicle = await AsyncStorage.getItem('activeVehicle');
      if(activeVehicle !== null) {
        writePropertyState({name: 'currentVehicle', value: activeVehicle});
        navigation.replace('DrawerNavigator');
      }
      else {
        navigation.replace('VehicleSelection');
      };
    } catch(e) {
      // error reading value
      navigation.replace('VehicleSelection');
    }
  }

  getToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken')
      if(authToken !== null) {
        // validate token
        axios.defaults.headers.common.Authorization = authToken;
        // if valid -> get stored activeVehicle
        getActiveVehicle();
        // if valid -> goto drawer navigator
        //navigation.replac;e('DrawerNavigator')
        // if not -> goto register
      }
      else {
        const timer = setTimeout(() => {
          navigation.replace('Welcome')
        }, 2000);
      };
    } catch(e) {
      // error reading value
      const timer = setTimeout(() => {
        navigation.replace('Welcome')
      }, 2000);
    }
  }

  locationSuccessful = (position) => {
    Geocoder.from(position.coords.latitude, position.coords.longitude).then(json => {
      setActiveAddress(json, position);
      getToken();
    }).catch(error => {
      geocodingNotSuccessful();
    });
  }

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.yellow }}>
      <View style={styles.container}>
        <Image
          source={require('../assets/gifs/welcome.gif')}
          style={{height: 400, width: 400}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellow,
  },
});

export default Splash;
