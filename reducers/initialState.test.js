// @flow
import initialState from './initialState'

describe('initialState', () => {
  it('matches current snapshot', () => {
    expect(initialState).toMatchSnapshot()
  })
})
