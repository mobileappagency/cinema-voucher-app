// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import type { AllEffect, ForkEffect, Effect } from 'redux-saga'
import * as actionTypes from '../actions/actionTypes'
import type { TvShowAction } from '../actions/actionTypes'
import type { TvShowsResults, TvShowsGenreResults } from '../services/theMovieDB'

import * as theMovieDBService from '../services/theMovieDB'

export function * fetchAllTvShows (action: TvShowAction): Generator<Effect, void, any> {
  try {
    const tvShowsResults: TvShowsResults = yield call(theMovieDBService.fetchMostPopular)
    // call Netflix
    // call Rotten Tomatie
    // call Track.tv
    yield put({ type: actionTypes.TV_SHOWS_RESULTS, payload: tvShowsResults })
  } catch (e) {
    yield put({ type: actionTypes.TV_SHOWS_FETCH_FAILURE })
  }
}

export function * fetchAllTvGenres (): Generator<Effect, void, any> {
  const allTvgenres: TvShowsGenreResults = yield call(theMovieDBService.fetchAllGenres)
  yield put({ type: actionTypes.TV_SHOWS_FETCH_GENRES, payload: allTvgenres })
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
