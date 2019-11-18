import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { colors } from '../envStyles';

const ProductCard = ({navigation, product}) => {

  const plusSingleQuantity = useStoreActions(actions => actions.plusSingleQuantity);

  const price = product.price.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  shortener = (string) => {
    if (string.length > 24) {
      return string.substring(0, 25) + '...'
    }
    else {return string}
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Product', {product: product})}
        style={styles.imagecontainer}
        // onPress={}
      >
        <Image
          style={styles.image}
          source={{uri: product.image}}
        />
      </TouchableOpacity>
      <View style={styles.container2}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Product', {product: product})}
        style={styles.textbox}
      >
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.text}>{product.description.substring(0, 50) + '...'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => plusSingleQuantity({'product': product})}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignSelf: 'stretch',
    width: Dimensions.get('window').width - 40,
    padding: 5,
    borderRadius: 3,
    marginTop: 5,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  price: {
    fontSize: 15,
    color: colors.purple,
    fontFamily: 'Montserrat-SemiBold',
  },
  name: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  text: {
    textAlign: 'left',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },
  image: {
    borderRadius: 3,
    height: 90,
    width: 90,
  },
  button: {
    alignSelf: 'center',
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
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'space-evenly',
    maxWidth: '50%',
  },
  heart: {
    position: 'absolute',
    height: 10,
    width: 10,
    right: 5,
    bottom: 5,
  },
  imagecontainer: {
    alignSelf: 'center',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: 'gray'
  }
});

export default ProductCard;
