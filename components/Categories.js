import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import { sortBy, clone } from 'lodash'
import { retrieveData } from '../utils/asyncstorage'

export default class Categories extends Component {
  constructor(props) {
    super(props)

    // this.setSubtitlesAndComplete(props)

    // this.state = {
    //   subtitles: {},
    //   levelsComplete: {}
    // }
  }

  // setSubtitlesAndComplete = (props) => {
  //   props.categories.forEach((category) => {
  //     retrieveData((props.difficulty + ':' + category.name + ':Points'), (value) => {
  //       let newSubtitles = clone(this.state.subtitles)
  //       newSubtitles[category.name] = value
  //       this.setState({subtitles: newSubtitles})
  //     })
  //     retrieveData((props.difficulty + ':' + category.name + ':Complete'), (value) => {
  //       let newLevelsComplete = clone(this.state.levelsComplete)
  //       newLevelsComplete[category.name] = value
  //       this.setState({levelsComplete: newLevelsComplete})
  //     })
  //   })
  // }

  launchCategory = (category) => {
    this.props.navigation.navigate('Level', {difficulty: this.props.difficulty, category: category})
  }

  render() {
    return (
      <List containerStyle={{width: '90%'}}>
        {
          sortBy(this.props.gameData[this.props.difficulty], ['name']).map((category) => (
            <ListItem
              containerStyle={{backgroundColor: '#eff7fd', borderRightWidth: 1, borderRightColor: '#cbd2d9', borderLeftWidth: 1, borderLeftColor: '#cbd2d9'}}
              chevronColor='grey'
              avatar={category.iconPath}
              roundAvatar
              avatarStyle={{width: '120%', height: '120%'}}
              key={category.name}
              title={category.name}
              subtitle={category.points + ' points'}
              rightTitle={category.levelsComplete + '/' + (category.levels.length || '0') + ' completed'}
              subtitleStyle={{color: 'gold'}}
              rightTitleStyle={{color: 'grey'}}
              onPress={() => { this.launchCategory(category.name)}}
            />
          ))
        }
      </List>
    )
  }
}
