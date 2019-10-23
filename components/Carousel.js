import * as React from "react";
import { StyleSheet, View, ScrollView, Dimensions, Image, TouchableOpacity, Text } from "react-native";
import axios from 'axios';
import { env } from '../keys';

const DEVICE_WIDTH = Dimensions.get("window").width;

class Carousel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      isLoading: null,
      banners: [],
    };
    this.carouselInterval = {};
    this.scrollRef = React.createRef();
  };

  componentDidMount = () => {
    this.setState({isLoading: true});
    axios.get(env.apiServer + '/banners')
      .then(response => {
        this.setState({banners: response.data});
        this.carouselInterval = setInterval(() => {
          this.setState(
            prev => ({
              selectedIndex:
                prev.selectedIndex === this.state.banners.length - 1
                  ? 0
                  : prev.selectedIndex + 1
            }),
            () => {
              this.scrollRef.current.scrollTo({
                animated: true,
                x: (DEVICE_WIDTH - 40) * this.state.selectedIndex,
                y: 0
              });
            }
          );
        }, 3000);
        this.setState({isLoading: false});
      });
  };

  componentWillUnmount = () => {
    clearInterval(this.carouselInterval);
  };

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ selectedIndex });
  };

  render() {
    const { selectedIndex, isLoading, banners } = this.state;
    if (isLoading === true) {
      return(
        <View style={styles.gifContainer}>
          <Image
            source={require('../assets/gifs/spinner.gif')}
            style={{height: 180, width: 180}}
          />
        </View>
      )
    }
    else if (isLoading === false && banners.length !== 0) {
      return (
        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            onMomentumScrollEnd={this.setSelectedIndex}
            ref={this.scrollRef}
          >
            {this.state.banners.map(banner => (
              <TouchableOpacity
                // onPress={() => {
                //   if(banner.product != null) {
                //     this.props.navigation.navigate('Producto',
                //     {
                //       product: banner.product,
                //       business: {
                //         id: banner.product.business,
                //         name: banner.product.business_name,
                //         address: banner.product.business_address
                //       },
                //       origin: 'home'
                //     })
                //   }
                // }}
                key={banner.id}
              >
                <Image
                  style={styles.backgroundImage}
                  source={{ uri: banner.image }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.circleDiv}>
            {this.state.banners.map((banner, i) => (
              <View
                style={[
                  styles.whiteCircle,
                  { opacity: i === selectedIndex ? 0.5 : 1 }
                ]}
                key={banner.id}
                active={i === selectedIndex}
              />
            ))}
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.message}>
          <Text style={styles.messageText}>
            Banners Promocionales
          </Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 180,
    width: Dimensions.get("window").width - 40,
    borderRadius: 5,
    resizeMode: 'contain',

  },
  circleDiv: {
    position: "absolute",
    bottom: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 10
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: "#fff"
  },
  gifContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Carousel;
