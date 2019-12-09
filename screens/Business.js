import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import * as _ from 'lodash';
import SafeAreaView from 'react-native-safe-area-view';

import { colors } from '../envStyles';
import MenuBar from '../components/MenuBar';
import ServiceTabs from '../components/ServiceTabs';
import FooterBar from '../components/FooterBar';
import TypesSlider from '../components/TypesSlider';
import ProductType from '../components/ProductType';
import AllProducts from '../components/AllProducts';
import CartBar from '../components/CartBar';

const WIDTH = Dimensions.get('window').width;

const Business = ({navigation}) => {

  const services = useStoreState(state => state.services);
  const properties = useStoreState(state => state.properties);
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);

  useEffect(() => {
    writePropertyState({name: 'activeType', value: 'Todo'})
  }, []);

  const business = properties.activeBusiness;
  const grouped_products = _.groupBy(business.products, product => product.service_type_name);
  const typesArray = [];
  for (const [key, value] of Object.entries(grouped_products)) {
    if (!_.isEmpty(grouped_products)) {
      typesArray.push(key)    }
  };

  timeStr = (time) => {
    return time.slice(0, -3)
  };

  distanceStr = (distance) => {
    if (distance < 1) {
      let meters = distance * 1000;
      return `${meters.toString().split(".")[0]} m`
    }
    else {
      return `${parseFloat(distance).toFixed(1)} km`
    }
  };

  renderProducts = () => {
    if (properties.activeType === 'Todo') {
      return(
        <AllProducts navigation={navigation} types={typesArray} />
      )
    }
    else {
      return(
        <ProductType navigation={navigation} />
      )
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray, }}>
      <View style={{flex: 1}}>
        <MenuBar navigation={navigation} />
        <ServiceTabs navigation={navigation} />
        <ScrollView
          stickyHeaderIndices={[1]}
          howsVerticalScrollIndicator={false}>
          <Image
            style={styles.image}
            source={{uri: business.image}}
          />
          <View style={{backgroundColor: colors.white}}>
            <View style={styles.description}>
              <View>
                <Text style={styles.title}>{business.name}</Text>
                <Text style={styles.text}>{properties.activeServiceTab.name}</Text>
              </View>
              <View>
                <Text style={styles.text}>
                  {timeStr(business.opening_hour)} - {timeStr(business.closing_hour)}
                </Text>
                <View style={styles.ratebox}>
                  <Image
                    source={require('../assets/icons/star.png')}
                    style={{height: 20, width: 20, marginRight: 3}}
                  />
                  <Text
                    style={styles.text}
                  >
                    {business.score} ({business.rates_number})
                  </Text>
                </View>
                <Text style={styles.text}>{distanceStr(business.distance)}</Text>
              </View>
            </View>
            <TypesSlider data={typesArray}/>
          </View>
          <View style={styles.cardContainer}>
            {
              renderProducts()
            }
          </View>
        <CartBar navigation={navigation}/>
        </ScrollView>
        <CartBar navigation={navigation} />
        <FooterBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: WIDTH,
    height: 150,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: 'gray',
    flex: 1,
    backgroundColor: colors.gray,
    textAlign: 'center',
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5
  },
  title: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  ratebox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: colors.gray,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  }
});

export default Business;
