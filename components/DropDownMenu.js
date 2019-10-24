import React from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
  MenuProvider
} from 'react-native-popup-menu';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { colors } from '../envStyles';
// import TypesList from '../components/TypesList';
import { useStoreState, useStoreActions } from 'easy-peasy';

const DropDownMenu = () => {

  const properties = useStoreState(state => state.properties);

  renderList = () => {
    if (properties.activeServiceTab.types !== undefined) {
      return(
        <View>
          <View style={styles.option}>
            <Image
              source={require('../assets/icons/servicio.png')}
              style={{height: 30, width: 30}}
            />
            <Text style={styles.text}>Tipo de Servicio</Text>
          </View>
          <View style={styles.types}>
          </View>
        </View>
      )
    }
    else{
      return(null)
    }
  }

  return (
    <MenuProvider style={{height: 30, width: 30}}>
      <Menu>
        <MenuTrigger
          children={
            <Image
              source={require('../assets/icons/settings.png')}
              style={{height: 30, width: 30}}
            />
          }
        />
        <MenuOptions customStyles={optionsStyles.optionsContainer}>
          <MenuOption
            // onSelect={() => alert(`Delete`)}
          >
            <View style={styles.option}>
              <Image
                source={require('../assets/icons/distancia.png')}
                style={{height: 30, width: 30}}
              />
              <Text style={styles.text}>Distancia</Text>
            </View>
          </MenuOption>
          <MenuOption
            // onSelect={() => alert(`Delete`)}
          >
            <View style={styles.option}>
              <Image
                source={require('../assets/icons/promociones.png')}
                style={{height: 30, width: 30}}
              />
              <Text style={styles.text}>Promociones</Text>
            </View>
          </MenuOption>
          <MenuOption
            // onSelect={() => alert(`Delete`)}
          >
            <View style={styles.option}>
              <Image
                source={require('../assets/icons/popular.png')}
                style={{height: 30, width: 30}}
              />
              <Text style={styles.text}>Popularidad</Text>
            </View>
          </MenuOption>
          <MenuOption
            // onSelect={() => alert(`Delete`)}
          >
            {
              // this.renderList()
            }
          </MenuOption>
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 10,
    paddingLeft: 20
  },
  text: {
    marginLeft: 5,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    fontSize: 14,
    textAlign: 'left',
  },
  types:{
    paddingLeft: 20
  }
});

const optionsStyles = {
  optionsContainer: {
    width: Dimensions.get("window").width,
  },
};

export default DropDownMenu;
