import { AsyncStorage } from 'react-native';

export const storeData = async (key, value, callback) => {
  try {
    await AsyncStorage.setItem(key, value);
    if (callback) {
      callback(value)
    }
  } catch (error) {
    console.warn('error in _storeData', error);
  }
}

export const retrieveData = async (key, callback) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.warn('in _retrieveData value:');
      console.warn(value);
      if (callback) {
        callback(value)
      }
    }
  } catch (error) {
    console.warn('error in _retrieveData', error);
  }
}

export const getAllDataKeys = async (callback) => {
  try {
    const value = await AsyncStorage.getAllKeys();
    if (value !== null) {
      console.warn('in _getAllKeys value:');
      console.warn(value);
      if (callback) {
        callback(value)
      }
    }
  } catch (error) {
    console.warn('error in _getAllKeys', error);
  }
}

export const clearAllData = () => {
  AsyncStorage.clear()
}

// Shape of the Storage
//
