const dotenv = require('dotenv')

dotenv.config({ path: './.env' })
const app = require('./app')

// start server
const port = process.env.PORT || 3004

app.listen(port, () => {
  console.log(
    `app listening on port ${port}`
  )
})
