import { createStackNavigator } from 'react-navigation'
import Intro from './screens/Intro'
import Categories from './screens/Categories'
import ChooseDifficulty from './screens/ChooseDifficulty'

export const RootStack = createStackNavigator(
  {
    Intro: Intro,
    ChooseDifficulty: ChooseDifficulty,
    Categories: Categories,
  },
  {
    initialRouteName: 'Categories',
    navigationOptions: {
      headerStyle: {
        display: 'none',
      }
    }
  }
)
