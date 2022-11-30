const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')
const mongoose = require('mongoose')
const Tour = require('../models/tourModel')

dotenv.config()

// conect database
const DB = process.env.DATABASE.replace('<USER>', process.env.DB_USER)
  .replace('<PASSWORD>', process.env.DB_PASSWD)
  .replace('<DB_NAME>', process.env.DB_NAME)
mongoose.connect(DB, (err) => {
  if (err) return console.log('DATABASE not connected 💥')
  console.log(`DATABSE ${process.env.DB_NAME} connected ✅`)
})

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'dev-data', 'tours.json'), 'utf-8')
)

const importData = async () => {
  try {
    await Tour.create(data)
    process.exit()
  } catch (error) {
    console.log(error)
  }
}

const deleteData = async () => {
  try {
    await Tour.deleteMany()
    process.exit()
  } catch (error) {
    console.log(error)
  }
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
