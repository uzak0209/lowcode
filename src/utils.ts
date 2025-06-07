import { chromium, Page } from "playwright";
export async function waitForSelectorWithMessage(
  page: Page,
  selector: string,
  timeout = 2000
) {
  try {
    await page.waitForSelector(selector, { timeout });
  } catch (error) {
    throw new Error(`セレクタ "${selector}" が ${timeout / 1000} 秒以内に見つかりませんでした。`);
  }
}