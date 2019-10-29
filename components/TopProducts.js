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
import Swiper from 'react-native-swiper'

import HomeProductCard from './HomeProductCard';
import { colors } from '../envStyles';

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
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={true}
        autoplay={true}
        autoplayTimeout={3}
        dot={<View style={{backgroundColor: 'rgba(94,33,226,.3)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />}
        activeDot={<View style={{backgroundColor: colors.purple, width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />}>
          {
            products.map(product => {
              return(
                <View key={product.id}>
                  <HomeProductCard navigation={navigation} product={product} />
                </View>
              )
            })
          }
      </Swiper>
    )
  }
  else {
    return(null)
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 160
  },
  gifContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopProducts;
