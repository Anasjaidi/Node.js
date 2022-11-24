import http from "http";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import url from 'url'
import { json } from "stream/consumers";

const data = JSON.parse(
	fs.readFileSync(path.join(__dirname, "..", "data", "data.json"), "utf-8")
);

const server = http.createServer((req, res) => {
  const URL = url.parse('http:localohost:8000' + <string>req.url, true)
	res.writeHead(200, {
		"Content-type": "Application/json",
	});
	switch (req.url) {
		case "/":
			res.end('{"message": "welcome to the api"}');
			break;
		case "/products":
			res.end(JSON.stringify(data, null, 4));
			break;
      default:
			res.end(JSON.stringify(data[+(URL.query.id as string)], null, 2));
			break;
	}
});

server.listen(8000, "localhost", () => {
	console.log(
		chalk.bold.green.bgGray("server start on http://localhost:8000 😩")
	);
});
