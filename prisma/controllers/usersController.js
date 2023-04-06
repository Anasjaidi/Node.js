const prismaUsersClient = require('../classes/prismaUsersClient')


const signup = async (req, res, next) => {
  const user = await prismaUsersClient.signup(req.body)

  const token = await jwt.sign({ uid: user.uid }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

  res.status(201).json({status: 'success', data: user, token})
}

const signin = async (req, res, next) =>  {

}

module.exports = {signup, signin}