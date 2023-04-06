const express = require('express')
const morgan = require('morgan')


const app = express()

// start global middlewares

app.use(express.json())
app.use(morgan('dev'))

// start routes



module.exports = app