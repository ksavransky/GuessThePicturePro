import React, { Component } from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
// import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class SoundButton extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.props.setSound}
        style={{
          position: 'absolute',
          top: '5%',
          left: '5%'
        }}
        >
        <View style={{
          backgroundColor: 'blue',
          width: 20,
          height: 20,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            color: 'white',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            {/* {<FontAwesome>{this.props.isSoundOn ? Icons.chevronLeft : Icons.chevronRight}</FontAwesome>} */}
            {this.props.isSoundOn ? 'Y' : 'N'}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
