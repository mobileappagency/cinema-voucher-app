// @flow
import type { TvShowsStore } from './tvShowsReducer'

type ReduxState = {
  tvShows: TvShowsStore
}

const initialState: ReduxState = {
  tvShows: { genres: [], results: [] }
}

export default initialState
export type { ReduxState }
