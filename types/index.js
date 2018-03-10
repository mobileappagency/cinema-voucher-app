// @flow
import {
  POPUP_CLOSE,
  POPUP_OPEN,
  TV_SHOWS_FETCH_ALL,
  TV_SHOWS_FETCH_FAILURE,
  TV_SHOWS_RESULTS,
  TV_SHOWS_FETCH_GENRES
} from '../actions/actionTypes'

export type GenreType = 'tv' | 'movie'

export type TvShowsResult = {
  genre_ids: Array<number>,
  name: string,
  poster_path: string,
  original_language: string,
  overview: string,
  vote_average: number,
  vote_count: number
}

export type TvGenreResult = {
  id: number,
  name: string
}

export type TvShowsResults = {
  results: Array<TvShowsResult>,
}

export type TvShowsGenreResults = {
  genres: Array<TvGenreResult>
}

export type TvShowActionType = 
  TV_SHOWS_FETCH_ALL | 
  TV_SHOWS_FETCH_FAILURE | 
  TV_SHOWS_RESULTS | 
  TV_SHOWS_FETCH_GENRES

export type PopupActionType = 
  POPUP_CLOSE |
  POPUP_OPEN

export type TvShowsStore = {
  ...$Exact<TvShowsResults>,
  ...$Exact<TvShowsGenreResults>
}

export type PopupAction = {
  type: PopupActionType,
  payload: TvShowsResult
}

export type PopupStore = {
  isOpen: boolean,
  tvShow: ?TvShowsResult
}

export type ReduxState = {
  tvShows: TvShowsStore,
  popup: PopupStore
}

export type TvShowsAction = {
  type: TvShowActionType,
  payload: TvShowsResults | TvShowsGenreResults
}
