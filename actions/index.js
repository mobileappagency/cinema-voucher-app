// @flow
import * as actionTypes from './actionTypes'
import type { TvShowsResult } from 'types'

export const fetchAllTvShows = () => {
  return {
    type: actionTypes.TV_SHOWS_FETCH_ALL
  }
}

export const fetchAllTvShowGenres = () => {
  return {
    type: actionTypes.TV_SHOWS_FETCH_GENRES
  }
}

export const closePopup = () => {
  return {
    type: actionTypes.POPUP_CLOSE
  }
}

export const openPopup = (tvShow: TvShowsResult) => {
  return {
    type: actionTypes.POPUP_OPEN,
    payload: tvShow
  }
}
