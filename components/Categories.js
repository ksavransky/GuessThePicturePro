import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import { sortBy } from 'lodash'

export default class Categories extends Component {
  launchCategory = (categoryName, categoryLevels) => {
    this.props.navigation.navigate('Level', {categoryName: categoryName, difficulty: this.props.difficulty, categoryLevels: categoryLevels, titleColor: this.props.titleColor})
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
              subtitle={category.points + ' points'}
              rightTitle={category.levelsComplete + '/' + (category.levels.length || '0') + ' completed'}
              subtitleStyle={{color: 'gold'}}
              rightTitleStyle={{color: 'grey'}}
              onPress={() => { this.launchCategory(category.name, category.levels)}}
            />
          ))
        }
      </List>
    )
  }
}
