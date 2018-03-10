// @flow
import * as actionTypes from '../actions/actionTypes'
import type { TvShowsAction, TvShowsStore } from 'types'

const initialState: TvShowsStore = {
  genres: [],
  results: []
}

const tvShowsReducer = (state: TvShowsStore = initialState, action: TvShowsAction): TvShowsStore => {
  switch (action.type) {
    case actionTypes.TV_SHOWS_FETCH_GENRES:
      return {
        ...state,
        ...action.payload
      }
    case actionTypes.TV_SHOWS_RESULTS:
      return {
        ...state,
        ...action.payload
      }
    case actionTypes.TV_SHOWS_GENRES:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default tvShowsReducer
