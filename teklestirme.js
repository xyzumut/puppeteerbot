const fs = require('fs');

const yaz = (text) => {
    fs.appendFile('sayfaBilgileri.txt', text, function (err) {
        if (err) {
            console.error('Hata oluştu:', err);
        } else {
            console.log('Metin belgesine yazı başarıyla eklendi.');
        }
    });
}

fs.readFile('sayfalar.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Dosya okunurken hata oluştu:', err);
        return;
    }

    let unique = [];

    JSON.parse(data).forEach( item => {
        if (!unique.find(uniqueItem => uniqueItem.id === item.id)) {
            unique.push(item)
        }
    })
    

    yaz(JSON.stringify(unique));

});
