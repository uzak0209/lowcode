"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePngFiles = deletePngFiles;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function deletePngFiles(prefix = '', dir = '.') {
    const glob = require('glob');
    const pattern = path_1.default.join(dir, `${prefix}[0-9]*.png`);
    const files = glob.sync(pattern);
    for (const file of files) {
        try {
            fs_1.default.unlinkSync(file);
            console.log(`Deleted: ${file}`);
        }
        catch (err) {
            console.error(`Failed to delete ${file}:`, err);
        }
    }
}
