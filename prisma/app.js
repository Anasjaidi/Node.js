const express = require('express')
const morgan = require('morgan')
const usersRouter = require('./routers/usersRouter')
const ErrorsGateway = require('./errors/errorsGateway')
const AppError = require('./errors/AppError')

const app = express()

// start global middlewares

app.use(express.json())
app.use(morgan('dev'))

// start routes

app.use("/api/v1/user", usersRouter)

// start default controller

app.use('*', (req, res, next) => {

  next(new AppError(404, `resource requested ${req.baseUrl} not found.`))
})


// start errors gateway

app.use(ErrorsGateway)

module.exports = app
