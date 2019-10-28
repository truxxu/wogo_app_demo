import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useStoreState } from 'easy-peasy';
import MenuBar from '../components/MenuBar';
import ServiceTabs from '../components/ServiceTabs';
import SafeAreaView from 'react-native-safe-area-view';

import { colors } from '../envStyles';
import FooterBar from '../components/FooterBar';

const BusinessesMap = ({navigation}) => {

  const activeAddress = useStoreState(state => state.activeAddress);
  const businesses = useStoreState(state => state.businesses);

  const region = {
    latitude: parseFloat(activeAddress.latitude),
    longitude: parseFloat(activeAddress.longitude),
    latitudeDelta: 0.13,
    longitudeDelta: 0.13,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
      <View>
        <MenuBar navigation={navigation} />
        <ServiceTabs navigation={navigation}/>
        <View style={styles.mapcontainer}>
          <View style={styles.barcontainer}>
            <TouchableOpacity
              style={styles.close}
              onPress={() => navigation.navigate('Category')}
            >
              <Text style={styles.text}>X</Text>
            </TouchableOpacity>
            <View style={styles.iconcontainer}>
              <TouchableOpacity
                // onPress={() => navigation.navigate('Mapa', {data: category, types: types})}
              >
                <Image
                  source={require('../assets/icons/settings.png')}
                  style={{height: 35, width: 35, marginLeft: 12}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _mapView.animateToRegion(region, 1000)}
              >
                <Image
                  source={require('../assets/icons/marcador_Ubicacion.png')}
                  style={{height: 35, width: 35, marginLeft: 12}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <MapView
           provider={PROVIDER_GOOGLE} // remove if not using Google Maps
           style={styles.map}
           initialRegion={region}
           ref = {(mapView) => { _mapView = mapView; }}
           showsUserLocation={true}
           showsMyLocationButton={false}
         >
          {businesses.map(marker => (
            <Marker
              key={marker.id}
              title={marker.name}
              coordinate= {
                {
                  latitude: parseFloat(marker.latitude),
                  longitude: parseFloat(marker.longitude)
                }
              }
            >
              <Image
                source={require('../assets/icons/Marcador4.png')}
                style={{height: 40, resizeMode: 'contain'}}
              />
            </Marker>
          ))}
         </MapView>
        </View>
        <FooterBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  mapcontainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 180,
    zIndex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  iconcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.gray,
    position: 'absolute',
    top: 0,
    zIndex: 2,
    width: Dimensions.get('window').width,
    paddingLeft: 15,
    paddingRight: 5,
  },
  close: {
    width: 20,
    height: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
});

export default BusinessesMap;
