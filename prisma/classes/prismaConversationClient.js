const prismaClient = require("../prisma/client/prisma");

class PrismaConversationsRepository {
	constructor(conf) {
		this.prisma = prismaClient;
		this.cnv = this.prisma.conversation;
		this.msg = this.prisma.message
	}

	async getAllUserConversations(userId) {
		const conversations = await this.cnv.findMany({
			where: { userUid: userId },
		});

		return conversations;
	}

	async createNewConversation(userId, cnv) {
		const createdConversation = await this.cnv.create({
			data: { userUid: userId, title: cnv.title },
		});
		return createdConversation;
	}

	async deleteConversation(cnvId) {
		await this.cnv.delete({where: {uid: cnvId}})
		await this.msg.deleteMany({where: {conversation_uid: cnvId}})
	}

	async updateConversation(cnvId, newTitle) {
		return await this.cnv.update({where: {uid: cnvId},data: {title: newTitle}})
	}

	async getAllMessages(cnvId) {
		return await this.msg.findMany({where: {conversation_uid: cnvId}})
	}

	async createNewMessage(cnvId, msg) {
		return await this.msg.create({
			data: {conversation_uid, type: msg.type, content: msg.content},
		});
	}
}

const prismaConversationsClient = new PrismaConversationsRepository();

module.exports = prismaConversationsClient;
