const { chromium } = require('playwright');
const expect = require('expect');
let browser;
let page;

beforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
});

afterAll(async () => {
  //await browser.close();
  //await page.close();
});

describe('sample ui test', () => {
  it('should work', async () => {
    await page.goto('https://www.nyse.com/');
    expect(await page.title()).toBe('The New York Stock Exchange | NYSE');

    await page.waitForSelector('#onetrust-accept-btn-handler');
    await page.click('#onetrust-accept-btn-handler');

    await page.fill('#page-search', 'EPAM');
    await page.press('#page-search', 'Enter');
    expect(await page.title()).toBe('Search');

    await page.waitForSelector('.search-results-url>a');
    await page.click('.search-results-url>a');
    expect(await page.title()).toBe('NYSE');

    await page.waitForSelector(
      'body > div:nth-child(1) > div.sticky-header__main > div.landing-section > div.idc-container > div > div > div:nth-child(2) > div:nth-child(1) > div.d-widget.d-vbox.d-flex1.DataTable-nyse > div.d-w-titlebar-in-content > span > div:nth-child(2) > div:nth-child(1) > div > div > div > input[type=text]'
    );
    await page.fill(
      'body > div:nth-child(1) > div.sticky-header__main > div.landing-section > div.idc-container > div > div > div:nth-child(2) > div:nth-child(1) > div.d-widget.d-vbox.d-flex1.DataTable-nyse > div.d-w-titlebar-in-content > span > div:nth-child(2) > div:nth-child(1) > div > div > div > input[type=text]',
      '2021-09-01'
    );
    await page.press(
      'body > div:nth-child(1) > div.sticky-header__main > div.landing-section > div.idc-container > div > div > div:nth-child(2) > div:nth-child(1) > div.d-widget.d-vbox.d-flex1.DataTable-nyse > div.d-w-titlebar-in-content > span > div:nth-child(2) > div:nth-child(1) > div > div > div > input[type=text]',
      'Enter'
    );
    await page.fill(
      'body > div:nth-child(1) > div.sticky-header__main > div.landing-section > div.idc-container > div > div > div:nth-child(2) > div:nth-child(1) > div.d-widget.d-vbox.d-flex1.DataTable-nyse > div.d-w-titlebar-in-content > span > div:nth-child(2) > div:nth-child(3) > div > div > div > input[type=text]',
      '2021-09-30'
    );
    await page.press(
      'body > div:nth-child(1) > div.sticky-header__main > div.landing-section > div.idc-container > div > div > div:nth-child(2) > div:nth-child(1) > div.d-widget.d-vbox.d-flex1.DataTable-nyse > div.d-w-titlebar-in-content > span > div:nth-child(2) > div:nth-child(3) > div > div > div > input[type=text]',
      'Enter'
    );

    await page.click(
      'body > div:nth-child(1) > div.sticky-header__main > div.landing-section > div.idc-container > div > div > div:nth-child(2) > div:nth-child(1) > div.d-widget.d-vbox.d-flex1.DataTable-nyse > div.d-w-titlebar-in-content > span > div:nth-child(2) > button'
    );
  });
});
