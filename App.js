import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import { createStore, StoreProvider } from 'easy-peasy';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import storeModel from './model';
import Splash from './screens/Splash';
import Welcome from './screens/Welcome';
import Register from './screens/Register';
import Login from './screens/Login';
import VehicleSelection from './screens/VehicleSelection';

const store = createStore(storeModel);

const RootStack = createStackNavigator(
  {
    Splash: Splash,
    Welcome: Welcome,
    Register: Register,
    Login: Login,
    VehicleSelection: VehicleSelection,
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
      <SafeAreaView style={{flex: 1}}>
        <AppContainer />
      </SafeAreaView>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
