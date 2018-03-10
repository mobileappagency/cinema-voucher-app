// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import type { ReduxState, TvShowsResults, TvShowsResult } from 'types'
import { fetchAllTvShows } from '../../actions'
import MoviePoster from '../MoviePoster'
import MoviePopup from '../MoviePopup'

type State = {
  popupIsOpen: boolean,
  movie: ?TvShowsResult
}

type Props = {
  fetchAllTvShows: Function,
  tvShows: TvShowsResults
}

class Movies extends Component<Props, State> {
  state = {
    popupIsOpen: false,
    movie: null
  }

  componentWillMount () {
    this.props.fetchAllTvShows()
  }

  openMovie = (movie: TvShowsResult) => {
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
    const { tvShows } = this.props

    console.log(this.state.popupIsOpen, this.state.movie)

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {tvShows.results.map((movie, index) =>
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
