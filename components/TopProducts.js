import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';

import HomeProductCard from './HomeProductCard';

const TopProducts = ({navigation, type}) => {

  const products = useStoreState(state => state.products.top);
  const getProducts = useStoreActions(actions => actions.getProducts);
  const isLoadingTop = useStoreState(state => state.properties.isLoadingTop);

  useEffect(() => {
    getProducts(type);
  }, []);

  if (isLoadingTop === true) {
    return(
      <View style={styles.gifContainer}>
          <Image
            source={require('../assets/gifs/spinner.gif')}
            style={{height: 200, width: 200}}
          />
      </View>
    )
  }
  else if (isLoadingTop === false && products !== null) {
    return(
      <View>
        {
          products.map(product => {
            return(
              <HomeProductCard key={product.id} navigation={navigation} product={product} />
            )
          })
        }
      </View>
    )
  }
  else {
    return(null)
  }
}

const styles = StyleSheet.create({
  gifContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopProducts;
