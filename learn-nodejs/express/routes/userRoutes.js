const express = require('express')
const { getAllUsers, getUser, postUser, deleteUser, updateUser } = require('../controllers/userController')
const { signup } = require('../controllers/authController')

const router = express.Router()

router.post('/signup', signup)

router.route('/').get(getAllUsers).post(postUser)

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router
