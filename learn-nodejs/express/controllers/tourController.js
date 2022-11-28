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

exports.checkBody = (
  req,
  res,
  next
) => {
  if (req.body.name && req.body.price)
    next()
  res.status(400).json({
    status: 'fail',
    message: 'bad request 🙅🏻‍♂️',
  })
}

exports.checkID = (
  req,
  res,
  next,
  id
) => {
  console.log(typeof id)
  const tour = tours.find(
    (el) => el.id === id * 1
  )

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID 💥',
    })
  }
  next()
}

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

  res.status(200).json({
    status: 'succes',
    data: {
      tour,
    },
  })
}

exports.postTour =  async (req, res) => {
  const data = req.body
  data.id =
    tours[tours.length - 1].id + 1
  // await fs.promises.writeFile(
  //   path.join(
  //     __dirname,
  //     '..',
  //     'dev-data',
  //     'tours1.json'
  //   ),
  //   JSON.stringify(
  //     [...tours, data],
  //     null,
  //     4
  //   ),
  //   (err) => console.log(err)
  // )
  res.status(201).send({
    status: 'succes',
    data: {
      tour: data
    }
  })
}

exports.updateTour = (req, res) => {
  const tour = tours.find(
    (el) => el.id === req.params.id * 1
  )

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

  res.status(204).json({
    status: 'succes',
    data: {
      tour: '<DELETED TOUR>',
    },
  })
}
