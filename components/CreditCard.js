import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { colors } from '../envStyles';
import CardLogo from './CardLogo';

const CreditCard = (props) => {

  // States
  const cards = useStoreState(state => state.cards);
  const activePaymentMethod = useStoreState(state => state.activePaymentMethod);

  // Actions
  const toggleProperties = useStoreActions(actions => actions.toggleProperties);
  const getcards = useStoreActions(actions => actions.getcards);
  const writeCardToDelete = useStoreActions(actions => actions.writeCardToDelete);

  defaultCard = () => {
    if (props.data.token_id === activePaymentMethod.token_id) {
      return('✓')
    }
    else{
      return('')
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CardLogo card={props.data.payment_method}/>
        <Text style={styles.text}>{props.data.masked_number}</Text>
        <Text style={styles.textB}>{this.defaultCard()}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          toggleProperties('displayCardDeleteModal');
          writeCardToDelete(props.data);
        }}
      >
        <Image
          source={require('../assets/icons/Borrar.png')}
          style={{width: 28, height: 28}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width - Dimensions.get('window').width * 0.2,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  textB: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: colors.pruple,
    marginLeft: 10,
  },
});

export default CreditCard;
