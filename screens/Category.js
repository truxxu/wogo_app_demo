import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { colors } from '../envStyles';
import MenuBar from '../components/MenuBar';
import ServiceTabs from '../components/ServiceTabs';
import FooterBar from '../components/FooterBar';
import Carousel from '../components/Carousel';
import BusinessList from '../components/BusinessList';
import CartBar from '../components/CartBar';

const Category = ({navigation}) => {

  //States
  const businesses = useStoreState(state => state.businesses);
  const properties = useStoreState(state => state.properties);
  //Actions
  const getBusinesses = useStoreActions(actions => actions.getBusinesses);

  useEffect(() => {
    getBusinesses(properties.activeServiceTab.name);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <MenuBar navigation={navigation} />
      <ServiceTabs navigation={navigation} />
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Carousel navigation={navigation} />
        </View>
        <View style={{backgroundColor: colors.gray}}>
          <View style={styles.barcontainer}>
            <Text style={styles.title}>{properties.activeServiceTab.name}</Text>
            <View style={styles.iconcontainer}>
              <TouchableOpacity
                // onPress={() => navigation.navigate('Mapa', {data: category, types: types})}
              >
                <Image
                  source={require('../assets/icons/settings.png')}
                  style={{height: 35, width: 35, marginLeft: 12}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('BusinessesMap')}
              >
                <Image
                  source={require('../assets/icons/marcador_Ubicacion.png')}
                  style={{height: 35, width: 35, marginLeft: 12}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{marginRight: 20, marginLeft: 20}}>
          <BusinessList navigation={navigation} />
        </View>
      </ScrollView>
      <CartBar navigation={navigation} />
      <FooterBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: colors.gray,
  },
  cardContainer:{
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  barcontainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.gray,
    width: Dimensions.get('window').width - 40
  },
  iconcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  textBox: {
    // paddingLeft: 5
  },
  imageBox: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 3,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 98,
    width: 180,
    backgroundColor: colors.purple,
    marginRight: 10,
  },
  heart: {
    position: 'absolute',
    height: 25,
    width: 25,
    left: 55,
    bottom: 5,
  },
  ratebox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    color: 'gray',
    fontSize: 14,
    textAlign: 'left',
  },
  boldText: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
});

export default Category;
