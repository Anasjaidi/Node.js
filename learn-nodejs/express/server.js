const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()
const app = require('./app')

// conect database
const DB = process.env.DATABASE.replace('<USER>', process.env.DB_USER)
  .replace('<PASSWORD>', process.env.DB_PASSWD)
  .replace('<DB_NAME>', process.env.DB_NAME)
mongoose.connect(DB, (err) => {
  if (err) return console.log('DATABASE not connected 💥')
  console.log(`DATABSE ${process.env.DB_NAME} connected ✅`)
})

// start server
const port = process.env.PORT || 3004

const server = app.listen(port, () => {
  console.log(`app listening on port ${port} in ${process.env.NODE_ENV} mode 🦾`)
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('server Shuting down.. 🛑')
    process.exit(1)
  })
})

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! 💥 Server shuting Down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception 💥 Server shuting Down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

// process.emit('unhandledRejection')
