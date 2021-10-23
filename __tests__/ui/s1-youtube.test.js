const { chromium } = require('playwright');
const expect = require('expect');
let browser;
let page;

beforeAll(async () => {
    browser = await chromium.launch({
        headless: false
    });
});

afterAll(async () => {
    await browser.close();
});

beforeEach(async () => {
    page = await browser.newPage();
});

afterEach(async () => {
    await page.close();
});
jest.setTimeout(50 * 1000)

describe('YouTube', () => {
    it('should capture videos', async () => {
        await page.goto('https://www.youtube.com/c/EPAMSystemsGlobal/videos');
        await page.click('text=I agree');
        //await page.waitForNavigation()
        // expect(await page.title()).toBe('Epam Systems Global - YouTube');

        await page.waitForSelector('input[id=search]')
        await page.click('input[id=search]')
        await page.type('input[id=search]', 'Epam Systems Global');
        await page.click('button[id=search-icon-legacy]')

        await page.click('div[id=content-section] yt-formatted-string.ytd-channel-name');
        await page.click('.tp-yt-paper-tab:has-text("Videos")')


        const hasOlderVides = async () => {
            const uplodaed = '.style-scope ytd-grid-renderer  div[id=dismissible] div[id=metadata-container] div[id=metadata-line] span:nth-child(2)'
            const locator = page.locator(uplodaed).last()
            const text = await locator.innerText()
            console.log('LAST TEXT', text)
            return text.includes('2 years ago')
        }

        const loadVideos = async () => {
            while (!await hasOlderVides()) {
                await page.press('body', 'PageDown');
            }
        }
        await loadVideos()

        const metadatas = []

        const videoscount = await page.locator('.style-scope ytd-grid-renderer div[id=dismissible]').count()
        const titleLocator = 'a[id=video-title]'
        const metadataLocator = 'div[id=metadata-container] div[id=metadata-line] span'

        for (let i = 0; i < videoscount; i++) {
            const video = page.locator('.style-scope ytd-grid-renderer div[id=dismissible]').nth(i)
            const title = await video.locator(titleLocator).innerText();
            const views = await video.locator(metadataLocator).first().innerText()
            const uploadDate = await video.locator(metadataLocator).last().innerText()

            
            if(!uploadDate.includes('2 years ago')){
                metadatas.push({
                    title,
                    views, 
                    uploadDate 
                })
            }
            
           
        }
        console.log(metadatas)
        console.log(metadatas.length)






        await page.waitForNavigation()

    });
});
