import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import LargeButton from '../components/buttons/LargeButton'
import { containerStyle, backgroundColorStyle } from '../styles/common.js'

export default class ChooseDifficulty extends Component {
  render() {
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
        <Text h3 fontFamily='ChalkboardSE' style={{color: 'blue', marginBottom: 100}}>Choose Difficulty</Text>
        {[{difficulty: 'Easy', color: '#28a745', title: 'EASY'},
          {difficulty: 'Medium', color: 'orange', title: 'MEDIUM'},
          {difficulty: 'Hard', color: 'red', title: 'HARD'}].map((buttonData) => {
            return (
              <LargeButton
                onPress={() => this.props.navigation.navigate('CategoriesScreen', {difficulty: buttonData.difficulty})}
                backgroundColor={buttonData.color}
                style={{marginBottom: 50}}
                title={buttonData.title} />
            )
          })}
      </View>
    )
  }
}
