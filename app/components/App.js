import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import NewWiki from './NewWiki'

const App = () => {
  return (
    <Switch>
      <Route exact path='/wikis/new' component={NewWiki} />
      <Route exact path='/' component={Home} />
    </Switch>
  )
}

export default App
