const express = require('express');
const { saveNewConversation } = require('../controllers/conversationsController');
const ErrorsWrapper = require('../errors/errorsWrapper');


const router = express.Router();


router.route("/:userId")
      .get()
      .post(ErrorsWrapper(saveNewConversation))
      .delete()
      .put()

module.exports = router

