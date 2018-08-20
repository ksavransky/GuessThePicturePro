import React, { Component } from 'react';
import { Button } from 'react-native-elements';

export default class LargeButton extends Component {
  render() {
    return (
      <Button
        onPress={this.props.onPress}
        style={this.props.style}
        large
        raised
        rounded
        fontFamily='ChalkboardSE'
        fontSize={30}
        backgroundColor={this.props.backgroundColor || '#28a745'}
        title={this.props.title || ''} />
    )
  }
}
