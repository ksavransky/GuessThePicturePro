import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import LargeButton from '../components/buttons/LargeButton'
import { StyleSheet } from 'react-native';
import { containerStyle, backgroundColorStyle } from '../styles/common.js'

export default class ChooseDifficulty extends Component {
  render() {
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
        <Text h3 fontFamily='ChalkboardSE' style={{color: 'blue', marginBottom: 100}}>Choose Difficulty</Text>
        <LargeButton
          onPress={() => this.props.navigation.navigate('CategoriesScreen', {difficulty: 'Easy'})}
          backgroundColor='#28a745'
          style={{marginBottom: 50}}
          title='EASY' />
        <LargeButton
          onPress={() => this.props.navigation.navigate('CategoriesScreen', {difficulty: 'Medium'})}
          backgroundColor='orange'
          style={{marginBottom: 50}}
          title='MEDIUM' />
        <LargeButton
          onPress={() => this.props.navigation.navigate('CategoriesScreen', {difficulty: 'Hard'})}
          backgroundColor='red'
          style={{marginBottom: 50}}
          title='HARD' />
      </View>
    )
  }
}
