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
- [ ] Ücretsiz barındırma seçenekleri ve yayın adımları.
- [ ] Gelir modeli araştırması ve içerik lisanslarının yeniden incelenmesi.

## Durum

İlk çalışan sürümün özellikleri tamamlandı. Tarayıcıda görsel kontrol ve yayın hazırlığı sonraki aşamada tamamlanmalı.

