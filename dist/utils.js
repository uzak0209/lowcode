"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForSelectorWithMessage = waitForSelectorWithMessage;
async function waitForSelectorWithMessage(page, selector, timeout = 2000) {
    try {
        await page.waitForSelector(selector, { timeout });
    }
    catch (error) {
        throw new Error(`セレクタ "${selector}" が ${timeout / 1000} 秒以内に見つかりませんでした。`);
    }
}
