const puppeteer = require('puppeteer')
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

const girilecekYeteneklerData = [
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
    },
    {
        yetenekAdi:'BEKLEMEDE',
        yetenekAciklamasi:'BEKLEMEDE',
        resim:'BEKLEMEDE',
        kategori:{ text:'BEKLEMEDE', id:'BEKLEMEDE' },
        sayfa:{ text:'BEKLEMEDE', id:'BEKLEMEDE' }
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
    for (const item of girilecekYeteneklerData) {
        const extraPage = await browser.newPage();
        await extraPage.goto('https://panel.prosyazilim.com.tr/pages/yazilimproje/uygulanan-yetenek-listesi.php?ekle');
        await bekle(2);
        await paneleYetenekGir({
            page:extraPage,
            yetenekKategoriSelectText:item.kategori.text,
            yetenekKategoriSelectValue:item.kategori.id,
            resim:item.resim,
            yetenekAciklamasi:item.yetenekAciklamasi,
            yetenekAdi:item.yetenekAdi,
            sayfaSelectText:item.sayfa.text,
            sayfaSelectValue:item.sayfa.id
        });
        await extraPage.close()
    }
}


const program = async () => {

    const startTime = performance.now()

    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();


    await girisYap(page);

    // await islem2(browser);
    await page.goto('https://panel.prosyazilim.com.tr/pages/yazilimproje/uygulanan-yetenek-listesi.php?ekle');
    await bekle(2);
    await paneleYetenekGir({
        page:page,
        yetenekKategoriSelectText:'İZİNLER',
        yetenekKategoriSelectValue:'16',
        resim:'C:/Users/xyzum/OneDrive/Masaüstü/diyagram_için/ayarlar.png',
        yetenekAciklamasi:'Umut Deneme yetenek acıklaması',
        yetenekAdi:'Umut Deneme',
        sayfaSelectValue:'71',
        sayfaSelectText:'Kayıt Ol - 1'
    });

    let endTime = performance.now()
    console.log(`Çalışma Süresi : ${((endTime - startTime)/1000).toFixed(3)} saniye ,  ${((endTime - startTime)/1000/60).toFixed(3)} dakika`);

}

program();