import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { colors } from '../envStyles';
import { useStoreState, useStoreActions } from 'easy-peasy';

const MenuBar = ({navigation}) => {

  addressStr = (string) => {
    if (address.text === null) {
      return('')
    }
    else{
      return(string.split(",")[0])
    }
  };

  return(
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
      >
        <Image
          source={require('../assets/icons/usuario.png')}
          style={{height: 30, width: 30}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{width: 200}}
        onPress={() => navigation.navigate('Direcciones')}
      >
        <Text style={styles.text}>Address goes here</Text>
      </TouchableOpacity>
      <View style={{height: 30, width: 30}} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    color: colors.black
  }
})

export default MenuBar;
