import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import * as _ from 'lodash';

import ProductCard from '../components/ProductCard';
import { colors } from '../envStyles';

const ProductType = ({navigation}) => {

  const properties = useStoreState(state => state.properties);

  const products = properties.activeBusiness.products
  const sortedProducts = _.orderBy(products, ['price'], ['asc']);

  if (properties.isLoading === true) {
    return(
      <View style={styles.gifContainer}>
          <Image
            source={require('../assets/gifs/spinner.gif')}
            style={{height: 250, width: 250}}
          />
      </View>
    )
  }
  else if (properties.isLoading === false && products.length !== 0) {
    return (
      <View>
        {
          sortedProducts.map(product =>
            {
              if (product.service_type_name === properties.activeType) {
                return(
                  <ProductCard navigation={navigation} product={product} key={product.id}/>
                )
              }
            }
          )
        }
      </View>
    )
  }
  else {
    return (
      <View style={styles.message}>
        <Text style={styles.messageText}>
          Lo sentimos, no existen productos en esta categoría
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  messageText: {
    marginTop: 40,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: 'gray',
    maxWidth: '70%',
    textAlign: 'center'
  },
  gifContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductType;
