const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getRecords = (request, response) => {
  pool.query('SELECT * FROM record ORDER BY rent_timestamp LIMIT 100', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRecordById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM Records WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createRecord = (request, response) => {
  const { example1, example2 } = request.body

  pool.query('INSERT INTO Records (example1, example2) VALUES ($1, $2)', [example1, example2], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Record added with ID: ${results.insertId}`)
  })
}

const updateRecord = (request, response) => {
  const id = parseInt(request.params.id)
  const { example1, example2 } = request.body

  pool.query(
    'UPDATE Records SET example1 = $1, example2 = $2 WHERE id = $3',
    [example1, example2, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Record modified with ID: ${id}`)
    }
  )
}

const deleteRecord = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM Records WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Record deleted with ID: ${id}`)
  })
}

module.exports = {
  getRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
}
