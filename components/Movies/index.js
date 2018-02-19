// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import type { ReduxState } from '../../reducers/initialState'
import type { MovieModel } from '../../data/movies'
import movies from '../../data/movies'
import { fetchAllTvShows } from '../../actions'
import MoviePoster from '../MoviePoster'
import MoviePopup from '../MoviePopup'

type State = {
  popupIsOpen: boolean,
  movie: ?MovieModel
}

type Props = {
  movies: MovieModel[],
  fetchAllTvShows: Function
}

class Movies extends Component<Props, State> {
  state = {
    popupIsOpen: false,
    movie: null
  }

  static defaultProps = {
    movies: []
  }

  componentWillMount () {
    this.props.fetchAllTvShows()
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
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {movies.map((movie, index) =>
            <MoviePoster movie={movie} key={index} onOpen={() => this.openMovie(movie)} />)}
        </ScrollView>
        <MoviePopup
          movie={this.state.movie}
          isOpen={this.state.popupIsOpen}
          onClose={this.closeMovie}
          />
      </View>
    )
  }
}

const mapStateToProps = ({ tvShows }): ReduxState => {
  return { tvShows }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default connect(mapStateToProps, { fetchAllTvShows })(Movies)
