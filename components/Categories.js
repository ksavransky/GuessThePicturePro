import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { sortBy } from 'lodash'


// props
// totalPuzzles - int - from data file
// completedPuzzles - int - from local memory NOTE: probably want to store array with key names in local memory for complete, then use length here
// points - int - from local memory

export default class Categories extends Component {

  componentWillMount() {
    this._storeData()
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('@AHH:hi:no', '@AHH:hi:no!!');
    } catch (error) {
      console.warn('error in _storeData', error);
    }
  }


  _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('@AHH:hi:no');
        if (value !== null) {
          console.warn('in _retrieveData value:');
          console.warn(value);
        }
      } catch (error) {
        console.warn('error in _retrieveData', error);
      }
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
              onPress={this._retrieveData}
            />
          ))
        }
      </List>
    )
  }
}
