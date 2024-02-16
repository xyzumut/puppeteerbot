const puppeteer = require('puppeteer')

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));


const ornekYukleResim = async () => {

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
  
    // Navigate the page to a URL
   

    await delay(10000);

    await browser.close();
}

const _e = (text) => { console.log(text) }


(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--window-size=1200,1000'],
    });
    const page = await browser.newPage();
  
    await page.goto('file:///C:/Users/xyzum/Desktop/index.html');
    
    await page.waitForSelector('input[name=resim_url]');

    const fileInput = await page.$('input[name=resim_url]');
    await fileInput.uploadFile('C:/Users/xyzum/Downloads/avatar.jpg');

    await delay(150000);

    await browser.close();
})();


