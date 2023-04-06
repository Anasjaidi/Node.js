const bcrypt = require("bcryptjs");
const prismaUsersClient = require("../classes/prismaUsersClient");
const jwt = require("jsonwebtoken");

class Auth {
	constructor() {}

	async signup(body) {
		const { firstName, lastName, email } = body;

		const password = await this.hashPassword(body.password, 12);

		const newUser = await prismaUsersClient.addUser({
			firstName,
			lastName,
			email,
			password,
		})

    const token = this.generateToken(newUser.uid)

		return {newUser, token};
	}

	async hashPassword(pass, salt) {
		return await bcrypt.hash(pass, salt);
	}

	async checkPassword(candidatePassword, password) {
		return await bcrypt.compare(candidatePassword, password);
	}

	generateToken(payload) {
		return jwt.sign({ id: payload }, process.env.JWT_SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE_IN,
		});
	}
}

const authDAO = new Auth();

module.exports = authDAO;
