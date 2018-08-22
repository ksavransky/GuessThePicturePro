import React, { Component } from 'react';
import { Image } from 'react-native';
import { Avatar, List, ListItem } from 'react-native-elements'
import { sortBy } from 'lodash'


// props
// difficulty - string - from Category screen
// categoryName - string - from data file
// totalPuzzles - int - from data file
// completedPuzzles - int - from local memory NOTE: probably want to store array with key names in local memory for complete, then use length here
// categoryImageUrl - string
// points - int - from local memory

export default class Categories extends Component {
  render() {
    sortBy(this.props.categories, ['name']).forEach((category) => {
      console.warn(category.name)
      console.warn(Object.keys(category.levels).length)
    })
    return (
      <List>
        {
          sortBy(this.props.categories, ['name']).map((category) => (
            <ListItem
              avatar={category.iconURL}
              key={category.name}
              title={category.name}
            />
          ))
        }
      </List>
    )
  }
}
