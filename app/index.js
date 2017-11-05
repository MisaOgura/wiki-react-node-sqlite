import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'

const preloadedData = window.__PRELOADED_DATA__
delete window.__PRELOADED_DATA__

hydrate(
  <Router><App entries={preloadedData} /></Router>,
  document.getElementById('app')
)
