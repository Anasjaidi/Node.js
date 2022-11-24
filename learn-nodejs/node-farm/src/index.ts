import http from "http";
import path from "path";
import url from "url";
import fs from "fs";
import chalk from "chalk";

const server = http.createServer((req, res) => {
	res.end("Hello, World!");
});

server.listen(8000, "localhost", () => {
	console.log(
		chalk.bgBlue("server start listining on http://localhost:8000 😩")
	);
});
