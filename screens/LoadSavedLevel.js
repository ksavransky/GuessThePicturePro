import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import LargeButton from '../components/buttons/LargeButton'
import { containerStyle, backgroundColorStyle } from '../styles/common'

export default class LoadSavedLevel extends Component {
  render() {
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
        <Text fontFamily='ChalkboardSE' h4 style={{color: 'green', textAlign: 'center', marginBottom: 20}}>You currently have a game in progress!</Text>
        <Text fontFamily='ChalkboardSE' h4 style={{color: 'green', textAlign: 'center', marginBottom: 50}}>Would you like to continue it?</Text>
          <LargeButton
            onPress={() => this.props.navigation.navigate('ChooseDifficulty')}
            backgroundColor='blue'
            style={{
              marginBottom: 30
            }}
            fontFamily='ChalkboardSE'
            text='NEW' />
          <LargeButton
            onPress={() => this.props.navigation.navigate('ChooseDifficulty')}
            backgroundColor='#28a745'
            fontFamily='ChalkboardSE'
            text='CONTINUE' />
      </View>
    )
  }
}
