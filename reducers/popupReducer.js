// @flow
import * as actionTypes from '../actions/actionTypes'
import type { PopupAction, PopupStore } from 'types'

const initialState: PopupStore = {
  isOpen: false,
  tvShow: null
}

const popupReducer = (state: PopupStore = initialState, action: PopupAction): PopupStore => {
  switch (action.type) {
    case actionTypes.POPUP_CLOSE:
      return {
        isOpen: false,
        tvShow: null
      }
    case actionTypes.POPUP_OPEN:
      return {
        isOpen: true,
        tvShow: action.payload
      }
    default:
      return state
  }
}

export default popupReducer
