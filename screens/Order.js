import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { colors } from '../envStyles';
import { useStoreState, useStoreActions } from 'easy-peasy';
import SafeAreaView from 'react-native-safe-area-view';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import { showLocation } from 'react-native-map-link';
import { Popup } from 'react-native-map-link';

import BackBarTitle from '../components/BackBarTitle';
import StatusCard from '../components/StatusCard';
import CardLogo from '../components/CardLogo';
import PaymentState from '../components/PaymentState';

const Order = ({navigation}) => {

  const properties = useStoreState(state => state.properties);

  const toggleProperties = useStoreActions(actions => actions.toggleProperties);

  const order = navigation.getParam('data');

  priceStr = (string) => {
    return string.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  totalPrice = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  };

  render = (product) => {
    return (
      <View style={styles.content} key={product.product}>
        <Text style={styles.boldText}>{product.product_name} x{product.quantity}</Text>
        <Text style={styles.price}>${priceStr(product.price)}</Text>
        <Text style={styles.text}>{product.product_service}</Text>
      </View>
    )
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
      <Popup
          isVisible={properties.displayShareModal}
          onCancelPressed={() => toggleProperties('displayShareModal')}
          onAppPressed={() => toggleProperties('displayShareModal')}
          onBackButtonPressed={() => toggleProperties('displayShareModal')}
          modalProps={{ // you can put all react-native-modal props inside.
              animationIn: 'slideInUp'
          }}
          appsWhiteList={[]}
          options={{
            latitude: order.business_latitude,
            longitude: order.business_longitude,
            title: order.business_name,  // optional
            googleForceLatLon: true,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: 'Compartir ubicación', // optional (default: 'Open in Maps')
            dialogMessage: 'Compartir con:', // optional (default: 'What app would you like to use?')
            cancelText: 'Cancelar', // optional (default: 'Cancel')
          }}
      />
      <ScrollView>
        <BackBarTitle navigation={navigation} title={`Pedido ${order.id}`} route={'OrderHistory'} />
        <View style={styles.container}>
          <Text style={styles.text}>{order.date}</Text>
          <StatusCard data={order.order_status} open={'6:00 am'} close={'6:00 pm'}/>
          <View>
            <View style={styles.content}>
              <Text style={styles.boldText}>{order.business_address}</Text>
              <Text style={styles.text}>{order.business_name}</Text>
            </View>
            {
              order.ordered_products.map(product => render(product))
            }
            <View style={styles.contentC}>
              <Text style={styles.textC}>Total</Text>
              <Text style={styles.price}>${totalPrice(order.order_total)}</Text>
            </View>
            <PaymentState state={order.payment_state} />
            {order.payment_error && <Text style={styles.text}>{order.payment_error}</Text>}
          </View>
        </View>
        <View style={styles.mapcontainer}>
          <View style={styles.barcontainer}>
            <TouchableOpacity
              onPress={() => toggleProperties('displayShareModal')}
            >
              <Image
                source={require('../assets/icons/Compartir.png')}
                style={styles.shareLocationButton}
              />
            </TouchableOpacity>
          </View>
          <MapView
           provider={PROVIDER_GOOGLE} // remove if not using Google Maps
           style={styles.map}
           region={{
              latitude: parseFloat(order.business_latitude),
              longitude: parseFloat(order.business_longitude),
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
           }}
           // showsUserLocation={true}
          >
          <Marker
            coordinate= {
              {
                latitude: parseFloat(order.business_latitude),
                longitude: parseFloat(order.business_longitude)
              }
            }
          >
          <Image
              source={require('../assets/icons/Marcador4.png')}
              style={{height: 40, resizeMode: 'contain'}}
          />
          </Marker>
         </MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },
  content: {
    width: Dimensions.get('window').width - 50,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    paddingBottom: 10,
    marginBottom: 10,
  },
  barcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    width: Dimensions.get('window').width,
    paddingRight: 15,
  },
  contentC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldText: {
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  text: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  textB: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 15,
    color: colors.black,
  },
  textC: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    marginTop: -10,
  },
  price: {
    marginTop: -5,
    fontSize: 18,
    color: colors.purple,
    fontFamily: 'Montserrat-Bold',
  },
  mapcontainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width - 116,
    zIndex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  shareLocationButton: {
    height: 35,
    width: 35,
    marginLeft: 12,
    marginBottom: 12,
    backgroundColor: colors.gray,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 2,
  },
});

export default Order;
