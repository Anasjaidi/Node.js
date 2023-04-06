const app = require('./app')
const dotenv = require('dotenv');

dotenv.config()

const PORT = process.env.PORT || 3004 


const server = app.listen(PORT, () => {
  console.log(`server start on http://localhost:${PORT}`);
})
