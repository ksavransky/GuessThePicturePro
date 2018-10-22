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


export const backgroundColorStyle = StyleSheet.create({
  lightBlue: {
    backgroundColor: '#dceff7'
  },
  nightBlue: {
    backgroundColor: '#242531'
  }
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
    backgroundColor: '#dceff7',
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
    backgroundColor: '#dceff7',
    borderWidth: 1,
    borderColor: 'black',
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
