import React, { Component } from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import { playSound } from '../../utils/Utils'
import { colors } from '../../styles/Common'

export default class LargeButton extends Component {
  render() {
    const leftRightPadding = 27
    const topBottomPadding = 16
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
          shadowColor: this.props.shadowColor || colors.black,
          shadowOffset: { height: this.props.shadowOffsetHeight || 2, width: this.props.shadowOffsetWidth || 2 }
        }}>
          <View style={{
             borderWidth: this.props.borderWidth || 1,
             borderRadius: this.props.borderRadius || 50,
             borderColor: this.props.disabled ? colors.lightGrey : (this.props.borderColor || this.props.backgroundColor || 'transparent'),
             width: '100%',
             backgroundColor: this.props.disabled ? colors.lightGrey : (this.props.backgroundColor || colors.green)
          }}>
            <Text fontFamily='ChalkboardSE' style={{
              textAlign: 'center',
              color: this.props.color || colors.white,
              fontSize: this.props.fontSize || 22,
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
