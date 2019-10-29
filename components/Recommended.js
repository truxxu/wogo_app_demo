import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Swiper from 'react-native-swiper'

import { colors } from '../envStyles';

const Recommended = ({navigation, type}) => {

  //States
  const businesses = useStoreState(state => state.businessesSelection);
  //Actions
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);
  const getBusinessesSelection = useStoreActions(actions => actions.getBusinessesSelection);

  useEffect(() => {
    getBusinessesSelection(type);
  }, []);

  const businessesArray = businesses.recommended.map(item =>
    {
      const store = {};
      store.key = item.id.toString();
      store.item = item;
      return store;
    }
  );

  if (businesses.isLoadingRecommended === true) {
    return(
      <View style={styles.gifContainer}>
          <Image
            source={require('../assets/gifs/spinner.gif')}
            style={{height: 200, width: 200}}
          />
      </View>
    )
  }
  else if (businesses.isLoadingRecommended === false && businesses.recommended !== null) {
    return(
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={businessesArray}
        renderItem={({item}) =>
          <View key={item.key} style={{marginRight: 10}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                writePropertyState({name: 'activeBusiness', value: item.item})
                navigation.navigate('Business')
              }}
            >
              <Image
                style={{height: 150, width: 150, borderRadius: 7}}
                source={{uri: item.item.image}}
              />
            </TouchableOpacity>
            <View style={{maxWidth: 150}}>
              <Text style={styles.item}>{item.item.name}</Text>
            </View>
          </View>
        }
      />
    )
  }
  else {
    return(null)
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 160,
  },
  gifContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
});

export default Recommended;
