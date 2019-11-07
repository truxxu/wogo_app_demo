import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { colors } from '../envStyles';
import * as _ from 'lodash';

const WIDTH = Dimensions.get('window').width;

const BusinessList = ({navigation}) => {

  const businesses = useStoreState(state => state.businesses);
  const properties = useStoreState(state => state.properties);

  const writePropertyState = useStoreActions(actions => actions.writePropertyState);

  const sortedBusinessList = _.orderBy(businesses, ['distance'], ['asc']);

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

  if (properties.isLoading === true) {
    return(
      <View style={styles.gifContainer}>
          <Image
            source={require('../assets/gifs/spinner.gif')}
            style={{height: 250, width: 250}}
          />
      </View>
    )
  }
  else if (businesses.length !== 0 && properties.isLoading === false)
    {
      return (
        <FlatList
          horizontal={false}
          data={
            sortedBusinessList.map(business =>
              {
                const store = {};
                store.key = business.name;
                store.business = business;
                return store;
              }
            )
          }
          renderItem={({item}) =>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <TouchableOpacity
                  onPress={() => {
                    writePropertyState({name: 'activeBusiness', value: item.business})
                    navigation.navigate('Business')
                  }}
                  style={styles.button}
                >
                  <View style={styles.imageBox}>
                    <Image
                      style={{width: 180, height: 85, borderRadius: 3}}
                      source={{uri: item.business.image}}
                    />
                  </View>
                  <View style={styles.textBox}>
                    <Text style={styles.boldText}>{item.business.name}</Text>
                    <Text
                      style={styles.text}
                    >
                      {properties.activeServiceTab.name}
                    </Text>
                    <Text
                      style={styles.text}
                    >
                      {timeStr(item.business.opening_hour)} - {timeStr(item.business.closing_hour)}
                    </Text>
                    <View style={styles.ratebox}>
                      <Image
                        source={require('../assets/icons/star.png')}
                        style={{height: 20, width: 20, marginRight: 3}}
                      />
                      <Text
                        style={styles.text}
                      >
                        {item.business.score} ({item.business.rates_number})
                      </Text>
                    </View>
                    <Text
                      style={styles.text}
                    >
                      {distanceStr(item.business.distance)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      );
    }
  else if (businesses.length == 0 && properties.isLoading === false)
    {
      return (
        <View style={styles.message}>
          <Text style={styles.messageText}>
            Lo sentimos, no existen negocios en esta área
          </Text>
        </View>
      )
    }
  else
    {
      return (
        <View style={styles.message}>
          <Text style={styles.messageText}>
            Lo sentimos, algo ha salido mal :(
          </Text>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    // marginTop: wp('5%'),
    // height: hp('15.5%'),
    backgroundColor: colors.gray,
  },
  gifContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer:{
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  barcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
    marginBottom: 0,
    backgroundColor: colors.gray,
  },
  message: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    width: WIDTH - 40,
  },
  messageText: {
    marginTop: 40,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: 'gray',
    maxWidth: '70%',
    textAlign: 'center'
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
    maxWidth: '55%'
  },
  imageBox: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 3,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 90,
    width: 180,
    backgroundColor: colors.purple,
    marginRight: 10,
  },
  heart: {
    position: 'absolute',
    height: 10,
    width: 10,
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
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  title: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
});

export default BusinessList;
