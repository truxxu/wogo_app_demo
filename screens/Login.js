import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  Switch
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import axios from 'axios';

import { colors } from '../envStyles';
import { env } from '../keys';


const Login = ({navigation}) => {

  const auth = useStoreState(state => state.auth);
  const writeAuthState = useStoreActions(actions => actions.writeAuthState);

  return(
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'never'}>
      <Text
        style={styles.text}>
        Te enviamos un código de seis dígitos al número
      </Text>
      <Text style={styles.boldText}>{auth.areaCode + auth.telephone}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.link}>¿Número incorrecto?</Text>
      </TouchableOpacity>
      <View style={{zIndex: 1}}>
        <TextInput
          style={styles.code}
          onChangeText={(verificationCode) => writeAuthState({ name: 'verificationCode', value: verificationCode})}
          value={auth.verificationCode}
          keyboardType='numeric'
          maxLength={6}
        />
        <Text style={styles.placeholder}>______</Text>
      </View>
      {auth.waitingForApi &&
        <Image
          source={require('../assets/gifs/spinner.gif')}
          style={styles.stretch}
        />
      }
      {!auth.waitingForApi &&
        <TouchableOpacity
          onPress={() => {
            if (auth.checked === true && auth.verificationCode !== null && auth.verificationCode !== '') {
              // this.onSubmit()
              console.log(auth)
            } else {
              Alert.alert('Error','Acepta las condiciones e introduce el código de verificación');            }}
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      }
      <View style={styles.switchcontainer}>
        <Switch
          value = {auth.checked}
          trackColor={{ true: colors.purple, false: Platform.OS=='android'?'#d3d3d3':'#fbfbfb'  }}
          thumbColor={[Platform.OS=='ios'?'#FFFFFF': (auth.checked ? colors.purple :'#ffffff')]}
          ios_backgroundColor="#fbfbfb"
          onValueChange={(checked) => writeAuthState({ name: 'checked', value: checked})}
        />
        <View style={{width: 250, paddingLeft: 5}}>
          <Text style={styles.switchtext}>
            Mediante el registro acepto los términos y condiciones de uso.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  boldText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    width: 200,
    color: colors.black,
  },
  button: {
    borderColor: colors.yellow,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    // width: wp('60%'),
    // height: hp('7%'),
    // margin: hp('1.4%'),
    // marginTop: hp('11%'),
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
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: 'black'
  },
  button2: {
    borderColor: 'gray',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    // width: wp('60%'),
    // height: hp('7%'),
    // margin: hp('1.4%'),
    backgroundColor: 'gray',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  button3: {
    borderColor: colors.purple,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    // width: wp('60%'),
    // height: hp('7%'),
    // margin: hp('1.4%'),
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
  buttonText2: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
  },
  buttonText3: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
  },
  code: {
    // width: wp('61%'),
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 10,
    zIndex: 3
  },
  placeholder: {
    // width: wp('61%'),
    fontSize: 22,
    textAlign: 'center',
    fontFamily:'Montserrat-Bold',
    letterSpacing: 10,
    position: 'absolute',
    // top: hp('1.4%'),
    right: 2,
    zIndex: 2
  },
  link: {
    fontFamily: 'Montserrat-Regular',
    color: colors.purple,
    fontSize: 16,
  },
  switchcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  switchtext: {
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    fontSize: 15,
  },
});

export default Login;
