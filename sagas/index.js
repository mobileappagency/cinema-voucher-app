// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import type { AllEffect, ForkEffect, Effect } from 'redux-saga'
import * as actionTypes from '../actions/actionTypes'
import type { TvShowsResults, TvShowsGenreResults } from 'types'

import * as theMovieDBService from '../services/tmdb'

export function * fetchAllTvShows (): Generator<Effect, void, any> {
  try {
    const tvShowsResults: TvShowsResults = yield call(theMovieDBService.fetchMostPopular)
    yield put({ type: actionTypes.TV_SHOWS_RESULTS, payload: tvShowsResults })
  } catch (e) {
    yield put({ type: actionTypes.TV_SHOWS_FETCH_FAILURE })
  }
}

export function * fetchAllTvGenres (): Generator<Effect, void, any> {
  try {
    const allTvgenres: TvShowsGenreResults = yield call(theMovieDBService.fetchAllGenres)
    yield put({ type: actionTypes.TV_SHOWS_FETCH_GENRES, payload: allTvgenres })
  } catch (e) {
    yield put({ type: actionTypes.TV_SHOWS_FETCH_FAILURE })
  }
}

export function * watchTvShows (): Generator<ForkEffect<*, *, *>, void, any> {
  yield takeEvery(actionTypes.TV_SHOWS_FETCH_ALL, fetchAllTvShows)
}

export default function * rootSaga (): Generator<AllEffect, void, any> {
  yield all([
    fork(fetchAllTvGenres),
    fork(watchTvShows)
  ])
}
