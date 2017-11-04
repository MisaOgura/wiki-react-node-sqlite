import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

import databaseMiddleware from './services/databaseMiddleware'
import componentRouter from './routers/componentRouter'
import apiRouter from './routers/apiRouter'

const app = express()

app.use(bodyParser.json())
app.use(databaseMiddleware)
app.use('/public', express.static(path.join(__dirname, '../public')))

app.use('/api', apiRouter)
app.use('*', componentRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`)
})
