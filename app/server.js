import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

import router from './router'

const app = express()

app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, '../public')))

// TODO - implement API router
app.post('/api*', (req, res) => {
  console.log('inside /api router /////////////////')
  console.log(req.body)
  res.sendStatus(200)
})

app.use('*', router)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`)
})
