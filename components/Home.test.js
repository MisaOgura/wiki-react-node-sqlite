import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'

import Home from './Home'

describe('Home', () => {
  let home

  beforeEach(() => {
    home = shallow(<Home />)
  })

  it('renders a div with a className wikis-index', () => {
    expect(home.hasClass('wikis-index')).toEqual(true)
  })

  it('renders a link to /wikis/new', () => {
    const linkToNewWiki = home.find(Link).find('.home')
    expect(linkToNewWiki.prop('to')).toEqual('/wikis/new')
  })
})
