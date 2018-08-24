import { AsyncStorage } from 'react-native';

export const storeData = async (key, value, callback) => {
  try {
    await AsyncStorage.setItem(key, value);
    if (callback) {
      callback(value)
    }
  } catch (error) {
    // console.warn('error in _storeData', error);
  }
}

export const retrieveData = async (key, callback) => {
  try {
    const value = await AsyncStorage.getItem(key);
    // console.warn('value in retrieveData')
    // console.warn(value)
    if (callback) {
      callback(value)
    }
    // }
  } catch (error) {
    // console.warn('error in _retrieveData', error);
  }
}

export const clearAllData = () => {
  AsyncStorage.clear()
}

export const getAllDataKeys = async (callback) => {
  try {
    const value = await AsyncStorage.getAllKeys();
    if (value !== null) {
      if (callback) {
        callback(value)
      }
    }
  } catch (error) {
    // console.warn('error in _getAllKeys', error);
  }
}


// const SETTINGS_KEY = 'Settings'
// const settingsObj = {lastUpdate: 1479396301390, language: 'en', theme: 'dark'}
// AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsObj))
// AsyncStorage.getItem(SETTINGS_KEY).then((settingsStr)=>{
//   const settings = JSON.parse(settingsStr)
// })
