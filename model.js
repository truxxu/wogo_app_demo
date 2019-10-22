import { action, thunk } from 'easy-peasy';

const storeModel = {

  auth: {
    token: null,
    areaCode: '+57',
    telephone: null,
    checked: true,
    waitingForApi: false,
    verificationCode: null
  },

  currentVehicle: null,

  user: {
    name: null,
  },

  properties: {
    displayModal: false,
  },

  writeAuthState: action((state, payload) => {
    state.auth[payload.name] = payload.value
  }),

  writeCurrentVehicle: action((state, payload) => {
    state.currentVehicle = payload
  }),

  toggleProperties: action((state, payload) => {
    state.properties[payload] = !state.properties[payload]
  }),


};

export default storeModel;
