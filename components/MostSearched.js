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
import Swiper from 'react-native-swiper';
import axios from 'axios';

import { colors } from '../envStyles';
import { env } from '../keys';

const MostSearched = ({navigation, type}) => {

  //States
  const businesses = useStoreState(state => state.businessesSelection);
  //Actions
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);
  const writeBusinessesSelection = useStoreActions(actions => actions.writeBusinessesSelection);

  useEffect(() => {
    writeBusinessesSelection({name: 'isLoadingMost', value: true});
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const getData = () => {
      try {
        axios.get(`${env.apiServer}/business/?list=${type}`)
          .then(response => {
            writeBusinessesSelection({value: response.data, name: 'most_searched'});
            writeBusinessesSelection({name: 'isLoadingMost', value: false});
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

  const businessesArray = businesses.most_searched.map(item =>
    {
      const store = {};
      store.key = item.id.toString();
      store.item = item;
      return store;
    }
  );

  if (businesses.isLoadingMost === true) {
    return(
      <View style={styles.gifContainer}>
          <Image
            source={require('../assets/gifs/spinner.gif')}
            style={{height: 200, width: 200}}
          />
      </View>
    )
  }
  else if (businesses.isLoadingMost === false && businesses.most_searched.length !== 0) {
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
                style={{height: 150, width: 300, borderRadius: 7}}
                source={{uri: item.item.image}}
              />
            </TouchableOpacity>
            <View style={{maxWidth: 200}}>
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

export default MostSearched;
