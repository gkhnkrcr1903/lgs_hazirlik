# LGS Hazırlık — Türkçe, Sosyal Bilgiler, Din Kültürü ve Matematik

7. sınıf öğrencilerini LGS'ye hazırlamak için hazırlanmış, **telefon ve tablete uygun**, kurulum gerektirmeyen bir web uygulaması.

## Özellikler

- **33 konu** (10 Türkçe, 8 Sosyal Bilgiler, 5 Din Kültürü, 10 Matematik): her konu için çizimli, şemalı **konu anlatımı** ve çözümlü örnekler
- **Seviyeli testler:** Her konuda 3 seviye (Kolay → Orta → LGS Seviyesi). Bir seviyede %60 başarı yakalanınca sonraki seviye açılır ve ⭐ kazanılır.
- **Anında geri bildirim:** Seviye testlerinde her sorudan sonra doğru cevap ve adım adım çözüm
- **Sınırsız matematik sorusu:** Matematik konularında soru üreticileri sayesinde her seferinde yeni sayılarla sorular gelir
- **10 soruluk denemeler:** 12 Türkçe, 12 Matematik, 8 Karma (20 dk); 8 Sosyal Bilgiler, 8 Din Kültürü (15 dk) + rastgele deneme
- **Genel LGS denemeleri:** 9 adet, 20 Türkçe + 10 Sosyal Bilgiler + 10 Din Kültürü + 20 Matematik, 120 dakika, LGS'deki gibi **3 yanlış 1 doğruyu götürür**
- **LGS Tarzı Özel Denemeler:** 2 adet, geçmiş LGS sınavlarının yeni nesil soru tarzında (uzun metin, tablo, grafik, sözel mantık, çok adımlı problem) 7. sınıf müfredatına göre hazırlanmış özgün 60'ar soru, 120 dakika
- **Cevap kâğıdı (optik)**, boş bırakma, süre sayacı, sonuçta konu analizi ve tüm soruların çözümlü incelemesi
- **Yanlışlarım:** Yanlış yapılan sorular kaydedilir; doğru çözülünce listeden çıkar
- **İlerleme:** Puan, seviye, gün serisi, konu ustalık oranları ve deneme gelişim grafiği
- Açık / koyu tema, çevrimdışı çalışma (PWA — telefona "Ana ekrana ekle" ile uygulama gibi kurulabilir)

Tüm ilerleme yalnızca kullanılan cihazın tarayıcısında (localStorage) saklanır; hiçbir sunucuya veri gönderilmez.

## Konular

| Matematik | Türkçe |
|---|---|
| Tam Sayılarla İşlemler | Sözcükte Anlam |
| Rasyonel Sayılar | Cümlede Anlam |
| Cebirsel İfadeler | Paragrafta Anlam |
| Eşitlik ve Denklem | Fiiller: Kip ve Kişi |
| Oran ve Orantı | Ek Fiil ve Fiilde Yapı |
| Yüzdeler | Zarflar |
| Doğrular ve Açılar | Yazım ve Noktalama |
| Çokgenler ve Alan | Söz Sanatları |
| Çember ve Daire | Anlatım Bozuklukları |
| Veri Analizi | Sözel Mantık ve Görsel Okuma |

| Sosyal Bilgiler | Din Kültürü ve Ahlak Bilgisi |
|---|---|
| İletişim ve İnsan İlişkileri | Melek ve Ahiret İnancı |
| Anadolu'da Türkler ve Osmanlı'nın Kuruluşu | Hac ve Kurban |
| İstanbul'un Fethi ve Osmanlı'nın Yükselişi | Ahlaki Davranışlar |
| Nüfus, Yerleşme ve Göç | Allah'ın Kulu ve Elçisi Hz. Muhammed |
| Ekonomi ve Sosyal Hayat | İslam Düşüncesinde Yorumlar |
| Bilim ve Teknolojinin Gelişimi | |
| Etkin Vatandaşlık ve Demokrasi | |
| Küresel Bağlantılar | |

## Yayınlama (GitHub Pages)

1. GitHub'da depo sayfasında **Settings → Pages** bölümüne gir.
2. **Source:** "Deploy from a branch", **Branch:** `main` ve `/ (root)` seç, **Save**'e bas.
3. Birkaç dakika sonra site `https://<kullanıcı-adı>.github.io/lgs_hazirlik/` adresinde yayında olur.

## Yerelde çalıştırma

Derleme adımı yoktur. Klasörde basit bir sunucu başlatmak yeterlidir:

```
python -m http.server 8765
```

Ardından tarayıcıda `http://localhost:8765` adresini aç.

## Yeni soru ekleme

Sorular `js/data/` klasöründeki `turkce.js`, `sosyal.js`, `din.js` ve `matematik.js` dosyalarındadır. Bir konunun `sorular` dizisine şu biçimde soru eklenebilir:

```js
{ seviye: 2, soru: 'Soru metni', secenekler: ['A şıkkı', 'B şıkkı', 'C şıkkı', 'D şıkkı'], dogru: 1, cozum: 'Çözüm açıklaması' }
```

`dogru` alanı doğru şıkkın sırasıdır (0 = A, 1 = B, 2 = C, 3 = D). İsteğe bağlı `sekil` alanına SVG çizim eklenebilir. Şıklar uygulamada otomatik karıştırılır (I–IV ve yalnızca sayıdan oluşan şıklar hariç), bu yüzden çözüm metinlerinde "A şıkkı" gibi harf atıfları kullanılmamalıdır.

## Dosya yapısı

```
index.html            Uygulama iskeleti
css/style.css         Tasarım (mobil öncelikli, açık/koyu tema)
js/util.js            Yardımcılar (tohumlu rastgele sayı, kesir, seçenek üretimi)
js/app.js             Sayfalar, test motoru, denemeler, ilerleme kaydı
js/data/matematik.js  Matematik anlatımları, çizimleri, soruları, soru üreticileri
js/data/turkce.js     Türkçe anlatımları, şemaları ve soruları
js/data/sosyal.js     Sosyal Bilgiler anlatımları, zaman çizelgeleri ve soruları
js/data/din.js        Din Kültürü anlatımları, şemaları ve soruları
js/data/ozel.js       LGS tarzı 2 özel deneme (120 özgün soru)
sw.js, manifest.json  Çevrimdışı kullanım ve ana ekrana ekleme
```
