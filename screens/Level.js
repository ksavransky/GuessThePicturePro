import React, { Component } from 'react';
import { View,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Keyboard,
  Dimensions,
  Modal
} from 'react-native';
import { Text, FormLabel, FormInput } from 'react-native-elements';
import { get, filter, cloneDeep, every, remove, findIndex, find, isEqual } from 'lodash'
import { containerStyle, backgroundColorStyle, modalStyle } from '../styles/Common'
import { TileIndex } from '../assets/images/whitemarbletiles/tileIndex.js'
import LargeButton from '../components/buttons/LargeButton'
import SmallButton from '../components/buttons/SmallButton'
import SoundButton from '../components/buttons/SoundButton'
import CloseButton from '../components/buttons/CloseButton'
import { CONSTANTS } from '../Constants'
import { playSound } from '../utils/Utils'

const window = Dimensions.get('window');

const NUMBER_OF_TILES_PER = {
  ROW: 5,
  COLUMN: 5
}

const PHOTO_SCREEN_PERCENT = {
  WIDTH: 0.9,
  HEIGHT: 0.45
}

const INSTRUCTIONS = {
  LINE_1: 'Tap on the tiles underneath this message to reveal the photo!',
  LINE_2: 'When you think you know what the photo is showing, type your guess below.',
  LINE_3: 'You have 3 guesses and can reveal up to 12 tiles. Good Luck!'
}

const ALL_TILES_COVERING = [
  [true, true, true, true, true],
  [true, true, true, true, true],
  [true, true, true, true, true],
  [true, true, true, true, true],
  [true, true, true, true, true]
]

const WRONG_MESSAGES = [
  "Sorry, that's wrong.",
  "Wrong answer. Try again.",
  "Nope. That's wrong.",
  "You can do better.",
  "Keep trying. You'll get it."
]

export default class Level extends Component {
  constructor(props) {
    super(props)

    this.difficulty = get(props, 'navigation.state.params.difficulty', 'Easy')
    this.categoryName = get(props, 'navigation.state.params.categoryName', 'Places')
    this.titleColor = get(props, 'navigation.state.params.titleColor', '#28a745')
    this.categoryPoints = 0

    const { height, width } = Dimensions.get('window')
    this.screenHeight = height
    this.screenWidth = width
    this.isiPad = this.screenHeight > 900
    this.isiPhoneSE = this.screenHeight < 600

    const photoPercentWidthOfScreen = this.screenWidth * PHOTO_SCREEN_PERCENT.WIDTH
    const widthRemainder = photoPercentWidthOfScreen % NUMBER_OF_TILES_PER.ROW
    this.photoWidth = photoPercentWidthOfScreen - widthRemainder
    this.tileWidth = this.photoWidth / NUMBER_OF_TILES_PER.ROW

    const photoPercentHeightOfScreen = this.screenHeight * PHOTO_SCREEN_PERCENT.HEIGHT
    const heightRemainder = photoPercentHeightOfScreen % NUMBER_OF_TILES_PER.COLUMN
    this.photoHeight = photoPercentHeightOfScreen - heightRemainder
    this.tileHeight = this.photoHeight / NUMBER_OF_TILES_PER.COLUMN

    if (this.isiPhoneSE) {
      this.photoHeight = this.photoHeight * 0.9
      this.tileHeight = this.tileHeight * 0.9
    }

    this.state = {
      isTileLoaded: false,
      availableLevels: [],
      currentLevel: null,
      points: CONSTANTS.STARTING_POINTS,
      visibleTiles: ALL_TILES_COVERING,
      guessInput: null,
      isKeyBoardOpen: false,
      guessesLeft: 3,
      revealsLeft: CONSTANTS.STARTING_REVEALS_LEFT,
      atLeastOneGameStarted: false,
      showModal: false,
      usedHint: false,
      isSoundOn: false
    }

    this.storedData = null
  }

  componentWillReceiveProps() {
    this.getStoredDataAndLoadLevel()
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.getStoredDataAndLoadLevel()
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState.revealsLeft, this.state.revealsLeft) ||
        !isEqual(prevState.guessesLeft, this.state.guessesLeft) ||
        !isEqual(prevState.answer, this.state.answer) ||
        !isEqual(prevState.usedHint, this.state.usedHint)) {
      const savedLevel = {
        difficulty: this.difficulty,
        categoryName: this.categoryName,
        answer: this.state.currentLevel.answer,
        points: this.state.points,
        visibleTiles: this.state.visibleTiles,
        revealsLeft: this.state.revealsLeft,
        guessesLeft: this.state.guessesLeft,
        usedHint: this.state.usedHint
      }
      this.saveLevel(savedLevel)
    }
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

  loadSavedLevel = () => {
    const savedLevel = this.storedData.SavedLevel
    const currentLevel = find(this.state.availableLevels, ['answer', savedLevel.answer])
    this.setState({
      currentLevel: currentLevel,
      points: savedLevel.points,
      visibleTiles: savedLevel.visibleTiles,
      revealsLeft: savedLevel.revealsLeft,
      guessesLeft: savedLevel.guessesLeft,
      usedHint: savedLevel.usedHint,
    })
  }

  getAvailableLevels = () => {
    const availableLevels = filter(this.props.navigation.state.params.categoryLevels, ['isCompleted', false])
    this.setState({
      availableLevels: availableLevels
    }, () => {
      if (this.props.navigation.state.params.loadSavedLevel && this.storedData.SavedLevel.answer){
        this.loadSavedLevel()
      } else {
        this.chooseRandomLevel()
      }
    })
  }

  getStoredDataAndLoadLevel = () => {
    AsyncStorage.getItem('AsyncStorageData').then((storedData) => {
      this.storedData = JSON.parse(storedData)
      this.setState({
        isSoundOn: this.storedData.General.isSoundOn
      }, () => {
        this.getAvailableLevels()
      })
    })
  }

  chooseRandomLevel = (differentLevels) => {
    const availableLevels = differentLevels || this.state.availableLevels
    const randomLevel = Math.floor(Math.random() * availableLevels.length);
    this.setState({
      currentLevel: availableLevels[randomLevel]
    })
  }

  handleTilePress = (i, j) => {
    if (this.state.revealsLeft > 0) {
      let visibleTiles = cloneDeep(this.state.visibleTiles)
      visibleTiles[i][j] = false
      this.setState({
        visibleTiles: visibleTiles,
        revealsLeft: this.state.revealsLeft - 1,
        points: (this.state.revealsLeft < (CONSTANTS.STARTING_REVEALS_LEFT - 1) ) ? (this.state.points - 1) : this.state.points,
        atLeastOneGameStarted: true
      }, () => {
        playSound('reveal', this.state.isSoundOn)
      })
    } else {
      this.setState({showModal: 'no-reveals'}, () => {
        playSound('wrongbuzz', this.state.isSoundOn)
      })
    }
  }

  handleGuessInput = (event) => {
    this.setState({
      guessInput: event
    })
  }

  handleWrongAnswer = () => {
    const guessesLeft = this.state.guessesLeft - 1
    this.setState({
      showModal: guessesLeft > 0 ? 'wrong' : 'lose',
      guessesLeft: guessesLeft,
      points: this.state.points - 5
    }, () => {
      playSound('wrongbuzz', this.state.isSoundOn)
    })
  }

  handleCorrectAnswer = () => {
    this.setState({
      showModal: 'win'
    }, () => {
      playSound('applause', this.state.isSoundOn)
    })
  }

  handleSubmit = () => {
    const guessArray = this.state.guessInput.toLowerCase().split(' ')
    const optionalAnswer = this.state.currentLevel.optionalAnswer
    let isAnswerCorrect = false
    if (optionalAnswer) {
      optionalAnswer.forEach((answerArray) => {
        if (!isAnswerCorrect && every(answerArray, (word) => guessArray.includes(word))) {
          isAnswerCorrect = true
        }
      })
    } else {
      const answerArray = this.state.currentLevel.answer.split('_')
      isAnswerCorrect = every(answerArray, (word) => guessArray.includes(word))
    }
    if (isAnswerCorrect) {
      this.handleCorrectAnswer()
    } else {
      this.handleWrongAnswer()
    }
  }

  renderTitle = (hideTitleAndGameInfoWhenKeyboardOpen) => {
    return (
      <Text h4 fontFamily='ChalkboardSE' style={{color: this.titleColor, margin: 10, display: hideTitleAndGameInfoWhenKeyboardOpen}}>
        {this.categoryName}
      </Text>
    )
  }

  renderGameInfo = (hideTitleAndGameInfoWhenKeyboardOpen) => {
    const fontSizeForInfo = this.isiPhoneSE ? 12 : 14
    return (
      <View style={{marginLeft: '10%', width: '100%', flexDirection: 'row', display: hideTitleAndGameInfoWhenKeyboardOpen, marginBottom: 10}}>
        <Text style={{fontSize: fontSizeForInfo, color: '#3e3e3e', width: '33%'}}>
          {'Reveals Left: ' + this.state.revealsLeft}
        </Text>
        <Text style={{fontSize: fontSizeForInfo, color: '#3e3e3e', width: '28%', textAlign: 'center'}}>
          {'Guesses Left: ' + this.state.guessesLeft}
        </Text>
        <Text style={{fontSize: fontSizeForInfo, color: '#3e3e3e', width: '29%', textAlign: 'right'}}>
          {'Points: ' + this.state.points}
        </Text>
      </View>
    )
  }

  showHint = () => {
    this.setState({
      showModal: 'hint',
      usedHint: true,
      points: this.state.points - 5
    })
  }

  renderHintButton = () => {
    return (
      <SmallButton
        onPress={this.showHint}
        fontFamily='ChalkboardSE'
        topBottomPadding={10}
        isSoundOn={this.state.isSoundOn}
        style={{
          position: 'absolute',
          right: 20,
          top: 10,
          zIndex: 4
        }}
        backgroundColor='#28a745'
        text='HINT!' />
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
        {!this.state.atLeastOneGameStarted && this.state.revealsLeft === CONSTANTS.STARTING_REVEALS_LEFT && this.renderInstructions()}
      </View>
    )
  }

  renderInstructions = () => {
    return (
      <View pointerEvents='none' style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
      }}>
        <Text h5 style={{color: 'black', marginTop: (this.tileHeight + 10), textAlign: 'center'}}>
          {INSTRUCTIONS.LINE_1}
        </Text>
        <Text h5 style={{color: 'black', marginTop: 10, textAlign: 'center'}}>
          {INSTRUCTIONS.LINE_2}
        </Text>
        <Text h5 style={{color: 'black', marginTop: 10, textAlign: 'center'}}>
          {INSTRUCTIONS.LINE_3}
        </Text>
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
        {!this.state.usedHint && !this.state.isKeyBoardOpen && this.state.revealsLeft < CONSTANTS.STARTING_REVEALS_LEFT && this.renderHintButton()}
        <View style={{marginTop: formInputMarginTop, width: '100%', flexDirection: 'row', position: 'relative'}}>
          <FormInput
            spellCheck={false}
            autoCorrect={false}
            maxLength={32}
            containerStyle={{borderBottomColor: 'grey', width: formInputWidth}}
            inputStyle={{paddingLeft: 3, color: 'black', fontSize: inputFontSize}}
            value={this.state.guessInput}
            onChangeText={this.handleGuessInput}/>
          {this.state.isKeyBoardOpen &&
            <SmallButton
              onPress={this.handleSubmit}
              isSoundOn={this.state.isSoundOn}
              fontFamily='ChalkboardSE'
              topBottomPadding={10}
              disabled={!this.state.guessInput}
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
            isSoundOn={this.state.isSoundOn}
            disabled={!this.state.guessInput}
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

  navigateToCategoriesScreen = () => {
    this.props.navigation.navigate('CategoriesScreen', {difficulty: this.difficulty})
  }

  getAvailableLevelsWithoutCurrentLevel = () => {
    let availableLevels = cloneDeep(this.state.availableLevels)
    remove(availableLevels, (level) => {
      return level.answer === this.state.currentLevel.answer
    })
    return availableLevels
  }

  clearSavedLevel = () => {
    this.storedData.SavedLevel = {
      difficulty: null,
      categoryName: null,
      answer: null,
      points: null,
      visibleTiles: null,
      revealsLeft: null,
      guessesLeft: null,
      usedHint: null
    }
    AsyncStorage.setItem('AsyncStorageData', JSON.stringify(this.storedData))
  }

  saveLevel = (savedLevel) => {
    this.storedData.SavedLevel = savedLevel
    AsyncStorage.setItem('AsyncStorageData', JSON.stringify(this.storedData))
  }

  setAnotherLevel = (beatCategory = false) => {
    if (beatCategory && this.state.availableLevels.length === 0) {
      this.setState({
        showModal: 'beatCategory'
      }, () => {
        playSound('applause', this.state.isSoundOn)
      })
      this.clearSavedLevel()
    } else {
      this.setState({
        points: CONSTANTS.STARTING_POINTS,
        visibleTiles: ALL_TILES_COVERING,
        guessInput: null,
        isKeyBoardOpen: false,
        guessesLeft: 3,
        revealsLeft: CONSTANTS.STARTING_REVEALS_LEFT,
        showModal: false,
        usedHint: false
      }, () => {
        if (beatCategory) {
          this.chooseRandomLevel()
        } else {
          let differentLevels = null
          if (this.state.availableLevels.length > 1) {
            differentLevels = this.getAvailableLevelsWithoutCurrentLevel()
          }
          this.chooseRandomLevel(differentLevels)
        }
      })
    }
  }

  renderLoseModal = () => {
    return (
      <View style={modalStyle.innerContainer}>
        <Text h4 style={[modalStyle.field, {color: 'red'}]}>
          {"You're out of guesses."}
        </Text>
        <Text h4 style={[modalStyle.field, {color: 'red'}]}>
          {'You Lose!'}
        </Text>
        <View style={{
          flexDirection: 'row'
        }}>
          <LargeButton
            onPress={() => {
              this.setState({showModal: false}, () => {
                this.navigateToCategoriesScreen()
              })
            }}
            isSoundOn={this.state.isSoundOn}
            fontFamily='ChalkboardSE'
            fontSize={24}
            backgroundColor='grey'
            style={[modalStyle.button, {marginRight: 20}]}
            text='BACK' />
          <LargeButton
            onPress={this.setAnotherLevel}
            isSoundOn={this.state.isSoundOn}
            fontFamily='ChalkboardSE'
            fontSize={24}
            backgroundColor='#28a745'
            style={modalStyle.button}
            text='NEXT' />
        </View>
      </View>
    )
  }

  renderWrongModal = () => {
    const randomWrongMessage = WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)]
    return (
      <View style={modalStyle.innerContainer}>
        <Text h4 style={[modalStyle.field, {color: 'red'}]}>
          {randomWrongMessage}
        </Text>
        <Text h4 style={[modalStyle.field, {color: 'red'}]}>
          {'You have ' + this.state.guessesLeft + ' guesses left!'}
        </Text>
        <LargeButton
          onPress={() => {this.setState({showModal: false})}}
          isSoundOn={this.state.isSoundOn}
          fontFamily='ChalkboardSE'
          fontSize={24}
          backgroundColor='#28a745'
          style={modalStyle.button}
          text='OKAY' />
      </View>
    )
  }

  handleWin = () => {
    const difficultyArray = this.storedData.Game[this.difficulty]
    const categoryObjectIndex = findIndex(difficultyArray, ['name', this.categoryName])
    const levelsArray = this.storedData.Game[this.difficulty][categoryObjectIndex].levels
    const currentLevelIndex = findIndex(levelsArray, ['answer', this.state.currentLevel.answer])
    this.storedData.Game[this.difficulty][categoryObjectIndex].levels[currentLevelIndex].isCompleted = true
    this.storedData.Game[this.difficulty][categoryObjectIndex].points += this.state.points
    this.categoryPoints = this.storedData.Game[this.difficulty][categoryObjectIndex].points
    this.storedData.Game[this.difficulty][categoryObjectIndex].levelsComplete += 1
    AsyncStorage.setItem('AsyncStorageData', JSON.stringify(this.storedData))
    this.setState({
      availableLevels: this.getAvailableLevelsWithoutCurrentLevel()
    }, () => {
      this.setAnotherLevel(true)
    })
  }

  renderWinModal = () => {
    return (
      <View style={modalStyle.innerContainerTall}>
        <Text h4 style={[modalStyle.field, {color: 'green'}]}>
          {this.state.guessInput + ' is correct! '}
        </Text>
        <Text h5 style={[modalStyle.field, {color: 'orange'}]}>
          {'You scored ' + this.state.points + ' points.'}
        </Text>
        <View style={{width: this.photoWidth, height: this.photoHeight}}>
          <Image
            style={{width: '100%', height: '100%', zIndex: 1, borderWidth: 1, borderColor: 'grey'}}
            source={this.state.currentLevel.imagePath}
          />
        </View>
        <LargeButton
          onPress={this.handleWin}
          isSoundOn={this.state.isSoundOn}
          fontFamily='ChalkboardSE'
          fontSize={24}
          backgroundColor='#28a745'
          style={modalStyle.button}
          text='NEXT' />
      </View>
    )
  }

  renderBeatCategoryModal = () => {
    return (
      <View style={modalStyle.innerContainer}>
        <Text h4 style={[modalStyle.field, {color: 'green'}]}>
          {'Congratulations! You beat the ' + this.difficulty + ' ' + this.categoryName + ' category!'}
        </Text>
        <Text h4 style={[modalStyle.field, {color: 'green'}]}>
          {'You earned ' + this.categoryPoints + ' out of ' + (this.props.navigation.state.params.categoryLevels.length * CONSTANTS.STARTING_POINTS) + ' points!'}
        </Text>
        <LargeButton
          onPress={() => {
            this.setState({showModal: false}, () => {
              this.navigateToCategoriesScreen()
            })
          }}
          isSoundOn={this.state.isSoundOn}
          fontFamily='ChalkboardSE'
          fontSize={24}
          backgroundColor='#28a745'
          style={modalStyle.button}
          text='NEXT' />
      </View>
    )
  }

  renderNoReveals = () => {
    return (
      <View style={modalStyle.innerContainer}>
        <Text h4 style={[modalStyle.field, {color: 'red'}]}>
          {'You have no reveals left!'}
        </Text>
        <Text h4 style={[modalStyle.field, {color: 'red'}]}>
          {'Just figure it out!'}
        </Text>
        <LargeButton
          onPress={() => {this.setState({showModal: false})}}
          isSoundOn={this.state.isSoundOn}
          fontFamily='ChalkboardSE'
          fontSize={24}
          backgroundColor='#28a745'
          style={modalStyle.button}
          text='OKAY' />
      </View>
    )
  }

  renderCloseModal = () => {
    return (
      <View style={modalStyle.innerContainer}>
        <Text h4 style={[modalStyle.field, {color: 'red'}]}>
          {"Are you sure you want to quit?"}
        </Text>
        <Text h5 style={[modalStyle.field, {color: 'red'}]}>
          {"Quitting does not save your progress on this puzzle. Simply closing the app will save your progress on this puzzle."}
        </Text>
        <View style={{
          flexDirection: 'row'
        }}>
          <LargeButton
            onPress={() => {this.setState({showModal: false})}}
            isSoundOn={this.state.isSoundOn}
            fontFamily='ChalkboardSE'
            fontSize={24}
            backgroundColor='#28a745'
            style={modalStyle.button}
            style={[modalStyle.button, {marginRight: 20}]}
            text='STAY' />
          <LargeButton
            onPress={() => {
              this.clearSavedLevel()
              this.setState({showModal: false}, () => {
                this.navigateToCategoriesScreen()
              })
            }}
            isSoundOn={this.state.isSoundOn}
            fontFamily='ChalkboardSE'
            fontSize={24}
            backgroundColor='red'
            style={modalStyle.button}
            text='QUIT' />
        </View>
      </View>
    )
  }

  renderHintModal = () => {
    return (
      <View style={modalStyle.innerContainer}>
        <Text h4 style={[modalStyle.field, {color: 'green'}]}>
          {'Here is a hint:'}
        </Text>
        <Text h4 style={[modalStyle.field, {color: 'green'}]}>
          {this.state.currentLevel.hint}
        </Text>
        <LargeButton
          onPress={() => {this.setState({showModal: false})}}
          isSoundOn={this.state.isSoundOn}
          fontFamily='ChalkboardSE'
          fontSize={24}
          backgroundColor='#28a745'
          style={{
              width: 150,
              alignContent: 'center',
              marginTop: 30}}
          text='THANKS' />
      </View>
    )
  }

  renderModal = () => {
    const showModal = this.state.showModal
    return (
      <Modal
        animationType='fade'
        transparent
        onRequestClose={() => {}}
        visible={!!showModal}>
        <View style={modalStyle.outerContainer}>
          {showModal === 'win' ? this.renderWinModal() :
            showModal === 'lose' ? this.renderLoseModal() :
            showModal === 'no-reveals' ? this.renderNoReveals() :
            showModal === 'hint' ? this.renderHintModal() :
            showModal === 'close' ? this.renderCloseModal() :
            showModal === 'beatCategory' ? this.renderBeatCategoryModal() :
            this.renderWrongModal()}
        </View>
      </Modal>
    )
  }

  showCloseModal = () => {
    this.setState({
      showModal: 'close'
    })
    playSound('click', this.state.isSoundOn)
  }

  setSound = () => {
    this.setState({
      isSoundOn: !this.state.isSoundOn
    }, () => {
      playSound('click', this.state.isSoundOn)
      this.storedData.General.isSoundOn = this.state.isSoundOn
      AsyncStorage.setItem('AsyncStorageData', JSON.stringify(this.storedData))
    })
  }

  render() {
    let hideTitleAndGameInfoWhenKeyboardOpen = 'flex'
    let formLabelMarginTop = this.isiPhoneSE ? 0 : 20
    let formLabelFontSize = this.isiPhoneSE ? 16 : 20
    let formInputMarginTop = this.isiPhoneSE ? 0 : 10
    let formInputWidth = '90%'
    let formInputAlignment = 'center'
    let inputFontSize = this.isiPhoneSE ? 16 : 20
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
          <SoundButton isSoundOn={this.state.isSoundOn} setSound={this.setSound}/>
          <CloseButton showCloseModal={this.showCloseModal} />
          {this.renderTitle(hideTitleAndGameInfoWhenKeyboardOpen)}
          {this.renderGameInfo(hideTitleAndGameInfoWhenKeyboardOpen)}
          {this.renderPhoto(hideImageWhileTileLoading)}
          {this.renderForm(totalFormWidth, formLabelMarginTop, formLabelFontSize, formInputMarginTop, formInputWidth, inputFontSize)}
          {this.renderBottomButton()}
          {this.renderModal()}
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
