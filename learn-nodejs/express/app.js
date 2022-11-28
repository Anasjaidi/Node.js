const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
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

app.use((req, res, next) => {
  console.log('updated time 🕰️')
  req.requestTime = new Date().toDateString()
  next()
})

app.use(morgan('dev'))


const getAllUsers = (req, res) => {
  res.sftatus(200).json({
    status: 'succes',
    message: 'not yet 😩'
  })
}


const postUser = (req, res) => {
  res.sftatus(200).json({
    status: 'succes',
    message: 'not yet 😩',
  })
}

const getUser = (req, res) => {
  res.sftatus(200).json({
    status: 'succes',
    message: 'not yet 😩',
  })
}

const updateUser = (req, res) => {
  res.sftatus(200).json({
    status: 'succes',
    message: 'not yet 😩',
  })
}

const deleteUser = (req, res) => {
  res.sftatus(200).json({
    status: 'succes',
    message: 'not yet 😩',
  })
}

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'succes',
    requestedAt: req.requestTime,
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

app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(postUser)

app
  .route('/api/v1/user/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

app.listen(port, () => {
  console.log(
    `app listening on port ${port}`
  )
})
