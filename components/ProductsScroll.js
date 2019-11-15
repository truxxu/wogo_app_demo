import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import * as _ from 'lodash';

import { colors } from '../envStyles';
import ProductCard from '../components/ProductCard';

const Item = props => (
  <View 
    onLayout={e => props.onItemLayout(e, props.index)}>
    <Text style={styles.title}>{props.index}</Text>
    {
      props.products.map(product => {
        return(
          <ProductCard navigation={props.navigation} product={product} key={product.id}/>
        )
      })
    }
  </View>
);

class ProductsScroll extends Component {

  constructor(props) {
    super();
    this.state = {
      sections: props.types,
      currentSection: props.types[0].key
    };
  }

  moveToSetion = section => {
    // scroll view to section
    this.scrollView.scrollTo({ x: 0, y: this.state[section], animated: true });
    // set state to current section
    this.setState({ currentSection: section });
  };
  onItemLayout = ({ nativeEvent: { layout: { x, y, width, height } } }, section) => {
    // setting each items position
    this.setState({ [section]: y });
  };
  onScroll = ({ nativeEvent: { contentOffset: { y, x } } }) => {
    let _currentSection;
    // loop sections to calculate which section scrollview is on
    this.state.sections.forEach((section) => {
      // adding 15 to calculate Text's height
      if((y + 30) > this.state[section.key]) _currentSection = section.key
    })
    // settint the currentSection to the calculated current section
    this.setState({ currentSection: _currentSection })
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.sections}
            renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => this.moveToSetion(item.key)}
              >
                <View style={this.state.currentSection === item.key ? styles.itemContainerA : null}>
                  <Text style={styles.item}>
                    {item.key}
                  </Text>
                </View>
              </TouchableOpacity>
            }
          />
        </View>
        <ScrollView
          style={styles.scrollView}
          ref={ref => (this.scrollView = ref)}
          scrollEventThrottle={100}
          onScroll={this.onScroll}>
          {this.state.sections.map(section => (
            <Item
              key={section.key}
              index={section.key}
              products={section.products}
              navigation={this.props.navigation}
              onItemLayout={this.onItemLayout}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
  },
  container: {
    backgroundColor: '#ecf0f1',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  scrollView: {
    paddingLeft: 18,
  },
  item: {
    padding: 5,
    paddingBottom: 2,
    fontSize: 14,
    height: 30,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  container: {
    borderColor: 'gray',
    borderBottomWidth: 0.5,
    marginBottom: 15,
    backgroundColor: colors.white,
  },
  itemContainerA: {
    borderColor: colors.purple,
    borderBottomWidth: 5,
  },
  message: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    marginTop: 40,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: 'gray',
    maxWidth: '70%',
    textAlign: 'center'
  },
});


export default ProductsScroll;
