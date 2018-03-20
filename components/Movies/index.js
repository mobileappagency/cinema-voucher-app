// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import type { TvShowsResults, TvShowsResult } from 'types'
import { fetchAllTvShows, openPopup, closePopup } from '../../actions'
import MoviePoster from '../MoviePoster'
import MoviePopup from '../MoviePopup'

type ReduxMappedProps = {
  tvShows: TvShowsResults
}

type Props = {
  fetchAllTvShows: Function,
  openPopup: Function
} & ReduxMappedProps

class Movies extends Component<Props> {
  componentWillMount () {
    this.props.fetchAllTvShows()
  }

  openTvShow = (tvShow: TvShowsResult) => {
    this.props.openPopup(tvShow)
  }

  render () {
    const { tvShows } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.navbar} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {tvShows.results.map((movie, index) =>
            <MoviePoster movie={movie} key={index} onOpen={() => this.openTvShow(movie)} />)}
        </ScrollView>
        <MoviePopup />
      </View>
    )
  }
}

const mapStateToProps = ({ tvShows }): ReduxMappedProps => {
  return { tvShows }
}

const styles = StyleSheet.create({
  container: {
  },
  navbar: {
    backgroundColor: '#f7f7f7',
    height: 50
  },
  scrollContent: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default connect(mapStateToProps, { fetchAllTvShows, openPopup, closePopup })(Movies)
