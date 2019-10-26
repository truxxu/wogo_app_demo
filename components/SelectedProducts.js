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

const SelectedProducts = ({navigation, type}) => {

  const products = useStoreState(state => state.products.our_selection);
  const getProducts = useStoreActions(actions => actions.getProducts);
  const isLoadingTop = useStoreState(state => state.properties.isLoadingOurSelection);

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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectedProducts;
