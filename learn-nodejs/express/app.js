const express = require('express')
const morgan = require('morgan')
const userRouter = require('./routes/userRoutes')
const tourRouter = require('./routes/tourRoutes')
const ApiErrors = require('./utils/apiErrors')
const globalErrors = require('./controllers/errorController')

const app = express()

// start middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(`${__dirname}/public`))

// start routes
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// start default route
app.all('*', (req, res, next) => {
  // res.status(404).send({status: 'fail',message: `resource requested: ${req.originalUrl} not found on the server! 🚫`})
  // const err = new Error(`resource requested: ${req.originalUrl} not found on the server! 🚫`)
  // err.statusCode = 404
  // err.status = 'fail'

  next(new ApiErrors(`resource requested: ${req.originalUrl} not found on the server! 🚫`, 404)) //? when we pass args to next express figure that was an error and stop all middlwares and go directly to errors middleware
})

// strta error middlware
app.use(globalErrors)

module.exports = app
