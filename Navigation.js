import { createStackNavigator } from 'react-navigation'
import Intro from './screens/Intro'
import CategoriesScreen from './screens/CategoriesScreen'
import ChooseDifficulty from './screens/ChooseDifficulty'
import Level from './screens/Level'

export const RootStack = createStackNavigator(
  {
    Intro: Intro,
    ChooseDifficulty: ChooseDifficulty,
    CategoriesScreen: CategoriesScreen,
    Level: Level,
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
