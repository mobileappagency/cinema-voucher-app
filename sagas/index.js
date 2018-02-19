// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import type { AllEffect, ForkEffect, Effect } from 'redux-saga'
import * as actionTypes from '../actions/actionTypes'
import type { TvShowAction } from '../actions/actionTypes'
import * as theMovieDBService from '../services/theMovieDB'

function * fetchAllTvShows (action: TvShowAction): Generator<Effect, void, any> {
  try {
    const theMovieDBResult = yield call(theMovieDBService.fetchMostPopular)
    yield put({ type: actionTypes.TV_SHOWS_RESULTS, payload: { theMovieDBResult } })
  } catch (e) {
    yield put({ type: actionTypes.TV_SHOWS_FETCH_FAILURE })
  }
}

function * watchTvShows (): Generator<ForkEffect<*, *, *>, void, any> {
  yield takeEvery(actionTypes.TV_SHOWS_FETCH_ALL, fetchAllTvShows)
}

export default function * rootSaga (): Generator<AllEffect, void, any> {
  yield all([
    fork(watchTvShows)
  ])
}
