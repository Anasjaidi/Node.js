const authDAO = require('../classes/auth')
const prismaUsersClient = require('../classes/prismaUsersClient')


const signup = async (req, res, next) => {
  
  const { newUser, token } = await authDAO.signup(req.body);

  res.status(201).json({status: 'success', data: newUser, token})
}

const signin = async (req, res, next) =>  {
  const token = await authDAO.signin(req.body)

  res.status(200).json({
    status: "success",
    token
  })
}

const getAllUsers = async (req, res, next) => {
  const users = await prismaUsersClient.getAllUsers();

  res.status(400).json({
    status: "success",
    result: users.length,
    data: users
  })
}

module.exports = {signup, signin, getAllUsers}