import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  StatusBar
} from 'react-native';

const Item = props => (
  <View
    style={{ minHeight: 500 }}
    onLayout={e => props.onItemLayout(e, props.index)}>
    <Text>{`Item ${props.index}`}</Text>
  </View>
);

class ProductsScroll extends Component {

  constructor() {
    super();
    this.state = {
      sections: [1, 2, 3],
      currentSection: 1
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
      if((y + 15) > this.state[section]) _currentSection = section
    })
    // settint the currentSection to the calculated current section
    this.setState({ currentSection: _currentSection })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {this.state.sections.map(section => (
            <Button
              key={section}
              title={`Section ${section}`}
              color={this.state.currentSection === section ? 'red' : 'blue'}
              onPress={() => this.moveToSetion(section)}
            />
          ))}
        </View>
        <ScrollView
          style={styles.scrollView}
          ref={ref => (this.scrollView = ref)}
          scrollEventThrottle={100}
          onScroll={this.onScroll}>
          {this.state.sections.map(section => (
            <Item
              key={section}
              index={section}
              onItemLayout={this.onItemLayout}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // position: 'absolute',
  },
  scrollView: {
    paddingLeft: 15,
    paddingRight: 15
  }
});


export default ProductsScroll;
