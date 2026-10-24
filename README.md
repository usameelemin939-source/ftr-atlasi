# FTR Atlası

FTR Atlası, Fizyoterapi ve Rehabilitasyon öğrencilerinin temel anatomi terimlerini Türkçe ve Latince birlikte çalışabileceği ücretsiz bir öğrenme sitesidir. Bu ilk sürümde dört anatomi kategorisi, arama ve filtreleme, 24 terim kartı ve 12 soruluk quiz bulunur.

Uygulama eğitim amaçlıdır; klinik tanı veya tedavi önerisi vermez. Hesap veya sunucu kullanmaz. En iyi quiz puanı, tarayıcının yerel depolamasına yazılır; tarayıcı depolamayı kapatırsa quiz yine çalışır.

## Çalıştırma

- `index.html` dosyasını tarayıcıda aç.
- Yerel dosyaları tarayıcı kısıtları nedeniyle açamıyorsan, Python 3 kuruluysa proje klasöründe `py -m http.server 8000` komutunu çalıştır ve `http://localhost:8000` adresini aç.
- Node.js, npm, ücretli servis, API anahtarı veya derleme adımı gerekmez.

## Kaynaklar ve kullanım

Kart ve quiz açıklamaları Türkçe olarak özgün biçimde özetlenmiştir; OpenStax sayfaları her kartta ve sayfa altında kaynak olarak verilir; eklem adlandırmaları FIPAT Terminologia Anatomica 2 ile karşılaştırılmıştır. OpenStax ders kitabı içeriği CC BY-NC-SA lisanslıdır. Bu projede OpenStax görseli veya uzun metin alıntısı kullanılmadı; projeyi ileride gelir modeline taşırken kaynak lisanslarını ve kullanım koşullarını ayrıca incele.

## Kontroller

- `node --check app.js` ve `node --check data.js` başarılı.
- Node tabanlı etkileşim denetimi 24 terimi, arama ve kategori filtresini, boş sonuç mesajını, 12 soruluk puanlamayı, yanlış soruları tekrar etmeyi, en iyi puanı kaydetmeyi ve yeniden başlatmayı geçti.
- Bu ortamın tarayıcı güvenlik politikası yerel `file://` sayfalarını açmadı; yerel sunucuyla görsel tarayıcı kontrolü de başlatılamadı. Bu yüzden küçük ekran görünümü ve gerçek tarayıcı erişilebilirlik denetimi henüz görsel olarak doğrulanmadı.

## Dosyalar

- `AGENTS.md`: Sonraki geliştirme görevlerinde uygulanacak proje kuralları.
- `PLANS.md`: Aşamalar, mevcut durum ve kalan yayın kontrolleri.
- `index.html`, `styles.css`, `app.js`, `data.js`: Statik site ve içeriği.

