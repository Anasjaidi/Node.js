const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: './.env' })
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

app.listen(port, () => {
  console.log(`app listening on port ${port} 🦾`)
})
