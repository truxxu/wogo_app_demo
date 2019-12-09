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
import BusinessFilters from '../components/BusinessFilters';
import * as _ from 'lodash';

const BusinessesMap = ({navigation}) => {

  const activeAddress = useStoreState(state => state.activeAddress);
  const businesses = useStoreState(state => state.businesses);
  const properties = useStoreState(state => state.properties);

  const region = {
    latitude: parseFloat(activeAddress.latitude),
    longitude: parseFloat(activeAddress.longitude),
    latitudeDelta: 0.13,
    longitudeDelta: 0.13,
  };

  filterList = (list) => {
    if (properties.businessFilter.length !== 0) {
      array = [];
      list.map(business => {
        business.products.map(product => {
          if (properties.businessFilter.includes(product.service_type_name)) {
            array.push(business)
          }
        })
      });
      return _.uniqBy(array, 'id')
    }
    else {
      return list
    }
  };

  const filteredList = filterList(businesses);

  return (
    <SafeAreaView forceInset={{bottom: 'always'}} style={{ flex: 1, backgroundColor: colors.gray }}>
      <View style={{flex: 1, backgroundColor: colors.gray}}>
        <MenuBar navigation={navigation} />
        <ServiceTabs navigation={navigation} parent='BusinessesMap'/>
        <View style={styles.mapcontainer}>
          <View style={styles.barcontainer}>
            <TouchableOpacity
              style={styles.close}
              onPress={() => navigation.navigate('Category')}
            >
              <Text style={styles.text}>X</Text>
            </TouchableOpacity>
            <View style={styles.iconcontainer}>
              <BusinessFilters parent={'map'} />
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
          {filteredList.map(marker => (
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
      </View>
        <FooterBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  mapcontainer: {
    alignItems: 'center',
    flex: 1,

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
    top: 0,
    zIndex: 2,
    width: Dimensions.get('window').width,
    paddingLeft: 15,
    paddingRight: 5,
  },
  close: {
    width: 20,
    height: 20,
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
