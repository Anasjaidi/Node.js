const express = require("express");

const ejs = require("ejs")

const app = express()

app.use((req, res, next) => {
  console.log("yes");
  res.status(200).json({})
})

app.listen(3000, () => {})