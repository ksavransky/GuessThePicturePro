import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { containerStyle, backgroundColorStyle } from '../styles/common.js'

// props
// image - string
// name - string
// difficulty - string
// totalPuzzles - int 
// completedPuzzles - int

export default class Category extends Component {

  render() {
    return (
      <View style={[containerStyle.centeredHorizontal, backgroundColorStyle.lightBlue]}>
        <Text
          h4
          fontFamily='ChalkboardSE'
          style={{color: 'blue', marginBottom: 50}}
          >
            Choose a Category
          </Text>
      </View>
    )
  }
}
