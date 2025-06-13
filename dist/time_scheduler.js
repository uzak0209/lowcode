"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execute_1 = require("./execute");
const express_1 = __importDefault(require("express"));
const keep_alive_1 = require("./keep_alive");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Webサーバの設定
app.get('/', (req, res) => {
    res.send('Hello from Web Server!');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// 定期処理（例えば1時間毎）
setInterval(() => {
    (0, execute_1.runScraping)();
}, 1000 * 60 * 60 * 12);
setInterval(() => {
    (0, keep_alive_1.sendRequest)();
}, 1000 * 60 * 12);
