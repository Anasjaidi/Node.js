const prismaUsersClient = require('../classes/prismaUsersClient')


const signup = async (req, res, next) => {
  const user = await prismaUsersClient.signup(req.body)

  res.status(201).json({status: 'success', data: user})
}


module.exports = {signup}