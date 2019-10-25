import { Alert } from 'react-native';
import { action, thunk } from 'easy-peasy';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import moment from 'moment';
import * as _ from 'lodash';

import { env, geocoding } from './keys';

Geocoder.init(geocoding.apiKey, {language : "es"});

const todayDate = new Date();

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
    waitingForApi: false,
    name: '',
    photo: null,
    phone: null,
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

  services: [],

  orders: [],

  products: {
    our_selection: null,
    top: null,
  },

  cards: [],

  newCard: {
    number: '',
    name: '',
    year: '',
    month: '',
    expiration_date: '',
    payment_method: '',
    cvv: '',
    error: '',
    isValid: false,
    isPristine: true,
  },

  activePaymentMethod: {
    token_id: '',
    masked_number: '',
    payment_method: ''
  },

  cardToDelete: {
    token_id: '',
    masked_number: '',
    payment_method: ''
  },

  properties: {
    currentVehicle: null,
    isLoading: false,
    displayModal: false,
    activeAddress: null,
    activeServiceTab: null,
    isLoadingOurSelection: false,
    isLoadingTop: false,
    displayCardDeleteModal: false,
  },

  // Actions
  writeAuthState: action((state, payload) => {
    state.auth[payload.name] = payload.value
  }),

  writeServices: action((state, payload) => {
    state.services = payload
  }),

  writeOrder: action((state, payload) => {
    state.orders = payload
  }),

  writeUser: action((state, payload) => {
    state.user[payload.name] = payload.value
  }),

  writePropertyState: action((state, payload) => {
    state.properties[payload.name] = payload.value
  }),

  writeActiveAddress: action((state, payload) => {
    state.activeAddress = payload
  }),

  toggleProperties: action((state, payload) => {
    state.properties[payload] = !state.properties[payload]
  }),

  writeProducts: action((state, payload) => {
    state.products[payload.name] = payload.value
  }),

  writeActivePaymentMethod: action((state, payload) => {
    state.activePaymentMethod = payload
  }),

  writeCardToDelete: action((state, payload) => {
    state.cardToDelete = payload
  }),

  getServices: thunk(async (actions, payload) => {
    actions.writePropertyState({name: 'isLoading', value: true});
    axios.get(`${env.apiServer}/services/?vehicle_type=${payload}`)
      .then(response => {
        actions.writeServices(response.data);
        actions.writePropertyState({name: 'isLoading', value: false});
      })
      .catch(error => {
         Alert.alert('Se ha presentado un error');
      });
  }),

  getOrders: thunk(async (actions, payload, { getStoreState }) => {
    actions.writePropertyState({name: 'isLoading', value: true});
    axios.get(`${env.apiServer}/orders/`)
      .then(response => {
        actions.writeOrder(response.data);
        actions.writePropertyState({name: 'isLoading', value: false});
      })
      .catch(error => {
      });
  }),

  getUserInfo: thunk(async actions => {
    actions.writeUser({name: 'waitingForApi', value: true});
    axios.get(env.apiServer + '/profile')
      .then(response => {
        actions.writeUser({name: 'phone', value: response.data.username});
        actions.writeUser({name: 'name', value: response.data.name});
        actions.writeUser({name: 'photo', value: response.data.photo});
        actions.writeUser({name: 'email', value: response.data.email});
        actions.writeUser({name: 'birth_date', value: response.data.birth_date});
        actions.writeUser({name: 'waitingForApi', value: false});
      })
      .catch(error => {
         Alert.alert('Se ha presentado un error');
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
         Alert.alert('Se ha presentado un error');
      });
  }),

  // Cards
  getCards: thunk(async actions => {
    actions.writePropertyState({name: 'isLoading', value: true});
    axios.get(env.apiServer + '/credit-cards/')
      .then(response => {
        actions.writeCards(response.data);
        actions.writePropertyState({name: 'isLoading', value: false});
      })
      .catch(error => {
        actions.writePropertyState({name: 'isLoading', value: false});
    });
  }),

  writeCards: action((state, payload) => {
    state.cards = payload
  }),

  setCardToDelete: action((state, payload) => {
    state.cardToDelete = payload
  }),

  deleteCard: thunk(async (actions, payload) => {
    axios.delete(`${env.apiServer}/credit-cards/${payload.token_id}`)
      .then(response => {
        actions.removeCardObject(payload);
      })
      .catch(error => {
        Alert.alert('¡Se ha presentado un error!');
      });
  }),

  removeCardObject: action((state, payload) => {
    const newArray = _.remove(state.cards, function(card) {
      return payload.token_id === card.token_id;
    })
  }),

  newCardPristine: action((state, payload) => {
    state.newCard.isPristine = payload
  }),

  newCardNumber: action((state, payload) => {
    state.newCard.number = payload
    state.newCard.isPristine = false
    if(state.newCard.number.match(/^\d+$/)) {
      if(state.newCard.number.length <= 16 && state.newCard.number.length >= 13) {
        state.newCard.isValid = true
        state.newCard.error = ''
      } else {
        state.newCard.isValid = false
        state.newCard.error = 'Número debe tener entre 13 y 16 dígitos'
      }
    } else {
      state.newCard.isValid = false
      state.newCard.error = 'Solo caracteres numéricos en el número'
    }
  }),

  newCardName: action((state, payload) => {
    state.newCard.name = payload
    state.newCard.isPristine = false
    if(state.newCard.name.match(/^[a-zA-Z\s]+$/)) {
      state.newCard.isValid = true
      state.newCard.error = ''
    } else {
      state.newCard.isValid = false
      state.newCard.error = 'Solo caracteres alfanuméricos en el nombre'
    }
  }),

  newCardCvv: action((state, payload) => {
    state.newCard.cvv = payload
    state.newCard.isPristine = false
    if(state.newCard.cvv.match(/^\d+$/)) {
      state.newCard.isValid = true
      state.newCard.error = ''
    } else {
      state.newCard.isValid = false
      state.newCard.error = 'Solo caracteres numéricos en el cvv'
    }
    if(state.newCard.number.match(/^3[47][0-9]{13}$/)) {
      if(state.newCard.cvv.length !== 4) {
        state.newCard.isValid = false
        state.newCard.error = 'cvv deben ser 4 números'
      } else {
        state.newCard.isValid = true
        state.newCard.error = ''
      }
    } else {
      if(state.newCard.cvv.length !== 3) {
        state.newCard.isValid = false
        state.newCard.error = 'cvv deben ser 3 números'
      } else {
        state.newCard.isValid = true
        state.newCard.error = ''
      }
    }
  }),

  newCardYear: action((state, payload) => {
    state.newCard.year = payload
    state.newCard.isPristine = false
    if(state.newCard.year.length == 4
      && state.newCard.month.length >= 1
      && moment(state.newCard.year + '-' + state.newCard.month, "YYYY-MM").isSameOrAfter(moment(), 'month')) {
      state.newCard.isValid = true
      state.newCard.error = ''
    } else {
      state.newCard.isValid = false
      state.newCard.error = 'Fecha de expiración no puede ser antes de hoy'
    }
  }),

  newCardMonth: action((state, payload) => {
    state.newCard.month = payload
    state.newCard.isPristine = false
    if(state.newCard.year.length == 4
      && state.newCard.month.length >= 1
      && moment(state.newCard.year + '-' + state.newCard.month, "YYYY-MM").isSameOrAfter(moment(), 'month')) {
      state.newCard.isValid = true
      state.newCard.error = ''
    } else {
      state.newCard.isValid = false
      state.newCard.error = 'Fecha de expiración no puede ser antes de hoy'
    }
  }),
};

export default storeModel;
