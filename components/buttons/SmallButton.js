import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { playSound } from '../../utils/Utils'

export default class SmallButton extends Component {
  render() {
    const leftRightPadding = 10
    const topBottomPadding = 5
    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity || 0.9}
        onPress={() => {
          this.props.onPress()
          playSound('click', this.props.isSoundOn)
        }}
        style={this.props.style}
        disabled={this.props.disabled}
        >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          shadowOpacity: this.props.shadowOpacity || 0.4,
          shadowRadius: this.props.shadowRadius || 1,
          shadowColor: this.props.shadowColor || 'black',
          shadowOffset: { height: this.props.shadowOffsetHeight || 2, width: this.props.shadowOffsetWidth || 2 }
        }}>
          <View style={{
             borderWidth: this.props.borderWidth || 1,
             borderRadius: this.props.borderRadius || 50,
             borderColor: this.props.disabled ? 'grey' : (this.props.borderColor || this.props.backgroundColor || 'transparent'),
             width: '100%',
             backgroundColor: this.props.disabled ? 'grey' : (this.props.backgroundColor || '#28a745')
          }}>
            <Text fontFamily='ChalkboardSE' style={{
              textAlign: 'center',
              color: this.props.color || '#fff',
              fontSize: this.props.fontSize || 16,
              fontFamily: this.props.fontFamily,
              paddingLeft: this.props.leftRightPadding || leftRightPadding,
              paddingRight: this.props.leftRightPadding || leftRightPadding,
              paddingTop: this.props.topBottomPadding || topBottomPadding,
              paddingBottom: this.props.topBottomPadding || topBottomPadding
            }}>{this.props.text || 'Confirm'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
