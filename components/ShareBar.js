import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Share
} from 'react-native';
import { useStoreState } from 'easy-peasy';

import { colors } from '../envStyles';

const ShareBar = ({navigation, product}) => {

  // State
  const activeBusiness = useStoreState(state => state.properties.activeBusiness);

  const priceStr = product.price.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  onClick = (product) => {
    Share.share({
      message:
        `${product.name} por solo $${priceStr}. Solo en WOGO, ¡descárgala ya!
https://wogoapp.co/desgarga-wogo`,
      url: 'https://wogoapp.co/desgarga-wogo',
      title: 'WOGO'
    }, {
      // Android only:
      dialogTitle: 'WOGO',
      // iOS only:
      // excludedActivityTypes: [
      // ]
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (activeBusiness == null || product.business != activeBusiness.id) {
            navigation.navigate('Home');
          } else {
            navigation.navigate('Business');
          }
        }}
      >
        <Image
          source={require('../assets/icons/Flecha2.png')}
          style={{height: 35, width: 35}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onClick(product)}
      >
        <Image
          source={require('../assets/icons/Compartir2.png')}
          style={{height: 35, width: 35}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.purple,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width - 40,
  },
  boldText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
});

export default ShareBar;
