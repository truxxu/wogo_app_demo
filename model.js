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
    gender: null,
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
    id: 0,
    latitude: null,
    longitude: null,
    text: null,
    postalCode: null,
    city: null,
    state: null,
    country: null,
  },

  addresses: [],

  newAddress: {
    latitude: '',
    longitude: '',
    text: '',
    name: '',
    reference: '',
    favourite: true,
  },

  services: [],

  orders: [],

  businesses: [],

  shoppingCart: [],

  banners: [],

  products: {
    our_selection: null,
    top: null,
  },

  businessesSelection: {
    most_searched: [],
    recommended: [],
    isLoadingMost: false,
    isLoadingRecommended: false,
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
    isLoading: false,
    isLoadingBestSeller: false,
    isLoadingTop: false,
    isLoadingBanners: false,
    currentVehicle: null,
    isLocating: false,
    displayModal: false,
    activeServiceTab: '',
    displayCardDeleteModal: false,
    displayCloseSession: false,
    quantity: 1,
    activeBusiness: [],
    activeType: 'Todo',
    installmentsNumber: "",
    displayClearCart: false,
    loadingOrders: false,
    newAddressRadioIndex: null,
    displayToast: false,
    displayToastB: false,
    toastData: null,
    sendTimer: 45000,
    displayShareModal: false,
    businessOrder: 'distance',
    businessFilter: [],
  },

  // Actions
  deleteSession: action((state, payload) => {
    state.auth.token = null,
    state.auth.areaCode = '+57',
    state.auth.telephone = null,
    state.auth.checked = true,
    state.auth.waitingForApi = false,
    state.auth.verificationCode = null,
    state.user.waitingForApi = false,
    state.user.name = '',
    state.user.gender = null,
    state.user.photo = null,
    state.user.phone = null,
    state.user.avatar_uri = null,
    state.user.avatar_fileName = null,
    state.user.email = null,
    state.user.birth_date = null
  }),

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

  // Addresses
  writeActiveAddressState: action((state, payload) => {
    state.activeAddress[payload.name] = payload.value
  }),

  writeActiveAddress: action((state, payload) => {
    state.activeAddress = payload
  }),

  writeBanners: action((state, payload) => {
    state.banners = payload
  }),

  writeNewAddressState: action((state, payload) => {
    state.newAddress[payload.name] = payload.value
  }),

  writeNewAddress: action((state, payload) => {
    state.newAddress = payload
  }),

  writeNewAddressRadioIndex: action((state, payload) => {
    state.properties.newAddressRadioIndex = payload
  }),

  writeAddresses: action((state, payload) => {
    state.addresses = payload
  }),

  getAddresses: thunk(async actions => {
    actions.writePropertyState({name: 'isLoading', value: true});
    axios.get(env.apiServer + '/addresses/')
      .then(response => {
        actions.writeAddresses(response.data);
        actions.writePropertyState({name: 'isLoading', value: false});
      })
      .catch(error => {
        actions.writePropertyState({name: 'isLoading', value: false});
        Alert.alert('Se ha presentado un error');
      });
  }),

  getBanners: thunk(async actions => {
    actions.writePropertyState({name: 'isLoadingBanners', value: true});
    axios.get(env.apiServer + '/banners/')
      .then(response => {
        actions.writeBanners(response.data);
        actions.writePropertyState({name: 'isLoadingBanners', value: false});
      })
      .catch(error => {
        actions.writePropertyState({name: 'isLoadingBanners', value: false});
        Alert.alert('Se ha presentado un error');
      });
  }),

  toggleProperties: action((state, payload) => {
    state.properties[payload] = !state.properties[payload]
  }),

  writeProducts: action((state, payload) => {
    state.products[payload.name] = payload.value
  }),

  writeBusinessesSelection: action((state, payload) => {
    state.businessesSelection[payload.name] = payload.value
  }),

  writeActivePaymentMethod: action((state, payload) => {
    state.activePaymentMethod = payload
  }),

  writeCardToDelete: action((state, payload) => {
    state.cardToDelete = payload
  }),

  writeBusiness: action((state, payload) => {
    state.businesses = payload
  }),


  applyFilters: thunk(async (actions, payload, { getStoreState }) => {
    actions.writePropertyState({name: 'isLoading', value: true});

    const state = getStoreState();
    const properties = state.properties;
    const activeAddress = state.activeAddress;

    const url =
      `${env.apiServer}/business/?service=${properties.activeServiceTab.name}&latitude=${activeAddress.latitude}&longitude=${activeAddress.longitude}&distance=30&vehicle=${properties.currentVehicle}`

    const filterParams = () => {
      let string = '';
      if (properties.businessFilter !== 0) {
        properties.businessFilter.map(param => {
          string = string + `&service_type[]=${param}`
        })
        return url + string
      } else {
        return url
      }
    };

    axios.get(filterParams())
      .then(response => {
        actions.writeBusiness(response.data);
        actions.writePropertyState({name: 'isLoading', value: false});
      })
      .catch(error => {
        Alert.alert('Se ha presentado un error');
        actions.writePropertyState({name: 'isLoading', value: false});
      });
  }),

  writeBusinessFilter: thunk(async (actions, payload, {getStoreState}) => {
    const state = getStoreState();
    const filter = state.properties.businessFilter.find(filter => filter === payload);
    if (filter === undefined) {
      state.properties.businessFilter.push(payload)
    };
    actions.applyFilters();
  }),

  removeBusinessFilter: thunk(async (actions, payload, {getStoreState}) => {
    const state = getStoreState();
    const newArray = _.remove(state.properties.businessFilter, function(n) {
      return payload === n;
    });
    actions.applyFilters();

  }),

  clearBusinessFilter: action((state, payload) => {
    state.properties.businessFilter = []
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
        actions.writeUser({name: 'photo', value: response.data.image});
        actions.writeUser({name: 'email', value: response.data.email});
        actions.writeUser({name: 'birth_date', value: response.data.birth_date});
        actions.writeUser({name: 'gender', value: response.data.gender});
        actions.writeUser({name: 'waitingForApi', value: false});
      })
      .catch(error => {
         Alert.alert('Se ha presentado un error');
    });
  }),

  getProducts: thunk(async (actions, payload) => {
    actions.writePropertyState({name: 'isLoadingTop', value: true});
    actions.writePropertyState({name: 'isLoadingBestSeller', value: true});
    axios.get(`${env.apiServer}/products/?list=${payload}`)
      .then(response => {
        if (payload === 'best_seller') {
          actions.writeProducts({value: response.data, name: 'our_selection'});
          actions.writePropertyState({name: 'isLoadingBestSeller', value: false});
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

  getBusinessesSelection: thunk(async (actions, payload) => {
    actions.writeBusinessesSelection({name: 'isLoadingMost', value: true});
    actions.writeBusinessesSelection({name: 'isLoadingRecommended', value: true});
    axios.get(`${env.apiServer}/business/?list=${payload}`)
      .then(response => {
        if (payload === 'most_searched') {
          actions.writeBusinessesSelection({value: response.data, name: 'most_searched'});
          actions.writeBusinessesSelection({name: 'isLoadingMost', value: false});
        }
        else if (payload === 'recommended') {
          actions.writeBusinessesSelection({value: response.data, name: 'recommended'});
          actions.writeBusinessesSelection({name: 'isLoadingRecommended', value: false});
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

  getBusinesses: thunk(async (actions, payload, { getStoreState }) => {
    actions.writePropertyState({name: 'isLoading', value: true});
    const state = getStoreState();
    const activeAddress = state.activeAddress;
    const currentVehicle = state.properties.currentVehicle;
    axios.get(`${env.apiServer}/business/?service=${payload}&latitude=${activeAddress.latitude}&longitude=${activeAddress.longitude}&distance=30&vehicle=${currentVehicle}`)
      .then(response => {
        actions.writeBusiness(response.data);
        actions.writePropertyState({name: 'isLoading', value: false});
      })
      .catch(error => {
        Alert.alert('Se ha presentado un error');
        actions.writePropertyState({name: 'isLoading', value: false});
      });
  }),

  getBusiness: thunk(async (actions, payload, { getStoreState }) => {
    actions.writePropertyState({name: 'isLoading', value: true});
    const state = getStoreState();
    const activeAddress = state.activeAddress;
    const currentVehicle = state.properties.currentVehicle;
    axios.get(`${env.apiServer}/business/${payload}/?latitude=${activeAddress.latitude}&longitude=${activeAddress.longitude}&vehicle=${currentVehicle}`)
      .then(response => {
        actions.writePropertyState({name: 'activeBusiness', value: response.data});
        actions.writePropertyState({name: 'isLoading', value: false});
      })
      .catch(error => {
        Alert.alert('Se ha presentado un error');
        actions.writePropertyState({name: 'isLoading', value: false});
      });
  }),

  //Shopping Cart
  plusQuantity: action((state, payload) => {
    const product = state.shoppingCart.find(product => product.product === payload.product.id);
    if (product === undefined) {
      state.shoppingCart.push({
        business: payload.product.business,
        address: payload.product.business_address,
        business_name: payload.product.business_name,
        name: payload.product.name,
        service: payload.product.service,
        product: payload.product.id,
        quantity: state.properties.quantity,
        price: parseInt(payload.product.price.split('.')[0]),
      })
    }
    else {
      product.quantity += payload.quantity
    }
  }),

  plusSingleQuantity: action((state, payload) => {
    const product = state.shoppingCart.find(product => product.product === payload.product.id);
    if (product === undefined) {
      state.shoppingCart.push({
        business: payload.product.business,
        address: payload.product.business_address,
        business_name: payload.product.business_name,
        name: payload.product.name,
        service: payload.product.service,
        product: payload.product.id,
        quantity: 1,
        price: parseInt(payload.product.price.split('.')[0]),
      })
    }
    else {
      product.quantity += 1
    }
  }),

  addProduct: action(state => {
    state.properties.quantity += 1
  }),

  minusQuantity: action((state, payload) => {
    state.properties.quantity -= 1
  }),

  clearCart: action(state => {
    state.shoppingCart = [];
    state.properties.installmentsNumber = "";
  }),

  minusCart: action((state, payload) => {
    const product = state.shoppingCart.find(product => product.product === payload.product);
    product.quantity -= 1
  }),

  plusCart: action((state, payload) => {
    const product = state.shoppingCart.find(product => product.product === payload.product);
    product.quantity += 1
  }),

  removeProduct: action((state, payload) => {
    const newArray = _.remove(state.shoppingCart, function(n) {
      return payload.product === n.product;
    })
  }),

  // Timer
  decreaseTimer: action((state, payload) => {
    state.properties.sendTimer -= 1000
  }),
  resetTimer: action((state, payload) => {
    state.properties.sendTimer = 45000
  }),
  stopTimer: action((state, payload) => {
    state.properties.sendTimer = 0
  }),

};

export default storeModel;
