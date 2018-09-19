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
          right: '5%'
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
          alignItems: 'center'
        }}>
          <Image style={{width: 25, height: 25}} source={require('../../assets/images/icons/times-circle.png')} />
        </View>
      </TouchableOpacity>
    )
  }
}
