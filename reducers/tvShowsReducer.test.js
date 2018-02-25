// @flow
import * as actionTypes from '../actions/actionTypes'
import tvShowsReducer from './tvShowsReducer'
import type { TvShowsAction, TvShowsStore, TvShowsPayload } from './tvShowsReducer'
import type { TvShowsResult } from '../services/theMovieDB'

describe('tvShowsReducer', () => {
  let tvShowsResult: TvShowsResult = {
    name: 'Dunkirk',
    poster_path: 'dunkirk.jpg',
    original_language: 'en-GB',
    overview: 'Overview text...',
    vote_average: 4.8,
    vote_count: 50000
  }
  let action: TvShowsAction = { type: null, payload: { results: [] } }
  let initialState: ?TvShowsStore = {
    genres: [],
    results: []
  }

  it('should return the initial state (null)', () => {
    expect(tvShowsReducer(initialState, action)).toEqual(initialState)
  })

  it('should handle TV_SHOWS_RESULTS', () => {
    let payload: TvShowsPayload = { results: [ tvShowsResult ] }
    action.type = actionTypes.TV_SHOWS_RESULTS
    action.payload = payload

    expect(tvShowsReducer(initialState, action)).toEqual({
      genres: [], results: [ tvShowsResult ]
    })
  })

  it('should handle TV_SHOWS_GENRES', () => {
    action = {
      type: actionTypes.TV_SHOWS_GENRES,
      payload: { genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Thriller' }
      ]}
    }

    expect(tvShowsReducer(initialState, action)).toEqual({
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Thriller' }
      ],
      results: []
    })
  })
})
