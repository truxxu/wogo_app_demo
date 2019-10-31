import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions
} from 'react-native';
import { createStore, StoreProvider } from 'easy-peasy';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import storeModel from './model';
import MenuDrawer from './components/MenuDrawer';
import Splash from './screens/Splash';
import Welcome from './screens/Welcome';
import Register from './screens/Register';
import Login from './screens/Login';
import VehicleSelection from './screens/VehicleSelection';
import Home from './screens/Home';
import OrderHistory from './screens/OrderHistory';
import Order from './screens/Order';
import PaymentMethods from './screens/PaymentMethods';
import AddressList from './screens/AddressList';
import NewAddress from './screens/NewAddress';
import Terms from './screens/Terms';
import UserProfile from './screens/UserProfile';
import NewCard from './screens/NewCard';
import Category from './screens/Category';
import BusinessesMap from './screens/BusinessesMap';
import Business from './screens/Business';
import Product from './screens/Product';
import ShoppingCart from './screens/ShoppingCart';

const WIDTH = Dimensions.get('window').width;

const store = createStore(storeModel);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: Home,
    OrderHistory: OrderHistory,
    Order: Order,
    PaymentMethods: PaymentMethods,
    NewCard: NewCard,
    AddressList: AddressList,
    NewAddress: NewAddress,
    Terms: Terms,
    UserProfile: UserProfile,
    Category: Category,
    BusinessesMap: BusinessesMap,
    Business: Business,
    Product: Product,
    ShoppingCart: ShoppingCart,
  },
  {
    unmountInactiveRoutes: true,
    drawerWidth: WIDTH*0.72,
    contentComponent: ({ navigation }) => {
      return(<MenuDrawer navigation={navigation} />)
    },
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

const RootStack = createStackNavigator(
  {
    Splash: Splash,
    Welcome: Welcome,
    Register: Register,
    Login: Login,
    VehicleSelection: VehicleSelection,
    DrawerNavigator: DrawerNavigator,
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);


const App: () => React$Node = () => {
  return (
    <StoreProvider store={store}>
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
