import { action, thunk } from 'easy-peasy';
import axios from 'axios';
import { env } from './keys';

const todayDate = new Date();

const storeModel = {

  auth: {
    token: null,
    areaCode: '+57',
    telephone: null,
    checked: true,
    waitingForApi: false,
    verificationCode: null
  },

  user: {
    waitingForApi: false,
    name: '',
    photo: null,
    avatar_uri: null,
    avatar_fileName: null,
    email: null,
    birth_date: null,
    today:  todayDate.getFullYear() +
            '-' +
            (todayDate.getMonth() + 1) +
            '-' +
            todayDate.getDate()
  },

  services: [],

  products: {
    our_selection: null,
    top: null,
  },

  properties: {
    currentVehicle: null,
    isLoading: false,
    displayModal: false,
    activeAddress: null,
    activeServiceTab: null,
    isLoadingOurSelection: false,
    isLoadingTop: false,
  },

  writeAuthState: action((state, payload) => {
    state.auth[payload.name] = payload.value
  }),

  writeServices: action((state, payload) => {
    state.services = payload
  }),

  writeUser: action((state, payload) => {
    state.user[payload.name] = payload.value
  }),

  writePropertyState: action((state, payload) => {
    state.properties[payload.name] = payload.value
  }),

  toggleProperties: action((state, payload) => {
    state.properties[payload] = !state.properties[payload]
  }),

  writeProducts: action((state, payload) => {
    state.products[payload.name] = payload.value
  }),

  getServices: thunk(async (actions, payload) => {
    actions.writePropertyState({name: 'isLoading', value: true});
    axios.get(`${env.apiServer}/services/?vehicle_type=${payload}`)
      .then(response => {
        actions.writeServices(response.data);
        actions.writePropertyState({name: 'isLoading', value: false});
      })
      .catch(error => {
        // Alert.alert('Se ha presentado un error');
      });
  }),

  getUserInfo: thunk(async actions => {
    actions.writeUser({name: 'waitingForApi', value: true});
    axios.get(env.apiServer + '/profile')
      .then(response => {
        actions.writeUser({name: 'name', value: response.data.name});
        actions.writeUser({name: 'photo', value: response.data.photo});
        actions.writeUser({name: 'email', value: response.data.email});
        actions.writeUser({name: 'birth_date', value: response.data.birth_date});
        actions.writeUser({name: 'waitingForApi', value: false});
      })
      .catch(error => {
        // Alert.alert('Se ha presentado un error');
    });
  }),

  getProducts: thunk(async (actions, payload) => {
    actions.writePropertyState({name: 'isLoadingTop', value: true});
    actions.writePropertyState({name: 'isLoadingOurSelection', value: true});
    axios.get(`${env.apiServer}/products/?list=${payload}`)
      .then(response => {
        if (payload === 'our_selection') {
          actions.writeProducts({value: response.data, name: 'our_selection'});
          actions.writePropertyState({name: 'isLoadingOurSelection', value: false});
        }
        else if (payload === 'top') {
          actions.writeProducts({value: response.data, name: 'top'});
          actions.writePropertyState({name: 'isLoadingTop', value: false});
        }
      })
      .catch(error => {
        // Alert.alert('Se ha presentado un error');
      });
  }),
};

export default storeModel;
