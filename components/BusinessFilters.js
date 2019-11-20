import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
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
            <View key={type.id} style={styles.containerB}>
              <MenuOption
                onSelect={() => writeBusinessFilter(type.name)}
                style={styles.optionB}
              >
                <Text
                  style={properties.businessFilter.find(filter => filter === type.name) ? styles.selected : styles.text}
                >
                  {type.name}
                </Text>
              </MenuOption>
              <MenuOption
                style={{padding: 5}}
                onSelect={() => removeBusinessFilter(type.name)}
              >
                <Text
                  style={properties.businessFilter.find(filter => filter === type.name) ? styles.text : styles.notselected}
                >
                  X
                </Text>
              </MenuOption>
            </View>
          )
        })
      )
    }
    else{
      return(null)
    }
  };

  renderOptions = (origin) => {
    if (origin !== 'map') {
      return(
        <View>
          <View style={{padding: 5}}>
            <View style={styles.container}>
              <MenuOption
                onSelect={() => writePropertyState({name: 'businessOrder', value: 'distance'})}
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
              </MenuOption>
              <MenuOption
                onSelect={() => writePropertyState({name: 'businessOrder', value: ''})}
              >
                <Text
                  style={properties.businessOrder == 'distance' ? styles.text : styles.notselected}
                >
                  X
                </Text>
              </MenuOption>
            </View>
          </View>
          <View style={{padding: 5}}>
            <View style={styles.container}>
              <MenuOption
                onSelect={() => writePropertyState({name: 'businessOrder', value: 'popularity'})}
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
              </MenuOption>
              <MenuOption
                style={{padding: 5}}
                onSelect={() => writePropertyState({name: 'businessOrder', value: ''})}
              >
                <Text
                  style={properties.businessOrder == 'popularity' ? styles.text : styles.notselected}
                >
                  X
                </Text>
              </MenuOption>
            </View>
          </View>
        </View>
      )
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
        {
         renderOptions(props.parent)
        }
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
    width: '75%',
  },
  optionB: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderLeftColor: 'gray',
    borderLeftWidth: 1,
    padding: 2,
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
    height: 22.5,
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
