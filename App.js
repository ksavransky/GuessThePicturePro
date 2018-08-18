import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { containerStyle, buttonStyle, backgroundColorStyle } from './styles/common.js'

export default class App extends React.Component {
  render() {
    return (
      <View style={[containerStyle.centered, backgroundColorStyle.blue]}>
        <Text>Open up App.js to start working on your app!!!</Text>
        <Button
          large
          icon={{name: 'play', type: 'font-awesome'}}
          buttonStyle={buttonStyle.success}
          title='PLAY' />
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}
