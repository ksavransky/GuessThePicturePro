import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { get, find, filter } from 'lodash'
import { containerStyle, backgroundColorStyle } from '../styles/common'
// import { retrieveData } from '../utils/asyncstorage'

export default class Level extends Component {
  constructor(props) {
    super(props)

    this.difficulty = get(props, 'navigation.state.params.difficulty', 'Easy')
    this.categoryName = get(props, 'navigation.state.params.categoryName', 'Places')

    this.state = {
      availableLevels: [],
      currentLevel: null,
      points: 100
    }
  }

  componentWillMount() {
    this.getAvailableLevels()
  }

  getAvailableLevels = () => {
    const availableLevels = filter(this.props.navigation.state.params.categoryLevels, ['isCompleted', false])
    this.setState({
      availableLevels: availableLevels
    }, () => {
      this.chooseRandomLevel()
    })
  }

  chooseRandomLevel = () => {
    const randomLevel = Math.floor(Math.random() * (this.state.availableLevels.length + 1));
    this.setState({
      currentLevel: this.state.availableLevels[randomLevel]
    })
  }

  render() {
    if (this.state.currentLevel) {
      console.warn('this.state.currentLevel.answer')
      console.warn(this.state.currentLevel.answer)
      return (
        <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
        </View>
      )
    }
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
      </View>
    )
  }
}
