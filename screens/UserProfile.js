import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Modal from "react-native-modal";
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-community/async-storage';

import { colors } from '../envStyles';
import { env } from '../keys';
import BackBarTitle from '../components/BackBarTitle';

const UserProfile = ({navigation}) => {

  const user = useStoreState(state => state.user);
  const properties = useStoreState(state => state.properties);

  // Actions
  const getUserInfo = useStoreActions(actions => actions.getUserInfo);
  const writeUser = useStoreActions(actions => actions.writeUser);
  const toggleProperties = useStoreActions(actions => actions.toggleProperties);
  const deleteSession = useStoreActions(actions => actions.deleteSession);

  useEffect(() => {
    getUserInfo();
  }, []);

  onSubmitProfile = e => {
    writeUser({name: 'waitingForApi', value: true});
    const payload = new FormData();
    payload.append('name', user.name);
    if (user.avatar_fileName !== null) {
      payload.append('image', user.avatar_fileName);
    }
    payload.append('email', user.email);
    payload.append('birth_date', user.birth_date);
    payload.append('gender', user.gender);

    axios({
        method: 'patch',
        url: `${env.apiServer}/profile`,
        data: payload,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
      .then(response => {
        navigation.navigate('Home');
        writeUser({name: 'waitingForApi', value: false});
      })
      .catch(error => {
        Alert.alert('Error','No pudimos actualizar tu perfil');
        writeUser({name: 'waitingForApi', value: false});
      });
  };

  takePic = () => {
    ImagePicker.showImagePicker({}, (response)=> {
      writeUser({name: 'avatar_uri', value: response.uri});
      writeUser({name: 'avatar_fileName', value:
        {
          uri:  response.uri,
          name: response.fileName,
          type: response.type
        }
      }
    )})
  };

  deleteToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      // Error retrieving data
      Alert.alert('Error','No pudimos cerrar sesión');
    }
  };

  logOut = () => {
    axios.post(env.apiServer + '/auth/logout')
    .then(response => {
      toggleProperties('displayCloseSession');
      deleteToken();
      deleteSession();
      axios.defaults.headers.common.Authorization = null;
      navigation.navigate('Splash');
    })
    .catch(error => {
    });
  };

  emailValidation = () => {
    if (user.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return true
    }
    else {
      return false
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
      <ScrollView contentContainerStyle={{flex: 1, backgroundColor: colors.gray}} keyboardShouldPersistTaps={'never'}>
        <BackBarTitle navigation={navigation} title={''} route={'Home'}/>
        <Modal
          isVisible={properties.displayCloseSession}
          backdropOpacity={0.2}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innercontainer}>
              <View style={styles.modalContent}>
                <Image
                  source={require('../assets/icons/Error.png')}
                  style={{width: 75, height: 75, marginRight: 15}}
                />
                <Text style={styles.modalText}>¿Deseas cerrar sesión?</Text>
              </View>
              <TouchableOpacity
                style={styles.modalbutton}
                onPress={() => logOut() }
              >
                <Text style={styles.modalButtonText}>Si, estoy seguro</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalbutton}
                onPress={() => toggleProperties('displayCloseSession')}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <View>
            <View>
              <View style={styles.avatarcontainer}>
                <Image
                  style={styles.avatar}
                  source={{uri: user.avatar_uri === null ? user.photo : user.avatar_uri}}
                />
              </View>
              <TouchableOpacity
                onPress={takePic.bind(this)}
                style={styles.button2}
              >
                <Image
                  source={require('../assets/icons/editar.png')}
                  style={{height: 23, width: 23}}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.boldText}>Perfil</Text>
          </View>
          <View>
            <Text style={styles.text}>Nombre</Text>
            <TextInput
              style={styles.input}
              onChangeText={(name) => writeUser({name: 'name', value: name})}
              value={user.name}
            />
          </View>
          <View>
            <Text style={styles.text}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              autoCompleteType={'email'}
              keyboardType={'email-address'}
              textContentType={'emailAddress'}
              onChangeText={(email) => writeUser({name: 'email', value: email})}
              value={user.email}
            />
          </View>
          <View>
            <Text style={styles.text}>Fecha de nacimiento</Text>
            <DatePicker
              style={{width: Dimensions.get("window").width - 40}}
              date={user.birth_date}
              placeholder={' '}
              mode="date"
              format="YYYY-MM-DD"
              minDate="1900-01-01"
              maxDate={user.today}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  fontSize: 16,
                  textAlign: 'left',
                  borderRadius: 7,
                  fontFamily: 'Montserrat-Regular',
                  backgroundColor: 'white',
                  padding: 3,
                }
              }}
              onDateChange={(birth_date) => writeUser({name: 'birth_date', value: birth_date})}
            />
          </View>
          <View style={{ width: Dimensions.get("window").width - 40 }}>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                onPress={() => writeUser({name: 'gender', value: 'Hombre'})}
              >
                <View style={styles.icon}>
                  <View style={user.gender == 'Hombre' ? styles.active : null} />
                </View>
              </TouchableOpacity>
              <Text style={styles.text3}>Hombre</Text>
            </View>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                onPress={() => writeUser({name: 'gender', value: 'Mujer'})}
              >
                <View style={styles.icon}>
                  <View style={user.gender == 'Mujer' ? styles.active : null} />
                </View>
              </TouchableOpacity>
              <Text style={styles.text3}>Mujer</Text>
            </View>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                onPress={() => writeUser({name: 'gender', value: 'Otro'})}
              >
                <View style={styles.icon}>
                  <View style={user.gender == 'Otro' ? styles.active : null} />
                </View>
              </TouchableOpacity>
              <Text style={styles.text3}>Otro</Text>
            </View>
          </View>
          <View>
            <Text style={styles.text}>Celular</Text>
            <Text style={styles.text2}>{user.phone}</Text>
          </View>
          <View>
            {user.waitingForApi &&
              <TouchableOpacity
                style={styles.buttonDis}
                disabled={true}
              >
                <Text style={styles.buttonText2}>Guardar</Text>
              </TouchableOpacity>
            }
            {!user.waitingForApi &&
              <TouchableOpacity
                onPress={() => {
                  if (user.email !== null && !emailValidation()) {
                    Alert.alert('Error', 'Introduce un email válido');
                  }
                  else if (user.name !== null &&
                      user.gender !== null &&
                      user.email !== null &&
                      user.birth_date !== null) {
                    onSubmitProfile()
                  }
                  else {
                    Alert.alert('Error', 'Completa tus datos');
                  }}
                }
                style={styles.button}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            }
            <TouchableOpacity
              onPress={() => toggleProperties('displayCloseSession')}
            >
              <Text style={styles.link}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    height: 18,
    width: 18,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    height: 10,
    width: 10,
    backgroundColor: colors.purple,
    borderRadius: 2,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 0,
    width: Dimensions.get("window").width - 40,
    // height: 30,
    fontSize: 16,
    textAlign: 'left',
    borderRadius: 7,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: 'white',
    padding: 3,
  },
  text: {
    width: Dimensions.get("window").width - 40,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 5,
  },
  text2: {
    width: Dimensions.get("window").width - 40,
    fontFamily: 'Montserrat-Regular',
    color: 'gray',
    fontSize: 16,
    textAlign: 'left',
    marginTop: 5,
  },
  text3: {
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    fontSize: 16,
    marginLeft: 10
  },
  boldText: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 211,
    height: 51,
    marginTop: 20,
    marginBottom: 20,
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
  buttonDis: {
    borderColor: 'gray',
    backgroundColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 211,
    height: 51,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  button2: {
    borderColor: colors.purple,
    borderRadius: 15,
    width: 25,
    height: 25,
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
  buttonText2: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
  },
  link: {
    fontFamily: 'Montserrat-Regular',
    color: colors.purple,
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  avatarcontainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1.5,
    borderColor: colors.purple
  },
  modalContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  innercontainer: {
    backgroundColor: colors.white,
    // height: 100,
    // width: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    maxWidth: '60%',
  },
  modalbutton: {
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 45,
    margin: 10,
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
  modalButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
  stretch: {
    height: 50,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
  },
})

export default UserProfile;
