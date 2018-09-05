import React, { Component } from 'react';
import { AppLoading, Font } from 'expo';
import { RootStack } from './Navigation'

export default class App extends Component {
  state = {
    loaded: false,
  }

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
    return <RootStack />
  }
}
