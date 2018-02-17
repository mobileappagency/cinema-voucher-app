// @flow
import React, { Component } from 'react'
import {
  ScrollView,
  View
} from 'react-native'
import type { MovieModel } from '../../data/movies'
import movies from '../../data/movies'
import MoviePoster from '../MoviePoster'

type State = {
  popupIsOpen: boolean,
  movie: ?MovieModel
}

type Props = {
  movies: MovieModel[]
}

export default class Movies extends Component<Props, State> {
  state = {
    popupIsOpen: false,
    movie: null
  }

  static defaultProps = {
    movies: []
  }

  openMovie = (movie: MovieModel) => {
    this.setState({
      popupIsOpen: true,
      movie
    })
  }

  closeMovie = () => {
    this.setState({
      popupIsOpen: false
    })
  }

  render () {
    return (
      <View>
        <ScrollView>
          {movies.map((movie, index) =>
            <MoviePoster movie={movie} key={index} onOpen={() => {}} />)}
        </ScrollView>
      </View>
    )
  }
}
