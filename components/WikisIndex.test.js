import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'

import WikisIndex from './WikisIndex'

describe('WikisIndex', () => {
  it('renders a div with a className wikis-index', () => {
    const wikisIndex = shallow(<WikisIndex />)
    expect(wikisIndex.hasClass('wikis-index')).toEqual(true)
  })

  it('renders a link to /wikis/new', () => {
    const wikisIndex = shallow(<WikisIndex />)
    const createNewWikiLink = wikisIndex.find(Link).find('.create-wiki')
    expect(createNewWikiLink.prop('to')).toEqual('/wikis/new')
  })
})
