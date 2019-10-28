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
import SafeAreaView from 'react-native-safe-area-view';

import { colors } from '../envStyles';
import MenuBar from '../components/MenuBar';
import ServiceTabs from '../components/ServiceTabs';
import FooterBar from '../components/FooterBar';
import ServiceSlider from '../components/ServiceSlider';
import Carousel from '../components/Carousel';
import TopProducts from '../components/TopProducts';
import SelectedProducts from '../components/SelectedProducts';
import CartBar from '../components/CartBar';

const Home = ({navigation}) => {

  // States
  const properties = useStoreState(state => state.properties);

  // Actions
  const getServices = useStoreActions(actions => actions.getServices);
  const getUserInfo = useStoreActions(actions => actions.getUserInfo);

  useEffect(() => {
    getServices(properties.currentVehicle);
  }, []);

  useEffect(() => {
    getUserInfo()
  }, []);

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
      <View style={{flex: 1, backgroundColor: colors.gray}}>
        <MenuBar navigation={navigation}/>
        <ServiceTabs navigation={navigation}/>
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Carousel navigation={navigation} />
            <Text style={styles.title}>¿Qué Necesitas?</Text>
            <ServiceSlider navigation={navigation}/>
            <Text style={styles.title}>Productos Más Vendidos</Text>
            <TopProducts navigation={navigation} type={'top'}/>
            <Text style={styles.title}>Nuestra Selección Para Ti</Text>
            <SelectedProducts navigation={navigation} type={'our_selection'}/>
          </View>
        </ScrollView>
        <CartBar navigation={navigation} />
        <FooterBar navigation={navigation} />
      </View>
    </SafeAreaView>
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
