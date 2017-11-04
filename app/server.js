import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import Sql from 'better-sqlite3'

import router from './router'
import apiRouter from './server/apiRouter'

const app = express()

app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, '../public')))

// TODO - implement API router
app.use('/api', apiRouter)
app.use('*', router)

const port = process.env.PORT || 3000
app.listen(port, () => {
  const db = new Sql(path.join(__dirname, '../db/database.db'))
  db.prepare('CREATE TABLE  IF NOT EXISTS wiki (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    'date_created TEXT, ' +
    'date_updated TEXT, ' +
    'title TEXT, ' +
    'content TEXT)').run()
  db.close()
  console.log(`Server listening on port: ${port}...`)
})
