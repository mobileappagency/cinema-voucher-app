// @flow
import * as actionTypes from '../actions/actionTypes'
import { all, call, fork, put } from 'redux-saga/effects'
import rootSagas, { fetchAllTvShows, watchTvShows } from './'

import * as theMovieDBService from '../services/theMovieDB'

describe('sagas', () => {
  it('exports a proper rootSagas object', () => {
    function * fakeRootSaga () {
      yield all([
        fork(watchTvShows)
      ])
    }

    const iterable = rootSagas()
    const expectedIterable = fakeRootSaga()

    expect(iterable.next().value).toEqual(expectedIterable.next().value)
  })

  describe('fetchAllTvShows', () => {
    it('follows a correct generator logic', () => {
      const iterable = fetchAllTvShows()
      const theMovieDBResult = { results: [] }

      expect(iterable.next().value).toEqual(call(theMovieDBService.fetchMostPopular))
      expect(iterable.next({ results: [] }).value).toEqual(put({
        type: actionTypes.TV_SHOWS_RESULTS,
        payload: { theMovieDBResult }
      }))
      expect(iterable.next().done).toEqual(true)
    })

    it.ski('puts a failure action with proper payload', () => {
      const iterable = fetchAllTvShows()

      expect(iterable.next().value).toEqual(call(theMovieDBService.fetchMostPopular))
      expect(iterable.next().done).toEqual(true)
    })
  })
})
