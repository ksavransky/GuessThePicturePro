import { createStackNavigator } from 'react-navigation'
import Intro from './screens/Intro'
import CategoriesScreen from './screens/CategoriesScreen'
import LoadSavedLevel from './screens/LoadSavedLevel'
import ChooseDifficulty from './screens/ChooseDifficulty'
import Level from './screens/Level'

export const RootStack = createStackNavigator(
  {
    Intro: Intro,
    LoadSavedLevel: LoadSavedLevel,
    ChooseDifficulty: ChooseDifficulty,
    CategoriesScreen: CategoriesScreen,
    Level: Level,
  },
  {
    initialRouteName: 'ChooseDifficulty',
    navigationOptions: {
      headerStyle: {
        display: 'none',
      }
    }
  }
)
