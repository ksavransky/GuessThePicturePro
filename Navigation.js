import { createStackNavigator } from 'react-navigation'
import Intro from './screens/Intro'
import CategoriesScreen from './screens/CategoriesScreen'
import ChooseDifficulty from './screens/ChooseDifficulty'

export const RootStack = createStackNavigator(
  {
    Intro: Intro,
    ChooseDifficulty: ChooseDifficulty,
    CategoriesScreen: CategoriesScreen,
  },
  {
    initialRouteName: 'CategoriesScreen',
    navigationOptions: {
      headerStyle: {
        display: 'none',
      }
    }
  }
)
