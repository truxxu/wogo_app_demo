import React from 'react';
import {
  Image,
  StyleSheet
} from 'react-native';

const CountryFlag = (props) => {

  if (props.data === '+54') {
    return (
      <Image
        source={require('../assets/flags/arg.png')}
        style={styles.flag}
      />
    );
  }
  else if (props.data === '+55') {
    return (
      <Image
        source={require('../assets/flags/br.png')}
        style={styles.flag}
      />
    );
  }
  else if (props.data === '+56') {
    return (
      <Image
        source={require('../assets/flags/ch.png')}
        style={styles.flag}
      />
    );
  }
  else if (props.data === '+57') {
    return (
      <Image
        source={require('../assets/flags/col.png')}
        style={styles.flag}
      />
    );
  }
  else if (props.data === '+58') {
    return (
      <Image
        source={require('../assets/flags/ven.png')}
        style={styles.flag}
      />
    );
  }
  else
    return (
      <Image
        source={require('../assets/flags/blank.png')}
        style={styles.flag}
      />
    );
}

const styles = StyleSheet.create({
  flag: {
    resizeMode: 'stretch',
    height: 28,
    marginRight: 8,
  }
});

export default CountryFlag;
