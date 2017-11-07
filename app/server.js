import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'

import databaseMiddleware from './utils/databaseMiddleware'
import componentRouter from './routers/componentRouter'
import apiRouter from './routers/apiRouter'

const app = express()

app.use(bodyParser.json())
app.use(databaseMiddleware)
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))

app.use('/api', apiRouter)
app.use('*', componentRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`)
})
