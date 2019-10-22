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

  onSubmit = e => {
    writeAuthState({name: 'waitingForApi', value: true})

    const payload = {
      phone_number: auth.areaCode + auth.telephone,
      verification_code: auth.verificationCode
    };

    axios.post(env.apiServer + '/auth/login_customer', payload)
      .then(response => {
        writeAuthState({name: 'verificationCode', value: ''});
        const { token, user } = response.data;
        writeAuthState({name: 'token', value: `Token ${token}`})
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        navigation.navigate('VehicleSelection');
        writeAuthState({name: 'waitingForApi', value: false})
      })
      .catch(error => {
        writeAuthState({name: 'verificationCode', value: ''});
      });
  }

  return(
    <ScrollView keyboardShouldPersistTaps={'always'}>
      {/* contentContainerStyle={styles.container} */}
      <ScrollView  keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
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
                  this.onSubmit()
                } else {
                  Alert.alert('Error','Acepta las condiciones e introduce el código de verificación');            }}
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          }
           <TouchableOpacity              
              style={styles.button2}
            >
              <Text style={styles.buttonText2}>Reenviar Código</Text>
            </TouchableOpacity>
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
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    marginTop: 120,
    flex: 1,
    alignItems: 'center',
    padding: 40,
  },
  boldText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
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
    width: 211,
    height: 51,
    margin: 10,
    marginTop: 70,
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
    width: 211,
    height: 51,
    margin: 10,
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
    fontSize: 17,
    textAlign: 'center',
    width: 215,
  },
  code: {
    width: 211,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 10,
    zIndex: 3
  },
  placeholder: {
    width: 211,
    fontSize: 22,
    textAlign: 'center',
    fontFamily:'Montserrat-Bold',
    letterSpacing: 8,
    position: 'absolute',
    top: 7,
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
