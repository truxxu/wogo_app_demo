import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Keyboard,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useStoreState, useStoreActions } from 'easy-peasy';
import axios from 'axios';

import { env } from '../keys';
import { colors } from '../envStyles';

const Toast2 = ({navigation}) => {

  //States
  const properties = useStoreState(state => state.properties);
  //Actions
  const writePropertyState = useStoreActions(actions => actions.writePropertyState);
  const writeAuthState = useStoreActions(actions => actions.writeAuthState);

  const WIDTH = Dimensions.get('window').width;

  const slideIn = {
    from: {
      transform: [{ translateX: -200 }]
    },
    to: {
      transform: [{ translateX: 0 }]
    }
  };

  if (properties.displayToastB === true) {
    return (
      <Animatable.View
        animation={slideIn}
        // delay={100}
        duration={200}
        iterationCount={2}
        iterationDelay={500}
        direction='alternate'
        useNativeDriver={true}
        style={styles.toast}
        onAnimationStart={Keyboard.dismiss()}
        onAnimationEnd={() => {
          writePropertyState({name: 'displayToastB', value: false});
          writeAuthState({name: 'waitingForApi', value: false})
          navigation.replace('VehicleSelection');
          }
        }
      >
        <View style={styles.containerA}>
          <Image
            source={require('../assets/icons/Hecho.png')}
            style={{height: 45, width: 45}}
          />
          <Text style={styles.textA}>Código correcto</Text>
        </View>
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

export default Toast2;
