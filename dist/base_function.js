"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchBrowser = launchBrowser;
exports.takeScreenshot = takeScreenshot;
exports.getText = getText;
exports.typeText = typeText;
exports.clickButton = clickButton;
exports.countChildElements = countChildElements;
exports.scraping = scraping;
exports.pressKey = pressKey;
exports.waitSeconds = waitSeconds;
exports.splitscrapedText = splitscrapedText;
const playwright_1 = require("playwright");
const utils_1 = require("./utils");
let path = 1;
//ブラウザを起動
async function launchBrowser(url) {
    const browser = await playwright_1.chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await takeScreenshot(page);
    // ページと終了処理を返す（責務を分離）
    return {
        page,
        close: async () => {
            await browser.close();
        },
    };
}
//スクリーンショットを記録
async function takeScreenshot(page) {
    await page.waitForLoadState('domcontentloaded');
    await page.screenshot({ path: `${path}.png` });
    path += 1;
}
//テキストを取得
async function getText(page, selector) {
    await (0, utils_1.waitForSelectorWithMessage)(page, selector);
    const element = await page.locator(selector); // CSSセレクタ指定
    const text = await element.textContent(); // または .innerText()
    console.log(text);
    if (!text) {
        console.log("selector not found");
    }
    return text ?? "";
}
// テキストを入力
async function typeText(page, selector, text) {
    (0, utils_1.waitForSelectorWithMessage)(page, selector);
    await page.fill(selector, text);
    await takeScreenshot(page);
}
// ボタンをクリック
async function clickButton(page, selector) {
    (0, utils_1.waitForSelectorWithMessage)(page, selector);
    await page.click(selector);
    await takeScreenshot(page);
}
// 要素数を取得
async function countChildElements(page, parentSelector) {
    (0, utils_1.waitForSelectorWithMessage)(page, parentSelector);
    const children = await page.locator(`${parentSelector} > *`);
    const num = await children.count();
    console.log(`childの数:${num}`);
    return num;
}
//共通の要素を持つ要素をスクレイピング
async function scraping(page, selector) {
    (0, utils_1.waitForSelectorWithMessage)(page, selector);
    const elements = await page.locator(selector);
    const count = await elements.count();
    let list = [];
    for (let i = 0; i < count; i++) {
        const text = await elements.nth(i).innerText();
        list.push(text);
    }
    console.log(list);
    return list;
}
//キーを送信
async function pressKey(page, key) {
    await page.keyboard.press(key);
    await takeScreenshot(page);
}
// 指定秒数待つ
function waitSeconds(seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}
// 指定された文字で区切る
async function splitscrapedText(text, split) {
    const parsed = text.map(item => item
        .split(split)
        .map(str => str.trim())
        .filter(str => str.length > 0));
    console.log(parsed);
    return parsed;
}
