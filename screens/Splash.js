import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { colors } from '../envStyles';


const Splash = (props) => {

  const auth_token = useStoreState(state => state.auth_token);

  if (auth_token !== null) {
    console.log('Validar')
  }
  else {
    console.log('cargar pantallas de bienvenida')
  };

  return(
    <View style={styles.container}>
      <Image
        source={require('../assets/gifs/welcome.gif')}
        style={{height: 400, width: 400}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellow,
  },
});

export default Splash;
