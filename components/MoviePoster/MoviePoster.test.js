import React from 'react'
import MoviePoster from './'
import { shallow } from 'enzyme'

describe('MoviePoster', () => {
  it('matches current snapshot', () => {
    const rendered = shallow(<MoviePoster movie={{}} onOpen={() => {}} />)

    expect(rendered).toMatchSnapshot()
  })
  
  it('executed onOpen', () => {
    const onOpenMock = jest.fn()

    const rendered = shallow(<MoviePoster movie={{}} onOpen={onOpenMock} />)

    rendered.simulate('press')

    expect(onOpenMock).toHaveBeenCalled()
  })
})
