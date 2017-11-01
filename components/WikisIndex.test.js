import React from 'react'
import { shallow } from 'enzyme'

import WikisIndex from './WikisIndex'

describe('WikisIndex', () => {
  it('renders a div with a classname wikis-index', () => {
    const wikisIndex = shallow(<WikisIndex />)
    expect(wikisIndex.hasClass('wikis-index')).toEqual(true)
  })
})
