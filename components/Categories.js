import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import { sortBy, clone } from 'lodash'
import { retrieveData } from '../utils/asyncstorage'


// props
// totalPuzzles - int - from data file
// completedPuzzles - int - from local memory NOTE: probably want to store array with key names in local memory for complete, then use length here
// points - int - from local memory

export default class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subtitles: {}
    }
    props.categories.forEach((category) => {
      retrieveData((difficulty + ':' + category.name + ':Points'), (value) => {
        let newSubtitles = clone(this.state.subtitles)
        newSubtitles[category.name] = value
        this.setState({subtitles:  newSubtitles})
      })
    })
  }

  render() {
    const difficulty = this.props.difficulty
    return (
      <List containerStyle={{width: '90%'}}>
        {
          sortBy(this.props.categories, ['name']).map((category) => (
            <ListItem
              avatar={category.iconURL}
              key={category.name}
              title={category.name}
              subtitle={this.state.subtitles[category.name] || '0')}
              onPress={() => { console.warn('clicked on list item')}}
            />
          ))
        }
      </List>
    )
  }
}
