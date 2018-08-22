import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import { sortBy, clone } from 'lodash'
import { retrieveData, storeData } from '../utils/asyncstorage'


// props
// totalPuzzles - int - from data file
// completedPuzzles - int - from local memory NOTE: probably want to store array with key names in local memory for complete, then use length here
// points - int - from local memory

export default class Categories extends Component {
  constructor(props) {
    super(props)

    this.setSubtitles(props)

    this.state = {
      subtitles: {}
    }
  }

  setSubtitles = (props) => {
    props.categories.forEach((category) => {
      retrieveData((props.difficulty + ':' + category.name + ':Points'), (value) => {
        let newSubtitles = clone(this.state.subtitles)
        newSubtitles[category.name] = value
        this.setState({subtitles: newSubtitles})
      })
    })
  }

  render() {
    return (
      <List containerStyle={{width: '90%'}}>
        {
          sortBy(this.props.categories, ['name']).map((category) => (
            <ListItem
              avatar={category.iconURL}
              key={category.name}
              title={category.name}
              subtitle={((this.state.subtitles[category.name] || '0') + ' points')}
              onPress={() => { console.warn('clicked on list item')}}
            />
          ))
        }
      </List>
    )
  }
}
