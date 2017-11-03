import path from 'path'
import express from 'express'

import router from './router'

const app = express()

app.use('/public', express.static(path.join(__dirname, '../public')))

// TODO - implement API router
app.get('/api/wikis', (req, res) => {
  res.sendStatus(200)
})

app.get('*', router)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`)
})
