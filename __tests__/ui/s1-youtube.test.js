const { chromium } = require('playwright');
const { getTitle } = require('../../helpers/get-title')
const expect = require('expect');

const fibonacci = require('../../helpers/fibonacci')
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
                    uploadDate,
                    locator: video
                })
            }
        }
        console.log(metadatas)
        console.log(metadatas.length)
        console.log(fibonacci())
        const index = fibonacci()[Math.floor(Math.random() * 5)]
        const selectedVideoIndex = metadatas[index];

        console.log('index', index)
        console.log('selected video', selectedVideoIndex )
        await selectedVideoIndex.locator.click()

        await page.waitForSelector('div[id=related]')
        
        await page.screenshot({ path: './reports/youtube1.png', fullPage: true });

        await page.goBack()



        const title = await getTitle()
        console.log('TITLE', title)

        const hasTitle = (t) => {
            return t.title == title 
        }

        const filteredVideo = metadatas.filter(hasTitle)
        console.log('filteredVideo', filteredVideo)

        await filteredVideo[0].locator.click()

        await page.waitForSelector('div[id=related]')
        
        await page.screenshot({ path: './reports/youtube2.png', fullPage: true });
        
        //add asssertions
        expect(true).toBe(true)
    });
});
