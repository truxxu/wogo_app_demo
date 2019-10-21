import { action, thunk } from 'easy-peasy';

const storeModel = {

  auth: {
    token: null,
    areaCode: '+57',
    telephone: null,
    checked: true,
  },

  writeAuthState: action((state, payload) => {
    state.auth[payload.name] = payload.value
  }),
};

export default storeModel;
