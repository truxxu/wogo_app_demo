import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  Keyboard,
  ScrollView,
  Image
 } from 'react-native';
import axios from 'axios';
import { useStoreState, useStoreActions } from 'easy-peasy';
import SafeAreaView from 'react-native-safe-area-view';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { env } from '../keys';
import { colors } from '../envStyles';
import BackBarTitle from '../components/BackBarTitle';

const NewAddress = ({navigation}) => {

  // State
  const newAddress = useStoreState(state => state.newAddress);
  const newAddressRadioIndex = useStoreState(state => state.properties.newAddressRadioIndex);
  const isLoading = useStoreState(state => state.properties.isLoading);

  // Actions
  const writeNewAddressRadioIndex = useStoreActions(actions => actions.writeNewAddressRadioIndex);
  const writeNewAddress = useStoreActions(actions => actions.writeNewAddress);
  const writeActiveAddressState = useStoreActions(actions => actions.writeActiveAddressState);
  const writeNewAddressState = useStoreActions(actions => actions.writeNewAddressState);
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);

  const radio_props = [
    {label: 'Casa', value: 'Casa', index: 0 },
    {label: 'Trabajo', value: 'Trabajo', index: 1 },
    {label: 'Otro', value: 'Otro', index: 2 }
  ];

  resetFields = () => {
    writeNewAddressRadioIndex('');
    writeNewAddress({});
  };

  onSubmit = e => {

    const payload = {
      text: newAddress.text,
      longitude: newAddress.longitude,
      latitude: newAddress.latitude,
      favourite: newAddress.favourite,
      name: newAddress.name,
      reference: newAddress.reference,
      favourite: false,
      postal_code: newAddress.postalCode,
      city: newAddress.city,
      state: newAddress.state,
      country: newAddress.country
    };

    writePropertyState({name: 'isLoading', value: true});
    axios.post(env.apiServer + '/addresses/', payload)
      .then(response => {
        writeActiveAddressState({ name: 'id', value: response.data.id })
        writeActiveAddressState({ name: 'latitude', value: response.data.latitude })
        writeActiveAddressState({ name: 'longitude', value: response.data.longitude })
        writeActiveAddressState({ name: 'text', value: response.data.text })
        writeActiveAddressState({ name: 'postalCode', value: response.data.postal_code })
        writeActiveAddressState({ name: 'city', value: response.data.city })
        writeActiveAddressState({ name: 'state', value: response.data.state })
        writeActiveAddressState({ name: 'country', value: response.data.country })
        navigation.navigate('AddressList');
        resetFields();
        writePropertyState({name: 'isLoading', value: false});
      })
      .catch(error => {
        Alert.alert('Error', 'No pudimos guardar tu dirección');
        writePropertyState({name: 'isLoading', value: false});
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
      <View style={{backgroundColor: colors.gray, flex: 1}}>
        <BackBarTitle navigation={navigation} title={'Edita tu dirección'} route={'AddressList'}/>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Dirección</Text>
            <TextInput
              style={styles.inputNotEditable}
              onChangeText={(text) => writeNewAddressState({ name: 'text', value: text })}
              value={newAddress.text}
              editable={false}
            />
            <Text style={styles.text}>Referencia</Text>
            <TextInput
              style={styles.input}
              onChangeText={(reference) => writeNewAddressState({ name: 'reference', value: reference })}
              value={newAddress.reference}
              clearButtonMode='always'
            />
            <Text style={styles.text}>Nombre</Text>
            <RadioForm animation={true}>
              {radio_props.map((obj, i) => {
                var onPress = (value, index) => {
                  writeNewAddressState({ name: 'name', value: value });
                  writeNewAddressRadioIndex(index);
                  Keyboard.dismiss();
                }
                return (
                  <RadioButton labelHorizontal={true} key={i} >
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={newAddressRadioIndex === i}
                      onPress={onPress}
                      buttonInnerColor={colors.purple}
                      buttonOuterColor={colors.purple}
                      buttonSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={{marginLeft: 10}}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      onPress={onPress}
                      labelStyle={styles.text}
                      labelWrapStyle={{marginLeft: 10}}
                    />
                  </RadioButton>
                )
              })
              }
            </RadioForm>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (newAddress.name !== '' && newAddress.text !== '' &&
                  newAddress.reference !== '' && newAddress.latitude !== ''
                  && newAddress.longitude !== '') {
                onSubmit();
              } else {
                Alert.alert('Completa tus datos');
              }}
            }
            style={styles.button}
          >
              <Text style={styles.buttonText}>Guardar</Text>
            
          </TouchableOpacity>
        }            
        {isLoading &&
          <TouchableOpacity
            disabled={true}
            style={styles.button2}
          >
            <Text style={styles.buttonText2}>Guardar</Text>
          </TouchableOpacity>
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  inputNotEditable: {
    borderColor: 'gray',
    borderWidth: 0.5,
    width: Dimensions.get("window").width - 40,
    fontSize: 16,
    padding: 5,
    textAlign: 'left',
    borderRadius: 10,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
    backgroundColor: 'white',
    paddingLeft: 5,
    color: 'gray',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 0.5,
    width: Dimensions.get("window").width - 40,
    fontSize: 16,
    padding: 5,
    textAlign: 'left',
    borderRadius: 10,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
    backgroundColor: 'white',
    paddingLeft: 5,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
  },
  button: {
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 10,
    width: 250,
    marginTop: 20,
    backgroundColor: colors.yellow,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
    padding: 12,
  },
  button2: {
    borderColor: 'gray',
    backgroundColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: 250,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems: 'center',
  },
  buttonText2: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
    padding: 12,
  },
  stretch: {
    height: 50,
    width: 60,
    resizeMode: 'contain',
  },
})

export default NewAddress;
