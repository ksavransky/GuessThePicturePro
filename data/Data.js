import { EasyPlaces } from './easy/Places'

const defaultLevelsAndPoints = {
  levelsComplete: 0,
  points: 0
}

const EASY = [
  {
    name: 'Places',
    iconPath: require('../assets/images/levels/places/eiffel.jpeg'),
    ...defaultLevelsAndPoints,
    levels: EasyPlaces
  },
  {
    name: 'Places2',
    iconPath: require('../assets/images/levels/places/eiffel.jpeg'),
    ...defaultLevelsAndPoints,
    levels: EasyPlaces
  },
]

export const AsyncStorageData = {
  General: {
    isSoundOn: true
  },
  Game: {
    Easy: EASY,
    Medium: [],
    Hard: []
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
