const express = require('express')
const morgan = require('morgan')
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const path = require('path')


const app = express()

// start middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(`${__dirname}/public`))

// start routes
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app