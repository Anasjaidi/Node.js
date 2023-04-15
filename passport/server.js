const express = require("express");

const ejs = require("ejs")

const app = express()

app.set("view-engine", "ejs")

app.get('/',(req, res, next) => {
  res.render('index.ejs')
})
app.get('/login',(req, res, next) => {
  res.render('login.ejs')
})
app.get('/register',(req, res, next) => {
  res.render('register.ejs')
})

app.listen(3000, () => {})