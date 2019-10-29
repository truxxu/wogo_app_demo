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
  Switch,
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import SafeAreaView from 'react-native-safe-area-view';

import { colors } from '../envStyles';
import { env } from '../keys';
import Toast from '../components/Toast';
import ToastB from '../components/ToastB';

const Login = ({navigation}) => {

  //States
  const auth = useStoreState(state => state.auth);
  const properties = useStoreState(state => state.properties);
  //Actions
  const writeAuthState = useStoreActions(actions => actions.writeAuthState);
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);
  const toggleProperties = useStoreActions(actions => actions.toggleProperties);

  storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', `Token ${token}`);
    } catch (e) {
      Alert('Error', 'No fue posible iniciar sesión. Intenta de nuevo');
      navigation.replace('Register')
    }
  }

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
        // sets axios auth header
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        writeAuthState({name: 'waitingForApi', value: false})
        // store token in local storage
        storeToken(token);
        writeAuthState({name: 'token', value: `Token ${token}`})
        writePropertyState({name: 'displayToastB', value: true})
      })
      .catch(error => {
        writeAuthState({name: 'waitingForApi', value: false});
        writeAuthState({name: 'verificationCode', value: ''});
        writePropertyState({name: 'toastData', value: 'error'});
        writePropertyState({name: 'displayToast', value: true});
      });
  };

  resendCode = () => {
    const payload = {
      phone_number: auth.areaCode + auth.telephone
    };

    axios.post(env.apiServer + '/auth/register_customer', payload)
      .then(response => {
        writePropertyState({name: 'toastData', value: 'sent'});
        writePropertyState({name: 'displayToast', value: true});
      })
      .catch(error => {
      });
  };

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <Toast data={properties.toastData} />
        <ToastB navigation={navigation} />
        <ScrollView  keyboardShouldPersistTaps={'handled'}>
          <View style={styles.container}>
            <Text
              style={styles.text}>
              Te enviamos un código de seis dígitos al número
            </Text>
            <Text style={styles.boldText}>{auth.areaCode+" "+ auth.telephone}</Text>
            <TouchableOpacity
              onPress={() => navigation.replace('Register')}
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
              <Text style={styles.placeholder}>_ _ _ _ _ _</Text>
            </View>
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
              {auth.waitingForApi &&
                <TouchableOpacity
                  style={styles.button}
                  disabled={true}
                >
                  <Image
                      source={require('../assets/gifs/spinner.gif')}
                      style={styles.stretch}
                  />
                </TouchableOpacity>
              }
             <TouchableOpacity
                style={styles.button2}
                onPress={() => resendCode()}
              >
                <Text style={styles.buttonText2}>Reenviar Código</Text>
              </TouchableOpacity>
            <View style={styles.switchcontainer}>
              <Switch
                value = {auth.checked}
                trackColor={{ true: colors.purple, false: Platform.OS==='android'?'#d3d3d3':'#fbfbfb'  }}
                thumbColor={[Platform.OS==='ios'?'#FFFFFF': (auth.checked ? colors.purple :'#ffffff')]}
                ios_backgroundColor="#fbfbfb"
                onValueChange={() => toggleProperties('auth.checked')}
              />
              <View style={styles.textBlock}>
                <Text style={styles.switchtext}>
                  Mediante el registro acepto los
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Terms')}
                >
                  <Text style={styles.link}>
                    Términos y Condiciones de uso.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    flex: 1,
    alignItems: 'center',
    padding: 40,
  },
  textBlock: {
    width: 250,
    paddingLeft: 10,
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
    width: 211,
    height: 51,
    margin: 10,
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
    paddingLeft: 0,
    width: 211,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 8,
    zIndex: 3
  },
  placeholder: {
    paddingTop: 2,
    width: 211,
    fontSize: 22,
    textAlign: 'center',
    fontFamily:'Montserrat-Bold',
    // letterSpacing: 8,
    position: 'absolute',
    top: 7,
    right: 2,
    zIndex: 2
  },
  link: {
    fontFamily: 'Montserrat-Regular',
    color: colors.purple,
    fontSize: 16,
    textAlign: 'justify'
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
    textAlign: 'justify'
  },
  stretch: {
    height: 50,
    width: 60,
    resizeMode: 'contain',
  },
});

export default Login;
