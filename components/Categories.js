import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import { CONSTANTS } from '../Constants'
import { sortBy } from 'lodash'
import { playSound } from '../utils/Utils'
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

export default class Categories extends Component {
  launchCategory = (categoryName, categoryLevels) => {
    this.props.navigation.navigate('Level', {categoryName: categoryName, difficulty: this.props.difficulty, categoryLevels: categoryLevels, titleColor: this.props.titleColor})
    playSound('click', this.props.isSoundOn)
  }

  render() {
    return (
        <List
          containerStyle={{marginTop: 0}}
          >
        {
          sortBy(this.props.asyncStorageData.Game[this.props.difficulty], ['name']).map((category) => (
            <ListItem
              containerStyle={[listItemContainerStyle.normal, listItemContainerStyle.big]}
              chevronColor='#424242'
              avatar={category.iconPath}
              roundAvatar
              avatarContainerStyle={avatarStyle.big}
              avatarStyle={{width: 60, height: 60}}
              key={category.name}
              title={category.name}
              titleStyle={titleStyle.big}
              subtitle={category.points + '/' + (category.levels.length * CONSTANTS.STARTING_POINTS) + ' points'}
              rightTitle={category.levelsComplete + '/' + (category.levels.length || '0') + ' completed'}
              subtitleStyle={[subtitleStyle.normal, subtitleStyle.big]}
              rightTitleStyle={[{color: category.levelsComplete === category.levels.length ? '#28a745' : 'grey'}, rightTitleStyle.big]}
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

const avatarStyle = StyleSheet.create({
  normal: {
    width: '120%',
    height: '120%'
  },
  big: {
    width: 60,
    height: 60,
    // position: 'absolute',
    // left: 0
  },
})

const titleStyle = StyleSheet.create({
  normal: {},
  big: {
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 7,
    color: '#424242',
  },
})

const subtitleStyle = StyleSheet.create({
  normal: {
    color: '#FB8C00'
  },
  big: {
    fontSize: 14,
    marginLeft: 10,
  },
})

const rightTitleStyle = StyleSheet.create({
  big: {
    fontSize: 14,
  },
})

const listItemContainerStyle = StyleSheet.create({
  normal: {
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#cbd2d9',
    borderLeftWidth: 1,
    borderLeftColor: '#cbd2d9'
  },
  big: {
    height: 90,
    justifyContent: 'center',
  }
})
