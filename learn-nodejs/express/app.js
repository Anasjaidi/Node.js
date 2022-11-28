const express = require('express')
const fs = require('fs')
const path = require('path')

const port = 3000
const app = express()
const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'dev-data', 'tours.json'), 'utf-8')
)

app.use(express.json())

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'succes',
    results: tours.length,
    data: {
      tours,
    },
  })
})

app.get('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID 💥',
    })
  }

  res.status(200).json({
    status: 'succes',
    data: {
      tour,
    },
  })
})

app.post('/api/v1/tours', async (req, res) => {
  const data = req.body
  data.id = tours[tours.length - 1].id + 1
  fs.writeFile(
    path.join(__dirname, 'dev-data', 'tours.json'),
    JSON.stringify([...tours, data], null, 4),
    (err) => console.log(err)
  )
  res.send('hello')
})

app.patch('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID 💥',
    })
  }

  res.status(200).json({
    status: 'succes',
    data: {
      tour: '<UPDATED TOUR>',
    },
  })
})



app.delete('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID 💥',
    })
  }

  res.status(204).json({
    status: 'succes',
    data: {
      tour: '<DELETED TOUR>',
    },
  })
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
