const prismaClient = require("../prisma/client/prisma");

class PrismaConversationsRepository {
  constructor(conf) {
    this.prisma = PrismaClient;
    this.cnv = this.prisma.conversation
  }
}

const prismaConversationsClient = new PrismaConversationsRepository()

module.exports = prismaConversationsClient