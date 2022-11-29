const express = require('express')
const {
  getAllTours,
  postTour,
  getTour,
  updateTour,
  deleteTour,
  aliasCheap5,
} = require('../controllers/tourController')

const router = express.Router()

// router.param('id', checkID)

router.route('/cheap-5').get(aliasCheap5, getAllTours)

router.route('/').get(getAllTours).post(postTour)

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
