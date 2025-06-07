// src/index.ts
import {
  typeText,
  clickButton,
  getText,
  launchBrowser,
  countChildElements,
  scraping,
  pressKey,
  splitscrapedText,
} from "./base_function";
import { deletePngFiles } from "./file_controller";

(async () => {
  interface LaunchBrowserResult {
    page: any;
    close: () => Promise<void>;
  }
  deletePngFiles();
  // ここからプログラムを追加していく
  const { page, close }: LaunchBrowserResult = await launchBrowser(
    "https://books.toscrape.com/index.html"
  );
  const splited_list = splitscrapedText(
    await scraping(page, ".product_pod"),
    "\n\n"
  );
  let num_of_child = await countChildElements(page, ".row");
  let i = 1;

  while (i <= num_of_child) {
    await clickButton(page, `.row>li:nth-child(${i})>article>h3>a`);
    const text = await getText(page, ".product_page>p");
    console.log(text);
    await clickButton(page, ".col-sm-8>a");
    i++;
    console.log(i)
  }
  await close();
})();
