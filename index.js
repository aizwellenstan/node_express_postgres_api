const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/records', db.get/Records)
app.get('/records/:id', db.get/RecordById)
app.post('/records', db.create/Record)
app.put('/records/:id', db.update/Record)
app.delete('/records/:id', db.delete/Record)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
