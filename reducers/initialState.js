// @flow
import type { ReduxState } from 'types'

const initialState: ReduxState = {
  tvShows: { genres: [], results: [] },
  popup: { isOpen: false, tvShow: null }
}

export default initialState
