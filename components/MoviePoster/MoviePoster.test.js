// @flow
import React from 'react'
import MoviePoster from './'
import { shallow } from 'enzyme'
import type { TvShowsResult } from '../../services/theMovieDB'

describe('MoviePoster', () => {
  let movie: ?TvShowsResult

  beforeEach(() => {
    movie = {
      name: 'Blade Runner',
      poster_path: 'blade-runner.jpg',
      vote_average: 4.5,
      original_language: 'en-US',
      overview: '... text ...',
      vote_count: 10000
    }
  })

  it('matches current snapshot', () => {
    const rendered = shallow(<MoviePoster movie={movie} onOpen={jest.fn()} />)

    expect(rendered).toMatchSnapshot()
  })

  it('executed onOpen with correct arguments', () => {
    const onOpenMock = jest.fn()

    const rendered = shallow(<MoviePoster movie={movie} onOpen={onOpenMock} />)

    rendered.simulate('press')

    expect(onOpenMock).toHaveBeenCalledWith(movie)
  })
})
