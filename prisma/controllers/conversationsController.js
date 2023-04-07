const prismaConversationsClient = require("../classes/prismaConversationClient")

const saveNewConversation = async (req, res, next) => {
	const addedConversation = await prismaConversationsClient.createNewConversation(req.params.userId, {title: "new conversation"})

	console.log(req.params.userId);

	res.status(201).json({
		status: "success",
		data: addedConversation,
	});
}

module.exports = {saveNewConversation}