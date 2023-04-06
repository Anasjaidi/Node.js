const prismaClient = require('../prisma/client/prisma')



class prismaUsersRepository {

  constructor(conf) {
    this.prisma = prismaClient
    this.users = this.prisma.user
  }

  async signup(user) {
    return await this.users.create({data: user})
  }
}

const prismaUsersClient = new prismaUsersRepository()

module.exports = prismaUsersClient