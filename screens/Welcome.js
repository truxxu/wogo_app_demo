import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper'
import SafeAreaView from 'react-native-safe-area-view';

import { colors } from '../envStyles';

const Welcome = ({navigation}) => {
  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.purple }}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />}
        activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />}>
        <View style={styles.slide}>
          <Image
            source={require('../assets/images/01_Bienvenida.png')}
            style={styles.stretch}
          />
          <Text style={styles.text}>aquí encontrarás servicios y productos para lo que te mueve</Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../assets/images/02_Quetemueve.png')}
            style={styles.stretch}
          />
          <Text style={styles.text}>carro, moto, bici, scooter, caminar...</Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../assets/images/03_Elige.png')}
            style={styles.stretch}
          />
          <Text style={styles.text}>tu producto o servicio y paga por la aplicación</Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../assets/images/04_Ahora.png')}
            style={styles.stretch}
          />
          <Text style={styles.text}>que lo sabes</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Muévete</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purple,
    padding: 20
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    borderColor: colors.yellow,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.yellow,
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
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: 'black'
  },
  stretch: {
    height: 400,
    resizeMode: 'contain',
  },
});

export default Welcome;
