const prismaClient = require('../prisma/client/prisma')

const bcrypt = require("bcryptjs")

class prismaUsersRepository {

  constructor(conf) {
    this.prisma = prismaClient
    this.users = this.prisma.user
  }

  async addUser(user) {

    const newUser = await this.users.create({data: user})
    return newUser
  }
}

const prismaUsersClient = new prismaUsersRepository()

module.exports = prismaUsersClient