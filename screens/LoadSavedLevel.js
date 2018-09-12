import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import LargeButton from '../components/buttons/LargeButton'
import { containerStyle, backgroundColorStyle } from '../styles/common'

export default class LoadSavedLevel extends Component {
  handleContinueClick = () => {
    // this.props.navigation.navigate('Level', {categoryName: categoryName, difficulty: this.props.difficulty, categoryLevels: categoryLevels, titleColor: this.props.titleColor})
    // this.props.navigation.navigate('Level', {categoryName: categoryName, difficulty: this.props.difficulty, categoryLevels: categoryLevels, titleColor: this.props.titleColor})
  }

  render() {
    const {difficulty, categoryName} = this.props.navigation.state.params
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
        <Text fontFamily='ChalkboardSE' h4 style={{color: '#28a745', textAlign: 'center', marginBottom: 20}}>
          {'You currently have ' + (difficulty === 'Easy' ? 'an ' : 'a ' ) + difficulty + ' ' + categoryName + ' puzzle in progress!'}
        </Text>
        <Text fontFamily='ChalkboardSE' h4 style={{color: '#28a745', textAlign: 'center', marginBottom: 50}}>
          Would you like to continue solving it?
        </Text>
          <LargeButton
            onPress={() => this.props.navigation.navigate('ChooseDifficulty')}
            backgroundColor='blue'
            style={{
              marginBottom: 30
            }}
            fontFamily='ChalkboardSE'
            text='NEW' />
          <LargeButton
            onPress={() => {console.warn('clicked on continue')}}
            backgroundColor='#28a745'
            fontFamily='ChalkboardSE'
            text='CONTINUE' />
      </View>
    )
  }
}
