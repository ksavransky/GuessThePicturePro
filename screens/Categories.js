import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { containerStyle, backgroundColorStyle } from '../styles/common.js'
import { get } from 'lodash'

export default class Categories extends Component {

  getTitleClass = (difficulty) => {
    if ( difficulty === 'Easy' ) {
        return '#28a745'
    } else if ( difficulty === 'Medium' ) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  render() {
    const difficulty = get(this.props, 'navigation.state.params.difficulty', 'Easy')
    return (
      <View style={[containerStyle.centeredHorizontal, backgroundColorStyle.lightBlue]}>
        <Text
          h5
          style={{alignSelf: 'flex-start', margin: 10}}
          onPress={() => {
            this.props.navigation.navigate('ChooseDifficulty')
          }}>
            {'< Select Difficulty'}
          </Text>
        <Text h4 fontFamily='ChalkboardSE' style={{color: this.getTitleClass(difficulty), marginBottom: 50}}>
            {difficulty}
          </Text>
      </View>
    )
  }
}
