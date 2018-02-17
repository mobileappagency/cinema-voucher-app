// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View
} from 'react-native'
import type { MovieModel } from '../../data/movies'

type Props = {
    movie: MovieModel,
    isOpen: boolean,
    onClose: Function
}

export default class MoviePoster extends Component<Props> {
  static propTypes = {
    movie: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  render () {
    return <View />
  }
}
