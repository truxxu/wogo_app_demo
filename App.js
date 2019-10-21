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
import { colors } from './envStyles';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/gifs/welcome.gif')}
        style={{height: 400, width: 400}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellow,
  },
});

export default App;
