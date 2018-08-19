import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { AppLoading, Font } from 'expo';
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
    return <AppLoading />;
  }

    return (
      <View style={[containerStyle.centered, backgroundColorStyle.lightBlue]}>
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
