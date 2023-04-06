const prisma = require("../prisma/client/prisma");

const DevelopmentErrorDispatcher = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
		err,
	});
};

const ProductionErrorsDispatcher = (err, res) => {
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
};

const prismaUniqueValueError = (err, res) => {
	const fields = err.meta.target.join(", ");
	res.status(409).json({
		status: "fail",
		message: `${fields}, need to be unique.`,
	});
};

const JWT_INVALID_TOKEN = (err, res) => {
	res.status(401).json({
		status: "fail",
		message: err.message,
	});
};

const JWT_EXPIRED_TOKEN = (err, res) => {
	res.status(401).json({
		status: "fail",
		message: err.message,
	});
};

const ErrorsGateway = (err, req, res, next) => {
	console.log("errors gateway called");

	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "dev") {

		DevelopmentErrorDispatcher(err, res);
		
	} else {

		if (err.code) {

			return prismaUniqueValueError(err, res);

		} else if (err.name == "JsonWebTokenError") {

			return JWT_INVALID_TOKEN(err, res);

		} else if (err.name == "TokenExpiredError") {

			return JWT_INVALID_TOKEN(err, res);

		}

		ProductionErrorsDispatcher(err, res);
	}
};

module.exports = ErrorsGateway;
