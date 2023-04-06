const { PrismaClient } = require("@prisma/client");
const prismaClient = require('../prisma/client/prisma')



class prismaUsersClient {

  constructor(conf) {
    this.prisma = prismaClient
    this.users = this.prisma.user
  }

  async signup(user) {
    return await this.users.create({user})
  }
}

const prismaUsersClient = new prismaUsersClient()

module.exports = prismaUsersClient