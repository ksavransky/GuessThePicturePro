import { EasyLandmarks } from './easy/Landmarks'
import { EasyFood } from './easy/Food'
import { MediumLandmarks } from './medium/Landmarks'
import { HardLandmarks } from './hard/Landmarks'

const defaultLevelsAndPoints = {
  levelsComplete: 0,
  points: 0
}

const EASY = [
  {
    name: 'Landmarks',
    iconPath: require('../assets/images/levels/landmarks/easy/eiffel.jpeg'),
    ...defaultLevelsAndPoints,
    levels: EasyLandmarks
  },
  {
    name: 'Food',
    iconPath: require('../assets/images/levels/food/easy/hamburger.jpg'),
    ...defaultLevelsAndPoints,
    levels: EasyFood
  }
]

const MEDIUM = [
  {
    name: 'Landmarks',
    iconPath: require('../assets/images/levels/landmarks/medium/mount-fuji.jpg'),
    ...defaultLevelsAndPoints,
    levels: MediumLandmarks
  }
]

const HARD = [
  {
    name: 'Landmarks',
    iconPath: require('../assets/images/levels/landmarks/hard/Gardens-by-the-Bay.jpg'),
    ...defaultLevelsAndPoints,
    levels: HardLandmarks
  }
]

export const AsyncStorageData = {
  General: {
    isSoundOn: true
  },
  Game: {
    Easy: EASY,
    Medium: MEDIUM,
    Hard: HARD
  },
  SavedLevel: {
    difficulty: null,
    categoryName: null,
    answer: null,
    points: null,
    visibleTiles: null,
    revealsLeft: null,
    guessesLeft: null,
    usedHint: null
  },
}
