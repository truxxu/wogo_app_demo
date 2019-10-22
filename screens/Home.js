import React, { useEffect } from 'react';
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
import { useStoreState, useStoreActions } from 'easy-peasy';

const Home = ({navigation}) => {

  const properties = useStoreState(state => state.properties);
  const getServices = useStoreActions(actions => actions.getServices);
  const getUserInfo = useStoreActions(actions => actions.getUserInfo);

  useEffect(() => {
    getServices(properties.currentVehicle);
  }, []);

  useEffect(() => {
    getUserInfo()
  }, []);

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
