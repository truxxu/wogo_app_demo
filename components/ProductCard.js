import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { colors } from '../envStyles';

const ProductCard = ({navigation, product}) => {

  // const plusSingleQuantity = useStoreActions(actions => actions.plusSingleQuantity);
  // const clearCart = useStoreActions(actions => actions.clearCart);
  const price = product.price.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  shortener = (string) => {
    if (string.length > 9) {
      return string.substring(0, 10) + '...'
    }
    else {return string}
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imagecontainer}
        // onPress={}
      >
        <Image
          style={styles.image}
          source={{uri: product.image}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Product', {product: product})}
        style={styles.textbox}
      >
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.name}>{shortener(product.name)}</Text>
        <Text style={styles.text}>{product.description.substring(0, 50) + '...'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => plusSingleQuantity({'product': product})}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    // height: hp('12%'),
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  price: {
    fontSize: 14,
    color: colors.purple,
    fontFamily: 'Montserrat-SemiBold',
  },
  name: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  text: {
    textAlign: 'justify',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  image: {
    borderRadius: 3,
    height: 80,
    width: 80,
  },
  button: {
    borderColor: colors.purple,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.purple,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    color: colors.white,
  },
  textbox: {
    paddingLeft: 5,
    paddingRight: 5,
    width: 200,
    // maxWidth: '50%'
  },
  heart: {
    position: 'absolute',
    height: 10,
    width: 10,
    right: 5,
    bottom: 5,
  },
  imagecontainer: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: 'gray'
  }
});

export default ProductCard;
