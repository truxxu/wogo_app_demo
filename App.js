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

import Splash from './screens/Splash';

const storeModel = {
  auth_token: null
};

const store = createStore(storeModel);

const App: () => React$Node = () => {
  return (
    <StoreProvider store={store}>
      <Splash />
    </StoreProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
