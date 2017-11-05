import { Router } from 'express'

import databaseClientFactory from '../services/databaseClient'
const databaseClient = databaseClientFactory()

const apiRouter = Router()

apiRouter.post('/wikis', (req, res) => {
  const title = req.body.title
  const content = req.body.content
  const latestEntry = databaseClient.insertEntry(title, content)

  res.status(200).send(latestEntry)
})

apiRouter.get('/wikis', (req, res) => {
  const entries = databaseClient.listEntries()
  res.status(200).send(entries)
})

export default apiRouter
