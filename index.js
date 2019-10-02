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


app.get('/records', db.getRecords)
app.get('/records/:id', db.getRecordById)
app.post('/records', db.createRecord)
app.put('/records/:id', db.updateRecord)
app.delete('/records/:id', db.deleteRecord)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
