const express = require("express");
const {
	saveNewConversation,
	getAllConversationsAssociatedWithUser,
} = require("../controllers/conversationsController");
const ErrorsWrapper = require("../errors/errorsWrapper");
const authDAO = require("../classes/auth");

const router = express.Router();

router
	.route("/")
	.get(
		ErrorsWrapper(authDAO.protectRoute),
		ErrorsWrapper(getAllConversationsAssociatedWithUser)
	)
	.post(ErrorsWrapper(authDAO.protectRoute), ErrorsWrapper(saveNewConversation))
	.delete()
	.put();

module.exports = router;
