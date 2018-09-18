import React, { Component } from 'react'
import { View, Text, TouchableOpacity} from 'react-native'

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
        }}
        >
        <View style={{
          backgroundColor: '#f5f5f5',
          width: 20,
          height: 20,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: '#444',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            color: '#444',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            {'x'}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
