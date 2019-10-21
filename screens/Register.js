import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ModalSelector from 'react-native-modal-selector';

import { colors } from '../envStyles';
import CountryFlag from '../components/CountryFlag';


const Register = ({navigation}) => {

  const auth = useStoreState(state => state.auth);
  const writeAuthState = useStoreActions(actions => actions.writeAuthState);

  const data = [
      { key: 1, label: '+54', component:<Text style={styles.item}>(+54) Argentina</Text> },
      { key: 2, label: '+55', component:<Text style={styles.item}>(+55) Brasil</Text> },
      { key: 3, label: '+56', component:<Text style={styles.item}>(+56) Chile</Text> },
      { key: 4, label: '+57', component:<Text style={styles.item}>(+57) Colombia</Text> },
      { key: 5, label: '+58', component:<Text style={styles.item}>(+58) Venezuela</Text> },
  ];

  return(
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'never'}>
      <View style={styles.chilContainer}>
        <Text
          style={styles.boldText}>
          Ingresa tu número de celular
        </Text>
        <View style={styles.phone}>
          <CountryFlag data={auth.areaCode}/>
          <ModalSelector
            data={data}
            initValue={`${auth.areaCode} ▼`}
            cancelText={'Cancelar'}
            onChange={(option)=> writeAuthState({name: 'areaCode', value: option.label})}
            selectStyle={styles.picker}
            initValueTextStyle={styles.item}
            cancelContainerStyle={{display: 'none'}}
            optionContainerStyle={{backgroundColor: colors.white}}
            keyboardShouldPersistTaps={'never'}
          />
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            maxLength={10}
            onChangeText={(text) => writeAuthState({name: 'telephone', value: text})}
            value={auth.telephone}
          />
        </View>
      </View>
      <TouchableOpacity
        // onPress={() => {
        //   if (eText === null || eText === "") {
        //     Alert.alert('Debes introducir el código de área y número de teléfono');
        //   } else {
        //     this.onSubmit()
        //   }}
        // }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Enviar Código</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  chilContainer: {
    marginTop: 200,
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    padding: '5%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  boldText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    width: 200,
    color: colors.black,
  },
  input: {
    padding: 0,
    borderColor: colors.black,
    borderWidth: 0.5,
    width: 160,
    height: 28,
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 10,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
    backgroundColor: 'white'
  },
  picker: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: colors.black,
    backgroundColor: 'white',
    height: 28,
    width: 60,
    justifyContent: 'center',
  },
  item: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  phone: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    marginBottom: 60,
    borderColor: colors.yellow,
    justifyContent: 'center',
    width: 200,
    height: 45,
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

export default Register;
