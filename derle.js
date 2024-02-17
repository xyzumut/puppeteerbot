const fs = require('fs');

const yaz = (text) => {
    fs.appendFile('cikti.txt', text, function (err) {
        if (err) {
            console.error('Hata oluştu:', err);
        } else {
            console.log('Metin belgesine yazı başarıyla eklendi.');
        }
    });
}

fs.readFile('sayfalar.json', 'utf8', (err, tumSayfalar) => {

    if (err) {
        console.error('Dosya okunurken hata oluştu:', err);
        return;
    }

    fs.readFile('girilecekler.json', 'utf8', (err, girilicekler) => {

        if (err) {
            console.error('Dosya okunurken hata oluştu:', err);
            return;
        }

        let cikti = [];

        for (const girilecek of JSON.parse(girilicekler)) {
            
            const sayfa = JSON.parse(tumSayfalar).find( sayfa => sayfa.text === girilecek.sayfaAdi );

            if (!sayfa) {
                console.log('[ERROR] Bulunamadı :'+girilecek.sayfaAdi);
                continue
            }

            cikti.push({
                sayfa:{
                    value:sayfa.id,
                    text:girilecek.sayfaAdi
                },
                yetenekTuru:{
                    value:'BEKLENIYOR',
                    text:'BEKLENIYOR'
                },
                yetenekKategori:{
                    value:'BEKLENIYOR',
                    text:'BEKLENIYOR'
                },
                yetenek:girilecek.yetenek,
                aciklama:girilecek.aciklama,
                resim:'BEKLENIYOR'
            })
        }
        
        yaz(JSON.stringify(cikti));

    });

});
