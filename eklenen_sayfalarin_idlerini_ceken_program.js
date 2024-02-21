const fs = require('fs'); // Dosya işlemleri için gerekli modülü içe aktar

const girilecekSayfaData = [
    {
        sayfaAdi:'Anasayfa',
        sayfaAciklamasi:'Anasayfa',
        resim:'anasayfa',
        kategori:{
            text:'Anasayfa',
            id:'1'
        }
    },
    {
        sayfaAdi:'Arama Sayfası',
        sayfaAciklamasi:'Her sayfada bulunan arama kutusundan arama yapıldığında sonuçların listelendiği sayfa',
        resim:'arama-sayfasi',
        kategori:{
            text:'Arama Sayfası',
            id:'15'
        }
    },
    {
        sayfaAdi:'Ayarlar',
        sayfaAciklamasi:'Giriş yapmış kullanıcının -doktor veya hasta- bilgilerini değiştirebildikleri sayfa',
        resim:'ayarlar',
        kategori:{
            text:'Ayarlar',
            id:'17'
        }
    },
    {
        sayfaAdi:'Doktor Musun?',
        sayfaAciklamasi:'Sayfaya doktor üyelik için başvurulabilen sayfa',
        resim:'doktor-basvuru',
        kategori:{
            text:'Kayıt Ol',
            id:'11'
        }
    },
    {
        sayfaAdi:'Doktorlar',
        sayfaAciklamasi:'Doktorların listelendiği sayfa',
        resim:'doktorlar',
        kategori:{
            text:'Doktorlar',
            id:'25'
        }
    },
    {
        sayfaAdi:'Doktor Girişi',
        sayfaAciklamasi:'Doktor Girişi',
        resim:'giris-doktor',
        kategori:{
            text:'Giriş Yap Sayfası',
            id:'7'
        }
    },
    {
        sayfaAdi:'Hasta Girişi',
        sayfaAciklamasi:'Hasta Girişi',
        resim:'giris-hasta',
        kategori:{
            text:'Giriş Yap Sayfası',
            id:'7'
        }
    },
    {
        sayfaAdi:'Hastaneler',
        sayfaAciklamasi:'Hastanelerin listelendiği sayfa',
        resim:'hastaneler',
        kategori:{
            text:'Hastaneler',
            id:'27'
        }
    },
    {
        sayfaAdi:'Hastane Profili',
        sayfaAciklamasi:'Hastane profili sayfası, içerisinde uzmanlar, değerlendirmeler ve iletişim şekinde alt sekmeleri mevcut',
        resim:'hastane-profili-uzmanlar',
        kategori:{
            text:'BEKLENIYOR',
            id:'BEKLENIYOR'
        }
    },
    {
        sayfaAdi:'Hasta Profili',
        sayfaAciklamasi:'Hastanin kendi profili, içerisinde değerlendirdiği doktorlar, sorduğu sorular, gelecek ve geçmiş randevuları ile takip ettiği doktorların bilgisi var.',
        resim:'hasta-profili',
        kategori:{
            text:'Profil Sayfaları',
            id:'16'
        }
    },
    {
        sayfaAdi:'İletişim',
        sayfaAciklamasi:'İletişim sayfası',
        resim:'iletisim',
        kategori:{
            text:'İletişim Sayfası',
            id:'3'
        }
    },
    {
        sayfaAdi:'Kayıt Ol - 1',
        sayfaAciklamasi:'Kayıt olma sayfalarının birincisi',
        resim:'kayit-ol-1',
        kategori:{
            text:'Kaydol Sayfası',
            id:'6'
        }
    },
    {
        sayfaAdi:'Kayıt Ol - 2',
        sayfaAciklamasi:'Kayıt olma sayfalarının ikincisi',
        resim:'kayit-ol-2',
        kategori:{
            text:'Kaydol Sayfası',
            id:'6'
        }
    },
    {
        sayfaAdi:'Makaleler Sayfası',
        sayfaAciklamasi:'Makalelerin listelendiği sayfa',
        resim:'makaleler',
        kategori:{
            text:'Makale',
            id:'28'
        }
    },
    {
        sayfaAdi:'Makale Sayfası',
        sayfaAciklamasi:'Spesifik bir makalenin içeriğinin görüntülendiği makale sayfası',
        resim:'makale-sayfasi',
        kategori:{
            text:'Makale',
            id:'28'
        }
    },
    {
        sayfaAdi:'Makale Yazma Sayfası',
        sayfaAciklamasi:'Giriş yapmış doktorların erişebildiği yazma sayfası',
        resim:'makale-yaz',
        kategori:{
            text:'Makale',
            id:'28'
        }
    },
    {
        sayfaAdi:'Şifremi Unuttum Sayfası',
        sayfaAciklamasi:'Şifremi unuttum sayfası',
        resim:'sifremi-unuttum',
        kategori:{
            text:'Şifremi Unuttum',
            id:'23'
        }
    },
    {
        sayfaAdi:'Makale Düzenle Sayfası',
        sayfaAciklamasi:'Doktorların daha önce paylaştıkları makaleyi düzenleyebildikleri sayfa',
        resim:'makale-duzenle',
        kategori:{
            text:'Makale',
            id:'28'
        }
    }
]

const girilenSayfalarinIDleri = [
    {
      "id": "60",
      "text": "Anasayfa"
    },
    {
      "id": "61",
      "text": "Arama Sayfası"
    },
    {
      "id": "62",
      "text": "Ayarlar"
    },
    {
      "id": "63",
      "text": "Doktor Musun?"
    },
    {
      "id": "64",
      "text": "Doktorlar"
    },
    {
      "id": "65",
      "text": "Doktor Girişi"
    },
    {
      "id": "66",
      "text": "Hasta Girişi"
    },
    {
      "id": "67",
      "text": "Hastaneler"
    },
    {
      "id": "68",
      "text": "Hastane Profili"
    },
    {
      "id": "69",
      "text": "Hasta Profili"
    },
    {
      "id": "70",
      "text": "İletişim"
    },
    {
      "id": "71",
      "text": "Kayıt Ol - 1"
    },
    {
      "id": "72",
      "text": "Kayıt Ol - 2"
    },
    {
      "id": "73",
      "text": "Makaleler Sayfası"
    },
    {
      "id": "74",
      "text": "Makale Sayfası"
    },
    {
      "id": "75",
      "text": "Makale Yazma Sayfası"
    },
    {
      "id": "76",
      "text": "Şifremi Unuttum Sayfası"
    },
    {
      "id": "77",
      "text": "Makale Düzenle Sayfası"
    }
]

const yaz = (text) => {
    fs.appendFile('sayfa_idler.txt', text+'\n', function (err) {
        if (err) {
            console.error('Hata oluştu:', err);
        } else {
            console.log('Metin belgesine yazı başarıyla eklendi.');
        }
    });
}

const program = async () => {

    const all = [];

    for ( const item of girilecekSayfaData ) {
        const url = 'https://panel.prosyazilim.com.tr/api/ajax/select.php?tur=yz_uygulanan_sayfa_listesi&veri=sayfa_adi&order=id&bosveri&sildr';

        const formData = new FormData();
        formData.append('searchTerm', item.sayfaAdi);
        const request = await fetch( url, {
            body:formData,
            method:'POST'
        });
        const data = await request.json();
        data.forEach( item => { all.push({id:item.id, text:item.text}) })
    }

    const result = [];

    all.forEach( gelenItem => {
        if (gelenItem.id > 59) {
            result.push(gelenItem);
        }
    })

    yaz(JSON.stringify(result));
}

program();