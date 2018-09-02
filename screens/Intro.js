import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import LargeButton from '../components/buttons/LargeButton'
import { containerStyle, backgroundColorStyle } from '../styles/common'

export default class Intro extends Component {
  render() {
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
        <Image style={{width: 70, height: 90}} source={require('../assets/images/monkey.png')} />
        <Text fontFamily='ChalkboardSE' h4 style={{color: 'red', marginBottom: 20}}>Spunky Monkey Games</Text>
        <Text style={{marginBottom: 20}}>Presents</Text>
        <Text h3 style={{color: 'blue', marginBottom: 200}}>Guess The Picture Pro</Text>
        <LargeButton
          onPress={() => this.props.navigation.navigate('ChooseDifficulty')}
          backgroundColor='#28a745'
          fontFamily='ChalkboardSE'
          text='PLAY' />
      </View>
    )
  }
}
