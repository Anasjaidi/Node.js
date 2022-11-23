const fs = require("fs");

const hello = fs.readFileSync("./files/text.txt", "utf-8");

console.log(hello + "🐨");
