module.exports = (middleware) => {
  const returnedFunction = (req, res, next) => {
    middleware(req, res, next).catch(next)
  }

  return returnedFunction
}
