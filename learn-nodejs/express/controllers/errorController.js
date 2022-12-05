const ApiErrors = require('../utils/apiErrors')

const devError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  })
}

const prodError = (err, res) => {
  // opeartional, trusted: sen error to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })

    // programming or other errors: Don't leak error details
  } else {
    // 1) Log Error
    console.error(err)

    // 2) send geniric error
    res.status(err.statusCode).json({
      status: 500,
      message: 'Something got wrong!',
    })
  }
}

const handleCastErrorDb = (err) => {
  const message = `invalid ${err.path} ${err.value}`
  return new ApiErrors(message, 400)
}

const handleDuplicateFieldsErrorDb = (err) => {
  const value = err.errmsg.match(/"(.*?)"/)

  const message = `duplicate  for value ${value[0].replace(/['"]+/g, "'")} please use another value`
  return new ApiErrors(message, 400)
}

const handleValidationErrorsDb = (err) => {
  const errors = Object.values(err.errors).map((errr) => errr.message)

  const message = `Data validation Error. ${errors.join('. ')}`
  return new ApiErrors(message, 400)
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'developement') {
     devError(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    let returnedError = { ...err }
    if (err.name === 'CastError') returnedError = handleCastErrorDb(err)
    else if (err.name === 'ValidationError') returnedError = handleValidationErrorsDb(err)
    else if (err.code === 11000) returnedError = handleDuplicateFieldsErrorDb(err)
    prodError(returnedError, res)
  }
}
