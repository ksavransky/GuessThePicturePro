import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import { CONSTANTS } from '../Constants'
import { sortBy } from 'lodash'
import { playSound } from '../utils/Utils'

export default class Categories extends Component {
  launchCategory = (categoryName, categoryLevels) => {
    this.props.navigation.navigate('Level', {categoryName: categoryName, difficulty: this.props.difficulty, categoryLevels: categoryLevels, titleColor: this.props.titleColor})
    playSound('click', this.props.isSoundOn)
  }

  render() {
    return (
      <List containerStyle={{width: '90%'}}>
        {
          sortBy(this.props.asyncStorageData.Game[this.props.difficulty], ['name']).map((category) => (
            <ListItem
              containerStyle={{backgroundColor: '#eff7fd', borderRightWidth: 1, borderRightColor: '#cbd2d9', borderLeftWidth: 1, borderLeftColor: '#cbd2d9'}}
              chevronColor='grey'
              avatar={category.iconPath}
              roundAvatar
              avatarStyle={{width: '120%', height: '120%'}}
              key={category.name}
              title={category.name}
              subtitle={category.points + '/' + (category.levels.length * CONSTANTS.STARTING_POINTS) + ' points'}
              rightTitle={category.levelsComplete + '/' + (category.levels.length || '0') + ' completed'}
              subtitleStyle={{color: 'gold'}}
              rightTitleStyle={{color: category.levelsComplete === category.levels.length ? '#28a745' : 'grey'}}
              onPress={() => {
                if (category.levelsComplete !== category.levels.length) {
                  this.launchCategory(category.name, category.levels)
                } else {
                  this.props.setShowModal(category.name)
                }
              }}
            />
          ))
        }
      </List>
    )
  }
}
