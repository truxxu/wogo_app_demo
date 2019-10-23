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

const ServiceTabs = ({navigation}) => {

  const services = useStoreState(state => state.services);
  const properties = useStoreState(state => state.properties);
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);
  const servicesArray = services.map(item =>
    {
      const store = {};
      key: item.id;
      store.key = item.name;
      store.types = item.types;
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
              writePropertyState({name: 'activeServiceTab', value: item.key});
            }}
          >
            <View style={properties.activeServiceTab === item.key ? styles.itemContainerA : null}>
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
