const express = require('express')
const {
  getAllTours,
  postTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController')

const router = express.Router()

// router.param('id', checkID)

router.route('/').get(getAllTours).post(postTour)

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
