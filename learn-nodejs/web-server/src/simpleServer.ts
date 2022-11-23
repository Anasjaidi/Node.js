import http from 'http'
import  chalk from 'chalk'


const server = http.createServer((req, res) => {
  res.end('wash a ferida')
})


server.listen(8000, 'localhost', () => {
  console.log(chalk.bold.green.bgGray('server start on http://localhost:8000 😩'));
})