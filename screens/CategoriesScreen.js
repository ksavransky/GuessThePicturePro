import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { containerStyle, backgroundColorStyle } from '../styles/common.js'
import { Data } from '../data/Data.js'
import Categories from '../components/Categories.js'
import { get } from 'lodash'

export default class CategoriesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      difficulty: get(props, 'navigation.state.params.difficulty', 'Easy')
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      difficulty: get(nextProps, 'navigation.state.params.difficulty', 'Easy')
    })
  }

  getTitleClass = () => {
    const difficulty = this.state.difficulty
    if ( difficulty === 'Easy' ) {
        return '#28a745'
    } else if ( difficulty === 'Medium' ) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  // getCategories = (difficulty) => {
    // props to pass
    // difficulty - string - from Category screen
    // categoryName - string - from data file
    // totalPuzzles - int - from data file
    // completedPuzzles - int - from local memory NOTE: probably want to store array with key names in local memory for complete, then use length here
    // categoryImageUrl - string
    // points - int - from local memory
  //   return (
  //     null
  //   )
  // }

  render() {
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
        <Text h4 fontFamily='ChalkboardSE' style={{color: this.getTitleClass()}}>
          {this.state.difficulty}
        </Text>
        <Categories
          difficulty={this.state.difficulty}
          categories={Data[this.state.difficulty]}
        />
      </View>
    )
  }
}
