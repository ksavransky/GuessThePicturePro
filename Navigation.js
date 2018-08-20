import { createStackNavigator } from 'react-navigation'
import Intro from './screens/Intro'
import Categories from './screens/Categories'

export const RootStack = createStackNavigator(
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
