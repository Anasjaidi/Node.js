const express = require('express')
const {
  getAllUsers,
  getUser,
  postUser,
  deleteUser,
  updateUser,
} = require('./../controllers/userController')

const router = express.Router()

router
  .route('/')
  .get(getAllUsers)
  .post(postUser)

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = router
