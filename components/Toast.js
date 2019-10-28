import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Keyboard
} from 'react-native';
import { colors } from '../envStyles';
import * as Animatable from 'react-native-animatable';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Toast = (props) => {

  //States
  const properties = useStoreState(state => state.properties);
  //Actions
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);

  const WIDTH = Dimensions.get('window').width;

  toastMessages = (props) => {
    if (props.data === 'error') {
      return(
        <View style={styles.containerB}>
          <Image
            source={require('../assets/icons/Error.png')}
            style={{height: 45, width: 45}}
          />
          <Text style={styles.textB}>Número ingresado no es válido</Text>
        </View>
      )
    }
    else if (props.data === 'success') {
      return(
        <View style={styles.containerA}>
          <Image
            source={require('../assets/icons/Hecho.png')}
            style={{height: 45, width: 45}}
          />
          <Text style={styles.textA}>Código correcto</Text>
        </View>
      )
    }
    else if (props.data === 'sent') {
      return(
        <View style={styles.containerA}>
          <Image
            source={require('../assets/icons/Mensaje.png')}
            style={{height: 45, width: 45}}
          />
          <Text style={styles.textA}>Mensaje enviado</Text>
        </View>
      )
    }
  };

  const slideIn = {
    from: {
      transform: [{ translateX: -200}]
    },
    to: {
      transform: [{ translateX: 0 }]
    }
  };

  if (properties.displayToast === true) {
    return (
      <Animatable.View
        animation={slideIn}
        duration={200}
        iterationCount={2}
        iterationDelay={500}
        direction='alternate'
        useNativeDriver={true}
        style={styles.toast}
        onAnimationEnd={() => writePropertyState({name: 'displayToast', value: false})}
        onAnimationStart={Keyboard.dismiss()}
      >
        {toastMessages(props)}
      </Animatable.View>
    );
  }
  else {
    return(null)
  }
}

const styles = StyleSheet.create({
  containerA: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
    height: 75,
    width: 200,
    backgroundColor: colors.green,
  },
  containerB: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
    height: 75,
    width: 200,
    backgroundColor: colors.red,
  },
  textA: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    maxWidth: '45%'
  },
  textB: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    maxWidth: '45%',
  },
  toast: {
    position: 'absolute',
    top: 20,
  },
});

export default Toast;
