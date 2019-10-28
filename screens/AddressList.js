import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import { useStoreState, useStoreActions } from 'easy-peasy';
import * as _ from 'lodash';
import SafeAreaView from 'react-native-safe-area-view';

import { env } from '../keys';
import { colors } from '../envStyles';
import BackBarTitle from '../components/BackBarTitle';

const WIDTH = Dimensions.get('window').width;

const AddressList = ({navigation}) => {

  // States
  const addresses = useStoreState(state => state.addresses);
  const activeAddress = useStoreState(state => state.activeAddress);
  const isLoading = useStoreState(state => state.properties.isLoading);
  const isLocating = useStoreState(state => state.properties.isLocating);
  const newAddress = useStoreState(state => state.newAddress);

  //Actions
  const getAddresses = useStoreActions(actions => actions.getAddresses);
  const writeActiveAddressState = useStoreActions(actions => actions.writeActiveAddressState);
  const writeNewAddress = useStoreActions(actions => actions.writeNewAddress);
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);

  const sortedList = _.orderBy(addresses, [function(address) { return address.id === activeAddress.id }], ['desc']);

  useEffect(() => {
    getAddresses();
  }, []);

  useEffect(() => {
    writePropertyState({name: 'isLocating', value: true});
    Geolocation.getCurrentPosition(
      (position) => { getAddressFromPosition(position) },
      (error) => { errorLocating() },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  getAddressFromPosition = (position) => {
    Geocoder.from(position.coords.latitude, position.coords.longitude).then(json => {
      addressComponents = json.results[0].address_components;
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
      writeNewAddress({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        text: json.results[0].formatted_address.split(",", 1)[0],
        postalCode: postalCode,
        city: city,
        state: state,
        country: country
      });
      writePropertyState({name: 'isLocating', value: false});
    }).catch(error => {
      errorLocating();
    });
  };

  errorLocating = () => {
    Alert.alert('Error', 'No pudimos acceder a tu ubicación');
    writeNewAddress({
      text: 'Desconocida',
    });
    writePropertyState({name: 'isLocating', value: false});
  };

  addressStr = (string) => {
    return string.split(",")[0]
  };

  renderAddresses = (item) => {
    if (Object.keys(item).length !== 0 && item.id !== null) {
      return(
        <View key={item.id} style={styles.item}>
          <View style={{marginBottom: 10}}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
          <View style={styles.buttonbox}>
            <TouchableOpacity
              onPress = { () => {
                writeActiveAddressState({ name: 'id', value: item.id })
                writeActiveAddressState({ name: 'latitude', value: item.latitude })
                writeActiveAddressState({ name: 'longitude', value: item.longitude })
                writeActiveAddressState({ name: 'text', value: item.text })
                writeActiveAddressState({ name: 'postalCode', value: item.postal_code })
                writeActiveAddressState({ name: 'city', value: item.city })
                writeActiveAddressState({ name: 'state', value: item.state })
                writeActiveAddressState({ name: 'country', value: item.country })
              }}
            >
              <View style={styles.icon}>
                <View style={item.id === activeAddress.id ? styles.active : null}></View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  };

  loadingLocation = () => {
    if (isLocating === true) {
      return(
        <Text style={styles.text}>Ubicando...</Text>
      )
    }
    else {
      return(
        <Text style={styles.text}>{this.addressStr(newAddress.text)}</Text>
      )
    }
  };

  renderGif = () => {
    if (isLoading === true) {
      return(
        <View style={styles.gifContainer}>
            <Image
              source={require('../assets/gifs/spinner.gif')}
              style={{height: 250, width: 250}}
            />
        </View>
      )
    }
    else if (isLoading === false && addresses.length !== 0) {
      return sortedList.map(item => this.renderAddresses(item))
    }
    else {
      return (
        <View style={styles.message}>
          <Text style={styles.messageText}>
            Aún no tienes direcciones
          </Text>
        </View>
      )
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
      <View style={{backgroundColor: colors.gray, flex: 1}}>
        <BackBarTitle navigation={navigation} title={'Elige tu dirección'} route={'Home'}/>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image
              source={require('../assets/icons/direccion.png')}
              style={{height: 28, width: 28}}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('NewAddress')}
            >
              <View style={{marginLeft: 15}}>
                <Text style={styles.linkText}>Añadir ubicación actual</Text>
                {
                  this.loadingLocation()
                }
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            {
              this.renderGif()
            }
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH - 40,
    marginBottom: 20,
  },
  linkText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: colors.purple
  },
  boldText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  buttonbox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  item: {
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    marginBottom: 5,
    marginTop: 10,
    width: WIDTH - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    height: 18,
    width: 18,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    height: 10,
    width: 10,
    backgroundColor: colors.purple,
    borderRadius: 2,
  },
  button: {
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 10,
    width: 250,
    padding: 15,
    marginTop: 20,
    backgroundColor: colors.yellow,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
  message: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    marginTop: 40,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: 'gray',
    textAlign: 'center'
  },
  gifContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AddressList;
