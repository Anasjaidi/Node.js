import * as fs from "node:fs"

fs.writeFile('./files/out.txt', 'utf-8', (err) => {
  if (err) return console.error('Error Occured! 💥');
  console.log('file written');
})
