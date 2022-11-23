"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const chalk_1 = __importDefault(require("chalk"));
const server = http_1.default.createServer((req, res) => {
    res.end('wash a ferida');
});
server.listen(8000, 'localhost', () => {
    console.log(chalk_1.default.bold.green.bgGray('server start on http://localhost:8000 😩'));
});
