import path from 'path'
import express from 'express'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendStatus(200)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`)
})
