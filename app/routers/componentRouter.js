import React from 'react'
import { renderToString } from 'react-dom/server'
import { matchPath, StaticRouter } from 'react-router-dom'

import App from '../components/App'
import routes from '../utils/routes'
import renderPage from '../utils/renderPage'
import databaseClientFactory from '../services/databaseClient'

const databaseClient = databaseClientFactory()

const router = (req, res) => {
  const match = routes.reduce((acc, route) => {
    return matchPath(req.originalUrl, {path: route, exact: true}) || acc
  }, null)

  if (!match) {
    res.status(404).send('Page not found')
  } else {
    const context = {}
    const preloadedData = databaseClient.listEntries()

    const appHtml = renderToString(
      <StaticRouter context={context} location={req.originalUrl}>
        <App entries={preloadedData} />
      </StaticRouter>
    )

    res.status(200).send(renderPage(appHtml, preloadedData))
  }
}

export default router
