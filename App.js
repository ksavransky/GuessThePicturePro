import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation'
import Intro from './screens/Intro'
import Categories from './screens/Categories'

const RootStack = createStackNavigator(
  {
    Intro: Intro,
    Categories: Categories,
  },
  {
    initialRouteName: 'Intro',
    navigationOptions: {
      headerStyle: {
        display: 'none',
      }
    }
  }
)

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
