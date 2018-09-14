import React, { Component } from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { Text } from 'react-native-elements';
import { containerStyle, backgroundColorStyle, modalStyle } from '../styles/Common.js'
import { get, findIndex } from 'lodash'
import Categories from '../components/Categories.js'
import { getTitleColorFromDifficulty } from '../utils/Utils.js'
import { AsyncStorage } from 'react-native';
import LargeButton from '../components/buttons/LargeButton'

export default class CategoriesScreen extends Component {
  constructor(props) {
    super(props)
    this.asyncStorageData = null
    this.state = {
      difficulty: get(props, 'navigation.state.params.difficulty', 'Easy'),
      loadedData: false,
      showModal: false
    }
    this.getLocalStorageData()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      difficulty: get(nextProps, 'navigation.state.params.difficulty', 'Easy')
    })
    this.getLocalStorageData()
  }

  getLocalStorageData = () => {
    AsyncStorage.getItem('AsyncStorageData').then((storedData) => {
      this.asyncStorageData = JSON.parse(storedData)
      this.setState({
        loadedData: true
      })
    })
  }

  setShowModal = (categoryName) => {
    this.setState({
      showModal: categoryName
    })
  }

  resetCategory = () => {
    const categoryName = this.state.showModal
    const { difficulty } = this.state
    const categoryIndex = findIndex(this.asyncStorageData.Game[difficulty], ['name', categoryName])
    this.asyncStorageData.Game[difficulty][categoryIndex].levelsComplete = 0
    this.asyncStorageData.Game[difficulty][categoryIndex].points = 0
    for (let i = 0; i < this.asyncStorageData.Game[difficulty][categoryIndex].levels.length; i++) {
      this.asyncStorageData.Game[difficulty][categoryIndex].levels[i].isCompleted = false
    }
    AsyncStorage.setItem('AsyncStorageData', JSON.stringify(this.asyncStorageData))
    this.setState({showModal: false})
  }

  renderModal = () => {
    const showModal = this.state.showModal
    return (
      <Modal
        animationType='fade'
        transparent
        visible={!!showModal}>
        <View style={modalStyle.outerContainer}>
          <View style={modalStyle.innerContainer}>
            <Text h4 style={[modalStyle.field, {color: '#28a745'}]}>
              {"You already beat this category, would you like to restart it?"}
            </Text>
            <Text h5 style={[modalStyle.field, {color: 'red'}]}>
              {"Restarting erases your points for the category."}
            </Text>
            <View style={{
              flexDirection: 'row'
            }}>
              <LargeButton
                onPress={() => {this.setState({showModal: false})}}
                fontFamily='ChalkboardSE'
                fontSize={24}
                backgroundColor='#28a745'
                style={modalStyle.button}
                style={[modalStyle.button, {marginRight: 20}]}
                text='KEEP' />
              <LargeButton
                onPress={this.resetCategory}
                fontFamily='ChalkboardSE'
                fontSize={24}
                backgroundColor='red'
                style={{
                  width: 160,
                  alignContent: 'center',
                  marginTop: 30
                }}
                text='RESTART' />
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  render() {
    const titleColor = getTitleColorFromDifficulty(this.state.difficulty)
    if (!this.state.loadedData) {
      return (
        <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
          <ActivityIndicator size="large" color='black' />
        </View>
      )
    }
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
          asyncStorageData={this.asyncStorageData}
          titleColor={titleColor}
          setShowModal={this.setShowModal}
        />
        {this.renderModal()}
      </View>
    )
  }
}
