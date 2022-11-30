const express = require('express')
const morgan = require('morgan')
const userRouter = require('./routes/userRoutes')
const tourRouter = require('./routes/tourRoutes')

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
  res
    .status(404)
    .send({ status: 'fail', message: 'resource requested not found' })
})

module.exports = app
