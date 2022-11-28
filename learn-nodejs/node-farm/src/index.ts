import http from "http";
import path from "path";
import url from "url";
import fs from "fs";
import chalk from "chalk";
import { json } from "stream/consumers";

const overviewTemp = fs.readFileSync(
  path.join(
    __dirname,
    "..",
    "templates",
    "overview-template.html"
  ),
  "utf-8"
);
const cardTemp = fs.readFileSync(
  path.join(
    __dirname,
    "..",
    "templates",
    "card-template.html"
  ),
  "utf-8"
);
const productTemp = fs.readFileSync(
  path.join(
    __dirname,
    "..",
    "templates",
    "product-template.html"
  ),
  "utf-8"
);
const data = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "data", "data.json"),
    "utf-8"
  )
);

const replace = (temp: string, el: any) => {
  let out = temp.replace(
    /{%PRODUCT_NAME%}/g,
    el.productName
  );
  out = out.replace(/{%IMAGE%}/g, el.image);
  out = out.replace(/{%COUNTRY%}/g, el.from);
  out = out.replace(/{%NUTRIENTS%/g, el.nutrients);
  out = out.replace(/{%QUANTITY%}/g, el.quantity);
  out = out.replace(/{%PRICE%}/g, el.price);
  out = out.replace(/{%DESCRIPTION%}/g, el.description);
  out = out.replace(/{%ID%}/g, el.id);
  if (!el.organic)
    out = out.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  else out = out.replace(/{%NOT_ORGANIC%}/g, "");
  return out;
};

const productRouteRegx = /^\/product\?id=([0-9]{1,10})$/;

const server = http.createServer((req, res) => {
  const URL = url.parse(<string>req.url, true);
  if (req.url == "/" || req.url == "/overview") {
    const cards = data
      .map((el: any) => replace(cardTemp, el))
      .join("");
    res.end(overviewTemp.replace(/{%CARDS%}/, cards));
  }
  if (productRouteRegx.test(req.url as string)) {
    if (data[+(URL.query.id as string)])
      res.end(
        replace(
          productTemp,
          data[+(URL.query.id as string)]
        )
      );
    else res.end("not yet");
  } else res.end("not found");
});

server.listen(8000, "localhost", () => {
  console.log(
    chalk.bgBlue(
      "server start listining on http://localhost:8000 😩"
    )
  );
});
