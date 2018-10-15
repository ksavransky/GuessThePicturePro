// import React, { Component } from 'react'
// import { View, Image, TouchableOpacity} from 'react-native'
//
// const volumeUp = require('../../assets/images/icons/sound-on.png')
// const volumeOff = require('../../assets/images/icons/sound-off.png')
//
// export default class SoundButton extends Component {
//   render() {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.9}
//         onPress={this.props.setSound}
//         style={{
//           position: 'absolute',
//           top: '5%',
//           left: '5%'
//         }}
//         >
//         <View style={{
//           backgroundColor: 'white',
//           width: 25,
//           height: 25,
//           borderWidth: 2,
//           borderRadius: 100,
//           borderColor: 'black',
//           justifyContent: 'center',
//           alignItems: 'center',
//           shadowOpacity: 0.4,
//           shadowRadius: 1,
//           shadowColor: 'black',
//           shadowOffset: { height: 1, width: 1 }
//         }}>
//         <Image style={{width: 17, height: 17}} source={this.props.isSoundOn ? volumeUp : volumeOff} />
//         </View>
//       </TouchableOpacity>
//     )
//   }
// }
