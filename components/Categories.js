import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import { sortBy } from 'lodash'
import { storeData, getAllDataKeys, retrieveData, clearAllData} from '../utils/asyncstorage'


// props
// totalPuzzles - int - from data file
// completedPuzzles - int - from local memory NOTE: probably want to store array with key names in local memory for complete, then use length here
// points - int - from local memory

export default class Categories extends Component {

  componentWillMount() {
    clearAllData()
    storeData('a', 'huh')
  }

  componentDidMount() {
    getAllDataKeys()
  }

  render() {
    sortBy(this.props.categories, ['name']).forEach((category) => {
      // console.warn(category.name)
      // console.warn(Object.keys(category.levels).length)
    })
    return (
      <List containerStyle={{width: '90%'}}>
        {
          sortBy(this.props.categories, ['name']).map((category) => (
            <ListItem
              avatar={category.iconURL}
              key={category.name}
              title={category.name}
              onPress={() => { retrieveData('a')}}
            />
          ))
        }
      </List>
    )
  }
}
