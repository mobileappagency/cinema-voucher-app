// @flow
import React from 'react'
import MoviePopup from './'
import { shallow } from 'enzyme'
import type { MovieModel } from '../../data/movies'

describe('MoviePopup', () => {
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
    const rendered = shallow(<MoviePopup movie={movie} isOpen onClose={jest.fn()} />)

    expect(rendered).toMatchSnapshot()
  })

  it('executed onClose', () => {
    const onCloseMock = jest.fn()

    const rendered = shallow(<MoviePopup movie={movie} isOpen onClose={onCloseMock} />)

    rendered.find('TouchableWithoutFeedback').simulate('press')

    expect(onCloseMock).toHaveBeenCalled()
  })
})
