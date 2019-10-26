import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Dimensions,
	Image,
	ScrollView,
	TextInput
} from 'react-native';

const CardLogo = (props) => {

	if (props.card === 'VISA') {
		return(
			<Image
			  source={require('../assets/icons/visa.png')}
			  style={{width: 35, height: 35, marginRight: 15}}
			/>
		);
	}
	else if (props.card === 'MASTERCARD') {
		return(
			<Image
			  source={require('../assets/icons/mastercard.png')}
			  style={{width: 35, height: 35, marginRight: 15}}
			/>
		);
	}
	else if (props.card === 'DINERS') {
		return(
			<Image
			  source={require('../assets/icons/diners.png')}
			  style={{width: 35, height: 35, marginRight: 15}}
			/>
		);
	}
	else if (props.card === 'AMEX') {
		return(
			<Image
			  source={require('../assets/icons/amex.png')}
			  style={{width: 35, height: 35, marginRight: 15}}
			/>
		);
	}
	else {
		return(
			<Image
			  source={require('../assets/icons/medios.png')}
			  style={{width: 35, height: 35, marginRight: 15}}
			/>
		);
	}
}

export default CardLogo;
