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


  properties: {
    currentVehicle: null,
    isLoading: false,
    displayModal: false,
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
    axios.get(env.apiServer + '/profile')
      .then(response => {
        actions.writeUser({name: 'name', value: response.data.name});
        actions.writeUser({name: 'photo', value: response.data.photo});
        actions.writeUser({name: 'email', value: response.data.email});
        actions.writeUser({name: 'birth_date', value: response.data.birth_date});
      })
      .catch(error => {
        // Alert.alert('Se ha presentado un error');
    });
  }),

};

export default storeModel;
