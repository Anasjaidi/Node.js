const express = require('express')
const fs = require('fs')
const path = require('path')

const port = 3000
const app = express()
const tours = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      'dev-data',
      'tours.json'
    ),
    'utf-8'
  )
)

app.use(express.json())

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'succes',
    results: tours.length,
    data: {
      tours,
    },
  })
}

const getTour = (req, res) => {
  const tour = tours.find(
    (el) => el.id === req.params.id * 1
  )

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
}

const postTour = (req, res) => {
  const data = req.body
  data.id =
    tours[tours.length - 1].id + 1
  fs.writeFile(
    path.join(
      __dirname,
      'dev-data',
      'tours.json'
    ),
    JSON.stringify(
      [...tours, data],
      null,
      4
    ),
    (err) => console.log(err)
  )
  res.send('hello')
}

const updateTour = (req, res) => {
  const tour = tours.find(
    (el) => el.id === req.params.id * 1
  )

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
}

const deleteTour = (req, res) => {
  const tour = tours.find(
    (el) => el.id === req.params.id * 1
  )

  if (!tour) {
    return res.sftatus(404).json({
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
}

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', postTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(postTour)

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

app.listen(port, () => {
  console.log(
    `app listening on port ${port}`
  )
})
