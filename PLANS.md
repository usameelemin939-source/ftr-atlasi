# FTR Atlası — geliştirme planı

## 1. Çalışan temel web sitesi
- [x] Türkçe ana sayfa ve net gezinme.
- [x] Bağımlılıksız statik site ve çalıştırma adımları.
- [x] Semantik başlıklar, klavye odağı ve ana içeriğe geçiş bağlantısı.
- [x] Telefon/tablet için duyarlı CSS kuralları eklendi.
- **Kontrol:** JavaScript sözdizimi doğrulandı. Yerel sayfa tarayıcı güvenlik kuralı nedeniyle açılamadığından gerçek ekran taşması görsel olarak kontrol edilemedi.

## 2. Anatomi kategorileri ve arama
- [x] Kemikler, kaslar, eklemler ve anatomik yön/konum kategorileri.
- [x] Türkçe/Latince arama ve kategori filtresi.
- [x] Sonuç yok durumu.
- **Kontrol:** Node tabanlı etkileşim denetiminde arama, kategori filtresi, birlikte kullanım ve sonuçsuz arama geçti.

## 3. Türkçe-Latince terim kartları
- [x] 24 terimin Türkçe ve Latince adı ile kısa açıklaması.
- [x] Her terimde kaynak bağlantısı.
- [x] OpenStax anatomi kaynaklarıyla içerik, FIPAT Terminologia Anatomica 2 ile Latin eklem adları doğrulandı; uygulama içinde kaynak listesi.
- **Kontrol:** Terim sayısı ve bağlantı biçimi denetlendi. OpenStax görselleri veya uzun metin alıntıları kullanılmadı.

## 4. Quiz ve tekrar sistemi
- [x] Dört seçenekli 12 temel anatomi sorusu.
- [x] Cevap kontrolü, kısa açıklama ve puan.
- [x] Quiz sonunda yeniden başlatma ve yanlış cevapları tekrar çözme.
- [x] En iyi puanı tarayıcıda saklama.
- **Kontrol:** Doğru/yanlış yanıt, puan, tekrar turu ve yeniden başlatma Node denetiminde geçti.

## 5. Testler, erişilebilirlik ve yayın hazırlığı
- [x] Arama, kategori, quiz ve puan akışlarının işlevsel denetimi.
- [x] Temel semantik ve klavye erişimi uygulandı.
- [ ] Gerçek tarayıcıda mobil görünüm ve erişilebilirlik taraması.
- [x] Ücretsiz barındırma ve GitHub Pages yayın akışı kullanılıyor.
- [ ] Gelir modeli araştırması ve tam içerik lisansı incelemesi.
- [x] OpenStax ve FIPAT için resmi kaynaklara dayalı ilk lisans notu `LICENSING.md` dosyasına eklendi.
- **Not:** Depoda henüz `LICENSE` dosyası yok; proje kodu için lisans seçimi yapılmadı. Bu dokümantasyon, kod lisansı ilan etmez ve hukuki görüş değildir.

## 6. Tam vücut iskelet atlası ve geniş FTR rotası
- [x] Tipik erişkin iskeletinin 206 kemiğini sağ/sol ve numaralı segmentler ayrı kayıtlar olarak göster.
- [x] Her kayıtta Türkçe ve Latince adları, aranabilir kemik parçaları/işaretleri ve bölge filtresi.
- [x] 80 kemikli eksen iskeleti ile 126 kemikli appendiküler iskelet sayımını doğrula.
- [x] Kaynak bağlantılarını görünür ver; OpenStax görsellerini veya uzun metinlerini kopyalama.
- [x] Ders merkezinde 1. sınıfla sınırlı olmayan konu rotasını göster.
- [ ] Kas atlası, eklem/ROM, kinezyoloji, biyomekanik, sinir sistemi ve klinik derslerin konu içeriklerini ayrı aşamalarda doğrulayarak ekle.
- **Kaynaklar:** OpenStax A&P 2e iskelet sistemi bölümleri; FIPAT/IFAA terminoloji portalı.


## 7. Kas atlası — ilk sürüm
- [x] 10 temel kas için Türkçe/Latince ad kartları.
- [x] Bölge filtresi ve kas/terim araması.
- [x] Başlangıç, sonlanma, innervasyon ve temel fonksiyon alanları.
- [x] Ek okuma için OpenStax kas sistemi bağlantıları.
- [x] 10 temel kas kartına Wikimedia Commons kaynak/lisans bağlantılı görsel eşleştirmeleri eklendi (11 görsel kaydı).
- [ ] Görsellerin gerçek tarayıcıda açılmasını ve her lisans/atıf metnini tek tek doğrula.
- [ ] Kas başlangıç, sonlanma, innervasyon ve fonksiyonlarını ders kaynaklarıyla ayrıntılı karşılaştır; daha geniş kas kapsamı ekle.
- [ ] Tarayıcı/telefon görünüm testi.

## Durum

206 kemikli iskelet atlasının ilk genişletilmiş sürümü hazırlandı. Ders kataloğu daha ileri FTR alanlarını da kapsayacak şekilde açıldı; rotada “içerik sırada” olarak işaretlenen modüller henüz tamamlanmış ders değildir. Gerçek tarayıcı testi ve tam lisans/gelir modeli incelemesi devam ediyor.
