import React, { Component } from 'react';
import { View, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { containerStyle, modalStyle, colors } from '../styles/Common.js'
import { get, findIndex } from 'lodash'
import Categories from '../components/Categories.js'
import { getTitleColorFromDifficulty } from '../utils/Utils.js'
import { AsyncStorage } from 'react-native';
import LargeButton from '../components/buttons/LargeButton'
import SmallButton from '../components/buttons/SmallButton'
import { playSound } from '../utils/Utils'

export default class CategoriesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      difficulty: get(props, 'navigation.state.params.difficulty', 'Easy'),
      showModal: false,
      isSoundOn: this.props.navigation.state.params.data.General.isSoundOn
    }

    this.asyncStorageData = this.props.navigation.state.params.data
  }

  componentWillReceiveProps(nextProps) {
    this.asyncStorageData = nextProps.navigation.state.params.data
    this.setState({
      difficulty: get(nextProps, 'navigation.state.params.difficulty', 'Easy'),
      isSoundOn: this.asyncStorageData.General.isSoundOn
    })
  }

  setShowModal = (categoryName) => {
    this.setState({
      showModal: categoryName
    })
    playSound('click', this.state.isSoundOn)
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
        onRequestClose={() => {}}
        visible={!!showModal}>
        <View style={modalStyle.outerContainer}>
          <View style={modalStyle.innerContainer}>
            <Text h4 style={[modalStyle.field, {color: colors.darkGrey}]}>
              {"You already beat this category, would you like to restart it?"}
            </Text>
            <Text h5 style={[modalStyle.field, {color: colors.red}]}>
              {"Restarting erases your points for the category."}
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
                text='KEEP' />
              <LargeButton
                onPress={this.resetCategory}
                isSoundOn={this.state.isSoundOn}
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

  navigateToChooseDifficulty = () => {
    this.props.navigation.navigate('ChooseDifficulty', {isSoundOn: this.state.isSoundOn, data: this.asyncStorageData})
  }

  render() {
    const titleColor = getTitleColorFromDifficulty(this.state.difficulty)
    return (
      <View style={[containerStyle.centeredHorizontal, {backgroundColor: '#FAFAFA'}]}>
        {/* <Text
          h5
          style={{alignSelf: 'flex-start', margin: 10}}
          onPress={this.navigateToChooseDifficulty}>
          {'< Select Difficulty'}
        </Text> */}
        <SmallButton
          onPress={this.navigateToChooseDifficulty}
          isSoundOn={this.state.isSoundOn}
          fontSize={12}
          backgroundColor='white'
          borderColor='black'
          color='black'
          style={{ alignSelf: 'flex-start', margin: 10 }}
          text='< Choose Difficulty'
        />
        <Text h4 style={{color: titleColor, marginBottom: 20}}>
          {this.state.difficulty}
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={{width: '90%'}}>
          <Categories
            navigation={this.props.navigation}
            difficulty={this.state.difficulty}
            asyncStorageData={this.asyncStorageData}
            titleColor={titleColor}
            setShowModal={this.setShowModal}
            isSoundOn={this.state.isSoundOn}
          />
        </ScrollView>
        {this.renderModal()}
      </View>
    )
  }
}
