import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';

import { colors } from '../envStyles';

const Welcome = ({navigation}) => {


  return(
    <View style={styles.container}>
      <Text>
        Welcome
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Muévete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purple,
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
  }
});

export default Welcome;
