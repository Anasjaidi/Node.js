const express = require("express");
const bcrypt = require("bcrypt")
const ejs = require("ejs")

const app = express()

const users = []

app.use(express.urlencoded({extended: false}))

app.set("view-engine", "ejs")

app.get('/',(req, res, next) => {
  res.render('index.ejs')
})
app.get('/login',(req, res, next) => {
  res.render('login.ejs')
})

app.get('/register', async (req, res, next) => {

  
  res.render('register.ejs')
})

app.post('/register', async (req, res, next) => {
  try {
    const  hashed = await bcrypt.hash(req.body.password, 12)

    users.push({
      name: req.body.name,
      email: req.body.email,
      password: hashed
    })
  } catch (error) {
    console.log(error);
  }
  console.log(users);
  res.render('index.ejs')
})


app.post('/login',(req, res, next) => {
  res.render('index.ejs')
})

app.listen(3000, () => {})