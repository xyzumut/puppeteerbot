const puppeteer = require('puppeteer')
const fs = require('fs'); // Dosya işlemleri için gerekli modülü içe aktar
const { addAbortSignal } = require('stream');

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


// <Yapılanlar>

// Girilecek yeteneklerde yapılan sayfalar part1
// Ana sayfa başlangıç
// Doktorlar sayfası başlangıç
// Hastaneler Sayfası Başlangıç
// Makaleler sayfası başlangıç
// İletişim sayfası başlangıcı
// Hasta Giriş başlangıç
// Doktor Girisi
// Arama sonuçları sayfası başlangıcı
// Makale Özel Sayfası
// Doktor Başvuru sayfası başlangıç
// Şifremi  unuttum başlangıcı
// Hastane Özel Başlangıcı
// Kayıt ol 2 - başlangıç
// Kayıt ol 1 - başlangıç 
// Ayarlar başlangıcı
// Hasta profili başlangıcı
// Makale yazma başlangıcı
// Makale güncelleme başlangıcı
// Doktor profili başlangıcı


// TODO : Randevu detay sayfası eksik kalmış

const girilecekYeteneklerData = [
    // Ana sayfa başlangıç
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/anasayfa/1',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/anasayfa/2',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/anasayfa/3',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/anasayfa/4',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Slider',
        yetenekAciklamasi:'Slider',
        resim:'/anasayfa/5',
        kategori:{ text:'SLIDER', id:'4' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/anasayfa/6',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Doktor Başvuru',
        yetenekAciklamasi:'Doktorlar için başvuru ekranına yönlendirir',
        resim:'/anasayfa/7',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/anasayfa/8',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Kısa bilgi konteynırı',
        yetenekAciklamasi:'İşlenişi kısa ve şık şekilde anlatan bilgi konteynırı',
        resim:'/anasayfa/9',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Nasıl İşliyor?',
        yetenekAciklamasi:'İşleyiş hakkında bilgi veren konteynır',
        resim:'/anasayfa/10',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'En çok puan alan doktorlar slider',
        yetenekAciklamasi:'En çok puan alan doktorların görüntülendiği slider yapı',
        resim:'/anasayfa/11',
        kategori:{ text:'SLIDER', id:'4' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/anasayfa/12',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri',
        yetenekAciklamasi:'Paylaşılan son makalelerin gözüktüğü konteynır yapı',
        resim:'/anasayfa/13',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/anasayfa/14',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/anasayfa/15',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/anasayfa/16',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Makale Kartı',
        yetenekAciklamasi:'\'Son Makale İçerikleri\' kısmında listelenen makalelerin kart yapısı',
        resim:'/anasayfa/17',
        kategori:{ text:'CARD', id:'26' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/anasayfa/18',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/anasayfa/19',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/anasayfa/20',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/anasayfa/21',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Anasayfa', id:'60' }
    },
    // Doktorlar sayfası başlangıç
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/doktorlar/1',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/doktorlar/2',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/doktorlar/3',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/doktorlar/4',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/doktorlar/5',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'Doktorlar Breadcrumb',
        yetenekAciklamasi:'Doktorlar sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/doktorlar/6',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'Doktorların listelendiği liste',
        yetenekAciklamasi:'Doktorların listelendiği liste',
        resim:'/doktorlar/7',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'Doktor Kartı',
        yetenekAciklamasi:'Sonuçlar içinde doktor hakkında bilgi veren doktor kart yapısı',
        resim:'/doktorlar/8',
        kategori:{ text:'CARD', id:'26' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/doktorlar/9',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/doktorlar/10',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/doktorlar/11',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/doktorlar/12',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/doktorlar/13',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/doktorlar/14',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/doktorlar/15',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Doktorlar', id:'64' }
    },
    // Hastaneler Sayfası Başlangıç
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/hastaneler/1',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/hastaneler/2',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/hastaneler/3',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/hastaneler/4',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/hastaneler/5',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Hastaneler Breadcrumb',
        yetenekAciklamasi:'Hastaneler sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/hastaneler/6',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Hastaneler',
        yetenekAciklamasi:'Hastanelerin listelendiği liste yapısı',
        resim:'/hastaneler/7',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Listelenen İller',
        yetenekAciklamasi:'İle göre filtreleme yapmak için seçenekler',
        resim:'/hastaneler/8',
        kategori:{ text:'FİLTRELE', id:'8' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Tür Tipi',
        yetenekAciklamasi:'Türe göre filtreleme yapmak için seçenekler',
        resim:'/hastaneler/9',
        kategori:{ text:'FİLTRELE', id:'8' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/hastaneler/10',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/hastaneler/11',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/hastaneler/12',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/hastaneler/13',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/hastaneler/14',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/hastaneler/15',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/hastaneler/16',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Hastaneler', id:'67' }
    },
    // Makaleler sayfası başlangıç
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/makaleler/1',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/makaleler/2',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/makaleler/3',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/makaleler/4',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/makaleler/5',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Makaleler Breadcrumb',
        yetenekAciklamasi:'Makaleler sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/makaleler/6',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Makalelerin listelendiği konteynır',
        yetenekAciklamasi:'Makalelerin listelendiği konteynır',
        resim:'/makaleler/7',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Makale Kartı',
        yetenekAciklamasi:'Makaleler listesinde makalenin gösterildiği kart yapısı',
        resim:'/makaleler/8',
        kategori:{ text:'CARD', id:'26' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Branşlar',
        yetenekAciklamasi:'Branşa göre makale filtreleme ',
        resim:'/makaleler/9',
        kategori:{ text:'FİLTRELE', id:'8' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Öne Çıkan Makaleler',
        yetenekAciklamasi:'Öne Çıkan Makaleler',
        resim:'/makaleler/10',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/makaleler/11',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/makaleler/12',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/makaleler/13',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/makaleler/14',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/makaleler/15',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/makaleler/16',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/makaleler/17',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makaleler Sayfası', id:'73' }
    },
    // İletişim sayfası başlangıcı
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/iletisim/1',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/iletisim/2',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/iletisim/3',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/iletisim/4',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/iletisim/5',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'İletişim Breadcrumb',
        yetenekAciklamasi:'İletişim sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/iletisim/6',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'İletişim Bilgilerimiz',
        yetenekAciklamasi:'İletişim bilgilerinin listelendiği kutu',
        resim:'/iletisim/7',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Bize \'Merhaba\' Deyin iletişim formu',
        yetenekAciklamasi:'Bize \'Merhaba\' Deyin iletişim formu',
        resim:'/iletisim/8',
        kategori:{ text:'FORM', id:'27' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Ad Soyad Inputu',
        yetenekAciklamasi:'Ad Soyad Inputu',
        resim:'/iletisim/9',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'E-Posta Inputu',
        yetenekAciklamasi:'E-Posta Inputu',
        resim:'/iletisim/10',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Telefon Numarası Inputu',
        yetenekAciklamasi:'Telefon Numarası Inputu',
        resim:'/iletisim/11',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Mesajınız Inputu',
        yetenekAciklamasi:'Mesajınız Inputu',
        resim:'/iletisim/12',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Gönder Butonu',
        yetenekAciklamasi:'Gönder Butonu',
        resim:'/iletisim/13',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/iletisim/14',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/iletisim/15',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/iletisim/16',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/iletisim/17',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/iletisim/18',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/iletisim/19',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/iletisim/20',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'İletişim', id:'70' }
    },
    // Hasta Giriş başlangıç
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/hasta-giris/1',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/hasta-giris/2',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/hasta-giris/3',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/hasta-giris/4',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/hasta-giris/5',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Hasta Giriş Breadcrumb',
        yetenekAciklamasi:'Hasta Giriş sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/hasta-giris/6',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Giriş Yapma Form',
        yetenekAciklamasi:'Giriş Yapma Form',
        resim:'/hasta-giris/7',
        kategori:{ text:'FORM', id:'27' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Email/Kullanıcı Adı Input',
        yetenekAciklamasi:'Email/Kullanıcı Adı Input',
        resim:'/hasta-giris/8',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Şifre Input',
        yetenekAciklamasi:'Şifre Input',
        resim:'/hasta-giris/9',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Beni Hatırla Checkbox\'u',
        yetenekAciklamasi:'Beni Hatırla Checkbox\'u',
        resim:'/hasta-giris/10',
        kategori:{ text:'CHECKBOX', id:'28' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Şifremi Unuttum',
        yetenekAciklamasi:'Şifremi Unuttum Yönlendirmesi',
        resim:'/hasta-giris/11',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Giriş Yap Butonu',
        yetenekAciklamasi:'Giriş Yap Butonu',
        resim:'/hasta-giris/12',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Şimdi Kayıt Olun',
        yetenekAciklamasi:'Şimdi Kayıt Olun Yönlendirmesi',
        resim:'/hasta-giris/13',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/hasta-giris/14',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/hasta-giris/15',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/hasta-giris/16',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/hasta-giris/17',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/hasta-giris/18',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/hasta-giris/19',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/hasta-giris/20',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Hasta Girişi', id:'66' }
    },
    // Doktor Girisi
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/doktor-giris/1',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/doktor-giris/2',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/doktor-giris/3',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/doktor-giris/4',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/doktor-giris/5',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Doktor Giriş Breadcrumb',
        yetenekAciklamasi:'Doktor Giriş sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/doktor-giris/6',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Doktor Giriş Yapma Form',
        yetenekAciklamasi:'Doktor Giriş Yapma Form',
        resim:'/doktor-giris/7',
        kategori:{ text:'FORM', id:'27' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Email Input',
        yetenekAciklamasi:'Email Input',
        resim:'/doktor-giris/8',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Şifre Input',
        yetenekAciklamasi:'Şifre Input',
        resim:'/doktor-giris/9',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Giriş Yap Butonu',
        yetenekAciklamasi:'Giriş Yap Butonu',
        resim:'/doktor-giris/10',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Şimdi Başvurunu Yap',
        yetenekAciklamasi:'Doktor başvuru sayfasına yönlendirme',
        resim:'/doktor-giris/11',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/doktor-giris/12',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/doktor-giris/13',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/doktor-giris/14',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/doktor-giris/15',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/doktor-giris/16',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/doktor-giris/17',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/doktor-giris/18',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Doktor Girişi', id:'Doktor Girişi' }
    },
    // Arama sonuçları sayfası başlangıcı
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/arama-sonuclari/1',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/arama-sonuclari/2',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/arama-sonuclari/3',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/arama-sonuclari/4',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/arama-sonuclari/5',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'Arama Sonuçları Breadcrumb',
        yetenekAciklamasi:'Arama Sonuçları sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/arama-sonuclari/6',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'Doktorların Listelenmesi',
        yetenekAciklamasi:'Doktorların Listelenmesi',
        resim:'/arama-sonuclari/7',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'Doktor Kartı',
        yetenekAciklamasi:'Doktor Kartı',
        resim:'/arama-sonuclari/8',
        kategori:{ text:'CARD', id:'26' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/arama-sonuclari/9',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/arama-sonuclari/10',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/arama-sonuclari/11',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/arama-sonuclari/12',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/arama-sonuclari/13',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/arama-sonuclari/14',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/arama-sonuclari/15',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Arama Sayfası', id:'61' }
    },
    // Makale Özel Sayfası
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/makale/1',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/makale/2',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/makale/3',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/makale/4',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/makale/5',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Makale Sayfası Breadcrumb',
        yetenekAciklamasi:'Makale  sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/makale/6',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Branşlar',
        yetenekAciklamasi:'Branşlara göre filtrelenmiş makalelerin görüntülendiği sayfaya yönlendirme',
        resim:'/makale/7',
        kategori:{ text:'FİLTRELE', id:'8' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Öne Çıkan Makaleler',
        yetenekAciklamasi:'Öne Çıkan Makaleler\'in listesi',
        resim:'/makale/8',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Makale Resmi',
        yetenekAciklamasi:'Makale Resmi',
        resim:'/makale/9',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Makale Kategorisi',
        yetenekAciklamasi:'Makalenin kategorisi',
        resim:'/makale/10',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Makale başlığı',
        yetenekAciklamasi:'Makale başlığı',
        resim:'/makale/11',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Makale Yayınlanma Tarihi',
        yetenekAciklamasi:'Makale Yayınlanma Tarihi',
        resim:'/makale/12',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Makale Görüntülenme Sayısı',
        yetenekAciklamasi:'Makale Görüntülenme Sayısı',
        resim:'/makale/13',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Makale İçeriği',
        yetenekAciklamasi:'Makale İçeriği',
        resim:'/makale/14',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Yazar\'ın Profil Kartı',
        yetenekAciklamasi:'Yazar\'ın Profil Kartı',
        resim:'/makale/15',
        kategori:{ text:'CARD', id:'26' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/makale/16',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/makale/17',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/makale/18',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/makale/19',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/makale/20',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/makale/21',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/makale/22',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    // Doktor Başvuru sayfası başlangıç
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/doktor-basvuru/1',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/doktor-basvuru/2',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/doktor-basvuru/3',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/doktor-basvuru/4',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/doktor-basvuru/5',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Doktor Musun? Breadcrumb',
        yetenekAciklamasi:'Doktor Musun? sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/doktor-basvuru/6',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Bilgi Almak İstiyorum Formu',
        yetenekAciklamasi:'Bilgi Almak İstiyorum Formu',
        resim:'/doktor-basvuru/7',
        kategori:{ text:'FORM', id:'27' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Ad Inputu',
        yetenekAciklamasi:'Ad Inputu',
        resim:'/doktor-basvuru/8',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Email Inputu',
        yetenekAciklamasi:'Email Inputu',
        resim:'/doktor-basvuru/9',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Doğum Tarihi Datepicker\'ı',
        yetenekAciklamasi:'Doğum Tarihi Datepicker\'ı',
        resim:'/doktor-basvuru/10',
        kategori:{ text:'SELECT DATE', id:'12' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Telefon Numarası Inputu',
        yetenekAciklamasi:'Telefon Numarası Inputu',
        resim:'/doktor-basvuru/11',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Klinik/Hastane Selecti',
        yetenekAciklamasi:'Kayıtlı Klinik veya Hastanelerden birini seçebildiğimiz select',
        resim:'/doktor-basvuru/12',
        kategori:{ text:'SELECT LİSTE', id:'2' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Alan Seçimi Selecti',
        yetenekAciklamasi:'Alan Seçimi Selecti',
        resim:'/doktor-basvuru/13',
        kategori:{ text:'SELECT LİSTE', id:'2' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Hastalık Seçimi Selecti',
        yetenekAciklamasi:'Hastalık Seçimi Selecti',
        resim:'/doktor-basvuru/14',
        kategori:{ text:'SELECT LİSTE', id:'2' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Ülke Seçim Selecti',
        yetenekAciklamasi:'Ülke Seçim Selecti',
        resim:'/doktor-basvuru/15',
        kategori:{ text:'SELECT LİSTE', id:'2' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'İl Seçim Selecti',
        yetenekAciklamasi:'İl Seçim Selecti',
        resim:'/doktor-basvuru/16',
        kategori:{ text:'SELECT LİSTE', id:'2' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'İlçe Seçim Selecti',
        yetenekAciklamasi:'İlçe Seçim Selecti',
        resim:'/doktor-basvuru/17',
        kategori:{ text:'SELECT LİSTE', id:'2' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Şifre Inputu',
        yetenekAciklamasi:'Şifre Inputu',
        resim:'/doktor-basvuru/18',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Şifre Tekrar Inputu',
        yetenekAciklamasi:'Şifre Tekrar Inputu',
        resim:'/doktor-basvuru/19',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Başvur Butonu',
        yetenekAciklamasi:'Başvur Butonu',
        resim:'/doktor-basvuru/20',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Şimdi Giriş Yapın',
        yetenekAciklamasi:'Şimdi Giriş Yapın',
        resim:'/doktor-basvuru/21',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/doktor-basvuru/22',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/doktor-basvuru/23',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/doktor-basvuru/24',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/doktor-basvuru/25',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/doktor-basvuru/26',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/doktor-basvuru/27',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/doktor-basvuru/28',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Doktor Musun?', id:'63' }
    },
]

const girilecekYeteneklerData2 =[
    // Şifremi  unuttum başlangıcı
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/sifremi-unuttum/1',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/sifremi-unuttum/2',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/sifremi-unuttum/3',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/sifremi-unuttum/4',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/sifremi-unuttum/5',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Şifremi Unuttum Breadcrumb',
        yetenekAciklamasi:'Şifremi Unuttum sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/sifremi-unuttum/6',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Şifrenizimi unuttunuz formu',
        yetenekAciklamasi:'Şifrenizimi unuttunuz formu',
        resim:'/sifremi-unuttum/7',
        kategori:{ text:'FORM', id:'27' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Email Inputu',
        yetenekAciklamasi:'Email Inputu',
        resim:'/sifremi-unuttum/8',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Sıfırla Butonu',
        yetenekAciklamasi:'Sıfırla Butonu',
        resim:'/sifremi-unuttum/9',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Şimdi Giriş Yapın ',
        yetenekAciklamasi:'Şimdi Giriş Yapın Yönlendirmesi',
        resim:'/sifremi-unuttum/10',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/sifremi-unuttum/11',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/sifremi-unuttum/12',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/sifremi-unuttum/13',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/sifremi-unuttum/14',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/sifremi-unuttum/15',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/sifremi-unuttum/16',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/sifremi-unuttum/17',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Şifremi Unuttum Sayfası', id:'76' }
    },
    // Hastane Özel Başlangıcı
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/hastane/1',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/hastane/2',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/hastane/3',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/hastane/4',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/hastane/5',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Hastane Profili Breadcrumb',
        yetenekAciklamasi:'Hastane Profili sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/hastane/6',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Hastane Kartı',
        yetenekAciklamasi:'Hastane Kartı',
        resim:'/hastane/7',
        kategori:{ text:'CARD', id:'26' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Hastane Uzmanlar Listesi',
        yetenekAciklamasi:'Hastane Uzmanlar Listesi',
        resim:'/hastane/8',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Doktor Kartı',
        yetenekAciklamasi:'Doktor Kartı',
        resim:'/hastane/9',
        kategori:{ text:'CARD', id:'26' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Hasta Geri Bildirimleri',
        yetenekAciklamasi:'Hasta Geri Bildirimleri Listesi',
        resim:'/hastane/10',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Hasta Geri Bildirimi Kartı',
        yetenekAciklamasi:'Hasta Geri Bildirimi Kartı',
        resim:'/hastane/11',
        kategori:{ text:'CARD', id:'26' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Sosyal Medya Ikonları',
        yetenekAciklamasi:'Sosyal Medya Ikonları',
        resim:'/hastane/12',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'İletişim Bilgileri',
        yetenekAciklamasi:'İletişim Bilgileri',
        resim:'/hastane/13',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/hastane/14',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/hastane/15',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/hastane/16',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/hastane/17',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/hastane/18',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/hastane/19',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/hastane/20',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hastane Profili', id:'68' }
    },
    // Kayıt ol 1 - başlangıç 
    {
        yetenekAdi:'Doktor Girişi Butonu',
        yetenekAciklamasi:'Doktor Girişine yönlendiren buton',
        resim:'/kayit-ol1/1',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/kayit-ol1/2',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/kayit-ol1/3',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/kayit-ol1/4',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/kayit-ol1/5',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Kayıt Ol Breadcrumb',
        yetenekAciklamasi:'Kayıt Ol sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/kayit-ol1/6',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Kayıt ol stepper from 1',
        yetenekAciklamasi:'Kayıt ol stepper from 1',
        resim:'/kayit-ol1/7',
        kategori:{ text:'STEPPER', id:'20' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Ad Inputu',
        yetenekAciklamasi:'Ad Inputu',
        resim:'/kayit-ol1/8',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Soyad Inputu',
        yetenekAciklamasi:'Soyad Inputu',
        resim:'/kayit-ol1/9',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Email Inputu',
        yetenekAciklamasi:'Email Inputu',
        resim:'/kayit-ol1/10',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Doğum Günü Date Picker',
        yetenekAciklamasi:'Doğum Günü Date Picker',
        resim:'/kayit-ol1/11',
        kategori:{ text:'SELECT DATE', id:'12' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Telefon Numarası Input',
        yetenekAciklamasi:'Telefon Numarası Input',
        resim:'/kayit-ol1/12',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Devam Et butonu',
        yetenekAciklamasi:'Devam Et butonu',
        resim:'/kayit-ol1/13',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Şimdi Giriş Yapın Yönlendirmesi',
        yetenekAciklamasi:'Şimdi Giriş Yapın Yönlendirmesi',
        resim:'/kayit-ol1/14',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/kayit-ol1/15',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/kayit-ol1/16',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/kayit-ol1/17',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/kayit-ol1/18',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/kayit-ol1/19',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/kayit-ol1/20',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/kayit-ol1/21',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Kayıt Ol - 1', id:'71' }
    },
    // Kayıt ol 2 - başlangıç
    {
        yetenekAdi:'Kayıt ol stepper from 2',
        yetenekAciklamasi:'Kayıt ol stepper from 2',
        resim:'/kayit-ol2/1',
        kategori:{ text:'STEPPER', id:'20' },
        sayfa:{ text:'Kayıt Ol - 2', id:'72' }
    },
    {
        yetenekAdi:'Ülke Selecti',
        yetenekAciklamasi:'Ülke Selecti',
        resim:'/kayit-ol2/2',
        kategori:{ text:'SELECT LİSTE', id:'2' },
        sayfa:{ text:'Kayıt Ol - 2', id:'72' }
    },
    {
        yetenekAdi:'İl Selecti',
        yetenekAciklamasi:'İl Selecti',
        resim:'/kayit-ol2/3',
        kategori:{ text:'SELECT LİSTE', id:'2' },
        sayfa:{ text:'Kayıt Ol - 2', id:'72' }
    },
    {
        yetenekAdi:'İlçe Selecti',
        yetenekAciklamasi:'İlçe Selecti',
        resim:'/kayit-ol2/4',
        kategori:{ text:'SELECT LİSTE', id:'2' },
        sayfa:{ text:'Kayıt Ol - 2', id:'72' }
    },
    {
        yetenekAdi:'Şifre Inputu',
        yetenekAciklamasi:'Şifre Inputu',
        resim:'/kayit-ol2/5',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Kayıt Ol - 2', id:'72' }
    },
    {
        yetenekAdi:'Şifre Tekrar Inputu',
        yetenekAciklamasi:'Şifre Tekrar Inputu',
        resim:'/kayit-ol2/6',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Kayıt Ol - 2', id:'72' }
    },
    {
        yetenekAdi:'Eposta Onay Izin Checkbox\'u',
        yetenekAciklamasi:'Eposta Onay Izin Checkbox\'u',
        resim:'/kayit-ol2/7',
        kategori:{ text:'CHECKBOX', id:'28' },
        sayfa:{ text:'Kayıt Ol - 2', id:'72' }
    },
    {
        yetenekAdi:'SMS Onay Izin Checkbox\'u',
        yetenekAciklamasi:'SMS Onay Izin Checkbox\'u',
        resim:'/kayit-ol2/8',
        kategori:{ text:'CHECKBOX', id:'28' },
        sayfa:{ text:'Kayıt Ol - 2', id:'72' }
    },
    {
        yetenekAdi:'Arama Onay Izin Checkbox\'u',
        yetenekAciklamasi:'Arama Onay Izin Checkbox\'u',
        resim:'/kayit-ol2/9',
        kategori:{ text:'CHECKBOX', id:'28' },
        sayfa:{ text:'Kayıt Ol - 2', id:'72' }
    },
    {
        yetenekAdi:'KAyıt Ol Butonu',
        yetenekAciklamasi:'KAyıt Ol Butonu',
        resim:'/kayit-ol2/10',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Kayıt Ol - 2', id:'72' }
    },
    {
        yetenekAdi:'Şimdi Giriş Yapın Yönlendirmesi',
        yetenekAciklamasi:'Şimdi Giriş Yapın Yönlendirmesi',
        resim:'/kayit-ol2/11',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Kayıt Ol - 2', id:'72' }
    },
    // Ayarlar başlangıcı
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/ayarlar/1',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/ayarlar/2',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/ayarlar/3',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/ayarlar/4',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Ayarlar Breadcrumb',
        yetenekAciklamasi:'Ayarlar sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/ayarlar/5',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Hesap Bilgileri Formu',
        yetenekAciklamasi:'Hesap Bilgileri Formu',
        resim:'/ayarlar/6',
        kategori:{ text:'FORM', id:'27' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Ad Inputu',
        yetenekAciklamasi:'Ad Inputu',
        resim:'/ayarlar/7',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Soyad Inputu',
        yetenekAciklamasi:'Soyad Inputu',
        resim:'/ayarlar/8',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Email Adresi Inputu',
        yetenekAciklamasi:'Email Adresi Inputu',
        resim:'/ayarlar/9',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Telefon Numarası Inputu',
        yetenekAciklamasi:'Telefon Numarası Inputu',
        resim:'/ayarlar/10',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Dogum Günü Datepicker',
        yetenekAciklamasi:'Dogum Günü Datepicker',
        resim:'/ayarlar/11',
        kategori:{ text:'SELECT DATE', id:'12' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Kaydet butonu',
        yetenekAciklamasi:'Kaydet butonu',
        resim:'/ayarlar/12',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Şifreyi Güncelle Butonu',
        yetenekAciklamasi:'Şifreyi Güncelle Butonu',
        resim:'/ayarlar/13',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Eski Şifreniz Inputu',
        yetenekAciklamasi:'Eski Şifreniz Inputu',
        resim:'/ayarlar/14',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Şifre Inputu',
        yetenekAciklamasi:'Şifre Inputu',
        resim:'/ayarlar/15',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Şifre Tekrar Inputu',
        yetenekAciklamasi:'Şifre Tekrar Inputu',
        resim:'/ayarlar/16',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/ayarlar/17',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/ayarlar/18',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/ayarlar/19',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/ayarlar/20',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/ayarlar/21',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/ayarlar/22',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/ayarlar/23',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Ayarlar', id:'62' }
    },
    // Hasta profili başlangıcı
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/hasta-profili/1',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/hasta-profili/2',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/hasta-profili/3',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/hasta-profili/4',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Hasta Profili Breadcrumb',
        yetenekAciklamasi:'Hasta Profili sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/hasta-profili/5',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },

    {
        yetenekAdi:'Profil Resmi',
        yetenekAciklamasi:'Profil Resmi',
        resim:'/hasta-profili/6',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Temel Bilgiler',
        yetenekAciklamasi:'Temel Bilgiler(Doğum tarihi, Tel, Mail, Konum)',
        resim:'/hasta-profili/7',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Doktor Değerlendirmelerim',
        yetenekAciklamasi:'Doktor Değerlendirmelerim',
        resim:'/hasta-profili/8',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Sorduğum Sorular',
        yetenekAciklamasi:'Sorduğum Sorular',
        resim:'/hasta-profili/9',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Gelecek Randevularım',
        yetenekAciklamasi:'Gelecek Randevularım',
        resim:'/hasta-profili/10',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Randevuyu İptal Et Butonu',
        yetenekAciklamasi:'Randevuyu İptal Et Butonu',
        resim:'/hasta-profili/11',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Geçmiş Randevularım',
        yetenekAciklamasi:'Geçmiş Randevularım',
        resim:'/hasta-profili/12',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Randevu Detay Modalı',
        yetenekAciklamasi:'Randevu Detay Modalı',
        resim:'/hasta-profili/13',
        kategori:{ text:'POPUP', id:'18' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Takip Ettiğim Doktorlar',
        yetenekAciklamasi:'Takip Ettiğim Doktorlar',
        resim:'/hasta-profili/14',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Doktor Kartı',
        yetenekAciklamasi:'Doktor Kartı',
        resim:'/hasta-profili/15',
        kategori:{ text:'CARD', id:'26' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/hasta-profili/16',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/hasta-profili/17',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/hasta-profili/18',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/hasta-profili/19',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/hasta-profili/20',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/hasta-profili/21',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/hasta-profili/22',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Hasta Profili', id:'69' }
    },
    // Makale yazma başlangıcı
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/makale-yaz/1',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/makale-yaz/2',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/makale-yaz/3',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/makale-yaz/4',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Makale Yaz sayfası Breadcrumb',
        yetenekAciklamasi:'Makale Yaz sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/makale-yaz/5',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Makale Yaz form',
        yetenekAciklamasi:'Makale Yaz form',
        resim:'/makale-yaz/6',
        kategori:{ text:'FORM', id:'27' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Makale Kategorisi Selecti',
        yetenekAciklamasi:'Makale Kategorisi Selecti',
        resim:'/makale-yaz/7',
        kategori:{ text:'SELECT LİSTE', id:'2' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Makale Başlığı Input',
        yetenekAciklamasi:'Makale Başlığı Input',
        resim:'/makale-yaz/8',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Makale Içeriği Input',
        yetenekAciklamasi:'Makale Içeriği Input',
        resim:'/makale-yaz/9',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Makale Görseli Input',
        yetenekAciklamasi:'Makale Görseli Input',
        resim:'/makale-yaz/10',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Makale Ekle Butonu',
        yetenekAciklamasi:'Makale Ekle Butonu',
        resim:'/makale-yaz/11',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/makale-yaz/12',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/makale-yaz/13',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/makale-yaz/14',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/makale-yaz/15',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/makale-yaz/16',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/makale-yaz/17',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/makale-yaz/18',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makale Yazma Sayfası', id:'75' }
    },
    // Makale güncelleme başlangıcı
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/makale-guncelle/1',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/makale-guncelle/2',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/makale-guncelle/3',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/makale-guncelle/4',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Makale güncelle sayfası Breadcrumb',
        yetenekAciklamasi:'Makale güncelle sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/makale-guncelle/5',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Makale güncelle form',
        yetenekAciklamasi:'Makale güncelle form',
        resim:'/makale-guncelle/6',
        kategori:{ text:'FORM', id:'27' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Makale Kategorisi Selecti',
        yetenekAciklamasi:'Makale Kategorisi Selecti',
        resim:'/makale-guncelle/7',
        kategori:{ text:'SELECT LİSTE', id:'2' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Makale Başlığı Input',
        yetenekAciklamasi:'Makale Başlığı Input',
        resim:'/makale-guncelle/8',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Makale Içeriği Input',
        yetenekAciklamasi:'Makale Içeriği Input',
        resim:'/makale-guncelle/9',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Makale Görseli Input',
        yetenekAciklamasi:'Makale Görseli Input',
        resim:'/makale-guncelle/10',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Makale Görseli Önizleme',
        yetenekAciklamasi:'O an seçili olan görselin önizlemesi',
        resim:'/makale-guncelle/101',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Makale Düzenle Butonu',
        yetenekAciklamasi:'Makale Düzenle Butonu',
        resim:'/makale-guncelle/11',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/makale-guncelle/12',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/makale-guncelle/13',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/makale-guncelle/14',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/makale-guncelle/15',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/makale-guncelle/16',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/makale-guncelle/17',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/makale-guncelle/18',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makale Düzenle Sayfası', id:'77' }
    },
    { // makale özel sayfası sahibinden
        yetenekAdi:'Makaleyi Düzenle',
        yetenekAciklamasi:'Makaleyi Düzenle',
        resim:'/makale-guncelle/19',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    { // makale özel sayfası sahibinden
        yetenekAdi:'Makaleyi Sil Butonu',
        yetenekAciklamasi:'Makaleyi sil butonu',
        resim:'/makale-guncelle/20',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Makale Sayfası', id:'74' }
    },
    // Doktor profili başlangıcı
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/doktor-profili/1',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/doktor-profili/2',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/doktor-profili/3',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/doktor-profili/4',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'XXXX Breadcrumb',
        yetenekAciklamasi:'XXXX sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/doktor-profili/5',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Doktor Resmi',
        yetenekAciklamasi:'Doktor Resmi',
        resim:'/doktor-profili/6',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Doktor Hakkında Ön Bilgi',
        yetenekAciklamasi:'Doktor Hakkında Ön Bilgi(Lokayson, Hastane, Alanı, Takipçisi ve Puanı)',
        resim:'/doktor-profili/7',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Doktor Profil Accordion',
        yetenekAciklamasi:'Doktor Profil Accordion',
        resim:'/doktor-profili/8',
        kategori:{ text:'COLLAPSE-ACCORDION', id:'30' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Doktor Hakkımda Sekmesi(Hasta Gözünden)',
        yetenekAciklamasi:'Doktor Hakkımda Sekmesi(Hasta Gözünden)',
        resim:'/doktor-profili/9',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Deneyimler(Hasta Gözünden)',
        yetenekAciklamasi:'Deneyimler(Hasta Gözünden)',
        resim:'/doktor-profili/10',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Eğitimler(Hasta Gözünden)',
        yetenekAciklamasi:'Eğitimler(Hasta Gözünden)',
        resim:'/doktor-profili/11',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Uzmanlıklar(Hasta Gözünden)',
        yetenekAciklamasi:'Uzmanlıklar(Hasta Gözünden)',
        resim:'/doktor-profili/12',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Sertfikalar(Hasta Gözünden)',
        yetenekAciklamasi:'Sertfikalar(Hasta Gözünden)',
        resim:'/doktor-profili/13',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Görseller(Hasta Gözünden)',
        yetenekAciklamasi:'Görseller(Hasta Gözünden)',
        resim:'/doktor-profili/14',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Hasta Geri Bildirimi(Hasta Gözünden)',
        yetenekAciklamasi:'Hasta Geri Bildirimi(Hasta Gözünden)',
        resim:'/doktor-profili/15',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Sorular(Hasta Gözünden)',
        yetenekAciklamasi:'Sorular(Hasta Gözünden)',
        resim:'/doktor-profili/16',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Makale(Hasta Gözünden)',
        yetenekAciklamasi:'Makale(Hasta Gözünden)',
        resim:'/doktor-profili/17',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Resim Sil',
        yetenekAciklamasi:'Resim Sil',
        resim:'/doktor-profili/18',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Resim Değiştir',
        yetenekAciklamasi:'Resim Değiştirmek için ilgili modal-form\'u tetikler',
        resim:'/doktor-profili/19',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Hakkımda Ekle Modalını Tetikler',
        yetenekAciklamasi:'Hakkımda Ekle Modalını Tetikler',
        resim:'/doktor-profili/20',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },

    {
        yetenekAdi:'Deneyim Ekle Modalını Tetikler',
        yetenekAciklamasi:'Deneyim Ekle Modalını Tetikler',
        resim:'/doktor-profili/21',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Eğitim Ekle Modalını Tetikler',
        yetenekAciklamasi:'Eğitim Ekle Modalını Tetikler',
        resim:'/doktor-profili/22',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Sertfika ekle Modalını Tetikler',
        yetenekAciklamasi:'Sertfika ekle Modalını Tetikler',
        resim:'/doktor-profili/23',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Görsel Ekle Modalını Tetikler',
        yetenekAciklamasi:'Görsel Ekle Modalını Tetikler',
        resim:'/doktor-profili/24',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Uzmanlık Ekle Modalını Tetikler',
        yetenekAciklamasi:'Uzmanlık Ekle Modalını Tetikler',
        resim:'/doktor-profili/25',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Hakkımda Ekle Modal-Form',
        yetenekAciklamasi:'Hakkımda Ekle Modal-Form',
        resim:'/doktor-profili/26',
        kategori:{ text:'POPUP', id:'18' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Deneyimler(Doktor Gözünden)',
        yetenekAciklamasi:'Doktorun Deneyimleri(Doktor Gözünden)',
        resim:'/doktor-profili/27',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Deneyim Ekle Modal-Form',
        yetenekAciklamasi:'Deneyim Ekle Modal-Form',
        resim:'/doktor-profili/28',
        kategori:{ text:'POPUP', id:'18' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Eğitim Ekle (Doktor Gözünden)',
        yetenekAciklamasi:'Eğitim Ekle (Doktor Gözünden)',
        resim:'/doktor-profili/29',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Eğitim Ekle Modal-Form',
        yetenekAciklamasi:'Eğitim Ekle Modal-Form',
        resim:'/doktor-profili/30',
        kategori:{ text:'POPUP', id:'18' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Uzmanlıklar(Doktor Gözünden)',
        yetenekAciklamasi:'Doktorun Uzmanlıkları(Doktor Gözünden)',
        resim:'/doktor-profili/31',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Uzmanlık ekle Modal-Form',
        yetenekAciklamasi:'Uzmanlık ekle Modal-Form',
        resim:'/doktor-profili/32',
        kategori:{ text:'POPUP', id:'18' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Sertfikalar(Doktor Gözünden)',
        yetenekAciklamasi:'Doktorun Sertfikaları(Doktor Gözünden)',
        resim:'/doktor-profili/33',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Sertfika Ekle Modal-Form',
        yetenekAciklamasi:'Sertfika Ekle Modal-Form',
        resim:'/doktor-profili/34',
        kategori:{ text:'POPUP', id:'18' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Görseller(Doktor Gözünden)',
        yetenekAciklamasi:'Doktorun paylaştığı görseller(Doktor Gözünden)',
        resim:'/doktor-profili/35',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Resim Ekle Modal-Form',
        yetenekAciklamasi:'Resim Ekle Modal-Form',
        resim:'/doktor-profili/36',
        kategori:{ text:'POPUP', id:'18' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Sorular(Doktor Gözünden)',
        yetenekAciklamasi:'Sorular(Doktor Gözünden)',
        resim:'/doktor-profili/37',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Cevap Ver Butonu',
        yetenekAciklamasi:'Sorulan Soruya Doktorun Cevap vermesi için ilgili modalı açan buton',
        resim:'/doktor-profili/38',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Cevap Ver Modal-Form',
        yetenekAciklamasi:'Cevap Ver Modal-Form',
        resim:'/doktor-profili/39',
        kategori:{ text:'POPUP', id:'18' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Hasta Geri Bildirimi(Doktor Gözünden)',
        yetenekAciklamasi:'Hasta Geri Bildirimi(Doktor Gözünden)',
        resim:'/doktor-profili/40',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Gelecek Randevularım',
        yetenekAciklamasi:'Gelecek Randevularım',
        resim:'/doktor-profili/41',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Geçmiş Randevularım(Doktor Gözünden)',
        yetenekAciklamasi:'Geçmiş Randevularım(Doktor Gözünden)',
        resim:'/doktor-profili/42',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Randevu Detayları',
        yetenekAciklamasi:'Randevu Detaylarına yönlendiren buton',
        resim:'/doktor-profili/43',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Yeni Makale',
        yetenekAciklamasi:'Yeni Makale Sayfasına yönlendiren buton',
        resim:'/doktor-profili/44',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Mevcut Profil Resmini Değiştir Form-Modalı',
        yetenekAciklamasi:'Mevcut Profil Resmini Değiştir Form-Modalı',
        resim:'/doktor-profili/45',
        kategori:{ text:'POPUP', id:'18' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri - footer',
        yetenekAciklamasi:'Hakkımızda, Doktorlar, Hastaneler, Blog, Makaleler, Doktor Musun? ve Giriş sayfası yönlendirmeleri',
        resim:'/doktor-profili/46',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Google Play & App Store yönlendirmesi - footer ',
        yetenekAciklamasi:'Mobil uygulama yönlendirmeleri',
        resim:'/doktor-profili/47',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri Footer',
        yetenekAciklamasi:'Son Makale içeriklerinin listelendiği footer kısmı',
        resim:'/doktor-profili/48',
        kategori:{ text:'LİSTELEME', id:'9' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Son Makale İçerikleri -footer- Yönlendirme',
        yetenekAciklamasi:'Footerda\'ki son makale içeriklerinin her biri, üzerlerine basıldığında ilgili makaleye yönlendiriyor',
        resim:'/doktor-profili/49',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Sorumluluk Reddi Beyanı',
        yetenekAciklamasi:'Sorumluluk Reddi Beyanı',
        resim:'/doktor-profili/50',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'İletişim Bilgileri - Footer',
        yetenekAciklamasi:'Footerda yazan iletişim bilgileri; Adres, mail adresi, telefon numarası',
        resim:'/doktor-profili/51',
        kategori:{ text:'METİN', id:'15' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
    {
        yetenekAdi:'Sosyal Medya İkonları - footer ',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/doktor-profili/52',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Doktor Profili', id:'79' }
    },
]

const yetenekGirilecekdata3 = [
    {
        yetenekAdi:'Sosyal Medya İkonları',
        yetenekAciklamasi:'Sosyal Medya İkonları',
        resim:'/randevu-sayfasi/1',
        kategori:{ text:'METİN LİNK', id:'14' },
        sayfa:{ text:'Randevu Sayfası', id:'80' }
    },
    {
        yetenekAdi:'Logo',
        yetenekAciklamasi:'Sitenin anasayfasına yönlendiren logo',
        resim:'/randevu-sayfasi/2',
        kategori:{ text:'GORSEL', id:'5' },
        sayfa:{ text:'Randevu Sayfası', id:'80' }
    },
    {
        yetenekAdi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        yetenekAciklamasi:'Anasayfa, doktorlar, hastaneler, makale, doktor musun?, iletim ve Giriş Yap/Kaydol sayfaları yönlendirmeleri',
        resim:'/randevu-sayfasi/3',
        kategori:{ text:'MENÜ - NAVBAR', id:'25' },
        sayfa:{ text:'Randevu Sayfası', id:'80' }
    },
    {
        yetenekAdi:'Doktor Arama',
        yetenekAciklamasi:'Doktor Arama Formu, arama sayfasına yönlendirir arama yapıldığında',
        resim:'/randevu-sayfasi/4',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'Randevu Sayfası', id:'80' }
    },
    {
        yetenekAdi:'Randevu Sayfası Breadcrumb',
        yetenekAciklamasi:'Randevu sayfasında olduğumuzu gösteren breadcrumb',
        resim:'/randevu-sayfasi/5',
        kategori:{ text:'BREADCRUMB', id:'23' },
        sayfa:{ text:'Randevu Sayfası', id:'80' }
    },
    {
        yetenekAdi:'Randevu Alınan Doktor İçin Önbilgi Kartı',
        yetenekAciklamasi:'Randevu Alınan Doktor İçin Önbilgi Kartı',
        resim:'/randevu-sayfasi/6',
        kategori:{ text:'CARD', id:'26' },
        sayfa:{ text:'"Randevu Sayfası"', id:'80' }
    },
    {
        yetenekAdi:'Randevuyu Tamamla Butonu',
        yetenekAciklamasi:'Randevuyu Tamamla Butonu',
        resim:'/randevu-sayfasi/7',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'"Randevu Sayfası"', id:'80' }
    },
    {
        yetenekAdi:'Randevu Detayları',
        yetenekAciklamasi:'Randevu Detayları',
        resim:'/randevu-sayfasi/8',
        kategori:{ text:'GORUNTULE', id:'6' },
        sayfa:{ text:'"Randevu Sayfası"', id:'80' }
    },
    {
        yetenekAdi:'Tanı Ekle / Düzenle butonu',
        yetenekAciklamasi:'Tanı Ekle / Düzenle butonu',
        resim:'/randevu-sayfasi/9',
        kategori:{ text:'BUTON', id:'1' },
        sayfa:{ text:'"Randevu Sayfası"', id:'80' }
    },
    {
        yetenekAdi:'Randevuya Dair Notlarınız Inputu',
        yetenekAciklamasi:'Randevuya Dair Notlarınız Inputu',
        resim:'/randevu-sayfasi/10',
        kategori:{ text:'INPUT', id:'3' },
        sayfa:{ text:'"Randevu Sayfası"', id:'80' }
    },
]



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

const yaz = (text) => {
    fs.appendFile('idler.txt', text+'\n', function (err) {
        if (err) {
            console.error('Hata oluştu:', err);
        } else {
            console.log('Metin belgesine yazı başarıyla eklendi.');
        }
    });
}

const bekle = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds*1000));

const _e = (text) => { console.log(text) }


const paneleSayfaGir = async ({page, sayfaAdi, sayfaAciklamasi, resim, kategoriSelectText, kategoriSelectValue}) => {

    await page.waitForSelector('[name=sayfa_adi]');

    await page.click('[name=sayfa_adi]');
    await page.keyboard.type(sayfaAdi);

    await page.click('[name=sayfa_aciklama]');
    await page.keyboard.type(sayfaAciklamasi);

    await page.evaluate(({kategoriSelectText, kategoriSelectValue}) => {
        
        try {
            const kategoriSelect = document.querySelector("#ajaxform > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(6) > select");
            kategoriSelect.add(new Option(kategoriSelectText, kategoriSelectValue));
            kategoriSelect.value = kategoriSelectValue;

            const projeSelect = document.querySelector("#ajaxform > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(8) > select");
            projeSelect.add(new Option('Doktor Öner', '3'));
            projeSelect.value = '3';

            document.querySelector("#ajaxform > input[type=file]").remove();
            document.querySelector("#ajaxform > div > div:nth-child(1) > div > div.col-md-6.mt-3").remove();
            document.querySelector("#ajaxform").insertAdjacentHTML('afterbegin', '<input type="file" name="resim_url[]" multiple="" accept="image/*" id="umut"></input>');

        } catch (error) {
            console.error(error)
        }

    }, {kategoriSelectText, kategoriSelectValue});

    const fileInput = await page.$('#umut');
    await fileInput.uploadFile(resim);

    await bekle(1);
    
    await page.click('#ajaxform > div > div.col-md-12.text-end.mt-3 > button');

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    
    await bekle(1);
}

const paneleYetenekGir = async ({page, yetenekAdi, yetenekAciklamasi, resim, sayfaSelectText, sayfaSelectValue, yetenekKategoriSelectText, yetenekKategoriSelectValue}) => {
    
    
    await page.waitForSelector('[name=yetenek_adi]');

    await page.click('[name=yetenek_adi]');
    await page.keyboard.type(yetenekAdi);

    await page.click('[name=yetenek_aciklama]');
    await page.keyboard.type(yetenekAciklamasi);

    await page.evaluate(({yetenekKategoriSelectText, yetenekKategoriSelectValue, sayfaSelectText, sayfaSelectValue}) => {
        
        try {

            const yetenekKategoriSelect = document.querySelector("#ajaxform > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(6) > select");
            yetenekKategoriSelect.add(new Option(yetenekKategoriSelectText, yetenekKategoriSelectValue));
            yetenekKategoriSelect.value = yetenekKategoriSelectValue;

            const sayfaSelect = document.querySelector("#ajaxform > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(8) > select");
            sayfaSelect.add(new Option(sayfaSelectText, sayfaSelectValue));
            sayfaSelect.value = sayfaSelectValue;

            document.querySelector("#ajaxform > input[type=file]").remove();
            document.querySelector("#ajaxform > div > div:nth-child(1) > div > div.col-md-6.mt-3").remove();
            document.querySelector("#ajaxform").insertAdjacentHTML('afterbegin', '<input type="file" name="resim_url[]" multiple="" accept="image/*" id="umut"></input>');

        } catch (error) {
            console.error(error)
        }

    }, {yetenekKategoriSelectText, yetenekKategoriSelectValue, sayfaSelectText, sayfaSelectValue});

    const fileInput = await page.$('#umut');
    await fileInput.uploadFile(resim);

    await bekle(1);

    await page.click('#ajaxform > div > div.col-md-12.text-end.mt-3 > button');

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    
    await bekle(1);
}

const islem1 = async (browser) => {
    // bu panele sayfa giren işlemdir
    for (const item of girilecekData) {
        const extraPage = await browser.newPage();
        await extraPage.goto('https://panel.prosyazilim.com.tr/pages/yazilimproje/uygulanan-sayfa-listesi.php?ekle');
        await bekle(2);
        await paneleSayfaGir({
            page:extraPage,
            kategoriSelectText: item.kategori.text,
            kategoriSelectValue:item.kategori.id,
            resim:'C:/Users/xyzum/OneDrive/Masaüstü/diyagram_için/sadecesayfa/'+item.resim+'.png',
            sayfaAciklamasi:item.sayfaAciklamasi,
            sayfaAdi:item.sayfaAdi,
        });
        await extraPage.close()
    }
}

const islem2 = async (browser) => {
    // bu panele yetenek giren işlemdir

    let index = 1;

    for (const item of yetenekGirilecekdata3) {
        
        _e(`index:${index}. kayıt basladi, eklenmeye calisilan yetenek: [${item.yetenekAdi}]`);
        const extraPage = await browser.newPage();
        await extraPage.goto('https://panel.prosyazilim.com.tr/pages/yazilimproje/uygulanan-yetenek-listesi.php?ekle');
        await bekle(1);
        await paneleYetenekGir({
            page:extraPage,
            yetenekKategoriSelectText:item.kategori.text,
            yetenekKategoriSelectValue:item.kategori.id,
            resim:'C:/Users/xyzum/OneDrive/Masaüstü/puppeteerbot/resimler'+item.resim+'.png',
            yetenekAciklamasi:item.yetenekAciklamasi,
            yetenekAdi:item.yetenekAdi,
            sayfaSelectText:item.sayfa.text,
            sayfaSelectValue:item.sayfa.id
        });

        await extraPage.close()
        _e(`index:${index}. kayıt bitti, ilgili sayfa: ${item.sayfa.text}, eklenen yetenek: [${item.yetenekAdi}]`);
        index++
    }
}


const program = async () => {

    const startTime = performance.now()

    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();


    await girisYap(page);

    await islem2(browser);

    let endTime = performance.now()
    console.log(`Çalışma Süresi : ${((endTime - startTime)/1000).toFixed(3)} saniye ,  ${((endTime - startTime)/1000/60).toFixed(3)} dakika`);

    await page.close();
    await browser.close();
}

program();
