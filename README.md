# FTR Atlası

FTR Atlası, Fizyoterapi ve Rehabilitasyon öğrencileri için Türkçe-Latince anatomi öğrenme ve tekrar sitesidir. Ücretsizdir; sade HTML, CSS ve JavaScript ile çalışır, ücretli API veya üyelik gerektirmez.

## Sitede neler var?

- **Öğrenme haritası ve Ders Merkezi:** Konular arasında gezinme ve farklı başlangıç noktalarından öğrenmeye başlama.
- **Anatomi terimleri:** Temel terim kartları, arama ve kategori filtreleri.
- **Femur rehberi:** Femurun temel anatomik yapıları, Türkçe-Latince adları, kısa açıklamalar ve öğrenme takibi.
- **İskelet Atlası:** Tipik erişkin iskeletindeki 206 kemiği bölgeye göre arama ve inceleme.
- **Kas Atlası:** İlk sürümde 11 temel kas için adlandırma ve temel bilgiler; henüz kapsamlı bir kas kataloğu değildir.
- **Quiz ve tekrar:** Temel anatomi soruları, puan ve yanlışları tekrar etme.
- **Kişisel ilerleme:** Quiz geçmişi ve bazı öğrenme işaretleri tarayıcıda yerel olarak saklanır; sunucu hesabı gerekmez.

Site eğitim amaçlıdır; klinik tanı veya tedavi önerisi vermez. Anatomi içeriklerini öğrenirken sayfalarda belirtilen kaynakları da kontrol et.

## Çalıştırma

1. `index.html` dosyasını tarayıcıda aç.
2. Yerel dosya kısıtlaması nedeniyle bir özellik çalışmazsa Python 3 kuruluysa proje klasöründe `py -m http.server 8000` komutunu çalıştır.
3. Tarayıcıda `http://localhost:8000` adresini aç.

Node.js yalnızca bazı geliştirici kontrolleri için kullanılır. Siteyi derlemek veya ücretli servis bağlamak gerekmez.

## Kaynaklar ve lisans

Anatomi sayfalarında kaynak bağlantılarını ve ilgili görsellerin lisans/atıf bilgilerini kontrol et. Proje kaynakları ve ilk lisans notları için `LICENSING.md` dosyasına bak. Kaynakların lisans koşulları farklı olabilir; kod veya içerik için burada hukuki lisans garantisi verilmez.

## Yayınlama

GitHub Pages ile yayınlamak için depo ayarlarında **Settings → Pages → Deploy from a branch** seç; kaynak olarak `main` ve `/(root)` belirleyip kaydet. Yayın tamamlandığında aynı ayarlar sayfasındaki **Visit site** bağlantısıyla gerçek adresi doğrula. Ardından `robots.txt` ve `sitemap.xml` içindeki adreslerin yayın adresiyle eşleştiğini kontrol et. Google Search Console'a siteyi eklemek ve site haritasını göndermek isteğe bağlı sonraki adımdır; bu işlemler dizine eklenmeyi veya sıralamayı garanti etmez.

## Geliştirme durumu

Güncel kalan işler ve doğrulama notları `PLANS.md` içinde tutulur. Gerçek telefon/tablet tarayıcı görünümü, görsel yüklenmesi ve erişilebilirlik denetimi ayrıca yapılmalıdır.
