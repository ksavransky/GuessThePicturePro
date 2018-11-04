import React, { Component } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import LargeButton from '../components/buttons/LargeButton'
import { containerStyle, backgroundColorStyle } from '../styles/Common'
import { AsyncStorageData } from '../data/Data.js'
import { get, find } from 'lodash'
import { clearAllData } from '../utils/Asyncstorage'
import { getTitleColorFromDifficulty } from '../utils/Utils'
import { AsyncStorage } from 'react-native';
import { CONSTANTS } from '../Constants'

export default class Intro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncStorageData: null,
      isPhotoLoaded: false
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
    const {categoryName,  difficulty, revealsLeft} = this.state.asyncStorageData.SavedLevel
    if (difficulty && categoryName && revealsLeft !== CONSTANTS.STARTING_REVEALS_LEFT) {
      const titleColor = getTitleColorFromDifficulty(difficulty)
      const categoryLevels = find(this.state.asyncStorageData.Game[difficulty], ['name', categoryName]).levels
      this.props.navigation.navigate('LoadSavedLevel', {categoryName: categoryName, difficulty: difficulty, categoryLevels: categoryLevels})
    } else {
      this.props.navigation.navigate('ChooseDifficulty', {isSoundOn: this.state.asyncStorageData.General.isSoundOn})
    }
  }

  render() {
    if (!this.state.asyncStorageData) {
      return (
        <View style={[containerStyle.centeredBoth, {backgroundColor: '#E3F2FD'}]}>
          <ActivityIndicator size="large" color='black' />
        </View>
      )
    }
    const { isPhotoLoaded } = this.state
    const viewStyle = isPhotoLoaded ? [containerStyle.verticalSpaceAround] : [containerStyle.centeredBoth, {backgroundColor: '#E3F2FD'}]

    return (
      <View style={viewStyle}>
        <ActivityIndicator size="large" color='black' style={{display: isPhotoLoaded ? 'none' : 'flex'}}/>
        <Image
          onLoad={() => {
            if (!isPhotoLoaded){
              this.setState({
                isPhotoLoaded: true
              })
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: isPhotoLoaded ? 0.7 : 0,
          }}
          source={require('../assets/images/eiffel-large.jpg')} />
        <Text h2 style={{color: '#424242', marginBottom: 0, opacity: isPhotoLoaded ? 1 : 0}}>Picture Guess Pro</Text>
        <LargeButton
          onPress={this.handlePlayClick}
          isSoundOn={this.state.asyncStorageData.General.isSoundOn}
          backgroundColor='#43A047'
          fontFamily='ChalkboardSE'
          style={{display: isPhotoLoaded ? 'flex' : 'none'}}
          text='PLAY' />
      </View>
    )
  }
}
