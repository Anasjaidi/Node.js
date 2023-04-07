const prismaConversationsClient = require("../classes/prismaConversationClient")

const saveNewConversation = async (req, res, next) => {
	const addedConversation = await prismaConversationsClient.createNewConversation(req.params.userId, {title: "new conversation"})

	res.status(201).json({
		status: "success",
		data: addedConversation,
	});
}

const getAllConversationsAssociatedWithUser = async (req, res, next) => {
	const conversations = await prismaConversationsClient.getAllUserConversations(
		req.params.userId
	);

	res
		.status(200)
		.json({
			status: "success",
			result: conversations.length,
			data: conversations,
		});
};

module.exports = { saveNewConversation, getAllConversationsAssociatedWithUser };