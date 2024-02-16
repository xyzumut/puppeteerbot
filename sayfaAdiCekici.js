const fs = require('fs'); // Dosya işlemleri için gerekli modülü içe aktar


const strings = [
    "ANA SAYFA",
    "VERİ GİZLİLİĞİ SAYFASI",
    "HASTA OLARAK KAYIT OL",
    "UZMAN OLARAK KAYIT OL",
    "GİRİŞ YAP",
    "ŞİFRENİZİ Mİ UNUTTUNUZ",
    "ARAMA SONUÇLARI",
    "DAHA FAZLA FİLTRE",
    "RANDEVU ALMA",
    "RANDEVU ALMA KENDİM İÇİN",
    "RANDEVU ALMA BAŞKASI İÇİN",
    "UZMAN PROFİLİ",
    "UZMAN İLETİŞİM BİLGİLERİ",
    "UZMANA UYGULAMA İLE MESAJ GÖNDERME",
    "UZMAN PROFİLİ->HİZMETLER",
    "UZMAN PROFİLİ->HİZMETLER-> ÜCRETLER HAKKINDA",
    "UZMAN PROFİLİ->GÖRÜŞLER",
    "UZMAN PROFİLİ->GÖRÜŞLER-> YORUM KURALLARI",
    "UZMAN PROFİLİ->GÖRÜŞLER-> GÖRÜŞ EKLEME",
    "UZMAN PROFİLİ->GÖRÜŞLER-> GÖRÜŞÜ ŞİKAYET ETME",
    "UZMAN PROFİLİ->GÖRÜŞLER-> GÖRÜŞÜ ŞİKAYET ETME-> KULLANIM ŞARTNAMESİ",
    "UZMAN PROFİLİ->ÖZGEÇMİŞ",
    "UZMAN PROFİLİ->ÖZGEÇMİŞ-> HAKKIMDA",
    "UZMAN PROFİLİ->ÖZGEÇMİŞ-> İLGİ ALANLARI",
    "UZMAN PROFİLİ->ÖZGEÇMİŞ-> OKULLAR/EĞİTİMLER",
    "UZMAN PROFİLİ->ÖZGEÇMİŞ-> DENEYİMLER",
    "ONLİNE DANIŞMANLIK NEDİR?",
    "TÜM UZMANLIK ALANLARI",
    "FİLTRELEME SONUCU",
    "HASTANE PROFİLİ",
    "HASTANE İLETİŞİM BİLGİLERİ",
    "HASTANE HİZMET DETAYLARI",
    "HASTANE UZMAN DETAYLARI",
    "HASTANE RANDEVU AL",
    "ANASAYFA-> MAKALE DETAYI",
    "GİZLİLİK SÖZLEŞMESİ",
    "ÇEREZ POLİTİKASI",
    "BİLGİ GÜVENLİĞİ POLİTİKASI",
    "HAKKIMIZDA",
    "KARİYER",
    "KARİYER -> İŞ DETAYLARI",
    "KARİYER -> DEPARTMANLAR",
    "İLETİŞİM",
    "KULLANIM ŞARTNAMESİ",
    "BASIN MERKEZİ",
    "SıK SORULAN SORULAR",
    "FARKLI DİL SEÇENEĞİ",
    "KLİNİKLER",
    "KLİNİKLER-> FİLTREYE GÖRE KLİNİKLER/HASTANELER",
    "HİZMETLER",
    "HİZMETLER -> FİLTRELENDİKTEN SONRA",
    "HASTALIKLAR",
    "HASTALIKLAR -> FİLTRELENDİKTEN SONRA",
    "HASTALIKLAR -> UZMANLARI GÖSTER",
    "HASTALIKLAR -> NASIL ÇALIŞIR ?",
    "MOBİL UYGULAMALAR",
    "HASTALARA YÖNELİK BLOG",
    "MAKALE DETAY",
    "TAKVİM",
    "TAKVİMİ ETKİNLEŞTİRİN",
    "MESAJLAR",
    "MESAJLARI AKTİVE EDİN",
    "HASTALAR",
    "RAPORLAR",
    "TOPLU MAİL/SMS",
    "PROFİLİM (UZMAN)",
    "PROFİL FOTOĞRAFI EKLEME",
    "FOTOĞRAFI EKLEME",
    "SERTİFİKA EKLEME",
    "TEDAVİ EDİLEN HASTALIKLARI EKLEME",
    "ADRESLER",
    "ADRESLER -> HİZMET VERDİĞİNİZ ADRES EKLEME",
    "ADRESLER -> HİZMET VERDİĞİNİZ ADRES EKLEME -> HİZMETLER EKLEME",
    "ADRESLER -> ONLİNE DANIŞMANLIK EKLEME",
    "KULLANICILAR",
    "İSTATİSTİKLER",
    "ROZET KULLAN",
    "PROFİLİNİZ -> ADRESLER",
    "PROFİLİNİZ -> İLETİŞİM BİLGİLERİ",
    "PROFİLİNİZ -> HİZMETLER",
    "PROFİLİNİZ -> GÖRÜŞLER",
    "PROFİLİNİZ -> ÖZGEÇMİŞ",
    "WEBSİTEM",
    "WEBSİTENİZ İÇİN ROZET",
    "PLANLARIMIZ",
    "HABERLER",
    "HESABIM",
    "ŞİFRE DEĞİŞTİR",
    "E-POSTA DEĞİŞTİRME",
    "DOKTOR ZİYARETLERİM",
    "VERİ GİZLİLİĞİ",
    "HASTA PROFİLİ -> HESABIM",
    "E-POSTA DEĞİŞTİR",
    "HESABIM->RANDEVULARIM",
    "HESABIM->KAYITLI UZMANLAR",
    "HESABIM-> BİLDİRİM TERCİHLERİ",
    "HESABIM-> SOSYAL MEDYA HESAPLARI",
    "DOKTOR MUSUNUZ? / DOKTOR TAKVİMİ PRO",
    "İLETİŞİME GEÇİN",
    "MESAJ PANOSU",
    "ÇÖZÜMLERİMİZ",
    "TEKLİFİNİZİ ÖĞRENİN",
    "DAHA FAZLA HASTA VE DANIŞAN MEMNUNİYETİ",
    "ZAMANDAN TASARRUF",
    "EKSİKSİZ ONLİNE GÖRÜNÜRLÜK",
    "ONLİNE GÖRÜNÜRLÜK VİDEOMUZU İZLEYİN",
    "İŞ AKIŞINIZI MÜKEMMELLEŞTİRİN",
    "HEKİM VE UZMANLAR",
    "KURUMLAR",
    "KURUMA ÖZEL TEKLİF",
    "ÜRÜNLERİMİZ",
    "HEKİM VE UZMANLAR İÇİN DOKTORTAKVİMİPRO",
    "KUSURSUZ YARDIMCI",
    "7/24 ONLİNE RANDEVU",
    "OTOMATİK HATIRLATICILAR",
    "ONLİNE DANIŞMANLIK",
    "E-POSTA VE SMS KAMPANYALARI",
    "ÇAĞRI MERKEZİ",
    "PROFESYONEL ÜYELİK",
    "DİJİTAL HİZMETLERİMİZLE TANIŞIN",
    "MEDİKAL TAKİP",
    "PROFESYONEL WEB SİTESİ",
    "TÜM ÜRÜNLERİMİZ",
    "FİYATLANDIRMA HEKİM VE UZMANLAR",
    "YAZILIM ÇÖZÜMLERİ İÇİN İLETİŞİME GEÇİN",
    "FİYATLANDIRMA KURUMLAR",
    "BAŞARI HİKAYELERİ",
    "DEMO TALEP EDİN",
    "BAŞARI HİKAYELERİ DETAY",
    "ÜCRETSİZ KAYNAKLAR E-KİTAPLAR",
    "ÜCRETSİZ KAYNAKLAR E-KİTAPLAR -> HEMEN İNDİR",
    "ÜCRETSİZ KAYNAKLAR KULLANIM KILAVUZU",
    "ÜCRETSİZ KAYNAKLAR PROFİL DÜZENLEME VİDEO REHBERLERİ",
    "ÜCRETSİZ KAYNAKLAR BLOG",
    "ÜCRETSİZ KAYNAKLAR BLOG -> BLOG İÇERİKLERİ",
    "ÜCRETSİZ KAYNAKLAR BLOG -> YAZARIN DİĞER MAKALELERİ",
    "ÜCRETSİZ KAYNAKLAR VİDEOLAR",
    "ÜCRETSİZ KAYNAKLAR VİDEOLAR -> VİDEO İZLE",
    "ÜCRETSİZ KAYNAKLAR İNFOGRAFİKLER",
    "ÜCRETSİZ KAYNAKLAR İNFOGRAFİKLER -> İÇERİĞİ",
    "ÜCRETSİZ KAYNAKLAR İNFOGRAFİKLER -> İÇERİĞİ-> İSTİYORUM",
    "ÜCRETSİZ KAYNAKLAR ->MÜŞTERİLERİMİZLE NASIL ÇALIŞIYORUZ?",
    "ÜCRETSİZ KAYNAKLAR ->HASTA DANIŞAN VERİLERİNİ NASIL KORUYORUZ?",
    "TANITIMI İZLEYN",
    "BİZE ULAŞIN",
    "YARDIM MERKEZİ",
    "SORU VE CEVABI",
    "İNTERNET SİTESİ ROZETİ",
    "BİZİMLE İLETİŞİME GEÇİN"
];

const yaz = (text) => {
    fs.appendFile('sayfaBilgileri.txt', text, function (err) {
        if (err) {
            console.error('Hata oluştu:', err);
        } else {
            console.log('Metin belgesine yazı başarıyla eklendi.');
        }
    });
}

const all = [];

const istekAt = async ( string ) => {
    console.log('Gişrdi')
    const url = 'https://panel.prosyazilim.com.tr/api/ajax/select.php?tur=yz_ornek_uygulama_sayfalari&veri=sayfa_adi&order=id&bosveri&sildr&filtreadi=uygulama_id&filtre=1';
    const formData = new FormData();
    formData.append('searchTerm', string);
    const request = await fetch( url, {
        body:formData,
        method:'POST'
    });

    const data = await request.json();
    data.forEach( item => { all.push({id:item.id, text:item.text}) })
}

const islem = async () => {
    for ( const string of strings ) {
        await istekAt(string);
    }

    const uniqueArray = [...new Set(all)];
    yaz(JSON.stringify(uniqueArray));
}
islem();