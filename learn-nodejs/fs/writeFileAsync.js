"use strict";
exports.__esModule = true;
var fs = require("node:fs");
fs.writeFile('./files/out.txt', 'utf-8', function (err) {
    if (err)
        return console.error('Error Occured! 💥');
    console.log('file written 3> 🐨');
});
