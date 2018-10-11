import { EasyLandmarks } from './easy/Landmarks'
import { EasyFood } from './easy/Food'
import { EasyArt } from './easy/Art'
import { EasyRappers } from './easy/Rappers'
import { EasyAnimals } from './easy/Animals'

import { MediumLandmarks } from './medium/Landmarks'
import { MediumFood } from './medium/Food'
import { MediumArt } from './medium/Art'
import { MediumAnimals } from './medium/Animals'

import { HardLandmarks } from './hard/Landmarks'
import { HardFood } from './hard/Food'
import { HardArt } from './hard/Art'
import { HardAnimals } from './hard/Animals'

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
  },
  {
    name: 'Rappers',
    iconPath: require('../assets/images/levels/rappers/easy/Nicki_Minaj.jpg'),
    ...defaultLevelsAndPoints,
    levels: EasyRappers
  },
  {
    name: 'Animals',
    iconPath: require('../assets/images/levels/animals/easy/dog.jpg'),
    ...defaultLevelsAndPoints,
    levels: EasyAnimals
  },
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
  },
  {
    name: 'Art',
    iconPath: require('../assets/images/levels/art/medium/The_Kiss.jpg'),
    ...defaultLevelsAndPoints,
    levels: MediumArt
  },
  {
    name: 'Animals',
    iconPath: require('../assets/images/levels/animals/medium/yak.jpg'),
    ...defaultLevelsAndPoints,
    levels: MediumAnimals
  },
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
  },
  {
    name: 'Art',
    iconPath: require('../assets/images/levels/art/hard/Balloon_Dog.jpg'),
    ...defaultLevelsAndPoints,
    levels: HardArt
  },
  {
    name: 'Animals',
    iconPath: require('../assets/images/levels/animals/hard/mantis.jpg'),
    ...defaultLevelsAndPoints,
    levels: HardAnimals
  },
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
