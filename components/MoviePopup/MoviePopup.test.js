import React from 'react'
import MoviePopup from './'
import { shallow } from 'enzyme'

describe('MoviePopup', () => {
  let movie

  beforeEach(() => {
    movie = {
      title: 'Blade Runner',
      genre: 'sci-fi',
      poster: 'http://movie-posters.com/blade-runner.jpg'
    }
  })

  it('matches current snapshot', () => {
    const rendered = shallow(<MoviePopup movie={movie} isOpen onClose={jest.fn()} />)

    expect(rendered).toMatchSnapshot()
  })

  it('executed onClose with correct arguments', () => {
    const onCloseMock = jest.fn()

    const rendered = shallow(<MoviePopup movie={movie} isOpen onClose={onCloseMock} />)

    rendered.simulate('press')

    expect(onCloseMock).toHaveBeenCalledWith(movie)
  })
})
