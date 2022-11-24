const fs = require('fs');

fs.readFile('./files/text.txt', 'utf-8', (err, data) => {
  if (err) return console.error('Error occured! 💥');
  console.log(data + ' 🦀');
})