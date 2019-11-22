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
import axios from 'axios';

import { colors } from '../envStyles';
import { env } from '../keys';
import MenuBar from '../components/MenuBar';
import ServiceTabs from '../components/ServiceTabs';
import FooterBar from '../components/FooterBar';
import ServiceSlider from '../components/ServiceSlider';
import Carousel from '../components/Carousel';
import TopProducts from '../components/TopProducts';
import SelectedProducts from '../components/SelectedProducts';
import CartBar from '../components/CartBar';
import MostSearched from '../components/MostSearched';
import Recommended from '../components/Recommended';

const Home = ({navigation}) => {

  // States
  const properties = useStoreState(state => state.properties);
  const services = useStoreState(state => state.services);
  const user = useStoreState(state => state.user);

  // Actions
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);
  const writeServices = useStoreActions(actions => actions.writeServices);
  const writeUser = useStoreActions(actions => actions.writeUser);

  useEffect(() => {
    writePropertyState({name: 'isLoading', value: true});
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const getData = () => {
      try {
        axios.get(`${env.apiServer}/services/?vehicle_type=${properties.currentVehicle}`, { cancelToken: source.token })
          .then(response => {
            writeServices(response.data);
            writePropertyState({name: 'isLoading', value: false});
          })
      } catch(error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    };

    getData();
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    writeUser({name: 'waitingForApi', value: true})
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const getData = () => {
      try {
        axios.get(env.apiServer + '/profile')
          .then(response => {
            writeUser({name: 'phone', value: response.data.username});
            writeUser({name: 'name', value: response.data.name});
            writeUser({name: 'photo', value: response.data.image});
            writeUser({name: 'email', value: response.data.email});
            writeUser({name: 'birth_date', value: response.data.birth_date});
            writeUser({name: 'gender', value: response.data.gender});
            writeUser({name: 'waitingForApi', value: false});
          })
      } catch(error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    };

    getData();
    return () => {
      source.cancel();
    };
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
            <ServiceSlider navigation={navigation} />
            <Text style={styles.title}>Negocios Recomendados</Text>
            <Recommended navigation={navigation} type={'recommended'} />
            <Text style={styles.title}>Negocios Más Buscados</Text>
            <MostSearched navigation={navigation} type={'most_searched'} />
            <Text style={styles.title}>Productos Top</Text>
            <TopProducts navigation={navigation} type={'top'}/>
            <Text style={styles.title}>Productos más vendidos</Text>
            <SelectedProducts navigation={navigation} type={'best_seller'} />
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
