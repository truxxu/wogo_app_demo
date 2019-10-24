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

import storeModel from './model';
import Splash from './screens/Splash';
import Welcome from './screens/Welcome';
import Register from './screens/Register';
import Login from './screens/Login';
import VehicleSelection from './screens/VehicleSelection';
import Home from './screens/Home';
import OrderHistory from './screens/OrderHistory';
import PaymentMethods from './screens/PaymentMethods';
import AddressList from './screens/AddressList';
import Terms from './screens/Terms';
import UserProfile from './screens/UserProfile';
import Category from './screens/Category';
import BusinessesMap from './screens/BusinessesMap';

import MenuDrawer from './components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const store = createStore(storeModel);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: Home,
    OrderHistory: OrderHistory,
    PaymentMethods: PaymentMethods,
    AddressList: AddressList,
    Terms: Terms,
    UserProfile: UserProfile,
    Category: Category,
    BusinessesMap: BusinessesMap,
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
    headerMode: 'Splash',
  }
);

const AppContainer = createAppContainer(RootStack);


const App: () => React$Node = () => {
  return (
    <StoreProvider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <AppContainer />
      </SafeAreaView>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
