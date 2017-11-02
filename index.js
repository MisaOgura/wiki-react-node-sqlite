import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import NewWiki from './components/NewWiki'

render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/wikis/new' component={NewWiki} />
      <Route exact path='/' component={Home} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
)
