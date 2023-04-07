const express = require('express');
const { saveNewConversation, getAllConversationsAssociatedWithUser } = require('../controllers/conversationsController');
const ErrorsWrapper = require('../errors/errorsWrapper');


const router = express.Router();


router.route("/:userId")
      .get(ErrorsWrapper(getAllConversationsAssociatedWithUser))
      .post(ErrorsWrapper(saveNewConversation))
      .delete()
      .put()

module.exports = router

