import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { containerStyle, backgroundColorStyle } from '../styles/common.js'
import { AsyncStorageData } from '../data/Data.js'
import { get } from 'lodash'
import Categories from '../components/Categories.js'
import { clearAllData } from '../utils/asyncstorage'
import { AsyncStorage } from 'react-native';

export default class CategoriesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      difficulty: get(props, 'navigation.state.params.difficulty', 'Easy'),
      asyncStorageData: AsyncStorageData
    }
    // clearAllData()
    this.getLocalStorageData()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      difficulty: get(nextProps, 'navigation.state.params.difficulty', 'Easy')
    })
  }

  getLocalStorageData = () => {
    AsyncStorage.getItem('AsyncStorageData').then((storedData) => {
      if (storedData) {
        this.setState({
          asyncStorageData: JSON.parse(storedData)
        })
      } else {
        AsyncStorage.setItem('AsyncStorageData', JSON.stringify(AsyncStorageData))
      }
    })
  }



  getTitleColor = () => {
    const difficulty = this.state.difficulty
    if ( difficulty === 'Easy' ) {
        return '#28a745'
    } else if ( difficulty === 'Medium' ) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  render() {
    const titleColor = this.getTitleColor()
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
