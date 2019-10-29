import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Swiper from 'react-native-swiper';

import { colors } from '../envStyles';


const Carousel = ({navigation}) => {
  const banners = useStoreState(state => state.banners);
  const getBanners = useStoreActions(actions => actions.getBanners);
  const isLoadingBanners = useStoreState(state => state.properties.isLoadingBanners);

  useEffect(() => {
    getBanners();
  }, []);

  if (isLoadingBanners === true) {
    return(
      <View style={styles.gifContainer}>
          <Image
            source={require('../assets/gifs/spinner.gif')}
            style={{height: 200, width: 200}}
          />
      </View>
    )
  }
  else if (isLoadingBanners === false && banners !== null) {
    return(
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={true}
        autoplay={true}
        autoplayTimeout={5}
        dot={<View style={{backgroundColor: 'rgba(94,33,226,.3)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />}
        activeDot={<View style={{backgroundColor: colors.purple, width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />}>
          {
            banners.map(banner => {
              return(
                <TouchableOpacity
                   onPress={() => {
                     if(banner.product != null) {
                       navigation.navigate('Product',
                       {
                         product: banner.product,
                       })
                     }
                   }}
                  key={banner.id}
                >
                  <Image
                    style={styles.image}
                    source={{uri: banner.image}}
                  />
                </TouchableOpacity>
              )
            })
          }
      </Swiper>
    )
  }
  else {
    return(null)
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 200
  },
  image: {
    height: 160,
    width: Dimensions.get("window").width - 40,
    borderRadius: 5,
    resizeMode: 'stretch',
  },
  gifContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Carousel;
