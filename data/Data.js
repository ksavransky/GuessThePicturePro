import { EasyLandmarks } from './easy/Landmarks'
import { EasyFood } from './easy/Food'
import { EasyArt } from './easy/Art'
import { MediumLandmarks } from './medium/Landmarks'
import { MediumFood } from './medium/Food'
import { HardLandmarks } from './hard/Landmarks'
import { HardFood } from './hard/Food'

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
  },
  {
    name: 'Art',
    iconPath: require('../assets/images/levels/art/easy/david.jpg'),
    ...defaultLevelsAndPoints,
    levels: EasyArt
  }
]

const MEDIUM = [
  {
    name: 'Landmarks',
    iconPath: require('../assets/images/levels/landmarks/medium/mount-fuji.jpg'),
    ...defaultLevelsAndPoints,
    levels: MediumLandmarks
  },
  {
    name: 'Food',
    iconPath: require('../assets/images/levels/food/medium/dosa.jpg'),
    ...defaultLevelsAndPoints,
    levels: MediumFood
  }
]

const HARD = [
  {
    name: 'Landmarks',
    iconPath: require('../assets/images/levels/landmarks/hard/Gardens-by-the-Bay.jpg'),
    ...defaultLevelsAndPoints,
    levels: HardLandmarks
  },
  {
    name: 'Food',
    iconPath: require('../assets/images/levels/food/hard/SHAKSHUKA-kagyana.jpg'),
    ...defaultLevelsAndPoints,
    levels: HardFood
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
