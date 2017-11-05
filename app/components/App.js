import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import NewWiki from './NewWiki'

const App = (props) => {
  return (
    <div className='App container'>
      <Switch>
        <Route exact path='/wikis/new' component={NewWiki} />
        <Route exact path='/'
          render={(routeProps) => <Home {...routeProps} {...props} />} />
      </Switch>
    </div>
  )
}

export default App
