const {devices, webkit} = require('playwright')
const expect = require('expect');
let browser, page, context;
const iPhone12 = devices['iPhone 12'];

beforeAll(async () => {
    browser = await webkit.launch({
        headless: false
    });
    context = await browser.newContext({
        ...iPhone12
    })
  });
  afterAll(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await context.newPage();
  });
  afterEach(async () => {
    await page.close();
  });

describe('sample ui mobile test', () => {
    it('should work on iPhone', async () => {
  await page.goto('https://www.example.com/');
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  expect(await page.title()).toBe('Example Domain');
});
})
