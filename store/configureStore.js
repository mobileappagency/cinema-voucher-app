import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../reducers'

import type { ActionCreator, Store } from 'redux'
import type { SagaMiddlewareOptions, Task } from 'redux-saga'
import type { ReduxState } from '../reducers/initialState'

type ReduxStore = Store<ReduxState, ActionCreator<*>> & { runSaga: Task<*> }

export default function configureStore (initialState: ReduxState): ReduxStore {
  const sagaMiddleware: SagaMiddlewareOptions<any> = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware
      )
    )
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
