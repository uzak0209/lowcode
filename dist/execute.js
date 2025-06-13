"use strict";
// src/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.runScraping = runScraping;
const base_function_1 = require("./base_function");
const file_controller_1 = require("./file_controller");
async function runScraping() {
    (0, file_controller_1.deletePngFiles)();
    const { page, close } = await (0, base_function_1.launchBrowser)("https://books.toscrape.com/index.html");
    const splited_list = (0, base_function_1.splitscrapedText)(await (0, base_function_1.scraping)(page, ".product_pod"), "\n\n");
    let num_of_child = await (0, base_function_1.countChildElements)(page, ".row");
    let i = 1;
    while (i <= num_of_child) {
        await (0, base_function_1.clickButton)(page, `.row>li:nth-child(${i})>article>h3>a`);
        const text = await (0, base_function_1.getText)(page, ".product_page>p");
        console.log(text);
        await (0, base_function_1.clickButton)(page, ".col-sm-8>a");
        i++;
        console.log(i);
    }
    await close();
}
// もしindex.ts単体で直接実行したいなら
if (require.main === module) {
    runScraping().catch(console.error);
}
