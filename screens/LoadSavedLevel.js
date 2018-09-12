import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import LargeButton from '../components/buttons/LargeButton'
import { containerStyle, backgroundColorStyle } from '../styles/common'

export default class LoadSavedLevel extends Component {
  handleContinueClick = (difficulty, categoryName, categoryLevels, titleColor) => {
    this.props.navigation.navigate('Level', {loadSavedLevel: true, categoryName: categoryName, difficulty: difficulty, categoryLevels: categoryLevels, titleColor: titleColor})
  }

  render() {
    const { difficulty, categoryName, categoryLevels, titleColor } = this.props.navigation.state.params
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
        <Text fontFamily='ChalkboardSE' h4 style={{color: '#28a745', textAlign: 'center', marginBottom: 20}}>
          {'You currently have ' + (difficulty === 'Easy' ? 'an ' : 'a ' ) + difficulty + ' ' + categoryName + ' puzzle in progress!'}
        </Text>
        <Text fontFamily='ChalkboardSE' h4 style={{color: '#28a745', textAlign: 'center', marginBottom: 40}}>
          Would you like to continue playing it?
        </Text>
          <LargeButton
            onPress={() => this.handleContinueClick(difficulty, categoryName, categoryLevels, titleColor)}
            backgroundColor='#28a745'
            fontFamily='ChalkboardSE'
            style={{
              marginBottom: 40
            }}
            text='CONTINUE' />
          <LargeButton
            onPress={() => this.props.navigation.navigate('ChooseDifficulty')}
            backgroundColor='blue'
            fontFamily='ChalkboardSE'
            text='NEW' />
      </View>
    )
  }
}
