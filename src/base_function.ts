import { chromium, Page, selectors } from "playwright";
import { text } from "stream/consumers";
import { waitForSelectorWithMessage } from "./utils";
let path = 1;
//ブラウザを起動
export async function launchBrowser(
  url: string
): Promise<{ page: Page; close: () => Promise<void> }> {
  const browser = await chromium.launch();
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
export async function takeScreenshot(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.screenshot({ path: `${path}.png` });
  path += 1;
}
//テキストを取得
export async function getText(page: Page, selector: string): Promise<string> {
  await waitForSelectorWithMessage(page,selector)
  const element = await page.locator(selector); // CSSセレクタ指定
  const text = await element.textContent(); // または .innerText()
  console.log(text);
  if (!text) {
    console.log("selector not found");
  }
  return text ?? "";
}
// テキストを入力
export async function typeText(page: Page, selector: string, text: string) {
  waitForSelectorWithMessage(page,selector)
  await page.fill(selector, text);
  await takeScreenshot(page);
}
// ボタンをクリック
export async function clickButton(page: Page, selector: string): Promise<void> {
  waitForSelectorWithMessage(page,selector)
  await page.click(selector);
  await takeScreenshot(page);
}
// 要素数を取得
export async function countChildElements(
  page: Page,
  parentSelector: string
): Promise<number> {
  waitForSelectorWithMessage(page,parentSelector)
  const children = await page.locator(`${parentSelector} > *`);
  const num = await children.count();
  console.log(`childの数:${num}`);
  return num;
}
//共通の要素を持つ要素をスクレイピング
export async function scraping(page: Page,selector:string) : Promise<string[]>{
  waitForSelectorWithMessage(page,selector)
  const elements = await page.locator(selector);
  const count = await elements.count();
  let list=[]
  for (let i = 0; i < count; i++) {
    const text = await elements.nth(i).innerText();
    list.push(text)
  }
  console.log(list)
  return list;
}
//キーを送信
export async function pressKey(page: Page, key: string) {
  await page.keyboard.press(key);
  await takeScreenshot(page);
}
// 指定秒数待つ
export function waitSeconds(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
// 指定された文字で区切る
export async function splitscrapedText(text: string[],split:string) {
  const parsed = text.map(item =>
    item
      .split(split)
      .map(str => str.trim())
      .filter(str => str.length > 0)
  );
  console.log(parsed)
  return parsed;
}
