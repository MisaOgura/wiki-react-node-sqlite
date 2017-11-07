import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import NewWiki from './NewWiki'
import Wiki from './Wiki'

const Routes = ({ wikiProps, homeProps }) => {
  return <Switch>
    <Route exact path='/wikis/new' component={NewWiki} />
    <Route exact path='/wikis/:id'
      render={(routeProps) => <Wiki {...routeProps} {...wikiProps} />} />
    <Route exact path='/'
      render={(routeProps) => <Home {...routeProps} {...homeProps} />} />
  </Switch>
}

export default Routes
