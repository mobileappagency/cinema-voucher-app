// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import type { PopupStore, TvShowsResults, TvShowsResult } from 'types'
import { fetchAllTvShows, openPopup, closePopup } from '../../actions'
import MoviePoster from '../MoviePoster'
import MoviePopup from '../MoviePopup'

type ReduxMappedProps = {
  tvShows: TvShowsResults,
  popup: PopupStore
}

type Props = {
  fetchAllTvShows: Function,
  openPopup: Function,
  closePopup: Function
} & ReduxMappedProps

class Movies extends Component<Props> {
  componentWillMount () {
    this.props.fetchAllTvShows()
  }

  openTvShow = (tvShow: TvShowsResult) => {
    this.props.openPopup(tvShow)
  }

  closeTvShow = () => {
    this.props.closePopup()
  }

  render () {
    const { tvShows, popup } = this.props

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {tvShows.results.map((movie, index) =>
            <MoviePoster movie={movie} key={index} onOpen={() => this.openTvShow(movie)} />)}
        </ScrollView>
        <MoviePopup
          movie={popup.tvShow}
          isOpen={popup.isOpen}
          onClose={this.closeTvShow}
          />
      </View>
    )
  }
}

const mapStateToProps = ({ tvShows, popup }): ReduxMappedProps => {
  return { tvShows, popup }
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

export default connect(mapStateToProps, { fetchAllTvShows, openPopup, closePopup })(Movies)
