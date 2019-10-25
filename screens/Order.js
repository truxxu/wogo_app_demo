import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { colors } from '../envStyles';
import { useStoreState } from 'easy-peasy';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


import BackBarTitle from '../components/BackBarTitle';
import StatusCard from '../components/StatusCard';
import CardLogo from '../components/CardLogo';
import PaymentState from '../components/PaymentState';

const Order = ({navigation}) => {

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
        <Text style={styles.boldText}>{product.product_name}               x{product.quantity}</Text>
        <Text style={styles.price}>${this.priceStr(product.price)}</Text>
        <Text style={styles.text}>{product.product_service}</Text>
      </View>
    )
  };

  return (
    <ScrollView>
      <BackBarTitle navigation={navigation} title={`Pedido ${order.id}`} route={'OrderHistory'} />
      <View style={styles.container}>
        <Text style={styles.text}>{order.date}</Text>
        <StatusCard data={order.order_status} open={'6:00 am'} close={'6:00 pm'}/>
        <View>
          <View style={styles.content}>
            <Text style={styles.boldText}>{order.business_address}</Text>
            <Text style={styles.text}>{order.business_name}</Text>
            <Text style={styles.text}>Tiempo estimado</Text>
          </View>
          {
            order.ordered_products.map(product => this.render(product))
          }
          <View style={styles.contentC}>
            <Text style={styles.textC}>Total</Text>
            <Text style={styles.price}>${this.totalPrice(order.order_total)}</Text>
          </View>
          <View style={styles.contentC}>
            <View style={styles.contentC}>
              <CardLogo card={order.payment_method}/>
              <Text style={styles.textB}>{/*order.customer*/}1234 1234 **** ****</Text>
            </View>
            {
            // <View style={styles.contentC}>
            //   <Image
            //     source={require('../../assets/icons/descuento.png')}
            //     style={{height: wp('10%'), width: wp('10%')}}
            //   />
            //   <Text style={styles.textB}>SARA1234</Text>
            // </View>
            }
          </View>
          <PaymentState state={order.payment_state} />
        </View>
      </View>
      <View style={styles.mapcontainer}>
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
    marginTop: 10,
    marginBottom: 10,
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
    fontSize: 22,
    color: colors.purple,
    fontFamily: 'Montserrat-Bold',
  },
  mapcontainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width - 116,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Order;