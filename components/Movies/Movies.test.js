// @flow
import React from 'react'
import configureStore from 'redux-mock-store'

import renderer from 'react-test-renderer'

import initialState from '../../reducers/initialState'
import Movies from './'

describe('Movies', () => {
  let mockStore
  let store

  beforeEach(() => {
    initialState.tvShows.results.push({
      name: 'Blade Runner',
      poster_path: 'blade-runner.jpg',
      vote_average: 4.5,
      original_language: 'en-US',
      overview: '... text ...',
      vote_count: 10000
    })
    mockStore = configureStore([])
    store = mockStore(initialState)
  })

  it('matches current snapshot', () => {
    const rendered: ReactTestRenderer = renderer.create(<Movies store={store} />)

    expect(rendered).toMatchSnapshot()
  })
})
