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
  FlatList,
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { colors } from '../envStyles';

const ServiceTabs = ({navigation, parent}) => {

  // States
  const services = useStoreState(state => state.services);
  const properties = useStoreState(state => state.properties);
  // Actions
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);
  const getBusinesses = useStoreActions(actions => actions.getBusinesses);
  const clearBusinessFilter = useStoreActions(actions => actions.clearBusinessFilter);

  const servicesArray = services.map(item =>
    {
      const store = {};
      key: item.id;
      store.key = item.name;
      store.item = item;
      return store;
    }
  );

  return(
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={servicesArray}
        renderItem={({item}) =>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              writePropertyState({name: 'activeServiceTab', value: item.item});
              getBusinesses(item.key);
              clearBusinessFilter();
              if (parent != undefined) {
                navigation.navigate(parent);
              } else {
                navigation.navigate('Category');
              }
            }}
          >
            <View style={properties.activeServiceTab.name === item.key ? styles.itemContainerA : null}>
              <Text style={styles.item}>{item.key}</Text>
            </View>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    paddingBottom: 3,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  container: {
    borderColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: colors.white,
  },
  itemContainerA: {
    borderColor: colors.purple,
    borderBottomWidth: 5,
  },
});

export default ServiceTabs;
