const Tour = require('../models/tourModel')
const ApiFeatures = require('../utils/apiFeatures')

exports.checkID = (
  req,
  res,
  next
  // id
) => {}

exports.getAllTours = async (req, res) => {
  try {
    const apiFeatures = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .fields()
      .sort()
      .paginate()

    const tours = await apiFeatures.query

    // send documents
    res.status(200).json({
      status: 'succes',
      results: tours.length,
      data: {
        tours,
      },
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'not found',
    })
  }
}

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({
      status: 'succes',
      data: {
        tour,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'not found',
    })
  }
}

exports.postTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)

    res.status(201).send({
      status: 'succes',
      data: {
        tour: newTour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail 💥',
      message: 'invalid data sent!',
    })
  }
}

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({
      status: 'succes',
      data: {
        tour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail 💥',
      message: 'invalid data sent!',
    })
  }
}

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'succes',
      data: {
        tour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail 💥',
      message: 'invalid data sent!',
    })
  }
}
