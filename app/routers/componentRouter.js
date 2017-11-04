import React from 'react'
import path from 'path'
import Sql from 'better-sqlite3'
import { renderToString } from 'react-dom/server'
import { matchPath, StaticRouter } from 'react-router-dom'

import routes from './routes'
import renderPage from './renderPage'
import App from '../components/App'

const router = async (req, res) => {
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

    let preloadedData

    if (req.url === '/') {
      const env = process.env.NODE_ENV
      const db = new Sql(path.join(__dirname, `../../db/${env}.db`))
      const query = 'SELECT * FROM wiki ORDER BY datetime(date_created) DESC'
      preloadedData = db.prepare(query).all()
    }

    res.status(200).send(renderPage(appHtml, preloadedData))
  }
}

export default router
