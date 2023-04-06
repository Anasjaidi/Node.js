const express = require('express')
const morgan = require('morgan')
const usersRouter = require('./routers/usersRouter')

const app = express()

// start global middlewares

app.use(express.json())
app.use(morgan('dev'))

// start routes

app.use("/api/v1/user", usersRouter)


module.exports = app