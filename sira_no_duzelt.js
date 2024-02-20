const puppeteer = require('puppeteer')

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const _e = (text) => { console.log(text) }

const yonlendirme1Path1 = 'body > div.main-content.position-relative.max-height-vh-100.h-100.border-radius-lg > div:nth-child(11) > div:nth-child(3) > div:nth-child(1) > div > a';
const yonlendirme1Path2 = 'body > div.main-content.position-relative.max-height-vh-100.h-100.border-radius-lg > div:nth-child(10) > div:nth-child(3) > div:nth-child(1) > div > a';

const yeteneklerSayfasi = 'https://panel.prosyazilim.com.tr/pages/yazilimproje/ornek-uygulama-listesi.php?duzenle=1&page=5';
const ileriButonuPath = '#datatable_next';

(async () => {

    const startTime = performance.now()

    const browser = await puppeteer.launch({
        headless: false,
        // defaultViewport: null,
        // args: ['--window-size=1200,1000'],
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

    // let myCursor = await page.$(yonlendirme1Path1);
    // myCursor.click();

    // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    await page.goto(yeteneklerSayfasi);

    await page.waitForSelector(ileriButonuPath);

    for (let indexSayfa = 0; indexSayfa < 1; indexSayfa++) {
        
        let counter = await page.$eval('#datatable > tbody', element => element.children.length)
        
        for (let index = 0; index < counter ; index++) {

            _e('');
            await page.waitForSelector('#ajaxform > div > div.col-md-12.text-end.mt-3 > button');
            await page.waitForSelector(`#datatable > tbody > tr:nth-child(${index+1}) > td.sorting_1`);
            let element = await page.$(`#datatable > tbody > tr:nth-child(${index+1}) > td.sorting_1`);
            let id = await page.evaluate(el => el.textContent, element);

            console.log(id);

            await page.evaluate( ({id}) => {
                Duzenle(id, '');
            },{id});
            
            await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
            
            _e('Duzenle calisti, edit sekmesi bekleniyor');

            await page.waitForSelector('[name=sira_no]')

            _e('sırano inputu yüklendi değeri değiştiriliyor');

            await page.evaluate(({id}) => {
                document.querySelector('[name=sira_no]').value = id;
            },{id});

            _e('sırano inputu yüklendi değeri değiştirildi şimdi butona basılıyor');

            await page.click('#ajaxform > div > div.col-md-12.text-end.mt-3 > button');

            _e('butona basıldı');

        }
        

        await page.waitForSelector(ileriButonuPath);
        await page.click(ileriButonuPath);
        await delay(3000);

    }



    await delay(500000);

    // sayfadaki id'leri çekecek kod
    // #datatable > tbody > tr:nth-child(1) > td.sorting_1
    // #datatable > tbody > tr:nth-child(2) > td.sorting_1
    // #datatable > tbody > tr:nth-child(10) > td.sorting_1

    // #datatable_next
    

    await browser.close();
    
    let endTime = performance.now()
    console.log(`Çalışma Süresi : ${((endTime - startTime)/1000).toFixed(3)} saniye ,  ${((endTime - startTime)/1000/60).toFixed(3)} dakika`);
})();