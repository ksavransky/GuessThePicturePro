import { StyleSheet } from 'react-native';

export const buttonStyle = StyleSheet.create({
  success: {
    backgroundColor: '#28a745',
    borderRadius: 10
  },
})

export const containerStyle = StyleSheet.create({
  centeredBoth: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centeredHorizontal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '15%'
  },
})


export const backgroundColorStyle = StyleSheet.create({
  lightBlue: {
    backgroundColor: '#dceff7'
  },
  burgundy: {
    backgroundColor: '#5d0000'
  },
})
