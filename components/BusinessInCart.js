import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { colors } from '../envStyles';

const BusinessInCart = (props) => {

  const minusCart = useStoreActions(actions => actions.minusCart);
  const plusCart = useStoreActions(actions => actions.plusCart);
  const removeProduct = useStoreActions(actions => actions.removeProduct);
  const business = props.data[0];
  const products = props.data;

  priceStr = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  };

  shortener = (string) => {
    if (string.length > 9) {
      return string.substring(0, 10) + '...'
    }
    else {return string}
  };

  renderProduct = (product) => {
    if (product.quantity >= 1) {
      return (
        <View style={styles.content2} key={product.product}>
          <View style={{ width: Dimensions.get('window').width - 80}}>
            <View style={{ maxWidth: '70%'}}>
              <Text style={styles.boldText}>{product.name}  x{product.quantity}</Text>
            </View>
            <Text style={styles.price}>
              ${priceStr(product.quantity * product.price)}
            </Text>
            <Text style={styles.text}>{product.service}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => plusCart(product)}
            >
              <Text style={styles.operator}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => minusCart(product)}
            >
              <Text style={styles.operator}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    else {
      removeProduct(product);
    }
  };

  return (
    <View>
      <View style={styles.content}>
        <View style={{padding: 10, paddingLeft: 0}}>
          <Text style={styles.boldText}>{business.business_name}</Text>
          <Text style={styles.text}>{business.address}</Text>
        </View>
        <View>
          <TouchableOpacity
            // onPress={}
          >
          </TouchableOpacity>
        </View>
      </View>
      {
        products.map(product => renderProduct(product))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'gray',
  },
  content2: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'gray',
  },
  boldText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: colors.black
  },
  boldTextB: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
    maxWidth: '50%',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.black
  },
  price: {
    fontSize: 18,
    color: colors.purple,
    fontFamily: 'Montserrat-Bold',
  },
  operator: {
    fontSize: 25,
    color: colors.purple,
    fontFamily: 'Montserrat-Bold',
    padding: 10,
  },
});

export default BusinessInCart;
