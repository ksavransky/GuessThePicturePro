import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, AsyncStorage, ActivityIndicator, Keyboard} from 'react-native';
import { Text, FormLabel, FormInput, Button } from 'react-native-elements';
import { get, filter, cloneDeep } from 'lodash'
import { containerStyle, backgroundColorStyle } from '../styles/common'
import { TileIndex } from '../assets/images/whitemarbletiles/tileIndex.js'

const GAME_DATA = 'GameData'

export default class Level extends Component {
  constructor(props) {
    super(props)

    this.difficulty = get(props, 'navigation.state.params.difficulty', 'Easy')
    this.categoryName = get(props, 'navigation.state.params.categoryName', 'Places')
    this.titleColor = get(props, 'navigation.state.params.titleColor', '#28a745')

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
                />
            </TouchableOpacity>
          )
        }
      }
    }
    return tiles
  }

  render() {
    let hideElementsWhenKeyboardOpen = 'flex'
    let formLabelMarginTop = 20
    let formLabelFontSize = 20
    let formInputMarginTop = 10
    if (this.state.isKeyBoardOpen) {
      hideElementsWhenKeyboardOpen = 'none'
      formLabelMarginTop = 0
      formLabelFontSize = 12
      formInputMarginTop = 0
    }

    if (this.state.currentLevel) {
      return (
        <View style={[containerStyle.centeredHorizontal, backgroundColorStyle.lightBlue]}>
          <Text h4 fontFamily='ChalkboardSE' style={{color: this.titleColor, margin: 10, display: hideElementsWhenKeyboardOpen}}>
            {this.categoryName}
          </Text>
          <Text h5 style={{color: 'black', marginBottom: 10, marginRight: 20, alignSelf: 'flex-end', display: hideElementsWhenKeyboardOpen}}>
            {'Points: ' + this.state.points}
          </Text>
          <View style={{width: '90%', height: '50%', position: 'relative'}}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={this.state.currentLevel.imagePath}
            />
            {this.renderTiles()}
          </View>
          <FormLabel
            containerStyle={{alignSelf: 'flex-start', marginTop: formLabelMarginTop}}
            labelStyle={{color: 'grey', fontSize: formLabelFontSize, fontWeight: '400'}}>
            {'Your Guess:'}
          </FormLabel>
          <FormInput
            spellCheck={false}
            autoCorrect={false}
            containerStyle={{width: '90%', borderBottomColor: 'grey', marginTop: formInputMarginTop}}
            inputStyle={{color: 'black', fontSize: 20}}
            onChangeText={this.handleGuessInput}/>
          <Button
            onPress={this.handleSubmit}
            raised
            rounded
            fontFamily='ChalkboardSE'
            fontSize={24}
            containerViewStyle={{marginTop: 40, backgroundColor: 'transparent'}}
            backgroundColor='#28a745'
            title='SUBMIT' />
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
  }
});
