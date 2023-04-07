const prismaConversationsClient = require("../classes/prismaConversationClient")

const saveNewConversation = async (req, res, next) => {
	const addedConversation = await prismaConversationsClient.createNewConversation(req.user.uid, {title: "new conversation"})

	res.status(201).json({
		status: "success",
		data: addedConversation,
	});
}

const getAllConversationsAssociatedWithUser = async (req, res, next) => {

  const conversations = req.user.conversations

	res
		.status(200)
		.json({
			status: "success",
			result: conversations.length,
			data: conversations,
		});
};


const getAllMessagesAssocitedWithConversation = async (req, res, next) => {
	res.status(200).json({
		status: "success"
	})
}

const addNewMessage = async (req, res, next) => {
	res.status(201).json({
		status: "success",
	});
};


const deleteConversation = async (req, res, next) => {
	res.status(204).json({
		status: "success",
	});
};

const updateConversation = async (req, res, next) => {
	res.status(204).json({
		status: "success",
	});
};

module.exports = { saveNewConversation, getAllConversationsAssociatedWithUser, getAllMessagesAssocitedWithConversation, updateConversation, addNewMessage, deleteConversation };