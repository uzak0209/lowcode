"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequest = sendRequest;
const https_1 = __importDefault(require("https"));
const URL = 'https://lowcode.onrender.com/'; // ここを目的のURLに変更してください
function sendRequest() {
    https_1.default.get(URL, (res) => {
        console.log(`[${new Date().toISOString()}] GET ${URL} - Status: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error(`[${new Date().toISOString()}] Error:`, err.message);
    });
}
