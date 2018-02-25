// @flow
import * as actionTypes from '../actions/actionTypes'
import type { TvShowActionType } from '../actions/actionTypes'
import type { TvShowsResults, TvShowsGenreResults } from '../services/theMovieDB'

type TvShowsStore = {|
  ...$Exact<TvShowsResults>,
  ...$Exact<TvShowsGenreResults>
|}

const initialState: TvShowsStore = {
  genres: [],
  results: []
}

type TvShowsPayload = TvShowsResults | TvShowsGenreResults

type TvShowsAction = {
  type: ?TvShowActionType,
  payload: TvShowsPayload
}

const tvShowsReducer = (state: ?TvShowsStore = initialState, action: TvShowsAction): ?TvShowsResults => {
  switch (action.type) {
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
      return initialState
  }
}

export default tvShowsReducer
export type { TvShowsAction, TvShowsStore, TvShowsPayload }
