import React from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { AppLoading, Font } from 'expo';
import { StyleSheet } from 'react-native';
import { containerStyle, backgroundColorStyle } from './styles/common.js'

export default class App extends React.Component {
  state = {
  loaded: false,
};

componentWillMount() {
  this._loadAssetsAsync()
}

_loadAssetsAsync = async () => {
  await Font.loadAsync({
    ChalkboardSE: require('./assets/fonts/ChalkboardSE.ttf'),
  })
  this.setState({ loaded: true })
}

render() {
  if (!this.state.loaded) {
    return <AppLoading />
  }

    return (
      <View style={[containerStyle.centered, backgroundColorStyle.lightBlue]}>
        <Image style={{width: 70, height: 90}} source={require('./assets/images/monkey.png')} />
        <Text fontFamily='ChalkboardSE' h4 style={{color: 'red'}}>Spunkey Monkey Games</Text>
        <Text style={{marginBottom: 10}}>Presents</Text>
        <Text fontFamily='ChalkboardSE' h3 style={{color: 'blue', marginBottom: 120}}>Guess The Picture Pro</Text>
        <Button
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
