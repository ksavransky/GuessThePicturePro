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
            activeOpacity={0.9}
            onPress={() => {console.warn('pressss');}}
            >
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              shadowOpacity: 0.4,
              shadowRadius: 1,
              shadowColor: 'black',
              shadowOffset: { height: 2, width: 2 }
            }}>
              <View style={{
                 borderWidth: 1,
                 borderRadius: 50,
                 borderColor: '#28a745',
                 width: '100%',
                 padding: 10,
                 backgroundColor: '#28a745'
              }}>
                <Text fontFamily='ChalkboardSE' style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 30,
                  paddingLeft: 17,
                  paddingRight: 17,
                  paddingTop: 6,
                  paddingBottom: 6
                }}>EASY</Text>
              </View>
            </View>
          </TouchableOpacity>
      </View>
    )
  }
}
