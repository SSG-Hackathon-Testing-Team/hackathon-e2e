const { chromium } = require('playwright');
const expect = require('expect');
const superagent = require('superagent');
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

    await page.waitForSelector('.d-button-normal > span');
    const datePickers = await page.$$(
      '.react-datepicker__input-container:first-of-type > input '
    );
    await datePickers[0].fill('2021-09-01');
    await page.press('body', 'Enter');
    await datePickers[1].fill('2021-09-30');
    await page.press('body', 'Enter');

    await page.click('.d-button-normal > span');

    await page.waitForSelector(`.Time`, {
      state: 'visible',
    });

    const time = await page.$$('.Time');
    const close = await page.$$('.Close');
    time.shift();
    close.shift();

    let obj = {
      period: {
        startDate: '2021-09-01',
        endDate: '2021-09-30',
      },
      stockData: [],
      highestClosingPrice: 0,
    };

    for (let i = 0; i < time.length; i++) {
      let timeText = await time[i].innerText();
      timeText = timeText.replace(/\//g, '-');
      timeText = timeText.replace(/(\d*)-(\d*)-(\d*)/g, '$3-$1-$2');
      const closeText = await close[i].innerText();
      obj.stockData.push({ date: timeText, value: parseFloat(closeText) });
    }

    obj.highestClosingPrice = Math.max.apply(
      Math,
      obj.stockData.map(function (e) {
        return e.value;
      })
    );

    let json = JSON.parse(JSON.stringify(obj));

    console.log(json);
  }, 505505);
});
