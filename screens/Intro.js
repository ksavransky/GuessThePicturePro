import React, { Component } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import LargeButton from '../components/buttons/LargeButton'
import { containerStyle, backgroundColorStyle } from '../styles/Common'
import { AsyncStorageData } from '../data/Data.js'
import { get, find } from 'lodash'
import { clearAllData } from '../utils/Asyncstorage'
import { getTitleColorFromDifficulty } from '../utils/Utils.js'
import { AsyncStorage } from 'react-native';
import { CONSTANTS } from '../Constants'
// import { playSound } from '../utils/Utils'

export default class Intro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncStorageData: null
    }
    // Leave clearAllData() below for dev testing
    // clearAllData()
    this.getLocalStorageData()
    // this.playedMonkeySoundOnce = false
  }

  // playMonkeySound = async () => {
  //   if (this.state.asyncStorageData.General.isSoundOn) {
  //     try {
  //       await Audio.setIsEnabledAsync(true);
  //       const sound = new Audio.Sound();
  //       await sound.loadAsync(MONKEY_SOUND);
  //       await sound.playAsync();
  //     } catch(error) {
  //       console.error(error);
  //     }
  //   }
  // }

  getLocalStorageData = () => {
    AsyncStorage.getItem('AsyncStorageData').then((storedData) => {
      if (storedData) {
        this.setState({
          asyncStorageData: JSON.parse(storedData)
        })
      } else {
        this.setState({
          asyncStorageData: AsyncStorageData
        })
        AsyncStorage.setItem('AsyncStorageData', JSON.stringify(AsyncStorageData))
      }
    })
  }

  handlePlayClick = () => {
    const {categoryName,  difficulty, revealsLeft} = this.state.asyncStorageData.SavedLevel
    if (difficulty && categoryName && revealsLeft !== CONSTANTS.STARTING_REVEALS_LEFT) {
      const titleColor = getTitleColorFromDifficulty(difficulty)
      const categoryLevels = find(this.state.asyncStorageData.Game[difficulty], ['name', categoryName]).levels
      this.props.navigation.navigate('LoadSavedLevel', {categoryName: categoryName, difficulty: difficulty, categoryLevels: categoryLevels})
    } else {
      // this.props.navigation.navigate('ChooseDifficulty', {isSoundOn: this.state.asyncStorageData.General.isSoundOn})
      this.props.navigation.navigate('ChooseDifficulty')
    }
  }

  render() {
    if (!this.state.asyncStorageData) {
      return (
        <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
          <ActivityIndicator size="large" color='black' />
        </View>
      )
    }
    if (!this.playedMonkeySoundOnce) {
      // playSound('monkey', this.state.asyncStorageData.General.isSoundOn)
      // this.playedMonkeySoundOnce = true
    }
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
        <Image style={{width: 70, height: 90}} source={require('../assets/images/monkey.png')} />
        <Text fontFamily='ChalkboardSE' h4 style={{color: 'red', marginBottom: 20}}>Spunky Monkey Games</Text>
        <Text style={{marginBottom: 20}}>Presents</Text>
        <Text h3 style={{color: 'blue', marginBottom: 200}}>Picture Guess Pro</Text>
        <LargeButton
          onPress={this.handlePlayClick}
          // isSoundOn={this.state.asyncStorageData.General.isSoundOn}
          backgroundColor='#28a745'
          fontFamily='ChalkboardSE'
          text='PLAY' />
      </View>
    )
  }
}
