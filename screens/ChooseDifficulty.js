import React, { Component } from 'react';
import { View, TouchableOpacity} from 'react-native';
import { Text } from 'react-native-elements';
import LargeButton from '../components/buttons/LargeButton'
import { containerStyle, backgroundColorStyle } from '../styles/common.js'

export default class ChooseDifficulty extends Component {
  render() {
    return (
      <View style={[containerStyle.centeredBoth, backgroundColorStyle.lightBlue]}>
        <Text h3 fontFamily='ChalkboardSE' style={{color: 'blue', marginBottom: 100}}>Choose Difficulty</Text>
        {[{difficulty: 'Easy', color: '#28a745', title: 'EASY'},
          {difficulty: 'Medium', color: 'orange', title: 'MEDIUM'},
          {difficulty: 'Hard', color: 'red', title: 'HARD'}].map((buttonData) => {
            return (
              <LargeButton
                key={buttonData.difficulty}
                onPress={() => this.props.navigation.navigate('CategoriesScreen', {difficulty: buttonData.difficulty})}
                backgroundColor={buttonData.color}
                containerViewStyle={{marginBottom: 50, backgroundColor: 'transparent'}}
                title={buttonData.title} />
            )
          })}
          <TouchableOpacity
            onPress={() => {console.warn('pressss');}}
            style={{
              borderRadius: 25
            }}
            >
            <Text h3 fontFamily='ChalkboardSE' style={{
              color: 'white',
              backgroundColor: '#28a745',
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10
            }}>EASY</Text>
          </TouchableOpacity>
      </View>
    )
  }
}
