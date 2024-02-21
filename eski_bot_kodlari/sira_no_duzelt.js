const puppeteer = require('puppeteer')
const fs = require('fs'); // Dosya işlemleri için gerekli modülü içe aktar

const idler = [
    // 666,
    // 668,
    // 695,
    // 696,
    // 697,
    // 698,
    // 699,
    // 700,
    // 701,
    // 702,
    // 703,
    // 704,
    // 705,
    // 709,
    // 711,
    // 712,
    // 714,
    // 717,
    // 720,
    // 723,
    // 726,
    // 728,
    // 786,
    // 787,
    // 788,
    // 789,
    // 790,
    // 791,
    // 792,
    // 793,
    // 794,
    // 795,
    // 796,
    // 797,
    // 798,
    // 799,
    // 800,
    // 801,
    // 802,
    // 803,
    // 804,
    // 805,
    // 806,
    // 807,
    // 808,
    // 809,
    // 810,
    // 811,
    // 812,
    // 813,
    // 814,
    // 815,
    // 816,
    // 817,
    // 818,
    // 819,
    // 820,
    // 821,
    // 822,
    // 823,
    // 824,
    // 825,
    // 826,
    // 827,
    // 828,
    // 829,
    // 830,
    // 831,
    // 832,
    // 845,
    // 846,
    // 847,
    // 848,
    // 849,
    // 850,
    // 852,
    // 853,
    // 854,
    // 855,
    // 856,
    // 857,
    // 858,
    // 859,
    // 860,
    // 862,
    // 863,
    // 864,
    // 865,
    // 866,
    // 868,
    // 869,
    // 870,
    // 871,
    // 873,
    // 874,
    // 875,
    // 876,
    // 877,
    // 878,
    // 879,
    // 880,
    // 881,
    // 882,
    // 884,
    // 885,
    // 887,
    // 888,
    // 889,
    // 890,
    // 892,
    // 893,
    // 894,
    // 895,
    // 896,
    // 897,
    // 1042,
    // 1043,
    // 1044,
    // 1045,
    // 1046,
    // 1047,
    // 1048,
    // 1049,
    // 1050,
    // 1051,
    // 1052,
    // 1053,
    // 1054,
    // 1055,
    // 1056,
    // 1057,
    // 1058,
    // 1059,
    // 1060,
    // 1061,
    // 1062,
    // 1063,
    // 1064,
    // 1065,
    // 1066,
    // 1067,
    // 1068,
    // 1069,
    // 1070,
    // 1071,
    // 1072,
    // 1073,
    // 1074,
    // 1075,
    // 1076,
    // 1077,
    // 1078,
    // 1079,
    // 1080,
    // 1081,
    // 1082,
    // 1083,
    // 1084,
    // 1085,
    // 1086,
    // 1087,
    // 1088,
    // 1089,
    // 1090,
    // 1091,
    // 1092,
    // 1093,
    // 1094,
    // 1095,
    // 1096,
    // 1097,
    // 1098,
    // 1099,
    // 1100,
    // 1101,
    // 1162,
    // 1163,
    // 1164,
    // 1165,
    // 1166,
    // 1167,
    // 1168,
    // 1169,
    // 1170,
    // 1171,
    // 1172,
    // 1173,
    // 1174,
    // 1175,
    // 1176,
    // 1177,
    // 1178,
    // 1179,
    // 1180,
    // 1181,
    // 1182,
    // 1183,
    // 1184,
    // 1185,
    // 1186,
    // 1187,
    // 1188,
    // 1189,
    // 1190,
    // 1191,
    // 1192,
    // 1193,
    // 1194,
    // 1195,
    // 1196,
    // 1197,
    // 1198,
    // 1199,
    // 1200,
    // 1201,
    // 1202,
    // 1203,
    // 1204,
    1205,
    1206,
    1207,
    1208,
    1209,
    1210,
    1211,
    1212,
    1213,
    1214,
    1215,
    1218,
    1219,
    1221,
    1223,
    1224,
    1227,
    1228,
    1229,
    1231,
    1232,
    1233,
    1234,
    1235,
    1237,
    1238,
    1239,
    1240,
    1242,
    1243,
    1245,
    1246,
    1248,
    1250,
    1251,
    1252,
    1253,
    1254,
    1255,
    1256,
    1257,
    1258,
    1259,
    1260,
    1261,
    1262,
    1263,
    1264,
    1265,
    1266,
    1267,
    1268,
    1312,
    1311,
    1309,
    1310,
    1313,
    1316,
    1315,
    1314,
    1317,
    1318,
    1319,
    1320,
    1321
]

const yaz = (text) => {
    fs.appendFile('idler.txt', text+'\n', function (err) {
        if (err) {
            console.error('Hata oluştu:', err);
        } else {
            console.log('Metin belgesine yazı başarıyla eklendi.');
        }
    });
}

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const _e = (text) => { console.log(text) }

const yeteneklerSayfasi = 'https://panel.prosyazilim.com.tr/pages/yazilimproje/ornek-uygulama-listesi.php?duzenle=1&page=5';
const ileriButonuPath = '#datatable_next';
const tbodyPath = '#datatable > tbody';

// #datatable > tbody > tr:nth-child(X) > td.sorting_1

const eskiKod = async () => {
    await page.waitForSelector(ileriButonuPath);

    _e('İleri butonu bulundu, döngüye giriliyor');

    let sirano = await konumlan(page,11);

    for (let indexSayfa = 0; indexSayfa < 39; indexSayfa++) {
        _e('birinci döngü başlangıcı, index:'+indexSayfa);
        let counter = await page.$eval('#datatable > tbody', element => element.children.length)
        

        for (let index = 0; index < counter ; index++) {
            _e('ikinci döngü başladı, index:'+index);
            _e('id içeren etiket bekleniyor');

            await page.waitForSelector(`#datatable > tbody > tr:nth-child(${index+1}) > td.sorting_1`);
            let element = await page.$(`#datatable > tbody > tr:nth-child(${index+1}) > td.sorting_1`);
            let id = await page.evaluate(el => el.textContent, element);

            _e('id bulundu : '+id);

            _e(' Duzenle fonksiyonu tetikleniyor');

            await page.evaluate( ({id}) => {
                Duzenle(id, '');
            },{id});
            
            _e(' Duzenle fonksiyonu tetiklendi şimdi navigasyon beklemesine geçiyor');

            await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
            
            _e('Duzenle calisti, edit sekmesi sıra no üzerinden bekleniyor');

            await page.waitForSelector('[name=sira_no]')

            _e('sıra no inputu yüklendi değeri değiştiriliyor');

            await page.evaluate(({sirano}) => {
                document.querySelector('[name=sira_no]').value = sirano;
                document.querySelector('#ajaxform > div > div:nth-child(8) > div > select').remove();
            },{sirano});

            _e('sırano inputu yüklendi değeri değiştirildi şimdi butona basılıyor');

            await delay(500);
            await page.click('#ajaxform > div > div.col-md-12.text-end.mt-3 > button');

            _e('butona basıldı');

            sirano = sirano + 1;
        }
        

        await page.waitForSelector(ileriButonuPath);
        await page.click(ileriButonuPath);
        await delay(1000);
        await page.reload();
    }
}

const girisYap = async (page) => {

    _e('Giriş Yapma İşlemi Başladı');

    await page.goto('https://panel.prosyazilim.com.tr/login.php?redirect=https://panel.prosyazilim.com.tr/pages/yazilim/anasayfa.php');

    await page.waitForSelector('#lock_btn');

    await page.click('[name=username]');
    await page.keyboard.type('umutgedik');
    
    await page.click('[name=password]');
    await page.keyboard.type('123456');

    await page.click('#lock_btn');

    _e('Butona Basıldı Bekleniyor');

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    _e('Giriş Yapıldı ve sayfa yüklendi');
}

const konumlan = async(page, sayfa) => {

    _e('konumlana girdi');
    await delay(500);

    let target = sayfa;
    if (target > 5) {
        target = target - 5;
        await page.waitForSelector('#datatable_paginate > span > a:nth-child(5)');
        await page.click('#datatable_paginate > span > a:nth-child(5)');
        await delay(1500);
    }
    else{
        await page.waitForSelector(ileriButonuPath);
    }

    _e('Konum alınmaya başlandı, hedef:'+sayfa+'.sayfa');

    for (let index = 0; index < target; index++) {
        _e('İleri Basıldı beklemede')
        await page.click(ileriButonuPath);
        await delay(3000);
    }

    return ((sayfa-1)*10)+1;

}

(async () => {

    const startTime = performance.now()

    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    
    await girisYap(page);

    await delay(2000);

    // await page.goto(yeteneklerSayfasi);

    // await konumlan(page, 11);

    // for (let sayfaIndex = 11; sayfaIndex < 40; sayfaIndex++) {

    //     let counter = await page.$eval(tbodyPath , element => element.children.length)

    //     for (let index = 0; index < counter; index++) {

    //         let element = await page.$(`#datatable > tbody > tr:nth-child(${index+1}) > td.sorting_1`)
    //         let id = await page.evaluate(el => el.textContent, element)
    //         yaz(id);

    //     }

    //     await page.click(ileriButonuPath);
    //     await delay(3000);

    // }


    // https://panel.prosyazilim.com.tr/pages/yazilimproje/ornek-uygulama-listesi.php?yetenek-duzenle=803&yet=1
    let index = 329;

    for (const id of idler) {
        await page.goto(`https://panel.prosyazilim.com.tr/pages/yazilimproje/ornek-uygulama-listesi.php?yetenek-duzenle=${id}&yet=1`);
        await page.waitForSelector('[name=sira_no]')
        await page.evaluate(({index}) => {
            document.querySelector('[name=sira_no]').value = index;
            document.querySelector('#ajaxform > div > div:nth-child(7) > div > select').remove();
        },{index});
        index++;
        await delay(500);
        await page.click('#ajaxform > div > div.col-md-12.text-end.mt-3 > button');
        await delay(500);
        _e(`Yapılan Satır:${id}, girilen değer:${index}`);
    }

    await browser.close();
    
    let endTime = performance.now()
    console.log(`Çalışma Süresi : ${((endTime - startTime)/1000).toFixed(3)} saniye ,  ${((endTime - startTime)/1000/60).toFixed(3)} dakika`);
})();


// await page.click(ileriButonuPath);
// await delay(1000);