import { action, thunk } from 'easy-peasy';
import Geocoder from 'react-native-geocoding';

import { env, geocoding } from './keys';

Geocoder.init(geocoding.apiKey, {language : "es"});

const storeModel = {

  // State
  auth: {
    token: null,
    areaCode: '+57',
    telephone: null,
    checked: true,
    waitingForApi: false,
    verificationCode: null
  },

  user: {
    name: '',
  },

  activeAddress: {
    id: null,
    latitude: null,
    longitude: null,
    text: null,
    postalCode: null,
    city: null,
    state: null,
    country: null,
  },

  currentVehicle: null,

  properties: {
    displayModal: false,
  },

  // Actions
  writeAuthState: action((state, payload) => {
    state.auth[payload.name] = payload.value
  }),

  writeCurrentVehicle: action((state, payload) => {
    state.currentVehicle = payload
  }),

  writeActiveAddress: action((state, payload) => {
    state.activeAddress = payload
  }),

  toggleProperties: action((state, payload) => {
    state.properties[payload] = !state.properties[payload]
  }),


};

export default storeModel;
