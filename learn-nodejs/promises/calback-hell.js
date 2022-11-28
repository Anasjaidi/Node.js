const axios = require("axios").default;
const fs = require("fs");
var http = require("http");

const readFilePro = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, "utf-8", (err, data) => {
			if (err) return reject(err);
			resolve(data);
		});
	});
};

http
	.createServer(function (request, response) {
		readFilePro("data.txt")
			.then((data) => {
				return axios.get(data, {
					headers: {
						"Accept-Encoding": "application/json",
					},
				});
			})
			.then((resu) => {
				console.log(resu.data.message);
			})
			.catch((err) => console.log(err))
		response.writeHead(200, { "Content-Type": "text/plain" });
		response.end("Hello World");
	})
	.listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
