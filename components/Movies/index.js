// @flow
import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View
} from 'react-native'
import type { MovieModel } from '../../data/movies'
import movies from '../../data/movies'

type Props = {
  movies: MovieModel[]
}

export default class Movies extends Component<Props> {
  static defaultProps = {
    movies: []
  }

  render () {
    return (
      <View>
        <ScrollView>
          {movies.map((movie, index) => <Text key={index}>{movie.title}</Text>)}
        </ScrollView>
      </View>
    )
  }
}
