const puppeteer = require('puppeteer')
const fs = require('fs');

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const _e = (text) => { console.log(text) }

const yonlendirme1Path1 = 'body > div.main-content.position-relative.max-height-vh-100.h-100.border-radius-lg > div:nth-child(11) > div:nth-child(3) > div:nth-child(1) > div > a';
const yonlendirme1Path2 = 'body > div.main-content.position-relative.max-height-vh-100.h-100.border-radius-lg > div:nth-child(10) > div:nth-child(3) > div:nth-child(1) > div > a';

const yeteneklerSayfasi = 'https://panel.prosyazilim.com.tr/pages/yazilimproje/ornek-uygulama-listesi.php?duzenle=1&page=5';

(async () => {

    const startTime = performance.now()

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--window-size=1200,1000'],
    });
    const page = await browser.newPage();
  
    await page.goto('https://panel.prosyazilim.com.tr/login.php?redirect=https://panel.prosyazilim.com.tr/pages/yazilim/anasayfa.php');
   
    _e('Başladı');

    await page.waitForSelector('#lock_btn');

    await page.click('[name=username]');
    await page.keyboard.type('umutgedik');
    
    await page.click('[name=password]');
    await page.keyboard.type('123456');

    await page.click('#lock_btn');
    _e('Giriş Yapma butonuna basıldı');
    
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    await delay(3000);

    let myCursor = await page.$(yonlendirme1Path1);

    myCursor.click();

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    await page.goto(yeteneklerSayfasi);

    await delay(5000);

    await page.evaluate(() => {
        
        Duzenle('500', '');

    });

    await delay(500000);
    

   

    await browser.close();
    
    let endTime = performance.now()
    console.log(`Çalışma Süresi : ${((endTime - startTime)/1000).toFixed(3)} saniye ,  ${((endTime - startTime)/1000/60).toFixed(3)} dakika`);
})();