import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { colors } from '../envStyles';

const BusinessFilters = (props) => {

  //States
  const properties = useStoreState(state => state.properties);
  const types = useStoreState(state => state.properties.activeServiceTab.types);
  //Actions
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);
  const writeBusinessFilter = useStoreActions(actions => actions.writeBusinessFilter);
  const removeBusinessFilter = useStoreActions(actions => actions.removeBusinessFilter);

  renderList = () => {
    if (types !== undefined) {
      return(
        types.map(type => {
          return(
            <MenuOption key={type.id} style={{padding: 0}}>
              <View style={styles.containerB}>
                <TouchableOpacity
                  onPress={() => writeBusinessFilter(type.name)}
                  style={styles.optionB}
                >
                  <Text
                    style={properties.businessFilter.find(filter => filter === type.name) ? styles.selected : styles.text}
                  >
                    {type.name}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{padding: 5}}
                  onPress={() => removeBusinessFilter(type.name)}
                >
                  <Text
                    style={properties.businessFilter.find(filter => filter === type.name) ? styles.text : styles.notselected}
                  >
                    X
                  </Text>
                </TouchableOpacity>
              </View>
            </MenuOption>
          )
        })
      )
    }
    else{
      return(null)
    }
  };

  return(
    <Menu>
      <MenuTrigger
        children={
          <Image
            source={require('../assets/icons/settings.png')}
            style={{height: 35, width: 35}}
          />
        }
      />
      <MenuOptions customStyles={optionsStyles}>
        <MenuOption>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => writePropertyState({name: 'businessOrder', value: 'distance'})}
              style={styles.option}
            >
              <Image
                source={require('../assets/icons/distancia.png')}
                style={{height: 35, width: 35}}
              />
              <Text
                style={properties.businessOrder == 'distance' ? styles.selected : styles.text}
              >
                Distancia
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => writePropertyState({name: 'businessOrder', value: ''})}
            >
              <Text
                style={properties.businessOrder == 'distance' ? styles.text : styles.notselected}
              >
                X
              </Text>
            </TouchableOpacity>
          </View>
        </MenuOption>
        <MenuOption>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => writePropertyState({name: 'businessOrder', value: 'popularity'})}
              style={styles.option}
            >
              <Image
                source={require('../assets/icons/popular.png')}
                style={{height: 35, width: 35}}
              />
              <Text
                style={properties.businessOrder == 'popularity' ? styles.selected : styles.text}
              >
                Popularidad
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{padding: 5}}
              onPress={() => writePropertyState({name: 'businessOrder', value: ''})}
            >
              <Text
                style={properties.businessOrder == 'popularity' ? styles.text : styles.notselected}
              >
                X
              </Text>
            </TouchableOpacity>
          </View>
        </MenuOption>
        <View style={{padding: 5}}>
          <View style={styles.container}>
            <View style={styles.option}>
              <Image
                source={require('../assets/icons/servicio.png')}
                style={{height: 35, width: 35}}
              />
              <Text style={styles.text}>Tipo de Servicio</Text>
            </View>
          </View>
        </View>
        {
          renderList()
        }
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  optionB: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderLeftColor: 'gray',
    borderLeftWidth: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  containerB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    paddingLeft: 50,
  },
  text: {
    marginLeft: 5,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    fontSize: 14,
    textAlign: 'left',
  },
  selected: {
    marginLeft: 5,
    fontFamily: 'Montserrat-Regular',
    color: colors.purple,
    fontSize: 14,
    textAlign: 'left',
  },
  notselected: {
    display: 'none'
  },
  types:{
    paddingLeft: 30
  }
});

const optionsStyles = {
  optionsContainer: {
    width: Dimensions.get("window").width,
  },
};

export default BusinessFilters;
