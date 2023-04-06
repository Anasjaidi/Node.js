

const DevelopmentErrorDispatcher = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err
  })
}

const productionerrorsDispatcher = (err, res) => {
	// opeartional, trusted: send error to the client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});

		// programming or other errors: Don't leak error details
	} else {
		// 1) Log Error
		console.error(err);

		// 2) send geniric error
		res.status(err.statusCode).json({
			status: 500,
			message: "Something got wrong!",
		});
	}
}

const ErrorsGateway = (err, req, res, next) => {

  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  if (process.env.NODE_ENV === "dev") {
    DevelopmentErrorDispatcher(err, res)
  } else {

  }
}

module.exports = ErrorsGateway