// @flow
import React from 'react'
import MoviePoster from './'
import { shallow } from 'enzyme'
import type { MovieModel } from '../../data/movies'

describe('MoviePoster', () => {
  let movie: MovieModel

  beforeEach(() => {
    movie = {
      title: 'Blade Runner',
      genre: 'sci-fi',
      poster: 'http://movie-posters.com/blade-runner.jpg',
      days: [],
      times: []
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
