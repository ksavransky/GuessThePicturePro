import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { get, find } from 'lodash'
import { GameData } from '../data/Data.js'
import { containerStyle, backgroundColorStyle } from '../styles/common'
import { retrieveData } from '../utils/asyncstorage'

export default class Level extends Component {
  constructor(props) {
    super(props)

    this.difficulty = get(props, 'navigation.state.params.difficulty', 'Easy')
    this.category = get(props, 'navigation.state.params.category', 'Places')

    // this.getAvailableLevels(this.difficulty, this.category)
    //
    // this.state = {
    //   availableLevels: []
    // }
  }

  // getAvailableLevels = (difficulty, category) => {
  //   const allLevels = find(GameData[difficulty], ['name', category]).levels
  //   allLevels.forEach((level) => {
  //     let levelAnswer = Object.keys(level)[0]
  //     console.warn('levelAnswer1')
  //     console.warn(levelAnswer)
  //     retrieveData((difficulty + ':' + category + ':' + levelAnswer), (value, levelAnswer) => {
  //       // console.warn('value in getAvailableLevels')
  //       // console.warn(value)
  //       if (!value) {
  //         console.warn('in here');
  //         console.warn('levelAnswer2')
  //         console.warn(levelAnswer)
  //         let newAvailableLevels = clone(this.state.availableLevels)
  //         newAvailableLevels.push(levelAnswer)
  //         console.warn('newAvailableLevels')
  //         console.warn(newAvailableLevels)
  //         this.setState({
  //           availableLevels: newAvailableLevels
  //         })
  //       }
  //     })
  //   })
  // }

  render() {
    // console.warn(this.state.availableLevels)
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
      </View>
    )
  }
}
