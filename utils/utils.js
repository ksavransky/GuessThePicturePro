import { Constants, Audio } from 'expo'

const MONKEY_SOUND = require('../assets/sounds/monkey.mov')
const CLICK_SOUND = require('../assets/sounds/click1.mp3')

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
  let playSound = null
  if (sound === 'monkey') {
    playSound = MONKEY_SOUND
  } else if (sound = 'click') {
    playSound = CLICK_SOUND
  }
  if (isSoundOn) {
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
