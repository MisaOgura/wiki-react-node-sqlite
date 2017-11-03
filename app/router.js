import { renderToString } from 'react-dom/server'
import React from 'react'
import { matchPath, StaticRouter } from 'react-router-dom'

import routes from './routes'
import renderPage from './renderPage'
import App from './components/App'

const router = (req, res) => {
  const match = routes.reduce((acc, route) => matchPath(req.url, {path: route, exact: true}) || acc, null)

  if (!match) {
    res.status(404).send('Page not found')
  } else {
    const context = {}
    const appHtml = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    )

    res.status(200).send(renderPage(appHtml))
  }
}

export default router
