import * as actionTypes from './actionTypes'

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
