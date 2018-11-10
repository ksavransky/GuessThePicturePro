import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Text } from 'react-native-elements';
import LargeButton from '../components/buttons/LargeButton'
import SoundButton from '../components/buttons/SoundButton'
import { containerStyle, colors } from '../styles/Common.js'
import { get } from 'lodash'
import { playSound } from '../utils/Utils'

export default class ChooseDifficulty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSoundOn: this.props.navigation.state.params.data.General.isSoundOn
    }

    this.storedData = this.props.navigation.state.params.data
  }

  componentWillReceiveProps(nextProps){
    this.storedData = nextProps.navigation.state.params.data
    this.setState({
      isSoundOn: this.storedData.General.isSoundOn
    })
  }

  setSound = () => {
    this.setState({
      isSoundOn: !this.state.isSoundOn
    }, () => {
      playSound('click', this.state.isSoundOn)
      this.storedData.General.isSoundOn = this.state.isSoundOn
      AsyncStorage.setItem('AsyncStorageData', JSON.stringify(this.storedData))
    })
  }

  render() {
    return (
      <View style={[containerStyle.centeredBoth, {backgroundColor: colors.white}]}>
        <SoundButton isSoundOn={this.state.isSoundOn} setSound={this.setSound}/>
        <Text h2 style={{color: colors.darkGrey, marginTop: 10, marginBottom: 60}}>Choose Difficulty</Text>
        {[{difficulty: 'Easy', color: colors.green, title: 'EASY'},
          {difficulty: 'Medium', color: colors.orange, title: 'MEDIUM'},
          {difficulty: 'Hard', color: colors.red, title: 'HARD'}].map((buttonData) => {
            return (
              <LargeButton
                key={buttonData.difficulty}
                isSoundOn={this.state.isSoundOn}
                onPress={() => this.props.navigation.navigate('CategoriesScreen', {difficulty: buttonData.difficulty, data: this.storedData})}
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
