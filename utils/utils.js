import { Audio } from 'expo'

const MONKEY_SOUND = require('../assets/sounds/monkey.mov')
const CLICK_SOUND = require('../assets/sounds/click1.mp3')
const TADA_SOUND = require('../assets/sounds/tada.mp3')
const REVEAL_SOUND = require('../assets/sounds/reveal.mp3')
const WRONG_SOUND = require('../assets/sounds/wrongbuzz.mp3')

const audioPlayer = new Audio.Sound();

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
  } else if (sound === 'click') {
    playSound = CLICK_SOUND
  } else if (sound === 'tada') {
    playSound = TADA_SOUND
  } else if (sound === 'wrongbuzz') {
    playSound = WRONG_SOUND
  } else if (sound === 'reveal') {
    playSound = REVEAL_SOUND
  }

  if (isSoundOn) {
    try
      await audioPlayer.unloadAsync()
      await audioPlayer.loadAsync(playSound);
      await audioPlayer.playAsync();
    } catch(error) {
      // console.error(error);
      console.warn("Couldn't Play audio", err)
    }
  }
  // if (isSoundOn) {
  //   try {
  //     // await Audio.setIsEnabledAsync(true);
  //     const sound = new Audio.Sound();
  //     await sound.loadAsync(playSound);
  //     await sound.playAsync();
  //   } catch(error) {
  //     // console.error(error);
  //   }
  // }
}
