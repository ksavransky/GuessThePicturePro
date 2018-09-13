import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { containerStyle, backgroundColorStyle } from '../styles/Common.js'
import { get } from 'lodash'
import Categories from '../components/Categories.js'
import { getTitleColorFromDifficulty } from '../utils/Utils.js'
import { AsyncStorage } from 'react-native';

export default class CategoriesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      difficulty: get(props, 'navigation.state.params.difficulty', 'Easy'),
      asyncStorageData: null
    }
    this.getLocalStorageData()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      difficulty: get(nextProps, 'navigation.state.params.difficulty', 'Easy')
    })
  }

  getLocalStorageData = () => {
    AsyncStorage.getItem('AsyncStorageData').then((storedData) => {
      this.setState({
        asyncStorageData: JSON.parse(storedData)
      })
    })
  }

  render() {
    const titleColor = getTitleColorFromDifficulty(this.state.difficulty)
    if (!this.state.asyncStorageData) {
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
          asyncStorageData={this.state.asyncStorageData}
          titleColor={titleColor}
        />
      </View>
    )
  }
}
