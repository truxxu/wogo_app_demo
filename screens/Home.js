import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Home = ({navigation}) => {
  return(
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
    >
      <Image
        source={require('../assets/icons/usuario.png')}
        style={{height: 28, width: 28}}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

});

export default Home;
