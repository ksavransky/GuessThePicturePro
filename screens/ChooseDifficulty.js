import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage} from 'react-native';
import { Text } from 'react-native-elements';
import LargeButton from '../components/buttons/LargeButton'
// import SoundButton from '../components/buttons/SoundButton'
import { containerStyle, backgroundColorStyle } from '../styles/Common.js'
import { get } from 'lodash'
// import { playSound } from '../utils/Utils'

export default class ChooseDifficulty extends Component {
  constructor(props) {
    super(props)
    // this.state ={
    //   isSoundOn: false
    // }

    this.storedData = null
    this.getStoredData()
  }

  getStoredData = () => {
    AsyncStorage.getItem('AsyncStorageData').then((storedData) => {
      this.storedData = JSON.parse(storedData)
      // this.setState({
      //   isSoundOn: this.storedData.General.isSoundOn
      // })
    })
  }

  // setSound = () => {
  //   this.setState({
  //     isSoundOn: !this.state.isSoundOn
  //   }, () => {
  //     // playSound('click', this.state.isSoundOn)
  //     this.storedData.General.isSoundOn = this.state.isSoundOn
  //     AsyncStorage.setItem('AsyncStorageData', JSON.stringify(this.storedData))
  //   })
  // }

  render() {
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
        {/* <SoundButton isSoundOn={this.state.isSoundOn} setSound={this.setSound}/> */}
        <Text h3 fontFamily='ChalkboardSE' style={{color: 'blue', marginBottom: 100}}>Choose Difficulty</Text>
        {[{difficulty: 'Easy', color: '#28a745', title: 'EASY'},
          {difficulty: 'Medium', color: 'orange', title: 'MEDIUM'},
          {difficulty: 'Hard', color: 'red', title: 'HARD'}].map((buttonData) => {
            return (
              <LargeButton
                key={buttonData.difficulty}
                // isSoundOn={this.state.isSoundOn}
                onPress={() => this.props.navigation.navigate('CategoriesScreen', {difficulty: buttonData.difficulty})}
                backgroundColor={buttonData.color}
                style={{marginBottom: 50}}
                fontFamily='ChalkboardSE'
                text={buttonData.title} />
            )
          })}
      </View>
    )
  }
}
