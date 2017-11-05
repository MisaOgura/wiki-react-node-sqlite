import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'

const preloadedData = window.__PRELOADED_DATA__
delete window.__PRELOADED_DATA__

hydrate(
  <Router><App preloadedData={preloadedData} /></Router>,
  document.getElementById('app')
)
