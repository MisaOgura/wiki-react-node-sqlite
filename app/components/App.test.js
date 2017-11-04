import React from 'react'
import { mount } from 'enzyme'
import { StaticRouter } from 'react-router-dom'

import App from './App'
import Home from './Home'
import NewWiki from './NewWiki'

describe('App', () => {
  it('displays Home component when on /', () => {
    const props = {context: {}, location: '/'}
    const app = mount(<StaticRouter {...props}><App /></StaticRouter>)

    expect(app.find(Home)).toHaveLength(1)
    expect(app.find(NewWiki)).toHaveLength(0)
  })

  it('displays NewWiki component when on /wikis/new', () => {
    const props = {context: {}, location: '/wikis/new'}
    const app = mount(<StaticRouter {...props}><App /></StaticRouter>)

    expect(app.find(Home)).toHaveLength(0)
    expect(app.find(NewWiki)).toHaveLength(1)
  })
})
