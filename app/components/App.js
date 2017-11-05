import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'

import Home from './Home'
import NewWiki from './NewWiki'
import fetchWikis from '../services/fetchWikis'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {entries: this.props.entries || []}
  }

  componentWillMount () {
    this.props.history.listen(async (location, action) => {
      if (location.pathname === '/' && action === 'PUSH') {
        const { data: entries } = await fetchWikis()
        this.setState({entries})
      }
    })
  }

  componentWillUnmount () {
    this.unlisten()
  }

  render () {
    const homeProps = Object.assign({}, this.props, this.state)
    return <div className='App container'>
      <Switch>
        <Route exact path='/wikis/new' component={NewWiki} />
        <Route exact path='/'
          render={(routeProps) => <Home {...routeProps} {...homeProps} />} />
      </Switch>
    </div>
  }
}

export default withRouter(App)
