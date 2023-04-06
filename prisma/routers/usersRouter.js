const express = require('express')
const { signup, signin } = require('../controllers/usersController')

const router = express.Router()

router.route("/signup").post(signup)
router.route("/signin").post(signin)

router.route('/')
      .get()
      .post()

module.exports = router