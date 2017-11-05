import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'

import Home from './Home'
import NewWiki from './NewWiki'
import Wiki from './Wiki'
import fetchWikis from '../services/fetchWikis'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      entries: this.props.entries || [],
      selectedEntry: null
    }
  }

  componentWillMount () {
    this.props.history.listen(async (location, action) => {
      this.setState({selectedEntry: null})

      const path = location.pathname

      if (/\/wikis\/\d+/.test(path)) {
        const entryId = parseInt(path.replace(/\/wikis\//, ''))
        const selectedEntry = this.state.entries.find(entry => {
          return entry.id === entryId
        })
        this.setState({selectedEntry})
      }

      if (path === '/' && action === 'PUSH') {
        const { data: entries } = await fetchWikis()
        this.setState({entries})
      }
    })
  }

  componentWillUnmount () {
    this.unlisten()
  }

  render () {
    const wikiProps = this.state.selectedEntry
    const homeProps = Object.assign({}, this.props, this.state)

    return <div className='App container'>
      <Switch>
        <Route exact path='/wikis/new' component={NewWiki} />
        <Route exact path='/wikis/:id'
          render={(routeProps) => <Wiki {...routeProps} {...wikiProps} />} />
        <Route exact path='/'
          render={(routeProps) => <Home {...routeProps} {...homeProps} />} />
      </Switch>
    </div>
  }
}

export default withRouter(App)
