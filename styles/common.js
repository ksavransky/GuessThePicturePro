import { StyleSheet } from 'react-native';

export const colors = {
  white: '#ffffff',
  black: 'black',
  green: '#43A047',
  orange: '#FB8C00',
  red: '#E53935',
  blue: '#1E88E5',
  xLightGrey: '#FAFAFA',
  lightGrey: '#cbd2d9',
  grey: '#757575',
  darkGrey: '#424242',
}


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
  verticalSpaceAround: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  centeredHorizontal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '15%'
  },
})

export const modalStyle = StyleSheet.create({
  field: {
    textAlign: 'center',
    // fontFamily: 'ChalkboardSE',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: 'rgba(50, 50, 50, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: colors.xLightGrey,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    height: '52%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
    paddingBottom: 10
  },
  innerContainerTall: {
    backgroundColor: colors.xLightGrey,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    height: '90%',
    width: '96%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
  },
  button: {
    width: 120,
    alignContent: 'center',
    marginTop: 30
  }
})
