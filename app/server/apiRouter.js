import { Router } from 'express'
import moment from 'moment'
import path from 'path'
import Sql from 'better-sqlite3'

const apiRouter = Router()

apiRouter.post('/wikis', (req, res) => {
  const title = req.body.title
  const content = req.body.content
  const now = moment().format()

  const db = new Sql(path.join(__dirname, '../../db/database.db'))
  const query = 'INSERT INTO wiki (date_created, date_updated, title, content) VALUES (?, ?, ?, ?)'
  const createEntry = db.prepare(query)
  createEntry.run(now, now, title, content)

  const latestEntry = db.prepare('SELECT * FROM wiki ORDER BY date_created DESC LIMIT 1').get()
  res.status(200).send(latestEntry)
  db.close()
})

export default apiRouter
