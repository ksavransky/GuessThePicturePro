import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { get } from 'lodash'
import { containerStyle, backgroundColorStyle } from '../styles/common'
import { retrieveData } from '../utils/asyncstorage'

export default class Level extends Component {
  constructor(props) {
    super(props)

    this.difficulty = get(props, 'navigation.state.params.difficulty', null)
    this.category = get(props, 'navigation.state.params.category', null)

    this.state = {

    }
  }

  render() {
    console.warn(this.difficulty)
    console.warn(this.category)
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
      </View>
    )
  }
}
