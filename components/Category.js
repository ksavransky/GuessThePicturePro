import React, { Component } from 'react';
import { View, Image } from 'react-native';

export default class Category extends Component {

  render() {
    return (
      <View style={[containerStyle.centered, backgroundColorStyle.lightBlue]}>
        <Text h4 style={{color: 'blue', marginBottom: 200}}>Choose A Category</Text>
      </View>
    )
  }
}
