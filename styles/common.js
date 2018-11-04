import { StyleSheet } from 'react-native';

export const colors = {
  kon: {
    white: 'white',
    orange: 'orange',
    red: 'red',
    green: '#28a745',
    xLightBlue: '#eff7fd',
    lightBlue: '#dceff7',
    blue: 'lightBlue',
    darkBlue: '#242531',
    lightGrey: '#cbd2d9',
    grey: 'grey',
    darkGrey: '#3e3e3e',
    black: 'black',
  },
  matui: {
    white: 'white',
    black: 'black',
    green: '#43A047',
    red: '#E53935',
    orange: '#FF9800',
    lightBlue: '#E1F5FE',
    blue: '#039BE5',
    lightGrey: '#ECEFF1',
  },
  theme1: {
    white: 'white',
    black: 'black',
    grey: '#E9F1DF',
    orange: '#F5B634',
    red: '#F2454B',
    lightBlue: '#54D9CD',
  },
  theme2: {
    white: 'white',
    black: 'black',
    orange: '#F8B500',
    red: '#F8B500',
    blueGreen: '#00ADB5',
    darkGrey: '#393E46',
    cream: '#FFF4E0',
  },
  theme3: {
    white: 'white',
    black: 'black',
    cream: '#E9F1DF',
    lightOrange: '#FFCB05',
    red: '#F23C50',
    lightBlue: '#4AD9D9',
    darkBlue: '#36B1BF',
  },
  matui600:{
    green: '#43A047',
    orange: '#FB8C00',
    red: '#E53935',
    grey: '#757575',
    darkGrey: '#424242',
    lightGrey: '#eeeeee',
    xLightGrey: '#FAFAFA',
    lightBlue: '#E3F2FD',
    blue: '#E3F2FD',
  }
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


export const backgroundColorStyle = StyleSheet.create({
  lightBlue: {
    backgroundColor: '#dceff7'
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
