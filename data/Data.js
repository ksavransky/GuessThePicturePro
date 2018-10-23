import { EasyLandmarks } from './easy/Landmarks'
import { EasyFood } from './easy/Food'
import { EasyArt } from './easy/Art'
import { EasyPeople } from './easy/People'
import { EasyAnimals } from './easy/Animals'

import { MediumLandmarks } from './medium/Landmarks'
import { MediumFood } from './medium/Food'
import { MediumArt } from './medium/Art'
import { MediumAnimals } from './medium/Animals'
import { MediumPeople } from './medium/People'


import { HardLandmarks } from './hard/Landmarks'
import { HardFood } from './hard/Food'
import { HardArt } from './hard/Art'
import { HardAnimals } from './hard/Animals'
import { HardPeople } from './hard/People'


const defaultLevelsAndPoints = {
  levelsComplete: 0,
  points: 0
}

const EASY = [
  {
    name: 'Landmarks',
    iconPath: require('../assets/images/thumbs/eiffel.jpg'),
    ...defaultLevelsAndPoints,
    levels: EasyLandmarks
  },
  {
    name: 'Food',
    iconPath: require('../assets/images/thumbs/hamburger.jpg'),
    ...defaultLevelsAndPoints,
    levels: EasyFood
  },
  {
    name: 'Art',
    iconPath: require('../assets/images/thumbs/david.jpg'),
    ...defaultLevelsAndPoints,
    levels: EasyArt
  },
  {
    name: 'People',
    iconPath: require('../assets/images/thumbs/elvis.jpg'),
    ...defaultLevelsAndPoints,
    levels: EasyPeople
  },
  {
    name: 'Animals',
    iconPath: require('../assets/images/thumbs/dog.jpg'),
    ...defaultLevelsAndPoints,
    levels: EasyAnimals
  },
]

const MEDIUM = [
  {
    name: 'Landmarks',
    iconPath: require('../assets/images/thumbs/fuji.jpg'),
    ...defaultLevelsAndPoints,
    levels: MediumLandmarks
  },
  {
    name: 'Food',
    iconPath: require('../assets/images/thumbs/dosa.jpg'),
    ...defaultLevelsAndPoints,
    levels: MediumFood
  },
  {
    name: 'Art',
    iconPath: require('../assets/images/thumbs/Cafe_Terrace_at_Night.jpg'),
    ...defaultLevelsAndPoints,
    levels: MediumArt
  },
  {
    name: 'Animals',
    iconPath: require('../assets/images/thumbs/yak.jpg'),
    ...defaultLevelsAndPoints,
    levels: MediumAnimals
  },
  {
    name: 'People',
    iconPath: require('../assets/images/thumbs/usain_bolt.jpg'),
    ...defaultLevelsAndPoints,
    levels: MediumPeople
  },
]

const HARD = [
  {
    name: 'Landmarks',
    iconPath: require('../assets/images/thumbs/gardens.jpg'),
    ...defaultLevelsAndPoints,
    levels: HardLandmarks
  },
  {
    name: 'Food',
    iconPath: require('../assets/images/thumbs/shakshuka.jpg'),
    ...defaultLevelsAndPoints,
    levels: HardFood
  },
  {
    name: 'Art',
    iconPath: require('../assets/images/thumbs/Balloon_Dog.jpg'),
    ...defaultLevelsAndPoints,
    levels: HardArt
  },
  {
    name: 'Animals',
    iconPath: require('../assets/images/levels/animals/hard/mantis.jpg'),
    ...defaultLevelsAndPoints,
    levels: HardAnimals
  },
  {
    name: 'People',
    iconPath: require('../assets/images/thumbs/billy_idol.jpg'),
    ...defaultLevelsAndPoints,
    levels: HardPeople
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
