const http = require("http");
const fs = require("fs");
const log = console.log;

const server = http.createServer((req, res) => {
	// solution one
	// fs.readFile('data.text', 'utf-8', (err, data) => {
	//   if (err) return;
	//   res.end(data)
	// })
	// solution two
	// const readStream = fs.createReadStream('data.txt')
	// readStream.on('data', (data) => {
	//   res.write(data)
	// })
	// readStream.on('end', () => {
	//   res.end()
	// })
	// readStream.on('error', () => {
	//   return ;
	// })

  // solution three
  const readStream = fs.createReadStream("data.txt");
  readStream.pipe(res)
});

server.listen(8000, "localhost", () => {
	console.log("server start on http://localhost:8000 😩");
});
