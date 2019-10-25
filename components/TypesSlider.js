import React from 'react';
import {
StyleSheet,
FlatList,
TouchableOpacity,
Text,
View
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import * as _ from 'lodash';

import { colors } from '../envStyles';

const TypesSlider = (props) => {

  const properties = useStoreState(state => state.properties);

  const writePropertyState = useStoreActions(actions => actions.writePropertyState);

  const serviceTypeArray = props.data.map(item =>
    {
      const store = {};
      store.key = item;
      return store;
    }
  );
  const sortedArray = _.orderBy(serviceTypeArray, ['key'], ['asc']);
  const addition = sortedArray.unshift({key: 'Todo'});

  if (sortedArray.length > 1)
    {
      return (
        <View style={styles.container}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={sortedArray}
            renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => {
                  writePropertyState({name: 'activeType', value: item.key})
                }}
              >
                <View style={properties.activeType === item.key ? styles.itemContainerA : null}>
                  <Text style={styles.item}>
                    {
                      // item.key.length > 9 ? item.key.substring(0, 9) + '...' : item.key
                      item.key
                    }
                  </Text>
                </View>
              </TouchableOpacity>
            }
          />
        </View>
      )
    }
  else
    {
      return (null)
    }
};

const styles = StyleSheet.create({
  item: {
    padding: 5,
    paddingBottom: 2,
    fontSize: 14,
    height: 30,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  container: {
    borderColor: 'gray',
    borderBottomWidth: 0.5,
    // marginBottom: 15,
    backgroundColor: colors.white,
  },
  itemContainerA: {
    borderColor: colors.purple,
    borderBottomWidth: 5,
  },
  message: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    marginTop: 40,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: 'gray',
    maxWidth: '70%',
    textAlign: 'center'
  },
});

export default TypesSlider;
