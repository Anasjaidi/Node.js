const express = require('express')
const { signup } = require('../controllers/usersController')

const router = express.Router()

router.route('/')
      .get()
      .post(signup)

module.exports = router