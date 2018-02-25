// @flow
import * as actionTypes from '../actions/actionTypes'
import { all, call, fork, put } from 'redux-saga/effects'
import type { AllEffect } from 'redux-saga'
import rootSagas, { fetchAllTvGenres, fetchAllTvShows, watchTvShows } from './'

import * as theMovieDBService from '../services/theMovieDB'

describe('sagas', () => {
  it('exports a proper rootSagas object', () => {
    function * fakeRootSaga (): Generator<AllEffect, void, any> {
      yield all([
        fork(fetchAllTvGenres),
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
      const tvShowsResults = { results: [] }

      expect(iterable.next().value).toEqual(call(theMovieDBService.fetchMostPopular))
      expect(iterable.next({ results: [] }).value).toEqual(put({
        type: actionTypes.TV_SHOWS_RESULTS,
        payload: tvShowsResults
      }))
      expect(iterable.next().done).toEqual(true)
    })
  })

  describe('fetchAllTvGenres', () => {
    it('follows a correct generator logic', () => {
      const iterable = fetchAllTvGenres()
      const tvShowsResults = { genres: [] }

      expect(iterable.next().value).toEqual(call(theMovieDBService.fetchAllGenres))
      expect(iterable.next({ genres: [] }).value).toEqual(put({
        type: actionTypes.TV_SHOWS_FETCH_GENRES,
        payload: tvShowsResults
      }))
      expect(iterable.next().done).toEqual(true)
    })
  })
})
