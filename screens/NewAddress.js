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
  ScrollView
 } from 'react-native';
import axios from 'axios';
import { useStoreState, useStoreActions } from 'easy-peasy';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { env } from '../keys';
import { colors } from '../envStyles';
import BackBarTitle from '../components/BackBarTitle';

const NewAddress = ({navigation}) => {

  // State
  const newAddress = useStoreState(state => state.newAddress);
  const newAddressRadioIndex = useStoreState(state => state.properties.newAddressRadioIndex);

  // Actions
  const writeNewAddressRadioIndex = useStoreActions(actions => actions.writeNewAddressRadioIndex);
  const writeNewAddress = useStoreActions(actions => actions.writeNewAddress);
  const writeActiveAddress = useStoreActions(actions => actions.writeActiveAddress);
  const writeNewAddressState = useStoreActions(actions => actions.writeNewAddressState);

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
    };

    axios.post(env.apiServer + '/addresses/', payload)
      .then(response => {
        writeActiveAddress(response.data);
        navigation.navigate('AddressList');
        resetFields();
      })
      .catch(error => {
        Alert.alert('Error', 'No pudimos guardar tu dirección');
      });
  }

  return (
    <View style={{backgroundColor: colors.gray, flex: 1}}>
      <BackBarTitle navigation={navigation} title={'Edita tu dirección'} route={'AddressList'}/>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Dirección</Text>
          <TextInput
            style={styles.input}
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
            })}
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
      </View>
    </View>
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
    padding: 15,
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
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
})

export default NewAddress;
