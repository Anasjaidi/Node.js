"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const chalk_1 = __importDefault(require("chalk"));
const log = console.log;
const server = http_1.default.createServer((req, res) => {
    if (req.url != "/favicon.ico")
        log(req.url);
    switch (req.url) {
        case '/':
            res.end("wash a ferida");
            break;
        default:
            // ? always seted before sending the response 
            res.writeHead(404, {
                'Content-type': 'text/html',
                'own-message': 'wesh 3awtani a frida'
            });
            res.end('<h1 style="color:red;">page not found</h1>');
            break;
    }
});
server.listen(8000, 'localhost', () => {
    console.log(chalk_1.default.bold.green.bgGray('server start on http://localhost:8000 😩'));
});
