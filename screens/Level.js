import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Image, StyleSheet, TouchableOpacity, AsyncStorage, ActivityIndicator, Keyboard, Dimensions} from 'react-native';
import { Text, FormLabel, FormInput } from 'react-native-elements';
import { get, filter, cloneDeep } from 'lodash'
import { containerStyle, backgroundColorStyle } from '../styles/common'
import { TileIndex } from '../assets/images/whitemarbletiles/tileIndex.js'
import LargeButton from '../components/buttons/LargeButton'
import SmallButton from '../components/buttons/SmallButton'

const window = Dimensions.get('window');

const GAME_DATA = 'GameData'

const NUMBER_OF_TILES_PER = {
  ROW: 5,
  COLUMN: 5
}

const PHOTO_SCREEN_PERCENT = {
  WIDTH: 0.9,
  HEIGHT: 0.45
}

export default class Level extends Component {
  constructor(props) {
    super(props)

    this.difficulty = get(props, 'navigation.state.params.difficulty', 'Easy')
    this.categoryName = get(props, 'navigation.state.params.categoryName', 'Places')
    this.titleColor = get(props, 'navigation.state.params.titleColor', '#28a745')

    const { height, width } = Dimensions.get('window')
    this.screenHeight = height
    this.screenWidth = width
    this.isiPad = this.screenHeight > 900

    const photoPercentWidthOfScreen = this.screenWidth * PHOTO_SCREEN_PERCENT.WIDTH
    const widthRemainder = photoPercentWidthOfScreen % NUMBER_OF_TILES_PER.ROW
    this.photoWidth = photoPercentWidthOfScreen - widthRemainder
    this.tileWidth = this.photoWidth / NUMBER_OF_TILES_PER.ROW

    const photoPercentHeightOfScreen = this.screenHeight * PHOTO_SCREEN_PERCENT.HEIGHT
    const heightRemainder = photoPercentHeightOfScreen % NUMBER_OF_TILES_PER.COLUMN
    this.photoHeight = photoPercentHeightOfScreen - heightRemainder
    this.tileHeight = this.photoHeight / NUMBER_OF_TILES_PER.COLUMN

    this.state = {
      isiPad: false,
      isTileLoaded: false,
      gameData: null,
      availableLevels: [],
      currentLevel: null,
      points: 200,
      visibleTiles: [
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true]
      ],
      guessInput: null,
      isKeyBoardOpen: false,
      guessesLeft: 3,
      revealsLeft: 12
    }
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.getAvailableLevels()
    this.getGameData()
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      isKeyBoardOpen: true
    })
  }

  _keyboardDidHide = () => {
    this.setState({
      isKeyBoardOpen: false
    })
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

  handleTilePress = (i, j) => {
    if (this.state.revealsLeft > 0) {
      let visibleTiles = cloneDeep(this.state.visibleTiles)
      visibleTiles[i][j] = false
      this.setState({
        visibleTiles: visibleTiles,
        revealsLeft: this.state.revealsLeft - 1,
        points: (this.state.revealsLeft < 11 ) ? (this.state.points - 10) : this.state.points
      })
    } else {
      console.warn('No more reveals')
    }
  }

  handleGuessInput = (event) => {
    this.setState({
      guessInput: event
    })
  }

  handleSubmit = () => {

  }

  renderTitle = (hideTitleAndGameInfoWhenKeyboardOpen) => {
    return (
      <Text h4 fontFamily='ChalkboardSE' style={{color: this.titleColor, margin: 10, display: hideTitleAndGameInfoWhenKeyboardOpen}}>
        {this.categoryName}
      </Text>
    )
  }

  renderGameInfo = (hideTitleAndGameInfoWhenKeyboardOpen) => {
    return (
      <View style={{marginLeft: '10%', width: '100%', flexDirection: 'row', display: hideTitleAndGameInfoWhenKeyboardOpen, marginBottom: 10}}>
        <Text h5 style={{color: '#3e3e3e', width: '33%'}}>
          {'Reveals Left: ' + this.state.revealsLeft}
        </Text>
        <Text h5 style={{color: '#3e3e3e', width: '27%', textAlign: 'center'}}>
          {'Guesses Left: ' + this.state.guessesLeft}
        </Text>
        <Text h5 style={{color: '#3e3e3e', width: '30%', textAlign: 'right'}}>
          {'Points: ' + this.state.points}
        </Text>
      </View>
    )
  }

  renderPhoto = (hideImageWhileTileLoading) => {
    return (
      <View style={{width: this.photoWidth, height: this.photoHeight, position: 'relative'}}>
        <Image
          style={{width: '100%', height: '100%', opacity: hideImageWhileTileLoading, zIndex: 1}}
          source={this.state.currentLevel.imagePath}
        />
        <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 2}}>
          {this.renderTiles()}
        </View>
      </View>
    )
  }

  renderTiles = () => {
    let tiles = []

    for (let i = 0; i < NUMBER_OF_TILES_PER.ROW; i++) {
      for (let j = 0; j < NUMBER_OF_TILES_PER.COLUMN; j++) {
        if (this.state.visibleTiles[i][j]) {
          let top = i * this.tileHeight
          let left = j * this.tileWidth
          tiles.push(
            <TouchableOpacity
              activeOpacity={(this.state.revealsLeft > 0) ? 0.5 : 1}
              onPress={() => this.handleTilePress(i, j)}
              key={i + '_' + j}
              style={{
                top: top,
                left: left,
                position: 'absolute',
                height: this.tileHeight,
                width: this.tileWidth,
                borderColor: 'grey',
                borderWidth: 1
              }}
              >
              <Image
                style={{width: '100%', height: '100%'}}
                source={TileIndex[i][j]}
                onLoad={() => {
                  if (i === 4 && j === 4) {
                    this.setState({isTileLoaded: true})
                  }
                }}
                />
            </TouchableOpacity>
          )
        }
      }
    }
    return tiles
  }

  renderForm = (totalFormWidth, formLabelMarginTop, formLabelFontSize, formInputMarginTop, formInputWidth, inputFontSize) => {
    return (
      <View style={{width: totalFormWidth, flexDirection: 'column'}}>
        <FormLabel
          containerStyle={{width: '100%', marginTop: formLabelMarginTop}}
          labelStyle={{color: 'grey', fontSize: formLabelFontSize, fontWeight: '400'}}>
          {'Your Guess:'}
        </FormLabel>
        <View style={{marginTop: formInputMarginTop, width: '100%', flexDirection: 'row', position: 'relative'}}>
          <FormInput
            spellCheck={false}
            autoCorrect={false}
            maxLength={32}
            containerStyle={{borderBottomColor: 'grey', width: formInputWidth}}
            inputStyle={{paddingLeft: 3, color: 'black', fontSize: inputFontSize}}
            onChangeText={this.handleGuessInput}/>
          {this.state.isKeyBoardOpen &&
            <SmallButton
              onPress={this.handleSubmit}
              fontFamily='ChalkboardSE'
              topBottomPadding={10}
              style={{
                position: 'absolute',
                right: 9,
                bottom: 7
              }}
              backgroundColor='#28a745'
              text='SUBMIT' />
          }
        </View>
      </View>
    )
  }

  renderBottomButton = () => {
    if (!this.state.isKeyBoardOpen) {
      return (
          <LargeButton
            onPress={this.handleSubmit}
            fontFamily='ChalkboardSE'
            fontSize={24}
            style={{marginTop: 30}}
            backgroundColor='#28a745'
            text='SUBMIT' />
        )
    } else {
      return null
    }
  }

  render() {
    let hideTitleAndGameInfoWhenKeyboardOpen = 'flex'
    let formLabelMarginTop = 20
    let formLabelFontSize = 20
    let formInputMarginTop = 10
    let formInputWidth = '90%'
    let formInputAlignment = 'center'
    let inputFontSize = 20
    let totalFormWidth = '100%'

    let hideBigButtonWhenKeyboardOpen = 'flex'
    let showSmallButtonWhenKeyboardOpen = 'none'

    if (this.state.isKeyBoardOpen) {
      hideTitleAndGameInfoWhenKeyboardOpen = 'none'
      formInputWidth = '90%'
      formInputAlignment = 'flex-start'
      hideBigButtonWhenKeyboardOpen = 'none'
      showSmallButtonWhenKeyboardOpen = 'flex'

      if (!this.isiPad) {
        formLabelMarginTop = 0
        formLabelFontSize = 12
        formInputMarginTop = 0
        inputFontSize = 16
      }
    }

    if (this.isiPad) {
      totalFormWidth = '90%'
    }

    let hideImageWhileTileLoading = 0
    if (this.state.isTileLoaded) {
      hideImageWhileTileLoading = 1
    }

    if (this.state.currentLevel) {
      return (
        <KeyboardAvoidingView style={[containerStyle.centeredHorizontal, backgroundColorStyle.lightBlue]}>
          {this.renderTitle(hideTitleAndGameInfoWhenKeyboardOpen)}
          {this.renderGameInfo(hideTitleAndGameInfoWhenKeyboardOpen)}
          {this.renderPhoto(hideImageWhileTileLoading)}
          {this.renderForm(totalFormWidth, formLabelMarginTop, formLabelFontSize, formInputMarginTop, formInputWidth, inputFontSize)}
          {this.renderBottomButton()}
        </KeyboardAvoidingView>
      )
    }
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
        <ActivityIndicator size="large" color='black' />
      </View>
    )
  }
}
