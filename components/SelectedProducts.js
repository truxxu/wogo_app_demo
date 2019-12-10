import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Swiper from 'react-native-swiper'
import axios from 'axios';

import HomeProductCard from './HomeProductCard';
import { colors } from '../envStyles';
import { env } from '../keys';

const SelectedProducts = ({navigation, type}) => {

  const products = useStoreState(state => state.products.our_selection);
  const isLoadingBestSeller = useStoreState(state => state.properties.isLoadingBestSeller);
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);
  const writeProducts = useStoreActions(actions => actions.writeProducts);

  useEffect(() => {
    writePropertyState({name: 'isLoadingBestSeller', value: true});
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const getData = () => {
      try {
        axios.get(`${env.apiServer}/products/?list=${type}`)
          .then(response => {
            writeProducts({value: response.data, name: 'our_selection'});
            writePropertyState({name: 'isLoadingBestSeller', value: false});
          })
      } catch(error) {
        if (axios.isCancel(error)) {
          Alert.alert('Error','Fallo al leer productos seleccionados');
        } else {
          throw error;
        }
      }
    };

    getData();
    return () => {
      source.cancel();
    };
  }, []);

  if (isLoadingBestSeller === true) {
    return(
      <View style={styles.gifContainer}>
          <Image
            source={require('../assets/gifs/spinner.gif')}
            style={{height: 200, width: 200}}
          />
      </View>
    )
  }
  else if (isLoadingBestSeller === false && products !== null) {
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
  wrapper: {
    height: 160
  },
});

export default SelectedProducts;
