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

import { colors } from '../envStyles';
import MenuBar from '../components/MenuBar';
import ServiceTabs from '../components/ServiceTabs';
import FooterBar from '../components/FooterBar';
import ServiceSlider from '../components/ServiceSlider';


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
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <MenuBar navigation={navigation}/>
      <ServiceTabs navigation={navigation}/>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <ServiceSlider navigation={navigation}/>
          <Text style={styles.title}>¿Qué Necesitas?</Text>
        </View>
      </ScrollView>
      <FooterBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
});

export default Home;
