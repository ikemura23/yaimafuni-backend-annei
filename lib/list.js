const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors');
const device = devices['iPhone X'];

const URL = 'http://www.aneikankou.co.jp/'
// const firebase = require("firebase");

module.exports = (async () => {
  console.log("list start")
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    await page.emulate(device)
    await page.goto(URL, { waitUntil: 'networkidle2' }) // ページへ移動＋表示されるまで待機
    await page.screenshot({ path: 'screenshot.png' });

    browser.close()
  } catch (err) {
    console.error(err)
    console.log(err)
    browser.close()
  } finally {
    console.log("list end")
  }
})
