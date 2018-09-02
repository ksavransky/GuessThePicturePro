import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Image, StyleSheet, TouchableOpacity, AsyncStorage, ActivityIndicator, Keyboard, Dimensions} from 'react-native';
import { Text, FormLabel, FormInput } from 'react-native-elements';
import { get, filter, cloneDeep } from 'lodash'
import { containerStyle, backgroundColorStyle } from '../styles/common'
import { TileIndex } from '../assets/images/whitemarbletiles/tileIndex.js'
import LargeButton from '../components/buttons/LargeButton'

const window = Dimensions.get('window');

const GAME_DATA = 'GameData'

export default class Level extends Component {
  constructor(props) {
    super(props)

    this.difficulty = get(props, 'navigation.state.params.difficulty', 'Easy')
    this.categoryName = get(props, 'navigation.state.params.categoryName', 'Places')
    this.titleColor = get(props, 'navigation.state.params.titleColor', '#28a745')
    this.screenHeight = Dimensions.get('window').height
    this.isiPad = this.screenHeight > 900

    this.state = {
      isiPad: false,
      isTileLoaded: false,
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
      ],
      guessInput: null,
      isKeyBoardOpen: false
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

  handleTileClick = (i, j) => {
    let visibleTiles = cloneDeep(this.state.visibleTiles)
    visibleTiles[i][j] = false
    this.setState({
      visibleTiles: visibleTiles
    })
  }

  handleGuessInput = (event) => {
    this.setState({
      guessInput: event
    })
  }

  handleSubmit = () => {

  }

  renderTiles = () => {
    let tiles = []

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.state.visibleTiles[i][j]) {
          let top = (i * 20) + '%'
          let left = (j * 20) + '%'
          tiles.push(
            <TouchableOpacity
              onPress={() => this.handleTileClick(i, j)}
              key={i + '_' + j}
              style={[styles.tile, {top: top, left: left}]}
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

  render() {
    let hideTitleAndPointsWhenKeyboardOpen = 'flex'
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
      hideTitleAndPointsWhenKeyboardOpen = 'none'
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
          <Text h4 fontFamily='ChalkboardSE' style={{color: this.titleColor, margin: 10, display: hideTitleAndPointsWhenKeyboardOpen}}>
            {this.categoryName}
          </Text>
          <Text h5 style={{color: 'black', marginBottom: 10, marginRight: 20, alignSelf: 'flex-end', display: hideTitleAndPointsWhenKeyboardOpen}}>
            {'Points: ' + this.state.points}
          </Text>
          <View style={{width: '90%', height: '50%', position: 'relative'}}>
            <Image
              style={{width: '100%', height: '100%', opacity: hideImageWhileTileLoading}}
              source={this.state.currentLevel.imagePath}
            />
            {this.renderTiles()}
          </View>
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
                inputStyle={{color: 'black', fontSize: inputFontSize}}
                onChangeText={this.handleGuessInput}/>
              {this.state.isKeyBoardOpen &&
                <LargeButton
                  onPress={this.handleSubmit}
                  fontFamily='ChalkboardSE'
                  fontSize={14}
                  style={{
                    position: 'absolute',
                    right: 7,
                    bottom: 7
                  }}
                  backgroundColor='#28a745'
                  text='SUBMIT' />
              }
            </View>
          </View>
          {
            !this.state.isKeyBoardOpen &&
              <LargeButton
                onPress={this.handleSubmit}
                fontFamily='ChalkboardSE'
                fontSize={24}
                style={{marginTop: 30}}
                backgroundColor='#28a745'
                text='SUBMIT' />
          }
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

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    width: '20%',
    height: '20%',
    borderColor: 'grey',
    borderWidth: 1
  }
});
