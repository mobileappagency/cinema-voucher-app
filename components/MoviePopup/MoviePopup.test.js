// @flow
import React from 'react'
import MoviePopup from './'
import { shallow } from 'enzyme'
import type { TvShowsResult } from 'types'

describe('MoviePopup', () => {
  let movie: TvShowsResult

  beforeEach(() => {
    movie = {
      genre_ids: [],
      name: 'Blade Runner',
      poster_path: 'http://movie-posters.com/blade-runner.jpg',
      overview: '... text ...',
      vote_average: 4.5,
      vote_count: 100000,
      original_language: 'en-US'
    }
  })

  it('matches current snapshot', () => {
    const rendered = shallow(<MoviePopup movie={movie} isOpen onClose={jest.fn()} />)

    expect(rendered).toMatchSnapshot()
  })

  it.skip('executed onClose', () => {
    const onCloseMock = jest.fn()

    const rendered = shallow(<MoviePopup movie={movie} isOpen onClose={onCloseMock} />)

    rendered.find('TouchableWithoutFeedback').simulate('press')

    expect(onCloseMock).toHaveBeenCalled()
  })
})
