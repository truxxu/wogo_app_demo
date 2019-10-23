import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { colors } from '../envStyles';
import { customerService } from '../keys';
import Modal from "react-native-modal";
import { useStoreState, useStoreActions } from 'easy-peasy';

const MenuDrawer = ({navigation}) => {

  const WIDTH = Dimensions.get('window').width;
  const HEIGHT = Dimensions.get('window').height;
  const toggleProperties = useStoreActions(actions => actions.toggleProperties);
  const properties = useStoreState(state => state.properties);
  const user = useStoreState(state => state.user);

  callNumber = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => {});
  };

  userName = (name) => {
    if (name === '' || name === null) { return 'Usuario'}
    else { return name }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'never'}
      style={styles.container}>
      <Modal isVisible={properties.displayModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Contáctanos</Text>
          <TouchableOpacity
            style={styles.close}
            onPress={() => toggleProperties('displayModal')}
          >
            <Text style={styles.modalText}>X</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => this.callNumber(`tel:+${customerService.phone}`)}
            >
              <Image
                source={require('../assets/icons/telefono.png')}
                style={{height: 75, width: 75}}
              />
              <Text style={styles.modalText2}>Llámanos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => this.callNumber(`http://api.whatsapp.com/send?phone=${customerService.phone}`)}
            >
              <Image
                source={require('../assets/icons/wa.png')}
                style={{height: 75, width: 75}}
              />
              <Text style={styles.modalText2}>Whatsapp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.usercontainer}>
        <Image
          source={require('../assets/icons/usuario.png')}
          style={styles.bigicon}
        />
        <View>
          <View style={{borderBottomWidth: 0.5, borderColor: 'gray'}}>
            <Text style={styles.boldText}>{userName(user.name)}</Text>
          </View>
          <View style={styles.linkcontainer}>
            <Text style={styles.text}></Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomLinks}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('OrderHistory')}
        >
          <View style={styles.linkcontainer}>
            <View style={styles.iconbox}>
              <Image
                source={require('../assets/icons/pedidos.png')}
                style={styles.icon}
              />
            </View>
            <Text style={styles.link}>Mis pedidos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PaymentMethods')}
        >
          <View style={styles.linkcontainer}>
            <View style={styles.iconbox}>
              <Image
                source={require('../assets/icons/medios.png')}
                style={styles.icon}
              />
            </View>
            <Text style={styles.link}>Mis Métodos de Pago</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddressList')}
        >
          <View style={styles.linkcontainer}>
            <View style={styles.iconbox}>
              <Image
                source={require('../assets/icons/direcciones.png')}
                style={styles.icon}
              />
            </View>
            <Text style={styles.link}>Mis direcciones</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            {
              navigation.navigate('VehicleSelection')
              navigation.toggleDrawer();
            }
          }
        >
          <View style={styles.linkcontainer}>
            <View style={styles.iconbox}>
              <Image
                source={require('../assets/icons/cambiar.png')}
                style={styles.icon}
              />
            </View>
            <Text style={styles.link}>Cambiar Vehículo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <View style={styles.linkcontainer}>
            <View style={styles.iconbox}>
              <Image
                source={require('../assets/icons/perfil.png')}
                style={styles.icon}
              />
            </View>
            <Text style={styles.link}>Editar perfil</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            {
              navigation.toggleDrawer();
              toggleProperties('displayModal');
            }
          }
        >
          <View style={styles.linkcontainer}>
            <View style={styles.iconbox}>
              <Image
                source={require('../assets/icons/soporte.png')}
                style={styles.icon}
              />
            </View>
            <Text style={styles.link}>Soporte</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Terms')}
        >
          <View style={styles.linkcontainer}>
            <View style={styles.iconbox}>
              <Image
                source={require('../assets/icons/terminos.png')}
                style={styles.icon}
              />
            </View>
            <Text style={styles.link}>Términos y condiciones</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bottomLinks: {
    flex: 1,
    backgroundColor: 'white',
  },
  link: {
    flex: 1,
    fontSize: 16,
    padding: 6,
    paddingLeft: 14,
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  iconbox: {
    marginLeft: 20,
    height: 25,
    width: 25,
  },
  icon: {
    flex:1,
    height: 25,
    width: 25
  },
  linkcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usercontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    paddingTop: 10,
  },
  bigicon: {
    marginLeft: 20,
    marginRight: 10,
    height: 40,
    width: 40,
  },
  text: {
    flex: 1,
    fontSize: 16,
    padding: 6,
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  boldText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 16,
    width: 150,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
  boldText2: {
    flex: 1,
    textAlign: 'left',
    fontSize: 16,
    width: 150,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.purple,
  },
  modalContainer: {
    backgroundColor: colors.white,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  modalText2: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  modalButton: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    height: 130,
    width: 130,
    margin: 5,
    padding: 10,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  close: {
    width: 20,
    height: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 20,
  },
});

export default MenuDrawer;
