const Tour = require('../models/tourModel')
const ApiErrors = require('../utils/apiErrors')
const ApiFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchAsync')

exports.aliasCheap5 = (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = 'price'
  req.query.fields = 'name,price,summary'

  next()
}

exports.checkID = (
  req,
  res,
  next
  // id
) => {}

exports.getAllTours = catchAsync(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(Tour.find(), req.query)
    .filter()
    .fields()
    .sort()
    .paginate()

  const tours = await apiFeatures.query
  const statusCode = tours.length ? 200 : 204

  // send documents
  res.status(statusCode).json({
    status: 'succes',
    results: tours.length,
    data: {
      tours,
    },
  })
})

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id)

  if (!tour) return next(new ApiErrors('no tour found with this ID. 🤷', 404))

  res.status(200).json({
    status: 'succes',
    data: {
      tour,
    },
  })
})

exports.postTour = catchAsync(async (req, res, next) => {
  // const tour = Tour.create({})
  // tour.save()

  const newTour = await Tour.create(req.body)

  res.status(201).send({
    status: 'succes',
    data: {
      tour: newTour,
    },
  })
})

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!tour) return next(new ApiErrors('no tour found with this ID. 🤷', 404))

  res.status(200).json({
    status: 'succes',
    data: {
      tour,
    },
  })
})

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id)

  if (!tour) return next(new ApiErrors('no tour found with this ID. 🤷', 404))

  res.status(204).json({
    status: 'succes',
    data: {
      tour,
    },
  })
})

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ])

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  })
})

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1 // 2021

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
    {
      $limit: 12,
    },
  ])

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  })
})
