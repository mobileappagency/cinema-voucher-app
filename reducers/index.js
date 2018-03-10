// @flow
import { combineReducers } from 'redux'
import tvShowsReducer from './tvShowsReducer'
import popupReducer from './popupReducer'

export default combineReducers({
  tvShows: tvShowsReducer,
  popup: popupReducer
})
