import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { get, find, filter } from 'lodash'
import { AsyncStorage } from 'react-native';
import { containerStyle, backgroundColorStyle } from '../styles/common'
import Spinner from 'react-native-loading-spinner-overlay';
// import { retrieveData } from '../utils/asyncstorage'

const GAME_DATA = 'GameData'

export default class Level extends Component {
  constructor(props) {
    super(props)

    this.difficulty = get(props, 'navigation.state.params.difficulty', 'Easy')
    this.categoryName = get(props, 'navigation.state.params.categoryName', 'Places')

    this.state = {
      gameData: null,
      availableLevels: [],
      currentLevel: null,
      points: 100
    }
  }

  componentWillMount() {
    this.getAvailableLevels()
    this.getGameData()
  }

  getAvailableLevels = () => {
    const availableLevels = filter(this.props.navigation.state.params.categoryLevels, ['isCompleted', false])
    this.setState({
      availableLevels: availableLevels
    }, () => {
      this.chooseRandomLevel()
    })
  }

  getGameData = () => {
    AsyncStorage.getItem(GAME_DATA).then((storedGameData) => {
      this.setState({
        gameData: JSON.parse(storedGameData)
      })
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
        <Spinner visible textContent='Loading...' textStyle={{color: 'white'}} />
      </View>
    )
  }
}
