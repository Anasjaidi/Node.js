const bcrypt = require("bcryptjs");
const prismaUsersClient = require("../classes/prismaUsersClient");
const jwt = require("jsonwebtoken");


class Auth {
	constructor() {}

	async signup(body) {

    const {firstName, lastName, email} = body

    const password = await this.hashPassword(body.password, 12);

    const newUser = await prismaUsersClient.addUser({firstName, lastName, email, password})
  
    return newUser
  }

  async hashPassword(pass, salt) {
    return await bcrypt.hash(pass, salt)
  }

  async checkPassword(candidatePassword, password) {
    return await bcrypt.compare(candidatePassword, password)
  }
}
