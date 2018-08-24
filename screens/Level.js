import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { get, find, filter } from 'lodash'
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { containerStyle, backgroundColorStyle } from '../styles/common'
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

  componentDidMount() {
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
    const randomLevel = Math.floor(Math.random() * this.state.availableLevels.length);
    this.setState({
      currentLevel: this.state.availableLevels[randomLevel]
    })
  }

  render() {
    if (this.state.currentLevel) {
      return (
        <View style={[containerStyle.centeredHorizontal, backgroundColorStyle.lightBlue]}>
          <View style={{width: '90%', height: '60%', position: 'relative'}}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={this.state.currentLevel.imagePath}
            />
            <Image
              style={{width: '20%', height: '20%', position: 'absolute', top: 0}}
              source={require('../assets/images/tile.jpeg')}
            />
          </View>
        </View>
      )
    }
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
        <ActivityIndicator size="large" color='black' />
      </View>
    )
  }
}
