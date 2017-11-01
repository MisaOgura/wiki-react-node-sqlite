import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/Home'

render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
)
