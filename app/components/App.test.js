import React from 'react'
import { mount } from 'enzyme'
import { StaticRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import App from './App'
import Home from './Home'
import NewWiki from './NewWiki'
import Wiki from './Wiki'

describe('App', () => {
  it('displays Home component when on /', () => {
    const app = mountAppWithPath('/')
    expect(app.find(Home)).toHaveLength(1)
    expect(app.find(NewWiki)).toHaveLength(0)
    expect(app.find(Wiki)).toHaveLength(0)
  })

  it('displays NewWiki component when on /wikis/new', () => {
    const app = mountAppWithPath('/wikis/new')
    expect(app.find(Home)).toHaveLength(0)
    expect(app.find(NewWiki)).toHaveLength(1)
    expect(app.find(Wiki)).toHaveLength(0)
  })

  it('displays Wiki component when on /wikis/:id', () => {
    const app = mountAppWithPath('/wikis/123')
    expect(app.find(Home)).toHaveLength(0)
    expect(app.find(NewWiki)).toHaveLength(0)
    expect(app.find(Wiki)).toHaveLength(1)
  })

  it.skip('fetches the list of entries when coming from another page', () => {})

  function mountAppWithPath (path) {
    const props = {context: {}, location: path}
    return mount(
      <StaticRouter {...props}>
        <App history={createMemoryHistory()} />
      </StaticRouter>
    )
  }
})
