import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import Routes from './Routes'
import fetchWikis from '../services/fetchWikis'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      entries: this.props.entries,
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

  render () {
    const props = {
      homeProps: {entries: this.state.entries},
      wikiProps: this.state.selectedEntry
    }

    return <div className='App container'><Routes {...props} /></div>
  }
}

App.propTypes = {
  entries: PropTypes.array.isRequired
}

App.defaultProps = {
  entries: []
}

export default withRouter(App)
