const prismaClient = require('../prisma/client/prisma')

const bcrypt = require("bcryptjs")

class prismaUsersRepository {

  constructor(conf) {
    this.prisma = prismaClient
    this.users = this.prisma.user
  }

  async signup(user) {

    user.password = await bcrypt.hash(user.password, 12)

    return await this.users.create({data: {
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "password": user.password
    }})
  }
}

const prismaUsersClient = new prismaUsersRepository()

module.exports = prismaUsersClient