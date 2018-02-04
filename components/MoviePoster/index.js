// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

type Movie = {
  title: string,
  genre: string,
  poster: string
}

type Props = {
  movie: Movie,
  onOpen: Function
}

export default class MoviePoster extends Component<Props> {
  static propTypes = {
    movie: PropTypes.object.isRequired,
    onOpen: PropTypes.func.isRequired
  }

  render () {
    const { movie, movie: { title, genre, poster }, onOpen } = this.props
    return (
      <TouchableOpacity onPress={() => onOpen(movie)}>
        <View >
          <Image source={{ uri: poster }} />
        </View>
        <Text numberOfLines={1}>{title}</Text>
        <Text numberOfLines={1}>{genre}</Text>
      </TouchableOpacity>
    )
  }
}
