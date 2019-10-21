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

  writeAuthState: action((state, payload) => {
    state.auth[payload.name] = payload.value
  }),

  writeCurrentVehicle: action((state, payload) => {
    state.currentVehicle = payload
  }),
};

export default storeModel;
