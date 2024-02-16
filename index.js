const puppeteer = require('puppeteer')

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const _e = (text) => { console.log(text) }

const yonlendirme1Path1 = 'body > div.main-content.position-relative.max-height-vh-100.h-100.border-radius-lg > div:nth-child(11) > div:nth-child(3) > div:nth-child(1) > div > a';
const yonlendirme1Path2 = 'body > div.main-content.position-relative.max-height-vh-100.h-100.border-radius-lg > div:nth-child(10) > div:nth-child(3) > div:nth-child(1) > div > a';
const doktorOnerYetenekEklemeSayfasi = 'https://panel.prosyazilim.com.tr/pages/yazilimproje/ornek-uygulama-listesi.php?yetenek-ekle&id=1';

const doktorTakvimiIcinDoldur = async ({page, yetenekAdi, resim, aciklama = " ", yetenekSelectText, yetenekSelectValue, sayfaSelectText, sayfaSelectValue, yetenekKategoriSelectText, yetenekKategoriSelectValue}) => {

    await page.goto(doktorOnerYetenekEklemeSayfasi);

    await page.waitForSelector('[name=yetenek_adi]');

    await page.click('[name=grup_no]');
    await page.keyboard.type('1');

    await page.click('[name=sira_no]');
    await page.keyboard.type('1');

    await page.click('[name=yetenek_adi]');
    await page.keyboard.type(yetenekAdi);

    await page.click('[name=ek_aciklama]');
    await page.keyboard.type(aciklama);
    
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

            document.querySelector("#ajaxform > input[type=file]").remove();
            document.querySelector("#ajaxform > div > div:nth-child(11)").remove();
            document.querySelector('#ajaxform > div > div:nth-child(8) > div > select').remove();
            document.querySelector("#ajaxform").insertAdjacentHTML('afterbegin', '<input type="file" name="resim_url[]" multiple="" accept="image/*" id="umut"></input>');
            
        } catch (error) {
            console.error(error)
        }

    }, {sayfaSelectText, sayfaSelectValue, yetenekSelectText, yetenekSelectValue, yetenekKategoriSelectText, yetenekKategoriSelectValue});

    const fileInput = await page.$('#umut');
    await fileInput.uploadFile('C:/Users/xyzum/Desktop/puppeteerbot/doktoronerResim/'+resim);

    await page.click('#ajaxform > div > div.col-md-12.text-end.mt-3 > button');

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

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

    await doktorTakvimiIcinDoldur({
        page:page,
        resim:data.resim,
        yetenekAdi:data.yetenek+'UMUTBOT',
        aciklama:data.aciklama,
        sayfaSelectText:data.sayfa.text,
        sayfaSelectValue:data.sayfa.value,
        yetenekKategoriSelectText:data.yetenekKategori.text,
        yetenekKategoriSelectValue:data.yetenekKategori.value,
        yetenekSelectText:data.yetenekTuru.text,
        yetenekSelectValue:data.yetenekTuru.value
    });

    await browser.close();
})();