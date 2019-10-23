import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { colors } from '../envStyles';
import * as _ from 'lodash';

const ServiceSlider = ({navigation}) => {

  const services = useStoreState(state => state.services);
  // const getBusinesses = useStoreActions(actions => actions.getBusinesses);
  const isLoading = useStoreState(state => state.properties.isLoading);
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);

  const serviceGroups = _.chunk(services, [size=2]);

  if (isLoading === true) {
    return(
      <View style={styles.gifContainer}>
          <Image
            source={require('../assets/gifs/spinner.gif')}
            style={{height: 200, width: 200}}
          />
      </View>
    )
  }
  else {
    return (
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={
            serviceGroups.map((item, index) =>
              {
                const store = {};
                store.key = index.toString();
                store.itemA = item[0];
                store.itemB = item[1];
                return store;
              }
            )
          }
          renderItem={({item}) =>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  writePropertyState({name: 'activeServiceTab', value: item.itemA.name});
                  // getBusinesses(item.itemA.name);
                  // navigation.navigate('Categoría', {service: item.itemA.name, types: item.itemA.types});
                }}
              >
                <View
                  style={
                    {
                      height: 75,
                      width: 150,
                      backgroundColor: item.itemA.color,
                      marginRight: 10,
                      marginTop: 5,
                      marginBottom: 5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 7,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.20,
                      shadowRadius: 1.41,
                      elevation: 2,
                    }
                  }
                >
                  <Image
                    style={{width: 150, height: 75, zIndex: 1, position: 'absolute'}}
                    source={{uri: item.itemA.image}}
                  />
                  <Text style={styles.item}>{item.itemA.name}</Text>
                </View>
              </TouchableOpacity>
              { item.itemB !== undefined &&

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    writePropertyState({name: 'activeServiceTab', value: item.itemB.name});
                    // getBusinesses(item.itemB.name);
                    // navigation.navigate('Categoría', {service: item.itemB.name, types: item.itemB.types});
                  }}
                >
                  <View
                    style={
                      {
                        height: 75,
                        width: 150,
                        backgroundColor: item.itemB.color,
                        marginRight: 10,
                        marginTop: 5,
                        marginBottom: 5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 7,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,
                        elevation: 2,
                      }
                    }
                  >
                    <Image
                      style={{width: 150, height: 75, borderRadius: 7, zIndex: 1, position: 'absolute'}}
                      source={{uri: item.itemB.image}}
                    />
                    <Text style={styles.item}>{item.itemB.name}</Text>
                  </View>
                </TouchableOpacity>
              }
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    zIndex: 2,
  },
  gifContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServiceSlider;
