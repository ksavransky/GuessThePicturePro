import { Audio } from 'expo'
import { colors } from '../styles/Common'

const CLICK_SOUND = require('../assets/sounds/click1.mp3')
const TADA_SOUND = require('../assets/sounds/tada.mp3')
const REVEAL_SOUND = require('../assets/sounds/reveal.mp3')
const WRONG_SOUND = require('../assets/sounds/wrongbuzz.mp3')

export const getTitleColorFromDifficulty = (difficulty) => {
  if ( difficulty === 'Easy' ) {
    return colors.green
  } else if ( difficulty === 'Medium' ) {
    return colors.orange
  } else {
    return colors.red
  }
}

export const playSound = async (sound, isSoundOn) => {
  let playSound = null
  if (sound === 'click') {
    playSound = CLICK_SOUND
  } else if (sound === 'tada') {
    playSound = TADA_SOUND
  } else if (sound === 'wrongbuzz') {
    playSound = WRONG_SOUND
  } else if (sound === 'reveal') {
    playSound = REVEAL_SOUND
  }

  if (isSoundOn) {
    try {
      // await Audio.setIsEnabledAsync(true);
      const sound = new Audio.Sound();
      await sound.loadAsync(playSound);
      await sound.playAsync();
      setTimeout(() => {
        sound.unloadAsync()
      }, 5000)
    } catch(error) {
      // console.error(error);
    }
  }
}
