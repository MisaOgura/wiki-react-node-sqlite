import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'

import Home from './Home'

describe('Home', () => {
  let home

  beforeEach(() => {
    home = shallow(<Home />)
  })

  it('displays a div with a className wikis-index', () => {
    expect(home.hasClass('wikis-index')).toEqual(true)
  })

  it('displays a link to /wikis/new', () => {
    const linkToNewWiki = home.find(Link).find('.home')
    expect(linkToNewWiki.prop('to')).toEqual('/wikis/new')
  })
})
