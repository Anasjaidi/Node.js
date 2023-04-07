const prismaClient = require("../prisma/client/prisma");

class PrismaConversationsRepository {
	constructor(conf) {
		this.prisma = prismaClient;
		this.cnv = this.prisma.conversation;
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
}

const prismaConversationsClient = new PrismaConversationsRepository();

module.exports = prismaConversationsClient;
