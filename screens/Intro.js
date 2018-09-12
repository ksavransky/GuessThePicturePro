import React, { Component } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import LargeButton from '../components/buttons/LargeButton'
import { containerStyle, backgroundColorStyle } from '../styles/common'
import { AsyncStorageData } from '../data/Data.js'
import { get } from 'lodash'
import { clearAllData } from '../utils/asyncstorage'
import { AsyncStorage } from 'react-native';

export default class Intro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncStorageData: null
    }
    // Leave clearAllData() below for dev testing
    // clearAllData()
    this.getLocalStorageData()
  }

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
    const {categoryName,  difficulty} = this.state.asyncStorageData.SavedLevel
    if (difficulty && categoryName) {
      this.props.navigation.navigate('LoadSavedLevel', {categoryName: categoryName, difficulty: difficulty})
    } else {
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
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
        <Image style={{width: 70, height: 90}} source={require('../assets/images/monkey.png')} />
        <Text fontFamily='ChalkboardSE' h4 style={{color: 'red', marginBottom: 20}}>Spunky Monkey Games</Text>
        <Text style={{marginBottom: 20}}>Presents</Text>
        <Text h3 style={{color: 'blue', marginBottom: 200}}>Guess The Picture Pro</Text>
        <LargeButton
          onPress={this.handlePlayClick}
          backgroundColor='#28a745'
          fontFamily='ChalkboardSE'
          text='PLAY' />
      </View>
    )
  }
}
