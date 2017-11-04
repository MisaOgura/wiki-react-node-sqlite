import { Router } from 'express'
import moment from 'moment'
import path from 'path'
import Sql from 'better-sqlite3'

const apiRouter = Router()
const env = process.env.NODE_ENV

apiRouter.post('/wikis', (req, res) => {
  const title = req.body.title
  const content = req.body.content
  const now = moment().format()

  const db = new Sql(path.join(__dirname, `../../db/${env}.db`))
  const query = 'INSERT INTO wiki (date_created, date_updated, title, content) VALUES (?, ?, ?, ?)'
  const createEntry = db.prepare(query)
  createEntry.run(now, now, title, content)

  const latestEntry = db.prepare('SELECT * FROM wiki ORDER BY date_created DESC LIMIT 1').get()
  res.status(200).send(latestEntry)

  db.close()
})

apiRouter.get('/wikis', (req, res) => {
  const db = new Sql(path.join(__dirname, `../../db/${env}.db`))
  const query = 'SELECT * FROM wiki ORDER BY datetime(date_created) DESC'
  const entries = db.prepare(query).all()

  res.status(200).send(entries)

  db.close()
})

export default apiRouter
