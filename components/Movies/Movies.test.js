import React from 'react'
import Movies from './'

import renderer from 'react-test-renderer'

describe('Movies', () => {
  it('matches current snapshot', () => {
    const rendered = renderer.create(<Movies />)

    expect(rendered).toMatchSnapshot()
  })
})
