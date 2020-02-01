const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
const device = devices["iPhone X"];

const URL = "https://www.yaeyama.co.jp/operation.html";
// const firebase = require("firebase");

module.exports = async () => {
  console.log("list start");
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.emulate(device);
    await page.goto(URL, { waitUntil: "networkidle2" }); // ページへ移動＋表示されるまで待機
    await page.screenshot({ path: "screenshot.png" });

    // 更新日時
    const updateTime = await getUpdateTime(page);

    browser.close();
  } catch (err) {
    console.error(err);
    console.log(err);
    browser.close();
  } finally {
    console.log("list end");
  }
};

/**
 * pageからセレククターの値を返す
 * @param {ページ} page
 * @param {セレクター} itemSelector
 */
async function getData(page, itemSelector) {
  return await page.$eval(itemSelector, item => {
    return item.textContent;
  });
}

/**
 * 今日
 * @param {Page} page
 */
async function getUpdateTime(page) {
  const data = await getData(
    page,
    "#operationstatus > div > div.statusdate"
  );
  console.log(data);
  return data;
}
