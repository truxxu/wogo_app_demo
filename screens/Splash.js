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

import { colors } from '../envStyles';


const Splash = ({navigation}) => {

  // States
  const auth_token = useStoreState(state => state.auth.token);

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

  locationSuccessful = (position) => {
    // geocode position
    // then
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
