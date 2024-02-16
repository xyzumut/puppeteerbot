const puppeteer = require('puppeteer')

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const ornekYukle = async () => {
    
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('file:///C:/Users/xyzum/Desktop/index.html');
  
    await page.waitForSelector('body > select');

    await page.select('body > select', '7')

    await delay(10000);

    await browser.close();
}

const ornekYukleResim = async () => {

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
  
    // Navigate the page to a URL
    await page.goto('file:///C:/Users/xyzum/Desktop/index.html');
    
    await page.waitForSelector('[name=deneme]');

    const fileInput = await page.$('input[name=deneme]');
    await fileInput.uploadFile('C:/Users/xyzum/Downloads/avatar.jpg');


    

    await delay(10000);

    await browser.close();
}

const _e = (text) => { console.log(text) }


const yonlendirme1Path1 = 'body > div.main-content.position-relative.max-height-vh-100.h-100.border-radius-lg > div:nth-child(11) > div:nth-child(3) > div:nth-child(1) > div > a';
const yonlendirme1Path2 = 'body > div.main-content.position-relative.max-height-vh-100.h-100.border-radius-lg > div:nth-child(10) > div:nth-child(3) > div:nth-child(1) > div > a';



const doktorTakvimiIcinDoldur = async ({page, yetenekAdi, resim, aciklama = " ", yetenekSelectText, yetenekSelectValue, sayfaSelectText, sayfaSelectValue, yetenekKategoriSelectText, yetenekKategoriSelectValue}) => {

    await page.waitForSelector('[name=yetenek_adi]');

    await page.click('[name=grup_no]');
    await page.keyboard.type('1');

    await page.click('[name=sira_no]');
    await page.keyboard.type('1');

    await page.click('[name=yetenek_adi]');
    await page.keyboard.type(yetenekAdi);

    await page.click('[name=ek_aciklama]');
    await page.keyboard.type(aciklama);

    
    const fileInput = await page.$('input[name=resim_url]');
    await fileInput.uploadFile('C:/Users/xyzum/Desktop/puppeteerbot/doktoronerResim/'+resim);
    
    await page.evaluate(({sayfaSelectText, sayfaSelectValue, yetenekSelectText, yetenekSelectValue, yetenekKategoriSelectText, yetenekKategoriSelectValue}) => {
        
        try {
            const sayfaSelect = document.querySelector("#ajaxform > div > div.col-md-6.mt-3 > div > select");
            sayfaSelect.add(new Option(sayfaSelectText, sayfaSelectValue));
            sayfaSelect.value = sayfaSelectValue;

            const yetenekSelect = document.querySelector("#ajaxform > div > div:nth-child(5) > div > select");
            yetenekSelect.add(new Option(yetenekSelectText, yetenekSelectValue));
            yetenekSelect.value = yetenekSelectValue;

            const yetenekKategoriSelect = document.querySelector("#ajaxform > div > div:nth-child(7) > div > select");
            yetenekKategoriSelect.add(new Option(yetenekKategoriSelectText, yetenekKategoriSelectValue));
            yetenekKategoriSelect.value = yetenekKategoriSelectValue;

            document.querySelector('#ajaxform > div > div:nth-child(8) > div > select').remove();
            
        } catch (error) {
            console.error(error)
        }

    }, {sayfaSelectText, sayfaSelectValue, yetenekSelectText, yetenekSelectValue, yetenekKategoriSelectText, yetenekKategoriSelectValue});

}


(async () => {

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

    let myCursor = await page.$(yonlendirme1Path1);

    myCursor.click();

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    myCursor = await page.$(yonlendirme1Path2);

    myCursor.click();

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    await page.goto('https://panel.prosyazilim.com.tr/pages/yazilimproje/ornek-uygulama-listesi.php?yetenek-ekle&id=1');

    await doktorTakvimiIcinDoldur({
        sayfa:'UZMAN PROFİLİ->ÖZGEÇMİŞ-> DENEYİMLER',
        page:page,
        resim:'Adsız.png',
        yetenekAdi:'UZMANIN DENEYİMLERİ MODALI',
        aciklama:'UZMANIN DENEYİMLERİNİ İÇEREN BİR MODAL AÇMA-Umut',
        sayfaSelectText:'UZMAN PROFİLİ->ÖZGEÇMİŞ-> DENEYİMLER',
        sayfaSelectValue:'419',
        yetenekKategoriSelectText:'BUTON',
        yetenekKategoriSelectValue:'1',
        yetenekSelectText:'BUTON',
        yetenekSelectValue:'1'

    });

    await delay(150000);

    await browser.close();
})();


