import React, { Component } from 'react'
import { View, Image, TouchableOpacity} from 'react-native'

export default class CloseButton extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.props.showCloseModal}
        style={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          display: this.props.display || 'flex'
        }}>
        <View style={{
          backgroundColor: 'white',
          width: 25,
          height: 25,
          padding: 10,
          borderWidth: 1,
          borderRadius: 100,
          borderColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          shadowOpacity: 0.4,
          shadowRadius: 1,
          shadowColor: 'black',
          shadowOffset: { height: 1, width: 1 }
        }}>
          <Image style={{width: 25, height: 25}} source={require('../../assets/images/icons/times-circle.png')} />
        </View>
      </TouchableOpacity>
    )
  }
}
