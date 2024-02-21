const fs = require('fs'); // Dosya işlemleri için gerekli modülü içe aktar


const yaz = (text) => {
    fs.appendFile('idler.txt', text+'\n', function (err) {
        if (err) {
            console.error('Hata oluştu:', err);
        } else {
            console.log('Metin belgesine yazı başarıyla eklendi.');
        }
    });
}

const program = async () => {

    const all = [];

    for (let index = 65; index < 123; index++) {
        console.log(`${String.fromCharCode(index).toLowerCase()} icin calisti !`);
        const url = 'https://panel.prosyazilim.com.tr/api/ajax/select.php?tur=yn_yz_ornek_sayfa_kategorileri&veri=deger&order=id&bosveri&sildr';

        const formData = new FormData();
        formData.append('searchTerm', String.fromCharCode(index).toLowerCase());
        const request = await fetch( url, {
            body:formData,
            method:'POST'
        });
        const data = await request.json();
        data.forEach( item => { all.push({id:item.id, text:item.text}) })
    }

    const uniqueArray = [];

    all.forEach( item => {
        if (!uniqueArray.some( uniqueItem => uniqueItem.id === item.id )) {
            uniqueArray.push(item)
        }
    })

    yaz(JSON.stringify(uniqueArray));
}

program();