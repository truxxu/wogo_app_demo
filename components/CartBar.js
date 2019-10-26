import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { colors } from '../envStyles';

const CartBar = ({navigation}) => {

  const shoppingCart = useStoreState(state => state.shoppingCart);

  getTotal = () => {
    let sum = {'price': 0, 'quantity': 0};
    shoppingCart.map(product => {
      sum.price += product.price * product.quantity;
      sum.quantity += product.quantity;
    });
    return sum
  };
  const total = getTotal();
  const priceStr = total.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (shoppingCart.length !== 0) {
    return (
      <View style={styles.orderContainer}>
        <Text style={styles.boldText}>${priceStr}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ShoppingCart', {data: ''})}
        >
          <Text style={styles.orderText}>Ver carrito</Text>
        </TouchableOpacity>
        <View style={styles.number}>
          <Text style={styles.orderText}>{total.quantity}</Text>
        </View>
      </View>
    );
  }
  else {
    return(
      <View></View>
    )
  }
}

const styles = StyleSheet.create({
  orderContainer: {
    backgroundColor: colors.yellow,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    height: 40
  },
  boldText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  orderText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  number: {
    padding: 5,
    backgroundColor: colors.white,
  },
});

export default CartBar;
