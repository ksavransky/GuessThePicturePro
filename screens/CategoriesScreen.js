import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { containerStyle, backgroundColorStyle } from '../styles/common.js'
import { GameData } from '../data/Data.js'
import { get } from 'lodash'
import Categories from '../components/Categories.js'
import { clearAllData } from '../utils/asyncstorage'
import { AsyncStorage } from 'react-native';

const GAME_DATA = 'GameData'

export default class CategoriesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      difficulty: get(props, 'navigation.state.params.difficulty', 'Easy'),
      gameData: GameData
    }
    // clearAllData()
    this.getLocalStorageData()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      difficulty: get(nextProps, 'navigation.state.params.difficulty', 'Easy')
    })
  }

  getLocalStorageData = () => {
    AsyncStorage.getItem(GAME_DATA).then((storedGameData) => {
      if (storedGameData) {
        this.setState({
          gameData: JSON.parse(storedGameData)
        })
      } else {
        AsyncStorage.setItem(GAME_DATA, JSON.stringify(GameData))
      }
    })
  }



  getTitleColor = () => {
    const difficulty = this.state.difficulty
    if ( difficulty === 'Easy' ) {
        return '#28a745'
    } else if ( difficulty === 'Medium' ) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  render() {
    const titleColor = this.getTitleColor()
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
        <Text h4 fontFamily='ChalkboardSE' style={{color: titleColor}}>
          {this.state.difficulty}
        </Text>
        <Categories
          navigation={this.props.navigation}
          difficulty={this.state.difficulty}
          gameData={this.state.gameData}
          titleColor={titleColor}
        />
      </View>
    )
  }
}
