const fs = require('fs')

const hello = fs.readFileSync('./text.txt', 'utf-8')

console.log(hello)