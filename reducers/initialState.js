// @flow
import type { TvShowsResults } from '../services/theMovieDB'

type ReduxState = {
  tvShows: ?TvShowsResults
}

const initialState: ReduxState = {
  tvShows: null
}

export default initialState
export type { ReduxState }
