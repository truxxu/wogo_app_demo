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

import MenuBar from '../components/MenuBar';
import ServiceTabs from '../components/ServiceTabs';


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
    <View>
      <MenuBar navigation={navigation}/>
      <ServiceTabs navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({

});

export default Home;
