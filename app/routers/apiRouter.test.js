import express from 'express'
import request from 'supertest'
import bodyParser from 'body-parser'

import apiRouter from './apiRouter'

const mockPreloadedData = [{entry: 'one', another: 'entry'}]
const mockLatestEntry = {latest: 'wiki'}

jest.mock('../services/databaseClient', () => jest.fn(() => ({
  insertEntry: jest.fn(() => mockLatestEntry),
  listEntries: jest.fn(() => mockPreloadedData)})
))

const app = express()

app.use(bodyParser.json())
app.use('/api', apiRouter)

describe('apiRouter', () => {
  it('retrieves a list entries from the database', async () => {
    const res = await request(app).get('/api/wikis')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(mockPreloadedData)
  })

  it('creates an entry from the request', async () => {
    const mockRequestBody = {title: 'Ice Age Giants', content: 'Furry mammoth'}
    const res = await request(app)
      .post('/api/wikis')
      .send(mockRequestBody)
      .set('Accept', 'application/json')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(mockLatestEntry)
  })
})
