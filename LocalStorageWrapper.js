import React, { Component } from 'react'
import {merge, isEqual} from 'lodash'

export function localStorageWrapper (wrappedComponent) {
  return class extends Component {
    constructor (props) {
      super(props)
      this.state = {
        localStorage: {}
      }
    }

    updateLocalStorage = (newData) => {
      if (!isEqual(newData, this.state.localStorage)) {
        this.setState({
          localStorage: newData
        })
      }
    }

    mergeLocalStorage = (newData) => {
      this.setState({
        localStorage: merge({}, this.state.localStorage, newData)
      })
    }

    render () {
      let CurrentComponent = wrappedComponent
      if (CurrentComponent) {
        return (
          <CurrentComponent
            localStorage={this.state.localStorage}
            updateLocalStorage={this.updateLocalStorage}
            mergeLocalStorage={this.mergeLocalStorage}
            {...this.props} />
        )
      } else {
        return null
      }
    }
  }
}
