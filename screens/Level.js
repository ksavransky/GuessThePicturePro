import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, AsyncStorage, ActivityIndicator} from 'react-native';
import { Text } from 'react-native-elements';
import { get, find, filter } from 'lodash'
import { containerStyle, backgroundColorStyle } from '../styles/common'
import { TileIndex } from '../assets/images/whitemarbletiles/tileIndex.js'
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
      points: 100,
      visibleTiles: [
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true]
      ]
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

  handleTileClick = (event) => {
    console.warn('event.target')
    console.warn(event.target)
  }

  renderTiles = () => {
    let tiles = []

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.state.visibleTiles[i][j]) {
          let top = (i * 20) + '%'
          let left = (j * 20) + '%'
          tiles.push(
            <Image
              key={i + '_' + j}
              id={i + '_' + j}
              onPress={this.handleTileClick}
              style={[styles.tile, {top: top, left: left}]}
              source={TileIndex[i][j]}
              />
          )
        }
      }
    }

    return tiles
  }

  render() {
    if (this.state.currentLevel) {
      return (
        <View style={[containerStyle.centeredHorizontal, backgroundColorStyle.lightBlue]}>
          <View style={{width: '90%', height: '50%', position: 'relative'}}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={this.state.currentLevel.imagePath}
            />
            {this.renderTiles()}
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

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    width: '20%',
    height: '20%',
    borderColor: 'grey',
    borderWidth: 1
  },
  red: {
    color: 'red',
  },
});
