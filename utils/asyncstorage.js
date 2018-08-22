import { AsyncStorage } from 'react-native';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.warn('error in _storeData', error);
  }
}

export const getAllKeys = async () => {
  try {
    const value = await AsyncStorage.getAllKeys();
    if (value !== null) {
      console.warn('in _getAllKeys value:');
      console.warn(value);
    }
  } catch (error) {
    console.warn('error in _getAllKeys', error);
  }
}

export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.warn('in _retrieveData value:');
      console.warn(value);
    }
  } catch (error) {
    console.warn('error in _retrieveData', error);
  }
}

export const clearAll = () => {
  AsyncStorage.clear()
}
