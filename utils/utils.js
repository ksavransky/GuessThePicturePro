import { Constants, Audio } from 'expo'

const MONKEY_SOUND = require('../assets/sounds/monkey.mov')
const CLICK_SOUND = require('../assets/sounds/click1.mp3')
const APPLAUSE_SOUND = require('../assets/sounds/applause.wav')
const REVEAL_SOUND = require('../assets/sounds/reveal.wav')
const WRONG_SOUND = require('../assets/sounds/wrongbuzz.mp3')
const TADA_SOUND = require('../assets/sounds/tada.wav')

export const getTitleColorFromDifficulty = (difficulty) => {
  if ( difficulty === 'Easy' ) {
      return '#28a745'
  } else if ( difficulty === 'Medium' ) {
    return 'orange'
  } else {
    return 'red'
  }
}

export const playSound = async (sound, isSoundOn) => {
  // console.warn('in sound')
  // console.warn(sound)
  let playSound = null
  if (sound === 'monkey') {
    playSound = MONKEY_SOUND
  } else if (sound = 'click') {
    playSound = CLICK_SOUND
  } else if (sound = 'applause') {
    playSound = APPLAUSE_SOUND
  } else if (sound = 'wrongbuzz') {
    playSound = WRONG_SOUND
  } else if (sound = 'reveal') {
    playSound = REVEAL_SOUND
  } else if (sound = 'tada') {
    playSound = TADA_SOUND
  }

  if (isSoundOn) {
    // console.warn('playSound')
    // console.warn(playSound)
    try {
      await Audio.setIsEnabledAsync(true);
      const sound = new Audio.Sound();
      await sound.loadAsync(playSound);
      await sound.playAsync();
    } catch(error) {
      // console.error(error);
    }
  }
}
