const fs = require('fs')
const path = require('path')

const tours = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      '..',
      'dev-data',
      'tours.json'
    ),
    'utf-8'
  )
)

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'succes',
    results: tours.length,
    data: {
      tours,
    },
  })
}

exports.getTour = (req, res) => {
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

exports.postTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
