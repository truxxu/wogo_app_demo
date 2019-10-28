import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import { colors } from '../envStyles';

const Terms = ({navigation}) => {
  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
      <Text>
        Terms
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default Terms;
