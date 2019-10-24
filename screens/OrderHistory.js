import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { colors } from '../envStyles';
import OrderStatus from '../components/OrderStatus';
import BackBarTitle from '../components/BackBarTitle';
import * as _ from 'lodash';


const OrderHistory = ({navigation}) => {

  const getOrders = useStoreActions(actions => actions.getOrders);
  const orders = useStoreState(state => state.orders);
  const sortedOrders = _.orderBy(orders, ['id'], ['desc']);
  const isLoading = useStoreState(state => state.properties.isLoading);


  useEffect(() => {
    getOrders();
  }, []);

  priceStr = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  };


  gifRender = () => {
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
     else if (isLoading === false && sortedOrders.length !== 0) {
       return sortedOrders.map(order => this.render(order))
     }
     else {
       return (
         <View style={styles.message}>
           <Text style={styles.messageText}>
             Aún no tienes órdenes
           </Text>
         </View>
       )
     }
  };

  render = (order) => {
    return(
      <TouchableOpacity
        key={order.id}
        onPress={() => navigation.navigate('Order', {data: order})}
      >
        <View style={styles.contentA}>
          <View style={styles.contentB}>
            <View>
              <Text style={styles.boldText}>{order.business_name}</Text>
              <Text style={styles.text}>${this.priceStr(order.order_total)}</Text>
              <Text style={styles.text}>{order.date}</Text>
            </View>
            <View style={styles.iconbox}>
              <Text style={styles.boldText}>></Text>
            </View>
          </View>
          <OrderStatus data={order.order_status}/>
        </View>
      </TouchableOpacity>
    )
  };

    return(
      <View style={{flex: 1, backgroundColor: colors.gray}}>
        <BackBarTitle navigation={navigation} title={'Mis pedidos'} route={'Home'}/>
        <ScrollView>
          <View style={styles.container}>
            {
              this.gifRender()
            }
          </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  iconbox: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  gifContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentA: {
    width: Dimensions.get('window').width - 40,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  contentB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
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
    maxWidth: '70%',
    textAlign: 'center'
  },
});

export default OrderHistory;
