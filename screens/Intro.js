import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { AppLoading, Font } from 'expo';
import { StyleSheet } from 'react-native';
import { containerStyle, backgroundColorStyle } from '../styles/common.js'


export default class Intro extends Component {
  state = {
    loaded: false,
  }

  componentWillMount() {
    this._loadAssetsAsync()
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      ChalkboardSE: require('../assets/fonts/ChalkboardSE.ttf'),
    })
    this.setState({ loaded: true })
  }

  render() {
    if (!this.state.loaded) {
      return <AppLoading />
    }

    return (
      <View style={[containerStyle.centered, backgroundColorStyle.lightBlue]}>
        <Image style={{width: 70, height: 90}} source={require('../assets/images/monkey.png')} />
        <Text fontFamily='ChalkboardSE' h4 style={{color: 'red', marginBottom: 20}}>Spunky Monkey Games</Text>
        <Text style={{marginBottom: 20}}>Presents</Text>
        <Text h3 style={{color: 'blue', marginBottom: 200}}>Guess The Picture Pro</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Categories')}
          large
          raised
          rounded
          fontFamily='ChalkboardSE'
          fontSize={30}
          backgroundColor='#28a745'
          title='PLAY' />
      </View>
    )
  }
}
