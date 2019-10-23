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

import { colors } from '../envStyles';


const Splash = ({navigation}) => {

  // States
  const auth_token = useStoreState(state => state.auth.token);

  // Actions
  const writeActiveAddress = useStoreActions(actions => actions.writeActiveAddress);

  useEffect(() => {
    if(Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(
        (position) => { locationSuccessful(position) },
        (error) => { locationPermissionsNotGranted() }
      );
    } else {
      PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then((response) => {
        if(response == 'granted') {
          Geolocation.getCurrentPosition(
            (position) => { locationSuccessful(position) },
            (error) => { locationPermissionsNotGranted() }
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
      'No fue posible determinar tu dirección a partir de tu ubicación. Intenta de nuevo.',
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
      id: null,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      text: geocodingObject.results[0].formatted_address.split(",", 1)[0],
      postalCode: postalCode,
      city: city,
      state: state,
      country: country
    });
  }

  locationSuccessful = (position) => {
    Geocoder.from(position.coords.latitude, position.coords.longitude).then(json => {
      setActiveAddress(json, position);
      if (auth_token !== null) {
        // validate token
        // if valid -> goto home
        // if not -> goto register
      }
      else {
        const timer = setTimeout(() => {
          navigation.replace('Welcome')
        }, 2000);
      };
    }).catch(error => {
      geocodingNotSuccessful();
    });
  }

  return(
    <View style={styles.container}>
      <Image
        source={require('../assets/gifs/welcome.gif')}
        style={{height: 400, width: 400}}
      />
    </View>
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
