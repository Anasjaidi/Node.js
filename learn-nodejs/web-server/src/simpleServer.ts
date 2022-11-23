import http from 'http'
import  chalk from 'chalk'
const log = console.log;

const server = http.createServer((req, res) => {
  if (req.url != "/favicon.ico") log(req.url);
  switch (req.url) {
    case '/':
      res.end("wash a ferida");
      break;
      
      default:
        res.writeHead(404, {
          'Content-type': 'text/html',
        }) // ? always seted before sending the response 
      res.end("<h1>page not found</h1>");
      break;
  }
})


server.listen(8000, 'localhost', () => {
  console.log(chalk.bold.green.bgGray('server start on http://localhost:8000 😩'));
})