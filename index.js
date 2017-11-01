import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import WikisIndex from './components/WikisIndex'

render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={WikisIndex} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
)
