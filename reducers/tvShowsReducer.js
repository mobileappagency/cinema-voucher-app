// @flow
import * as actionTypes from '../actions/actionTypes'
import type { TvShowAction } from '../actions/actionTypes'
import type { TvShowsResult } from '../services/theMovieDB'

const initialState: ?TvShowsResult = null

type TvShowsResultAction = {
  type: TvShowAction,
  payload: TvShowsResult
}

const tvShowsReducer = (state: ?TvShowsResult = initialState, action: TvShowsResultAction): ?TvShowsResult => {
  switch (action.type) {
    case actionTypes.TV_SHOWS_RESULTS:
      return action.payload
    default:
      return initialState
  }
}

export default tvShowsReducer
