import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { containerStyle, backgroundColorStyle } from '../styles/common.js'

export default class Categories extends Component {

  render() {
    return (
      <View style={[containerStyle.centered, backgroundColorStyle.lightBlue]}>
        <Text h4 style={{color: 'blue', marginBottom: 200}}>Choose A Category</Text>
      </View>
    )
  }
}
