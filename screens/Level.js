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
import { containerStyle, modalStyle, colors } from '../styles/Common'
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
  // LINE_2: 'When you think you know what the photo is showing, type your guess below.',
  // LINE_3: 'You have 3 guesses and can reveal up to 12 tiles. Good Luck!'
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

    this.titleColor = get(props, 'navigation.state.params.titleColor', colors.darkGrey)
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
      isPhotoLoaded: false,
      availableLevels: [],
      difficulty: get(props, 'navigation.state.params.difficulty', 'Easy'),
      categoryName: get(props, 'navigation.state.params.categoryName', 'Places'),
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
      isSoundOn: this.props.navigation.state.params.data.General.isSoundOn
    }

    this.storedData = this.props.navigation.state.params.data
  }

  componentWillReceiveProps() {
    this.storedData = this.props.navigation.state.params.data
    this.loadLevel()
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.loadLevel()
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
        difficulty: this.state.difficulty,
        categoryName: this.state.categoryName,
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
    const canLoad = (currentLevel && savedLevel.points && savedLevel.categoryName
                    && savedLevel.visibleTiles && savedLevel.revealsLeft
                    && savedLevel.guessesLeft && savedLevel.usedHint)
    if (currentLevel) {
      this.setState({
        currentLevel: currentLevel,
        points: savedLevel.points,
        categoryName: savedLevel.categoryName,
        visibleTiles: savedLevel.visibleTiles,
        revealsLeft: savedLevel.revealsLeft,
        guessesLeft: savedLevel.guessesLeft,
        usedHint: savedLevel.usedHint,
        isPhotoLoaded: false,
      })
    } else {
      this.props.navigation.navigate('CategoriesScreen', {difficulty: (this.state.difficulty || get(this.props, 'navigation.state.params.difficulty', 'Easy')), data: this.storedData})
    }
  }

  getAvailableLevels = () => {
    const availableLevels = filter(this.props.navigation.state.params.categoryLevels, ['isCompleted', false])
    this.setState({
      categoryName: get(this.props, 'navigation.state.params.categoryName', 'Places'),
      difficulty: get(this.props, 'navigation.state.params.difficulty', 'Easy'),
      availableLevels: availableLevels
    }, () => {
      if (this.props.navigation.state.params.loadSavedLevel && this.storedData.SavedLevel.answer){
        this.loadSavedLevel()
      } else {
        this.chooseRandomLevel()
      }
    })
  }

  loadLevel = () => {
    this.setState({
      isSoundOn: this.storedData.General.isSoundOn
    }, () => {
      this.getAvailableLevels()
    })
  }

  chooseRandomLevel = (differentLevels) => {
    const availableLevels = differentLevels || this.state.availableLevels
    if (availableLevels && availableLevels.length > 0) {
      const randomLevel = Math.floor(Math.random() * availableLevels.length);
      this.setState({
        currentLevel: availableLevels[randomLevel],
        points: CONSTANTS.STARTING_POINTS,
        visibleTiles: ALL_TILES_COVERING,
        guessInput: null,
        guessesLeft: 3,
        revealsLeft: CONSTANTS.STARTING_REVEALS_LEFT,
        usedHint: false,
        isPhotoLoaded: false,
      })
    } else {
      this.props.navigation.navigate('CategoriesScreen', {difficulty: (this.state.difficulty || get(this.props, 'navigation.state.params.difficulty', 'Easy')), data: this.storedData})
    }
  }

  handleTilePress = (i, j, allImagesLoaded) => {
    if (this.state.revealsLeft > 0) {
      if (allImagesLoaded) {
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
      }
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
      setTimeout(() => {
        playSound('tada', this.state.isSoundOn)
      }, 200)
    })
  }

  handleSubmit = () => {
    const guessArray = this.state.guessInput.toLowerCase().replace(/[^\w\s]/gi, '').split(' ')
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
      <Text h4 style={{color: this.titleColor, margin: 10, display: hideTitleAndGameInfoWhenKeyboardOpen}}>
        {this.state.categoryName}
      </Text>
    )
  }

  renderGameInfo = (hideTitleAndGameInfoWhenKeyboardOpen) => {
    const fontSizeForInfo = this.isiPhoneSE ? 12 : 14
    return (
      <View style={{marginLeft: '10%', width: '100%', flexDirection: 'row', display: hideTitleAndGameInfoWhenKeyboardOpen, marginBottom: 10}}>
        <Text style={{fontSize: fontSizeForInfo, color: colors.darkGrey, width: '33%'}}>
          {'Reveals Left: ' + this.state.revealsLeft}
        </Text>
        <Text style={{fontSize: fontSizeForInfo, color: colors.darkGrey, width: '28%', textAlign: 'center'}}>
          {'Guesses Left: ' + this.state.guessesLeft}
        </Text>
        <Text style={{fontSize: fontSizeForInfo, color: colors.darkGrey, width: '29%', textAlign: 'right'}}>
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
        backgroundColor={colors.green}
        text='HINT!' />
    )
  }

  renderPhoto = (hideImageWhileTileLoading, allImagesLoaded) => {
    return (
      <View style={{width: this.photoWidth, height: this.photoHeight, position: 'relative', opacity: allImagesLoaded ? 1 : 0}}>
        <Image
          style={{width: '100%', height: '100%', opacity: hideImageWhileTileLoading, zIndex: 1}}
          source={this.state.currentLevel.imagePath}
          onLoad={() => {
            if (!this.state.isPhotoLoaded){
              setTimeout(() => {
                this.setState({
                  isPhotoLoaded: true
                })
              }, 100)
            }
          }}
        />
        <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 2}}>
          {this.renderTiles(allImagesLoaded)}
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
        <Text h4 style={{color: colors.darkGrey, marginTop: (this.tileHeight + 30), textAlign: 'center', marginLeft: 5, marginRight: 5}}>
          {INSTRUCTIONS.LINE_1}
        </Text>
        {/* <Text h5 style={{color: colors.darkGrey, marginTop: 10, textAlign: 'center'}}>
          {INSTRUCTIONS.LINE_2}
        </Text>
        <Text h5 style={{color: colors.darkGrey, marginTop: 10, textAlign: 'center'}}>
          {INSTRUCTIONS.LINE_3}
        </Text> */}
      </View>
    )
  }

  renderTiles = (allImagesLoaded) => {
    let tiles = []

    for (let i = 0; i < NUMBER_OF_TILES_PER.ROW; i++) {
      for (let j = 0; j < NUMBER_OF_TILES_PER.COLUMN; j++) {
        if (this.state.visibleTiles[i][j]) {
          let top = i * this.tileHeight
          let left = j * this.tileWidth
          tiles.push(
            <TouchableOpacity
              activeOpacity={(this.state.revealsLeft > 0) ? 0.5 : 1}
              onPress={() => this.handleTilePress(i, j, allImagesLoaded)}
              key={i + '_' + j}
              style={{
                top: top,
                left: left,
                position: 'absolute',
                height: this.tileHeight,
                width: this.tileWidth,
                borderColor: colors.grey,
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
          labelStyle={{color: colors.grey, fontSize: formLabelFontSize, fontWeight: '400'}}>
          {'Your Guess:'}
        </FormLabel>
        {!this.state.usedHint && !this.state.isKeyBoardOpen && this.state.revealsLeft < CONSTANTS.STARTING_REVEALS_LEFT && this.renderHintButton()}
        <View style={{marginTop: formInputMarginTop, width: '100%', flexDirection: 'row', position: 'relative'}}>
          <FormInput
            spellCheck={false}
            autoCorrect={false}
            maxLength={32}
            containerStyle={{borderBottomColor: colors.grey, width: formInputWidth}}
            inputStyle={{paddingLeft: 3, color: colors.darkGrey, fontSize: inputFontSize}}
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
                bottom: 10
              }}
              backgroundColor={colors.green}
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
            backgroundColor={colors.green}
            text='SUBMIT' />
        )
    } else {
      return null
    }
  }

  navigateToCategoriesScreen = () => {
    this.props.navigation.navigate('CategoriesScreen', {difficulty: (this.state.difficulty || get(this.props, 'navigation.state.params.difficulty', 'Easy')), data: this.storedData})
  }

  getAvailableLevelsWithoutCurrentLevel = () => {
    let availableLevels = cloneDeep(this.state.availableLevels)
    remove(availableLevels, (level) => {
      return level.answer === this.state.currentLevel.answer
    })
    return availableLevels
  }

  clearSavedLevel = (callback) => {
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
    if (callback) {
      AsyncStorage.setItem('AsyncStorageData', JSON.stringify(this.storedData)).then(callback)
    } else {
      AsyncStorage.setItem('AsyncStorageData', JSON.stringify(this.storedData))
    }
  }

  saveLevel = (savedLevel) => {
    this.storedData.SavedLevel = savedLevel
    AsyncStorage.setItem('AsyncStorageData', JSON.stringify(this.storedData))
  }

  setAnotherLevel = (beatCategory = false) => {
    if (beatCategory && this.state.availableLevels.length === 0) {
      this.clearSavedLevel()
      this.setState({
        showModal: 'beatCategory'
      }, () => {
        setTimeout(() => {
          playSound('tada', this.state.isSoundOn)
        }, 200)
      })
    } else {
      this.setState({
        points: CONSTANTS.STARTING_POINTS,
        visibleTiles: ALL_TILES_COVERING,
        guessInput: null,
        isKeyBoardOpen: false,
        guessesLeft: 3,
        revealsLeft: CONSTANTS.STARTING_REVEALS_LEFT,
        showModal: false,
        usedHint: false,
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
        <Text h4 style={[modalStyle.field, {color: colors.red}]}>
          {"You're out of guesses."}
        </Text>
        <Text h4 style={[modalStyle.field, {color: colors.red}]}>
          {'You Lose!'}
        </Text>
        <View style={{
          flexDirection: 'row'
        }}>
          <LargeButton
            onPress={() => {
              this.clearSavedLevel(() => {
                this.setState({showModal: false}, () => {
                  this.navigateToCategoriesScreen()
                })
              })
            }}
            isSoundOn={this.state.isSoundOn}
            fontFamily='ChalkboardSE'
            fontSize={24}
            backgroundColor={colors.grey}
            style={[modalStyle.button, {marginRight: 20}]}
            text='BACK' />
          <LargeButton
            onPress={this.setAnotherLevel}
            isSoundOn={this.state.isSoundOn}
            fontFamily='ChalkboardSE'
            fontSize={24}
            backgroundColor={colors.green}
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
        <Text h4 style={[modalStyle.field, {color: colors.red}]}>
          {randomWrongMessage}
        </Text>
        <Text h4 style={[modalStyle.field, {color: colors.red}]}>
          {'You have ' + this.state.guessesLeft + ' guesses left!'}
        </Text>
        <LargeButton
          onPress={() => {this.setState({showModal: false})}}
          isSoundOn={this.state.isSoundOn}
          fontFamily='ChalkboardSE'
          fontSize={24}
          backgroundColor={colors.green}
          style={modalStyle.button}
          text='OKAY' />
      </View>
    )
  }

  handleWin = () => {
    const difficultyArray = this.storedData.Game[this.state.difficulty]
    const categoryObjectIndex = findIndex(difficultyArray, ['name', this.state.categoryName])
    const levelsArray = this.storedData.Game[this.state.difficulty][categoryObjectIndex].levels
    const currentLevelIndex = findIndex(levelsArray, ['answer', this.state.currentLevel.answer])
    this.storedData.Game[this.state.difficulty][categoryObjectIndex].levels[currentLevelIndex].isCompleted = true
    this.storedData.Game[this.state.difficulty][categoryObjectIndex].points += this.state.points
    this.categoryPoints = this.storedData.Game[this.state.difficulty][categoryObjectIndex].points
    this.storedData.Game[this.state.difficulty][categoryObjectIndex].levelsComplete += 1
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
        <Text h4 style={[modalStyle.field, {color: colors.green}]}>
          {this.state.guessInput + ' is correct! '}
        </Text>
        <Text h5 style={[modalStyle.field, {color: colors.darkGrey}]}>
          {'You scored ' + this.state.points + ' points.'}
        </Text>
        <View style={{width: this.photoWidth, height: this.photoHeight}}>
          <Image
            style={{width: '100%', height: '100%', zIndex: 1, borderWidth: 1, borderColor: colors.grey}}
            source={this.state.currentLevel.imagePath}
          />
        </View>
        <LargeButton
          onPress={this.handleWin}
          isSoundOn={this.state.isSoundOn}
          fontFamily='ChalkboardSE'
          fontSize={24}
          backgroundColor={colors.green}
          style={modalStyle.button}
          text='NEXT' />
      </View>
    )
  }

  renderBeatCategoryModal = () => {
    return (
      <View style={modalStyle.innerContainer}>
        <Text h4 style={[modalStyle.field, {color: colors.green}]}>
          {'Congratulations! You beat the ' + this.state.difficulty + ' ' + this.state.categoryName + ' category!'}
        </Text>
        <Text h4 style={[modalStyle.field, {color: colors.green}]}>
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
          backgroundColor={colors.green}
          style={modalStyle.button}
          text='NEXT' />
      </View>
    )
  }

  renderNoReveals = () => {
    return (
      <View style={modalStyle.innerContainer}>
        <Text h4 style={[modalStyle.field, {color: colors.red}]}>
          {'You have no reveals left!'}
        </Text>
        <Text h4 style={[modalStyle.field, {color: colors.red}]}>
          {'Just figure it out!'}
        </Text>
        <LargeButton
          onPress={() => {this.setState({showModal: false})}}
          isSoundOn={this.state.isSoundOn}
          fontFamily='ChalkboardSE'
          fontSize={24}
          backgroundColor={colors.green}
          style={modalStyle.button}
          text='OKAY' />
      </View>
    )
  }

  renderCloseModal = () => {
    return (
      <View style={modalStyle.innerContainer}>
        <Text h4 style={[modalStyle.field, {color: colors.darkGrey}]}>
          {"Are you sure you want to quit?"}
        </Text>
        <Text h5 style={[modalStyle.field, {color: colors.darkGrey}]}>
          {"Quitting takes you back to the categories screen, but doesn't save your progress on this puzzle. Simply closing the app will save your progress on this puzzle."}
        </Text>
        <View style={{
          flexDirection: 'row'
        }}>
          <LargeButton
            onPress={() => {this.setState({showModal: false})}}
            isSoundOn={this.state.isSoundOn}
            fontFamily='ChalkboardSE'
            fontSize={24}
            backgroundColor={colors.grey}
            style={modalStyle.button}
            style={[modalStyle.button, {marginRight: 20}]}
            text='STAY' />
          <LargeButton
            onPress={() => {
              this.clearSavedLevel(() => {
                this.setState({showModal: false}, () => {
                  this.navigateToCategoriesScreen()
                })
              })
            }}
            isSoundOn={this.state.isSoundOn}
            fontFamily='ChalkboardSE'
            fontSize={24}
            backgroundColor={colors.green}
            style={modalStyle.button}
            text='QUIT' />
        </View>
      </View>
    )
  }

  renderHintModal = () => {
    return (
      <View style={[modalStyle.innerContainer, {height: '67%'}]}>
        <Text h4 style={[modalStyle.field, {color: colors.darkGrey}]}>
          {'Hint:'}
        </Text>
        <Text h4 style={[modalStyle.field, {color: colors.darkGrey}]}>
          {this.state.currentLevel.hint}
        </Text>
        <LargeButton
          onPress={() => {this.setState({showModal: false})}}
          isSoundOn={this.state.isSoundOn}
          fontFamily='ChalkboardSE'
          fontSize={24}
          backgroundColor={colors.green}
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
        // animationType='fade'
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
      const allImagesLoaded = this.state.isTileLoaded && this.state.isPhotoLoaded
      const { showModal } = this.state
      return (
        <KeyboardAvoidingView style={[containerStyle.centeredHorizontal, {backgroundColor: colors.white}]}>
          {!allImagesLoaded && <ActivityIndicator size="large" color={colors.darkGrey} style={{marginTop: '50%'}}/>}
          {!showModal && allImagesLoaded && <SoundButton isSoundOn={this.state.isSoundOn} setSound={this.setSound} />}
          {!showModal && allImagesLoaded && <CloseButton showCloseModal={this.showCloseModal} />}
          {allImagesLoaded && this.renderTitle(hideTitleAndGameInfoWhenKeyboardOpen)}
          {allImagesLoaded && this.renderGameInfo(hideTitleAndGameInfoWhenKeyboardOpen)}
          {this.renderPhoto(hideImageWhileTileLoading, allImagesLoaded)}
          {allImagesLoaded && this.renderForm(totalFormWidth, formLabelMarginTop, formLabelFontSize, formInputMarginTop, formInputWidth, inputFontSize)}
          {allImagesLoaded && this.renderBottomButton(allImagesLoaded)}
          {allImagesLoaded && this.renderModal()}
        </KeyboardAvoidingView>
      )
    }
    return (
      <View style={[containerStyle.centeredBoth, {backgroundColor: colors.white}]}>
        <ActivityIndicator size="large" color={colors.darkGrey} />
      </View>
    )
  }
}
