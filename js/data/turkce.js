/* 7. Sınıf Türkçe — konu anlatımları, şemalar ve sorular */
window.LGS_TR = (function () {
  'use strict';

  /* ===================== ŞEMA YARDIMCILARI ===================== */
  // Oklu akış şeması: [[metin, altYazı, sınıf], ...]
  function akis(kutular, W) {
    W = W || 440; const n = kutular.length; const gap = 26; const bw = (W - 20 - gap * (n - 1)) / n;
    let s = `<svg class="fig" viewBox="0 0 ${W} 96">`;
    kutular.forEach((k, i) => {
      const x = 10 + i * (bw + gap);
      s += `<rect x="${x}" y="14" width="${bw}" height="56" rx="12" class="${k[2] || 'fs'} bi"/>`;
      s += `<text x="${x + bw / 2}" y="${k[1] ? 38 : 47}" text-anchor="middle">${k[0]}</text>`;
      if (k[1]) s += `<text x="${x + bw / 2}" y="58" text-anchor="middle" class="m">${k[1]}</text>`;
      if (i < n - 1) { const ax = x + bw + 3; s += `<line class="la" x1="${ax}" y1="42" x2="${ax + gap - 8}" y2="42" style="stroke-width:2.5"/><polygon class="fa" points="${ax + gap - 4},42 ${ax + gap - 11},37 ${ax + gap - 11},47"/>`; }
    });
    return s + '</svg>';
  }
  // Ağaç şeması: kök ve iki dal, her dalın yaprakları
  function agac(kok, dallar) {
    const W = 440; let s = `<svg class="fig" viewBox="0 0 ${W} 250">`;
    s += `<rect x="150" y="6" width="140" height="38" rx="10" class="fa"/><text x="220" y="31" text-anchor="middle" style="fill:#fff">${kok}</text>`;
    dallar.forEach((d, i) => {
      const cx = i === 0 ? 112 : 328;
      s += `<path class="lm" d="M220 44 L220 58 L${cx} 58 L${cx} 70"/>`;
      s += `<rect x="${cx - 95}" y="70" width="190" height="34" rx="10" class="fs bi"/><text x="${cx}" y="92" text-anchor="middle">${d[0]}</text>`;
      d[1].forEach((y, j) => {
        const yy = 116 + j * 26;
        s += `<text x="${cx - 86}" y="${yy + 14}" class="m" style="font-size:13px">• ${y}</text>`;
      });
    });
    return s + '</svg>';
  }
  // Benzetme ögeleri şeması
  function benzetmeSema() {
    const parca = [['Annemin sesi', 'benzeyen', 'fi'], ['bahar yağmuru', 'benzetilen', 'fw'], ['kadar', 'edat', 'fg'], ['yumuşaktı', 'benzetme yönü', 'fr']];
    let s = '<svg class="fig" viewBox="0 0 440 110">'; let x = 6;
    const w = [118, 118, 66, 118];
    parca.forEach((p, i) => {
      s += `<rect x="${x}" y="10" width="${w[i]}" height="40" rx="10" class="${p[2]} bi"/><text x="${x + w[i] / 2}" y="35" text-anchor="middle">${p[0]}</text>`;
      s += `<line class="lm" x1="${x + w[i] / 2}" y1="50" x2="${x + w[i] / 2}" y2="68"/><text x="${x + w[i] / 2}" y="86" text-anchor="middle" class="a" style="font-size:12.5px">${p[1]}</text>`;
      x += w[i] + 6;
    });
    return s + '</svg>';
  }
  const P = t => `<div class="paragraf">${t}</div>`;

  const konular = [];

  /* ---------- 1. SÖZCÜKTE ANLAM ---------- */
  konular.push({
    id: 'sozcukte-anlam', ad: 'Sözcükte Anlam', ikon: '🔤', ozet: 'Gerçek, mecaz, terim anlam; deyim, atasözü',
    anlatim: `
<div class="blok"><h3>Bir sözcüğün anlam türleri</h3>
<figure><svg class="fig" viewBox="0 0 440 200">
<rect x="165" y="80" width="110" height="40" rx="20" class="fa"/><text x="220" y="105" text-anchor="middle" style="fill:#fff">soğuk</text>
<line class="lm" x1="165" y1="92" x2="120" y2="50"/><line class="lm" x1="275" y1="92" x2="320" y2="50"/><line class="lm" x1="220" y1="120" x2="220" y2="150"/>
<rect x="10" y="14" width="190" height="40" rx="10" class="fi bi"/><text x="105" y="32" text-anchor="middle">Gerçek anlam</text><text x="105" y="48" text-anchor="middle" class="m">soğuk su içti</text>
<rect x="240" y="14" width="190" height="40" rx="10" class="fw bi"/><text x="335" y="32" text-anchor="middle">Mecaz anlam</text><text x="335" y="48" text-anchor="middle" class="m">bize soğuk davrandı</text>
<rect x="125" y="150" width="190" height="40" rx="10" class="fg bi"/><text x="220" y="168" text-anchor="middle">Terim anlam</text><text x="220" y="184" text-anchor="middle" class="m">soğuk hava deposu (bilim)</text>
</svg></figure>
<ul><li><b>Gerçek anlam:</b> Sözcüğün akla gelen ilk anlamıdır. "Ağır bavul"</li>
<li><b>Mecaz anlam:</b> Gerçek anlamından tamamen uzaklaşıp yeni bir anlam kazanmasıdır. "Ağır sözler"</li>
<li><b>Terim anlam:</b> Bir bilim, sanat ya da meslek dalına özgü anlamdır. "Üçgenin iç <b>açıları</b>"</li></ul>
<div class="ipucu">✅ Sözcüğün yerine "somut" bir şey koyamıyorsan büyük ihtimalle mecazdır: "Kalbi <b>kırıldı</b>" → kalp gerçekten kırılmaz.</div></div>

<div class="blok"><h3>Sözcükler arası anlam ilişkileri</h3>
<div class="tb-wrap"><table class="tb"><tr><th>İlişki</th><th>Açıklama</th><th>Örnek</th></tr>
<tr><td>Eş anlamlı</td><td>Yazılışları farklı, anlamları aynı</td><td>cevap – yanıt, okul – mektep</td></tr>
<tr><td>Zıt anlamlı</td><td>Anlamca karşıt</td><td>cömert – cimri, ak – kara</td></tr>
<tr><td>Eş sesli</td><td>Yazılışı aynı, anlamı farklı</td><td>yüz (sayı) – yüz (çehre) – yüz- (yüzmek)</td></tr></table></div></div>

<div class="blok"><h3>Deyim ve atasözü</h3>
<ul><li><b>Deyim:</b> Genellikle mecaz anlamlı, kalıplaşmış söz öbeği. Bir durumu anlatır, öğüt vermez. "Etekleri zil çalmak" (çok sevinmek)</li>
<li><b>Atasözü:</b> Uzun deneyimlere dayanan, öğüt veren, kalıplaşmış cümle. "Damlaya damlaya göl olur."</li></ul>
<div class="dikkat">⚠️ Deyimdeki sözcükler değiştirilemez: "ağzı kulaklarına varmak" yerine "ağzı gözlerine varmak" denmez.</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Aşağıdaki cümlelerin hangisinde "ağır" sözcüğü <b>mecaz</b> anlamda kullanılmıştır?', secenekler: ['Bu bavul çok ağır, taşıyamıyorum.', 'Arkadaşını ağır bir dille eleştirdi.', 'Ağır demir kapıyı zorlukla açtı.', 'Masadaki ağır kitapları rafa kaldırdı.'], dogru: 1, cozum: '"Ağır dil" ifadesinde ağır, kütlesi fazla anlamında değil "kırıcı, sert" anlamındadır. Bu yüzden <b>mecazdır</b>. Diğerlerinde gerçek anlamda kullanılmıştır.' },
      { seviye: 1, soru: '"Cömert" sözcüğünün zıt anlamlısı aşağıdakilerden hangisidir?', secenekler: ['eli açık', 'zengin', 'cimri', 'iyi kalpli'], dogru: 2, cozum: 'Cömert "elindekini paylaşmayı seven" demektir; zıt anlamlısı <b>cimri</b>dir. "Eli açık" ise eş anlamlısıdır.' },
      { seviye: 1, soru: 'Aşağıdaki cümlelerin hangisinde <b>eş anlamlı</b> sözcükler bir arada kullanılmıştır?', secenekler: ['Kısa yol, bazen uzun yoldan daha zahmetlidir.', 'Ak koyun kara koyun geçerken belli olur.', 'Sorunun yanıtını bilmesine rağmen cevap vermedi.', 'Okulun önünde büyük bir çınar ağacı vardı.'], dogru: 2, cozum: '"Yanıt" ve "cevap" eş anlamlıdır. Kısa-uzun ve ak-kara ise zıt anlamlıdır.' },
      { seviye: 2, soru: 'Aşağıdaki cümlelerin hangisinde <b>terim anlamlı</b> bir sözcük kullanılmıştır?', secenekler: ['Olaya bir de onun açısından bakmalıyız.', 'Üçgenin iç açıları toplamı 180 derecedir.', 'Kapıyı biraz aralık bırak.', 'Bu konuyu daha sonra açalım.'], dogru: 1, cozum: '"Üçgenin iç açıları" ifadesinde "açı" matematik terimidir. "Onun açısından bakmak" ifadesindeki "açı" ise "bakış, görüş" anlamında mecazdır.' },
      { seviye: 2, soru: '"Kalın" sözcüğü aşağıdakilerin hangisinde "sesin pes, tok olması" anlamında kullanılmıştır?', secenekler: ['Kışın kalın giyinmeyi unutma.', 'Kalın bir sesle şarkı söylemeye başladı.', 'Kalın kitabı zorlukla çantasına sığdırdı.', 'Duvarlar kalın olduğu için içerisi serindi.'], dogru: 1, cozum: '"Kalın bir ses" ifadesinde kalın, sesin pes ve tok olduğunu anlatır. Diğer seçeneklerde "eni ya da hacmi fazla" anlamındadır.' },
      { seviye: 2, soru: '"Etekleri zil çalmak" deyiminin anlamı aşağıdakilerden hangisidir?', secenekler: ['Çok sevinmek', 'Çok korkmak', 'Acele etmek', 'Utanıp sıkılmak'], dogru: 0, cozum: '"Etekleri zil çalmak" bir şeye <b>çok sevinmek</b> anlamına gelir.' },
      { seviye: 3, soru: '"Çıkmak" sözcüğü aşağıdakilerin hangisinde "bir sonuca ulaşmak, ortaya çıkmak" anlamında kullanılmıştır?', secenekler: ['Merdivenleri koşarak çıktı.', 'Sabah erkenden evden çıktı.', 'Yaptığımız hesaptan ayın sonunda para artacağı çıktı.', 'Gömleğindeki leke bir türlü çıkmadı.'], dogru: 2, cozum: '"Hesaptan ... çıktı" ifadesi "hesap sonucunda anlaşıldı, sonuca ulaşıldı" anlamındadır. Diğer cümlelerde çıkmak; yukarı gitmek (merdiven), ayrılmak (evden) ve yok olmak (leke) anlamındadır.' },
      { seviye: 3, soru: '"Damlaya damlaya göl olur." atasözüyle aşağıdakilerden hangisi anlatılmak istenmiştir?', secenekler: ['Küçük birikimler zamanla büyük sonuçlar doğurur.', 'Yağmur yağınca göller dolar.', 'İnsan hatalarından ders almalıdır.', 'Acele işe şeytan karışır.'], dogru: 0, cozum: 'Damlalar tek tek küçüktür ama birikince göl oluşturur: <b>küçük birikimler zamanla büyük sonuçlar doğurur.</b>' }
    ]
  });

  /* ---------- 2. CÜMLEDE ANLAM ---------- */
  konular.push({
    id: 'cumlede-anlam', ad: 'Cümlede Anlam', ikon: '💬', ozet: 'Neden-sonuç, amaç-sonuç, koşul, öznel-nesnel',
    anlatim: `
<div class="blok"><h3>Cümleler arası anlam ilişkileri</h3>
<figure>${akis([['Neden', 'Yağmur yağdığı için', 'fi'], ['Sonuç', 'maç ertelendi.', 'fg']])}<figcaption><b>Neden-sonuç:</b> Eylemin gerçekleşme sebebi bildirilir. "için, -den dolayı, -dığından, çünkü"</figcaption></figure>
<figure>${akis([['Amaç', 'Sınavı kazanmak için', 'fw'], ['Eylem', 'çok çalıştı.', 'fg']])}<figcaption><b>Amaç-sonuç:</b> Eylem bir hedefe ulaşmak için yapılır. "için, -mek üzere, diye"</figcaption></figure>
<figure>${akis([['Koşul', 'Erken yatarsan', 'fr'], ['Sonuç', 'dinç uyanırsın.', 'fg']])}<figcaption><b>Koşul-sonuç:</b> Eylem bir şarta bağlıdır. "-sa/-se, -dıkça, -madan"</figcaption></figure>
<div class="ipucu">✅ <b>Neden mi amaç mı?</b> "için"den önceki kısma "-mak istediği için" ekleyebiliyorsan <b>amaç</b>tır: "Sınavı kazanmak (istediği) için çalıştı." → amaç. "Hasta olduğu için gelmedi." → neden.</div></div>

<div class="blok"><h3>Öznel ve nesnel yargı</h3>
<div class="tb-wrap"><table class="tb"><tr><th>Nesnel</th><th>Öznel</th></tr>
<tr><td>Kanıtlanabilir, kişiden kişiye değişmez.</td><td>Kişisel görüş, duygu ve beğeni bildirir.</td></tr>
<tr><td>"Türkiye'nin başkenti Ankara'dır."</td><td>"Ankara en güzel şehirdir."</td></tr></table></div></div>

<div class="blok"><h3>Diğer anlam özellikleri</h3>
<ul><li><b>Karşılaştırma:</b> İki varlık arasındaki benzerlik/farklılık. "Bu yıl kış geçen yıldan daha soğuktu."</li>
<li><b>Örtülü anlam:</b> Cümlede açıkça söylenmeyen ama çıkarılabilen anlam. "Ali <b>de</b> geldi." → Ali'den başka gelenler de var.</li>
<li><b>Beklenmedik sonuç (karşıtlık):</b> "Çok çalışmasına <b>rağmen</b> kazanamadı."</li>
<li><b>Öneri:</b> Bir konuda yol gösterme. "Her gün biraz kitap okumalısın."</li></ul>
<div class="dikkat">⚠️ LGS'de "Bu cümleden hangisi <b>çıkarılamaz</b>?" sorularında, cümlede olmayan bilgiyi ekleyen seçeneği ara.</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Aşağıdaki cümlelerden hangisi <b>nesnel</b> bir yargı içerir?', secenekler: ['Bu film yılın en güzel filmiydi.', 'Ankara Türkiye\'nin başkentidir.', 'Kitabın kapağı çok etkileyiciydi.', 'Yazın tatil yapmak en keyifli şeydir.'], dogru: 1, cozum: 'Ankara\'nın başkent olduğu kanıtlanabilir bir bilgidir, kişiden kişiye değişmez: <b>nesnel</b>. Diğerleri kişisel beğeni bildirir.' },
      { seviye: 1, soru: 'Aşağıdaki cümlelerin hangisinde <b>koşul-sonuç</b> ilişkisi vardır?', secenekler: ['Yağmur yağdığı için maç ertelendi.', 'Sınavı kazanmak için çok çalıştı.', 'Erken yatarsan sabah dinç uyanırsın.', 'Kitap okumayı çok sever.'], dogru: 2, cozum: '"Erken yatarsan" ifadesi bir şart bildirir; dinç uyanmak bu şarta bağlıdır: <b>koşul-sonuç</b>.' },
      { seviye: 2, soru: 'Aşağıdaki cümlelerin hangisinde <b>amaç-sonuç</b> ilişkisi vardır?', secenekler: ['Hasta olduğu için okula gelmedi.', 'Yollar buz tuttuğundan kaza oldu.', 'Konuyu pekiştirmek için bol soru çözdü.', 'Rüzgâr çıkınca pencere çarptı.'], dogru: 2, cozum: 'Soru çözmesinin amacı "konuyu pekiştirmek"tir. "Pekiştirmek <b>istediği</b> için" denebilir → amaç-sonuç. A ve B neden-sonuçtur.' },
      { seviye: 2, soru: '"Ormanda yangın çıktığı için hayvanlar başka bölgelere göç etti." cümlesindeki anlam ilişkisi aşağıdakilerden hangisidir?', secenekler: ['Amaç-sonuç', 'Koşul-sonuç', 'Karşılaştırma', 'Neden-sonuç'], dogru: 3, cozum: 'Göçün sebebi yangındır. Yangın bir amaç değil, olayın nedenidir: <b>neden-sonuç</b>.' },
      { seviye: 2, soru: 'Aşağıdaki cümlelerin hangisinde <b>karşılaştırma</b> yapılmıştır?', secenekler: ['Yarın hava yağmurlu olacakmış.', 'Bu yıl kış, geçen yıldan daha soğuk geçti.', 'Kitabı bitirince bana da ver.', 'Okula her gün yürüyerek gidiyor.'], dogru: 1, cozum: 'Bu yılın kışı ile geçen yılın kışı "daha" sözcüğüyle karşılaştırılmıştır.' },
      { seviye: 3, soru: '"Ahmet <b>de</b> bu yarışmaya katıldı." cümlesinden aşağıdakilerin hangisi çıkarılabilir?', secenekler: ['Ahmet yarışmayı kazanmıştır.', 'Yarışmaya Ahmet\'ten başka katılanlar da vardır.', 'Ahmet ilk kez bir yarışmaya katılmıştır.', 'Yarışma çok zor geçmiştir.'], dogru: 1, cozum: '"de" bağlacı "Ahmet\'in yanında başkaları da" anlamı katar. Cümlenin <b>örtülü anlamı</b>: Yarışmaya başkaları da katılmıştır. Diğer seçenekler cümlede yoktur.' },
      { seviye: 3, soru: '"Sınava çok çalışmasına rağmen istediği sonucu alamadı." cümlesiyle ilgili aşağıdakilerden hangisi söylenebilir?', secenekler: ['Beklenenin tersi bir sonuç anlatılmıştır.', 'Bir amaç belirtilmiştir.', 'Bir koşula bağlı yargı vardır.', 'İki durum karşılaştırılmıştır.'], dogru: 0, cozum: 'Çok çalışan birinin başarılı olması beklenir; "rağmen" sözcüğü beklenmeyen sonucu bildirir: <b>beklenenin tersi</b>.' },
      { seviye: 3, soru: '"Bu yazar, okurunu düşündürmeden eğlendirmeyi bilmez." cümlesinde anlatılmak istenen aşağıdakilerden hangisidir?', secenekler: ['Yazarın eserleri yalnızca eğlencelidir.', 'Yazar okurunu eğlendirmeyi bilmez.', 'Yazarın eserleri hem eğlendirir hem düşündürür.', 'Yazar düşündürmeyi gereksiz bulur.'], dogru: 2, cozum: '"Düşündürmeden eğlendirmeyi bilmez" yani eğlendirirken mutlaka düşündürür. Eserleri <b>hem eğlendirir hem düşündürür</b>.' }
    ]
  });

  /* ---------- 3. PARAGRAFTA ANLAM ---------- */
  konular.push({
    id: 'paragraf', ad: 'Paragrafta Anlam', ikon: '📄', ozet: 'Konu, ana düşünce, başlık, akış, yapı',
    anlatim: `
<div class="blok"><h3>Paragrafın yapısı</h3>
<figure>${akis([['Giriş', 'konuya başlar', 'fi'], ['Gelişme', 'açıklar, örnekler', 'fw'], ['Sonuç', 'toparlar', 'fg']])}<figcaption>Ana düşünce çoğunlukla <b>giriş</b> ya da <b>sonuç</b> cümlesindedir.</figcaption></figure>
<div class="tb-wrap"><table class="tb"><tr><th>Soru tipi</th><th>Kendine sor</th></tr>
<tr><td><b>Konu</b></td><td>Paragraf <b>neden</b> bahsediyor?</td></tr>
<tr><td><b>Ana düşünce</b></td><td>Yazar okura <b>ne demek istiyor</b>, hangi mesajı veriyor?</td></tr>
<tr><td><b>Yardımcı düşünce</b></td><td>Ana düşünceyi destekleyen diğer bilgiler nelerdir?</td></tr>
<tr><td><b>Başlık</b></td><td>Paragrafın tamamını kapsayan kısa ifade hangisi?</td></tr></table></div></div>

<div class="blok"><h3>Paragrafın akışı</h3>
<ul><li><b>Akışı bozan cümle:</b> Konudan sapan, diğer cümlelerle bağlantısı olmayan cümledir.</li>
<li><b>İkiye bölme:</b> Konunun ya da bakış açısının değiştiği cümleden bölünür. "Günümüzde ise…", "Ancak…" gibi geçişlere dikkat!</li>
<li><b>Giriş cümlesi</b> "Bu, o, ayrıca, çünkü" gibi bağlayıcılarla başlamaz.</li></ul></div>

<div class="blok"><h3>Düşünceyi geliştirme yolları</h3>
<div class="tb-wrap"><table class="tb"><tr><th>Yol</th><th>İpucu</th></tr>
<tr><td>Tanımlama</td><td>"… nedir?" sorusunun cevabı; "-dır" ile biten açıklama</td></tr>
<tr><td>Örnekleme</td><td>"örneğin, mesela" ile somut örnek</td></tr>
<tr><td>Karşılaştırma</td><td>"daha, en, göre, -den farklı"</td></tr>
<tr><td>Tanık gösterme</td><td>Ünlü birinin sözüne başvurma</td></tr>
<tr><td>Sayısal verilerden yararlanma</td><td>Yüzdeler, istatistikler, rakamlar</td></tr>
<tr><td>Benzetme</td><td>"gibi, kadar" ile iki şeyi benzetme</td></tr></table></div>
<div class="ipucu">✅ LGS taktiği: Önce soru kökünü oku, sonra paragrafı oku. Ne aradığını bilerek okuyunca hem hızlanırsın hem yanılmazsın.</div></div>`,
    sorular: [
      { seviye: 1, soru: P('Kitap okumak, insanın hayal dünyasını genişletir. Okuduğumuz her hikâye bizi farklı yerlere götürür, farklı insanlarla tanıştırır. Bu sayede başkalarının duygularını daha iyi anlarız. Kısacası kitaplar hem zihnimizi hem de gönlümüzü zenginleştirir.') + 'Bu paragrafın ana düşüncesi aşağıdakilerden hangisidir?', secenekler: ['Hikâyeler bizi farklı yerlere götürür.', 'Kitap okumak zihnimizi ve gönlümüzü zenginleştirir.', 'Başkalarının duygularını anlamak zordur.', 'Her gün kitap okumak gerekir.'], dogru: 1, cozum: '"Kısacası" ile başlayan sonuç cümlesi paragrafın ana düşüncesini verir: <b>Kitaplar zihnimizi ve gönlümüzü zenginleştirir.</b> "Hikâyeler bizi farklı yerlere götürür" ise yardımcı düşüncedir.' },
      { seviye: 1, soru: P('Arılar, çiçekten çiçeğe konarak polen taşır. Bu sayede pek çok bitkinin tozlaşmasına yardımcı olurlar. Yediğimiz meyve ve sebzelerin önemli bir kısmı arıların bu çalışması sayesinde oluşur. Arıların azalması, tarımı doğrudan etkileyecek büyük bir sorundur.') + 'Bu paragrafın konusu aşağıdakilerden hangisidir?', secenekler: ['Arıların bal yapması', 'Arıların yaşam alanları', 'Arıların tarım için önemi', 'Meyve ve sebzelerin faydaları'], dogru: 2, cozum: 'Paragrafın tamamı arıların tozlaşma yoluyla tarıma katkısını anlatır: <b>Arıların tarım için önemi.</b>' },
      { seviye: 2, soru: P('Dişlerimizi fırçalarken musluğu açık bırakırsak dakikada litrelerce su boşa akar. Duş süremizi birkaç dakika kısaltmak bile ay sonunda büyük bir tasarruf sağlar. Bulaşık ve çamaşır makinelerini tam dolmadan çalıştırmamak da suyu korumanın kolay yollarındandır. Küçük alışkanlıklar, gelecek nesillere temiz su bırakmamızı sağlar.') + 'Bu paragrafa en uygun başlık aşağıdakilerden hangisidir?', secenekler: ['Suyun Kimyasal Yapısı', 'Günlük Hayatta Su Tasarrufu', 'Temizliğin Önemi', 'Makinelerin Doğru Kullanımı'], dogru: 1, cozum: 'Paragrafta verilen tüm örnekler günlük hayatta su tasarrufu yapma yollarıdır. Başlık paragrafın tamamını kapsamalıdır: <b>Günlük Hayatta Su Tasarrufu</b>.' },
      { seviye: 2, soru: P('Deniz kaplumbağaları yumurtalarını kumsallara bırakır. Yavrular yumurtadan çıktıktan sonra ay ışığının yansıdığı denize doğru ilerler. Ancak kumsallardaki yapay ışıklar yavruların yönünü şaşırmasına neden olur. Bu yüzden yumurtlama döneminde bazı kumsallar geceleri ziyarete kapatılır.') + 'Bu paragrafta aşağıdakilerin hangisine <b>değinilmemiştir</b>?', secenekler: ['Yumurtaların nereye bırakıldığına', 'Yavruların denizi nasıl bulduğuna', 'Yapay ışıkların yavrulara etkisine', 'Kaplumbağaların nasıl beslendiğine'], dogru: 3, cozum: 'Paragrafta beslenmeyle ilgili hiçbir bilgi yoktur. Diğer seçeneklerin hepsi paragrafta geçmektedir.' },
      { seviye: 3, soru: P('(I) Düzenli uyku, öğrencilerin başarısını doğrudan etkiler. (II) Uykusunu alan bir öğrenci derste daha dikkatli olur. (III) Kahvaltı ise günün en önemli öğünü olarak bilinir. (IV) Ayrıca öğrendiği bilgileri daha kolay hatırlar.') + 'Bu paragrafta numaralanmış cümlelerden hangisi düşüncenin akışını bozmaktadır?', secenekler: ['I', 'II', 'III', 'IV'], dogru: 2, cozum: 'Paragraf uykunun başarıya etkisini anlatıyor. III. cümle kahvaltıdan bahsederek konunun dışına çıkıyor: <b>III</b>.' },
      { seviye: 3, soru: P('(I) Eskiden insanlar haberleşmek için mektup yazardı. (II) Bir mektubun ulaşması günler, hatta haftalar sürerdi. (III) Bu yüzden mektuplar sabırla beklenir, tekrar tekrar okunurdu. (IV) Günümüzde ise teknoloji sayesinde mesajlar saniyeler içinde ulaşıyor. (V) Ancak bu hız, yazdıklarımızı özenle seçmememize yol açabiliyor.') + 'Bu paragraf iki paragrafa ayrılmak istense ikinci paragraf hangi cümleyle başlar?', secenekler: ['II', 'III', 'IV', 'V'], dogru: 2, cozum: 'I-III arası geçmişteki mektuplaşmayı, IV-V ise günümüzdeki haberleşmeyi anlatır. "Günümüzde ise" ifadesi konunun değiştiğini gösterir: <b>IV</b>.' },
      { seviye: 3, soru: P('Yapılan bir araştırmaya göre her gün yarım saat kitap okuyan öğrencilerin kelime hazinesi, hiç okumayanlara göre yaklaşık iki kat daha geniştir. Bu durum, okuma alışkanlığının dil gelişimine katkısını açıkça göstermektedir.') + 'Bu paragrafta düşünceyi geliştirmek için aşağıdaki yollardan hangileri kullanılmıştır?', secenekler: ['Tanımlama – örnekleme', 'Tanık gösterme – benzetme', 'Sayısal verilerden yararlanma – karşılaştırma', 'Örnekleme – tanık gösterme'], dogru: 2, cozum: '"Yarım saat, iki kat" gibi sayısal veriler kullanılmış, okuyanlar ile okumayanlar "göre" sözüyle karşılaştırılmıştır.' },
      { seviye: 2, soru: P('Bazı insanlar başarının yalnızca yetenekle geldiğine inanır. Oysa tarihte iz bırakan pek çok kişi, yeteneğinden çok sabrı ve çalışkanlığıyla öne çıkmıştır. Yetenek bir tohumsa emek, o tohumu büyüten sudur.') + 'Bu paragrafta asıl anlatılmak istenen aşağıdakilerden hangisidir?', secenekler: ['Yetenekli insanlar her zaman başarılı olur.', 'Başarı için yetenek kadar emek de gereklidir.', 'Tarihte iz bırakan kişiler çok yeteneklidir.', 'Sabırlı olmak her işte gerekli değildir.'], dogru: 1, cozum: '"Oysa" ile başlayan cümle yazarın asıl görüşünü verir; son cümledeki benzetme de bunu destekler: <b>Başarı için emek de gereklidir.</b>' }
    ]
  });

  /* ---------- 4. FİİLLER: KİP VE KİŞİ ---------- */
  konular.push({
    id: 'fiiller', ad: 'Fiiller: Kip ve Kişi', ikon: '🏃', ozet: 'Haber ve dilek kipleri, kişi ekleri, anlam kayması',
    anlatim: `
<div class="blok"><h3>Fiil nedir?</h3>
<p>İş, oluş, hareket ya da durum bildiren sözcüklerdir. Sonlarına <b>-mek / -mak</b> eki getirilebilir: koş-mak, oku-mak, sarar-mak.</p>
<p>Çekimli bir fiil <b>kök + kip eki + kişi eki</b> şeklinde oluşur: gel-<span class="hl">ecek</span>-<span class="hl">sin</span></p></div>

<div class="blok"><h3>Kipler</h3>
<figure>${agac('KİPLER', [['Haber (Bildirme) Kipleri', ['Görülen geçmiş: -dı (geldi)', 'Öğrenilen geçmiş: -mış (gelmiş)', 'Şimdiki zaman: -yor (geliyor)', 'Gelecek zaman: -acak (gelecek)', 'Geniş zaman: -r, -ar, -ir (gelir)']], ['Dilek (Tasarlama) Kipleri', ['İstek: -a / -e (gele)', 'Gereklilik: -malı (gelmeli)', 'Dilek-şart: -sa / -se (gelse)', 'Emir: ek yok (gel, gelsin)']]])}</figure>
<div class="ipucu">✅ <b>Haber kipleri</b> zaman bildirir. <b>Dilek kipleri</b> zaman bildirmez; istek, gereklilik, şart ya da emir bildirir.</div></div>

<div class="blok"><h3>Kişi ekleri</h3>
<div class="tb-wrap"><table class="tb"><tr><th>Kişi</th><th>Tekil</th><th>Çoğul</th></tr>
<tr><td>1. kişi</td><td>(ben) geldi<b>m</b></td><td>(biz) geldi<b>k</b></td></tr>
<tr><td>2. kişi</td><td>(sen) geldi<b>n</b></td><td>(siz) geldi<b>niz</b></td></tr>
<tr><td>3. kişi</td><td>(o) geldi</td><td>(onlar) geldi<b>ler</b></td></tr></table></div></div>

<div class="blok"><h3>Kipte anlam (zaman) kayması</h3>
<p>Bir kip, kendi zamanı yerine başka bir zamanın anlamını karşılayabilir:</p>
<ul><li>"Yarın size <b>geliyoruz</b>." → şimdiki zaman eki, <b>gelecek zaman</b> anlamında</li>
<li>"1453'te Fatih İstanbul'u <b>fetheder</b>." → geniş zaman eki, <b>geçmiş zaman</b> anlamında</li></ul>
<div class="dikkat">⚠️ Anlam kaymasını bulmak için cümledeki zaman bildiren sözcüğe bak: "yarın, dün, şimdi, her gün…"</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Aşağıdaki cümlelerin hangisinde fiil <b>gelecek zaman</b> kipiyle çekimlenmiştir?', secenekler: ['Dün sinemaya gittik.', 'Her hafta sinemaya gideriz.', 'Hafta sonu sinemaya gideceğiz.', 'Şu an sinemaya gidiyoruz.'], dogru: 2, cozum: '"gid-<b>eceğ</b>-iz" fiilinde gelecek zaman eki (-acak/-ecek) vardır.' },
      { seviye: 1, soru: '"Okula yürüyerek <b>gelmiş</b>." cümlesindeki fiil hangi kiple çekimlenmiştir?', secenekler: ['Görülen geçmiş zaman', 'Öğrenilen geçmiş zaman', 'Şimdiki zaman', 'Geniş zaman'], dogru: 1, cozum: '"-mış" eki, olayın başkasından duyulduğunu bildiren <b>öğrenilen geçmiş zaman</b> ekidir.' },
      { seviye: 2, soru: 'Aşağıdaki cümlelerin hangisinde <b>dilek kiplerinden</b> biri kullanılmıştır?', secenekler: ['Her sabah erken kalkarım.', 'Ödevini dün akşam bitirdi.', 'Bu kitabı mutlaka okumalısın.', 'Kardeşim resim yapıyor.'], dogru: 2, cozum: '"oku-<b>malı</b>-sın" fiilinde gereklilik kipi vardır; gereklilik bir dilek kipidir. Diğerleri haber kipidir.' },
      { seviye: 2, soru: '"Yarın erkenden yola <b>çıkacaklar</b>." cümlesindeki fiil hangi kişiyle çekimlenmiştir?', secenekler: ['1. çoğul kişi', '2. çoğul kişi', '3. tekil kişi', '3. çoğul kişi'], dogru: 3, cozum: '"çıkacak-<b>lar</b>" → onlar → <b>3. çoğul kişi</b>' },
      { seviye: 2, soru: 'Aşağıdaki cümlelerin hangisinde <b>emir kipi</b> kullanılmıştır?', secenekler: ['Keşke bize de gelseydin.', 'Pencereyi kapat, içerisi soğudu.', 'Haydi parka gidelim.', 'Okula koşarak gitti.'], dogru: 1, cozum: '"Kapat" fiili emir kipinin 2. tekil kişisidir. "Gidelim" ise istek kipidir.' },
      { seviye: 3, soru: 'Aşağıdaki cümlelerin hangisinde fiil, kendi zaman anlamı dışında <b>başka bir zaman</b> anlamında kullanılmıştır?', secenekler: ['Yarın akşam size geliyoruz.', 'Şu anda ödevimi yapıyorum.', 'Geçen yaz denize gittik.', 'Kardeşim yarın okula başlayacak.'], dogru: 0, cozum: '"Geliyoruz" şimdiki zaman ekiyle çekimlenmiştir ancak "yarın akşam" sözü nedeniyle <b>gelecek zaman</b> anlamı taşır. Bu bir anlam (zaman) kaymasıdır.' },
      { seviye: 3, soru: P('Sabah erkenden kalktım. Okula gittim. Akşam ödevlerimi bitirmeliyim. Hafta sonu yeni bir kitap okuyacağım.') + 'Bu metinde <b>haber kipiyle</b> çekimlenmiş kaç fiil vardır?', secenekler: ['2', '3', '4', '1'], dogru: 1, cozum: 'kalktım (görülen geçmiş), gittim (görülen geçmiş), okuyacağım (gelecek zaman) → <b>3</b>. "Bitirmeliyim" gereklilik kipidir, dilek kiplerindendir.' },
      { seviye: 3, soru: 'Aşağıdaki cümlelerin hangisinde <b>dilek-şart kipi</b> kullanılmıştır?', secenekler: ['Biraz daha çalışsan sınavı kazanırsın.', 'Bu akşam erken yatmalıyım.', 'Annem bize kek yapmış.', 'Herkes yerine otursun.'], dogru: 0, cozum: '"çalış-<b>sa</b>-n" fiilinde dilek-şart kipi vardır. B gereklilik, C öğrenilen geçmiş zaman, D emir kipidir.' }
    ]
  });

  /* ---------- 5. EK FİİL VE FİİLDE YAPI ---------- */
  konular.push({
    id: 'ek-fiil', ad: 'Ek Fiil ve Fiilde Yapı', ikon: '🧩', ozet: 'Ek fiil, birleşik zamanlı fiiller, basit-türemiş-birleşik',
    anlatim: `
<div class="blok"><h3>Ek fiil (ek eylem)</h3>
<p>İsim soylu sözcüklere gelerek onları <b>yüklem</b> yapan eklerdir: -dı, -mış, -sa, -dır.</p>
<figure>${akis([['güzel', 'isim (sıfat)', 'fi'], ['+ -di', 'ek fiil', 'fw'], ['güzeldi', 'yüklem', 'fg']])}<figcaption>"Bahçedeki çiçekler çok <b>güzeldi</b>."</figcaption></figure>
<div class="tb-wrap"><table class="tb"><tr><th>Ek</th><th>İşlevi</th><th>Örnek</th></tr>
<tr><td>-dı</td><td>Hikâye (görülen geçmiş)</td><td>Hava soğuk<b>tu</b>.</td></tr>
<tr><td>-mış</td><td>Rivayet (duyulan geçmiş)</td><td>Kitap senin<b>miş</b>.</td></tr>
<tr><td>-sa</td><td>Şart</td><td>Hasta<b>ysa</b> gelmesin.</td></tr>
<tr><td>-dır</td><td>Genellik, kesinlik</td><td>Dünya yuvarlak<b>tır</b>.</td></tr></table></div></div>

<div class="blok"><h3>Birleşik zamanlı fiiller</h3>
<p>Basit zamanlı bir fiile ek fiil getirilince <b>birleşik zamanlı fiil</b> oluşur.</p>
<figure>${akis([['gel-iyor', 'şimdiki zaman', 'fi'], ['+ -du', 'hikâye', 'fw'], ['geliyordu', 'şimdiki zamanın hikâyesi', 'fg']])}</figure>
<ul><li>gel-ir-di → geniş zamanın hikâyesi</li><li>gel-miş-ti → öğrenilen geçmiş zamanın hikâyesi</li><li>gel-ecek-miş → gelecek zamanın rivayeti</li><li>gel-iyor-sa → şimdiki zamanın şartı</li></ul></div>

<div class="blok"><h3>Yapı bakımından fiiller</h3>
<div class="tb-wrap"><table class="tb"><tr><th>Yapı</th><th>Açıklama</th><th>Örnek</th></tr>
<tr><td><b>Basit</b></td><td>Yapım eki almamış fiil kökü</td><td>gel-, oku-, aç-</td></tr>
<tr><td><b>Türemiş</b></td><td>Yapım eki almış fiil</td><td>su-la-, baş-la-, yaşa-r-</td></tr>
<tr><td><b>Birleşik</b></td><td>Birden çok sözcükten oluşan fiil</td><td>yardım et-, hasta ol-, gidiver-, kayıp git-</td></tr></table></div>
<div class="ipucu">✅ Kökü isim olan fiiller türemiştir: "su + la → sula-", "temiz + le → temizle-", "top + la → topla-".</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Aşağıdaki cümlelerin hangisinde ek fiil, isim soylu bir sözcüğü yüklem yapmıştır?', secenekler: ['Kardeşim parka gitti.', 'Bahçedeki çiçekler çok güzeldi.', 'Yarın erkenden kalkacağım.', 'Babam gazete okuyor.'], dogru: 1, cozum: '"Güzel" bir isim soylu sözcüktür (sıfat). "-di" ek fiili onu yüklem yapmıştır: <b>güzel-di</b>.' },
      { seviye: 2, soru: '"Çocukken her yaz köye <b>giderdik</b>." cümlesindeki fiil hangi birleşik zamanla çekimlenmiştir?', secenekler: ['Geniş zamanın hikâyesi', 'Görülen geçmiş zaman', 'Şimdiki zamanın rivayeti', 'Gelecek zamanın şartı'], dogru: 0, cozum: 'gid-<b>er</b>-<b>di</b>-k → geniş zaman eki (-er) + hikâye (-di) → <b>geniş zamanın hikâyesi</b>' },
      { seviye: 2, soru: 'Aşağıdaki cümlelerin hangisinde <b>türemiş</b> yapılı bir fiil vardır?', secenekler: ['Kardeşim okula gitti.', 'Kapıyı yavaşça açtı.', 'Annem çiçekleri suladı.', 'Akşam erkenden uyudu.'], dogru: 2, cozum: '"Sula-" fiili "su" ismine "-la" yapım eki getirilerek türetilmiştir. Diğerleri basit yapılıdır.' },
      { seviye: 2, soru: 'Aşağıdaki cümlelerin hangisinde <b>birleşik</b> yapılı bir fiil vardır?', secenekler: ['Arkadaşına derslerinde yardım etti.', 'Odasını güzelce topladı.', 'Sabah parkta koştu.', 'Kitabını bir günde okudu.'], dogru: 0, cozum: '"Yardım etmek" bir isim ile "etmek" yardımcı fiilinin birleşmesiyle oluşmuş <b>birleşik</b> fiildir.' },
      { seviye: 3, soru: '"Ödevini çoktan <b>bitirmişti</b>, yine de konuyu tekrar etti." cümlesinde koyu yazılan fiil hangi zamanla çekimlenmiştir?', secenekler: ['Öğrenilen geçmiş zaman', 'Görülen geçmiş zamanın rivayeti', 'Öğrenilen geçmiş zamanın hikâyesi', 'Geniş zamanın hikâyesi'], dogru: 2, cozum: 'bitir-<b>miş</b>-<b>ti</b> → öğrenilen geçmiş zaman (-miş) + hikâye (-ti) → <b>öğrenilen geçmiş zamanın hikâyesi</b>' },
      { seviye: 3, soru: 'Aşağıdaki cümlelerin hangisinde <b>ek fiil kullanılmamıştır</b>?', secenekler: ['Sınıfın en çalışkan öğrencisiydi.', 'Hava dün çok sıcaktı.', 'Bu kitap seninmiş.', 'Kardeşim bisiklete bindi.'], dogru: 3, cozum: '"Bindi" fiili, fiil köküne gelen görülen geçmiş zaman ekiyle çekimlenmiştir; ek fiil yoktur. Diğerlerinde isimler ek fiille yüklem olmuştur (öğrencisi-ydi, sıcak-tı, senin-miş).' },
      { seviye: 1, soru: '"Bu ağaç çok <b>yaşlıymış</b>." cümlesindeki ek fiil hangi anlamı katmıştır?', secenekler: ['Duyulan (rivayet) geçmiş', 'Şart', 'Kesinlik', 'Gelecek'], dogru: 0, cozum: '"-mış" ek fiili, bilginin başkasından duyulduğunu ya da sonradan fark edildiğini bildirir: <b>rivayet</b>.' }
    ]
  });

  /* ---------- 6. ZARFLAR ---------- */
  konular.push({
    id: 'zarflar', ad: 'Zarflar', ikon: '🎯', ozet: 'Durum, zaman, yer-yön, miktar, soru zarfları',
    anlatim: `
<div class="blok"><h3>Zarf (belirteç) nedir?</h3>
<p>Fiillerin, fiilimsilerin, sıfatların ya da başka zarfların anlamını <b>zaman, durum, yer-yön, miktar</b> yönünden belirten sözcüklerdir.</p>
<figure><svg class="fig" viewBox="0 0 440 110"><text x="20" y="60">Çocuklar bahçede</text><rect x="160" y="38" width="80" height="32" rx="8" class="fw bi"/><text x="200" y="60" text-anchor="middle">neşeyle</text><text x="250" y="60">oynuyordu.</text>
<path class="la" d="M200 38 Q260 0 300 38" style="stroke-width:2"/><polygon class="fa" points="302,42 293,36 301,31"/>
<text x="200" y="96" text-anchor="middle" class="m">Nasıl oynuyordu? → neşeyle (durum zarfı)</text></svg></figure></div>

<div class="blok"><h3>Zarf türleri ve soruları</h3>
<div class="tb-wrap"><table class="tb"><tr><th>Tür</th><th>Soru</th><th>Örnek</th></tr>
<tr><td><b>Durum</b></td><td>Nasıl?</td><td><b>Hızlı</b> koştu. <b>Ağır ağır</b> yürüdü.</td></tr>
<tr><td><b>Zaman</b></td><td>Ne zaman?</td><td><b>Akşam</b> geldi. <b>Yarın</b> gideceğiz.</td></tr>
<tr><td><b>Yer-yön</b></td><td>Nereye?</td><td><b>İçeri</b> gir. <b>Yukarı</b> çık.</td></tr>
<tr><td><b>Miktar (azlık-çokluk)</b></td><td>Ne kadar?</td><td><b>Çok</b> güzel. <b>En</b> iyi. <b>Biraz</b> dinlen.</td></tr>
<tr><td><b>Soru</b></td><td>—</td><td><b>Nasıl</b> geldin? <b>Niçin</b> gülüyorsun?</td></tr></table></div>
<div class="dikkat">⚠️ Yer-yön zarfları (içeri, dışarı, yukarı, aşağı, ileri, geri) <b>ek almadan</b> kullanılır. Ek alırsa isim olur: "<b>İçeri</b> gel." (zarf) – "<b>İçeriye</b> gel." (isim)</div>
<div class="ipucu">✅ Soru zarfı ile soru sıfatını karıştırma: "<b>Nasıl</b> geldin?" (fiile sorulur → zarf), "<b>Hangi</b> kitap?" (isme sorulur → sıfat)</div></div>`,
    sorular: [
      { seviye: 1, soru: '"Çocuklar bahçede neşeyle oynuyordu." cümlesindeki <b>durum zarfı</b> hangisidir?', secenekler: ['Çocuklar', 'bahçede', 'neşeyle', 'oynuyordu'], dogru: 2, cozum: '"Nasıl oynuyordu?" sorusunun cevabı <b>neşeyle</b>dir. Fiili durum yönünden belirttiği için durum zarfıdır.' },
      { seviye: 1, soru: 'Aşağıdaki cümlelerin hangisinde <b>zaman zarfı</b> kullanılmıştır?', secenekler: ['Akşam erkenden yattı.', 'Kitabı masaya koydu.', 'Kapıyı sessizce kapattı.', 'Yeni bir çanta aldı.'], dogru: 0, cozum: '"Ne zaman yattı?" → <b>akşam</b> (ve "erkenden"). Fiili zaman yönünden belirtir.' },
      { seviye: 2, soru: 'Aşağıdaki cümlelerin hangisinde tırnak içindeki sözcük <b>yer-yön zarfıdır</b>?', secenekler: ['"İçeriye" bir koltuk daha koydular.', '"İçerisi" çok sıcaktı.', 'Üşüdüysen "içeri" gel.', 'Evin "içi" çok düzenliydi.'], dogru: 2, cozum: '"İçeri" sözcüğü ek almadan fiili (gel) yön bakımından belirtmiştir: <b>yer-yön zarfı</b>. Diğerleri ek aldığı için isimdir.' },
      { seviye: 2, soru: '"Bu soru <b>çok</b> zordu." cümlesindeki "çok" sözcüğüyle ilgili hangisi doğrudur?', secenekler: ['Sıfatın anlamını derecelendiren miktar zarfıdır.', 'Fiili niteleyen durum zarfıdır.', 'İsmi niteleyen sıfattır.', 'Zaman zarfıdır.'], dogru: 0, cozum: '"Ne kadar zor?" → çok. "Zor" bir sıfattır; "çok" onun derecesini belirten <b>miktar zarfıdır</b>.' },
      { seviye: 2, soru: 'Aşağıdaki cümlelerin hangisinde <b>zarf yoktur</b>?', secenekler: ['Ağır ağır yürüyordu.', 'Erken geldi.', 'Masanın üstünde kırmızı bir kalem var.', 'Yarın sinemaya gideceğiz.'], dogru: 2, cozum: '"Masanın üstünde kırmızı bir kalem var." cümlesinde "kırmızı" ve "bir" sıfattır, "masanın üstünde" ise isim tamlamasıdır; zarf yoktur. Diğerlerinde ağır ağır (durum), erken ve yarın (zaman) zarftır.' },
      { seviye: 3, soru: 'Aşağıdaki cümlelerin hangisinde <b>soru zarfı</b> kullanılmıştır?', secenekler: ['Hangi kitabı okudun?', 'Kim geldi?', 'Okula nasıl gidiyorsun?', 'Bu ne?'], dogru: 2, cozum: '"Nasıl" sözcüğü fiile (gidiyorsun) yöneltilmiş bir sorudur: <b>soru zarfı</b>. "Hangi" soru sıfatı, "kim" ve "ne" soru zamiridir.' },
      { seviye: 3, soru: 'Aşağıdaki cümlelerin hangisinde bir zarf, <b>başka bir zarfı</b> nitelemiştir?', secenekler: ['Ali çalışkan bir öğrencidir.', 'Güzel bir gün geçirdik.', 'Çok hızlı koştu.', 'Yarın geleceğim.'], dogru: 2, cozum: '"Hızlı" sözcüğü "koştu" fiilini nitelediği için durum zarfıdır. "Çok" ise "hızlı" zarfını derecelendirir: zarf zarfı nitelemiştir.' }
    ]
  });

  /* ---------- 7. YAZIM VE NOKTALAMA ---------- */
  konular.push({
    id: 'yazim', ad: 'Yazım ve Noktalama', ikon: '✍️', ozet: 'de/da, ki, mi; büyük harf; kesme; noktalama',
    anlatim: `
<div class="blok"><h3>Sık karıştırılan yazımlar</h3>
<div class="tb-wrap"><table class="tb"><tr><th>Kural</th><th>Doğru</th><th>Yanlış</th></tr>
<tr><td>Bağlaç olan <b>de/da</b> ayrı yazılır</td><td>Sen <b>de</b> gel.</td><td>Sende gel.</td></tr>
<tr><td>Bulunma eki <b>-de/-da</b> bitişik yazılır</td><td>Kitap <b>sende</b> mi?</td><td>Kitap sen de mi?</td></tr>
<tr><td>Bağlaç olan <b>ki</b> ayrı yazılır</td><td>Duydum <b>ki</b> gitmiş.</td><td>Duydumki gitmiş.</td></tr>
<tr><td>Soru eki <b>mi</b> ayrı yazılır</td><td>Geldin <b>mi</b>?</td><td>Geldinmi?</td></tr>
<tr><td><b>her, hiç</b> ayrı yazılır</td><td>her şey, hiçbir şey</td><td>herşey, hiçbirşey</td></tr>
<tr><td>Kalıplaşmış olanlar bitişik</td><td>birkaç, birçok, hiçbir, herhangi</td><td>bir kaç, bir çok</td></tr></table></div>
<div class="ipucu">✅ <b>de/da</b> testi: Cümleden çıkar. Anlam bozulmuyorsa bağlaçtır, ayrı yazılır. "Ben de geldim" → "Ben geldim" (anlam bozulmadı → ayrı).<br>✅ <b>ki</b> istisnaları bitişik yazılır: belki, sanki, çünkü, oysaki, mademki, halbuki.</div></div>

<div class="blok"><h3>Büyük harflerin kullanımı</h3>
<ul><li>Cümle başları, özel isimler (kişi, yer, kurum, dil, millet adları) büyük harfle başlar.</li>
<li>Gün ve ay adları <b>belirli bir tarih</b> bildirmiyorsa küçük yazılır: "Okul pazartesi açılıyor." / "29 Ekim 1923 Pazartesi"</li>
<li>Özel isimlere gelen ekler <b>kesme işaretiyle</b> ayrılır: Ankara'ya, Ali'nin</li></ul>
<div class="dikkat">⚠️ Kurum, kuruluş ve dil adlarına gelen ekler kesmeyle ayrılmaz: Türkçeyi, Türk Dil Kurumuna, Millî Eğitim Bakanlığından</div></div>

<div class="blok"><h3>Noktalama işaretleri</h3>
<div class="tb-wrap"><table class="tb"><tr><th>İşaret</th><th>Başlıca kullanım</th></tr>
<tr><td><b>.</b> Nokta</td><td>Tamamlanmış cümlenin sonu; sıra sayıları (3. sınıf)</td></tr>
<tr><td><b>,</b> Virgül</td><td>Eş görevli sözcükleri ve sıralı cümleleri ayırma; hitaplardan sonra</td></tr>
<tr><td><b>:</b> İki nokta</td><td>Açıklama ve örnek verilecek cümlenin sonunda</td></tr>
<tr><td><b>;</b> Noktalı virgül</td><td>Ögeleri arasında virgül bulunan sıralı cümleleri ayırma</td></tr>
<tr><td><b>?</b> Soru işareti</td><td>Soru bildiren cümle sonu</td></tr>
<tr><td><b>!</b> Ünlem</td><td>Sevinç, korku, şaşkınlık, seslenme</td></tr>
<tr><td><b>…</b> Üç nokta</td><td>Tamamlanmamış cümle</td></tr></table></div></div>`,
    sorular: [
      { seviye: 1, soru: 'Aşağıdaki cümlelerin hangisinde <b>yazım yanlışı</b> vardır?', secenekler: ['Bu kitabı ben de okudum.', 'Sende mi bu filmi izledin?', 'Yarın Ankara\'ya gideceğiz.', 'Ödevini bitirdin mi?'], dogru: 1, cozum: '"Sende" sözcüğündeki "de" bağlaçtır (cümleden çıkarınca anlam bozulmaz: "Sen mi bu filmi izledin?"). Ayrı yazılmalıdır: <b>Sen de mi</b>.' },
      { seviye: 1, soru: 'Aşağıdakilerin hangisinde kesme işaretinin kullanımı <b>yanlıştır</b>?', secenekler: ['Ali\'nin kitabı', 'İstanbul\'a gittik', 'Türkçe\'yi çok seviyorum', 'Atatürk\'ün sözleri'], dogru: 2, cozum: 'Dil adlarına gelen ekler kesme işaretiyle ayrılmaz: <b>Türkçeyi</b> şeklinde yazılmalıdır.' },
      { seviye: 1, soru: 'Aşağıdaki cümlelerden hangisinin sonuna <b>soru işareti</b> konmalıdır?', secenekler: ['Ne güzel bir gün', 'Bu kitabı kim yazdı', 'Ders bitince eve git', 'Keşke erken gelseydin'], dogru: 1, cozum: '"Kim" sözcüğü ile soru sorulmaktadır: <b>Bu kitabı kim yazdı?</b>' },
      { seviye: 2, soru: 'Aşağıdaki cümlelerin hangisinde "ki" sözcüğü <b>doğru</b> yazılmıştır?', secenekler: ['Duydum ki yarın okul tatilmiş.', 'Öyleki herkes çok şaşırdı.', 'Bilki seni her zaman destekleyeceğim.', 'Demekki o gün yanılmışım.'], dogru: 0, cozum: 'Bağlaç olan "ki" ayrı yazılır: <b>Duydum ki</b>. Diğerleri "öyle ki, bil ki, demek ki" şeklinde ayrı yazılmalıydı.' },
      { seviye: 2, soru: '"Annem pazardan elma, armut, portakal aldı." cümlesinde virgül hangi amaçla kullanılmıştır?', secenekler: ['Hitaptan sonra kullanılmıştır.', 'Sıralı cümleleri ayırmıştır.', 'Eş görevli sözcükleri ayırmıştır.', 'Ara sözü ayırmıştır.'], dogru: 2, cozum: 'Elma, armut ve portakal cümlede aynı görevdedir (nesne). Virgül <b>eş görevli sözcükleri</b> ayırmıştır.' },
      { seviye: 3, soru: 'Aşağıdakilerin hangisinde <b>yazım yanlışı yoktur</b>?', secenekler: ['Haftasonu ailemle dinlendik.', 'Herşey yolunda gidiyor.', 'Bu konuyu birkaç kez anlattım.', 'Hiçbirşey söylemeden çıktı.'], dogru: 2, cozum: '"Birkaç" bitişik yazılır, doğrudur. Diğerleri: <b>hafta sonu, her şey, hiçbir şey</b> şeklinde yazılmalıydı.' },
      { seviye: 3, soru: 'Aşağıdaki cümlelerin hangisinde <b>büyük harflerin kullanımıyla</b> ilgili bir yanlışlık yapılmıştır?', secenekler: ['Van Gölü\'nün kıyısında yürüdük.', 'Okullar Pazartesi açılacak.', 'Atatürk, 19 Mayıs 1919\'da Samsun\'a çıktı.', 'Türk Dil Kurumu yeni bir sözlük yayımladı.'], dogru: 1, cozum: 'Gün adları belirli bir tarih bildirmiyorsa küçük harfle yazılır: <b>pazartesi</b>.' }
    ]
  });

  /* ---------- 8. SÖZ SANATLARI ---------- */
  konular.push({
    id: 'soz-sanatlari', ad: 'Söz Sanatları', ikon: '🎨', ozet: 'Benzetme, kişileştirme, konuşturma, abartma',
    anlatim: `
<div class="blok"><h3>Benzetme (teşbih)</h3>
<p>Aralarında ilgi bulunan iki varlıktan zayıf olanı, bir özellik bakımından güçlü olana benzetme sanatıdır.</p>
<figure>${benzetmeSema()}<figcaption>"Annemin sesi bahar yağmuru kadar yumuşaktı."</figcaption></figure>
<ul><li><b>Benzeyen:</b> Benzetilen varlık (zayıf olan)</li><li><b>Benzetilen:</b> Kendisine benzetilen (güçlü olan)</li><li><b>Benzetme edatı:</b> gibi, kadar, sanki, adeta</li><li><b>Benzetme yönü:</b> Hangi özellik bakımından benzetildiği</li></ul></div>

<div class="blok"><h3>Kişileştirme (teşhis)</h3>
<p>İnsan dışındaki varlıklara insana ait özellikler verilmesidir.</p>
<p>"<b>Güneş</b> bize gülümsüyordu." · "<b>Ağaçlar</b> rüzgârla dans ediyordu."</p></div>

<div class="blok"><h3>Konuşturma (intak)</h3>
<p>İnsan dışındaki varlıkları konuşturma sanatıdır. Konuşturulan her varlık aynı zamanda <b>kişileştirilmiş</b> olur.</p>
<p>"Gel benim yanıma, dedi deniz, anlatayım sana dalgaları."</p></div>

<div class="blok"><h3>Abartma (mübalağa)</h3>
<p>Bir durumu olduğundan çok büyük ya da çok küçük gösterme sanatıdır.</p>
<p>"Öyle çok ağladı ki gözyaşları sel oldu." · "Sana <b>bin kere</b> söyledim."</p>
<div class="ipucu">✅ Bir cümlede birden fazla söz sanatı olabilir: "Dağlar kar gibi beyaz bir yorgan örtünmüş, uyuyor." → benzetme + kişileştirme</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Aşağıdaki cümlelerin hangisinde <b>benzetme</b> yapılmıştır?', secenekler: ['Ağaçlar rüzgârla dans ediyordu.', 'Kardeşimin yanakları elma gibi kırmızıydı.', 'Bir sıçradı, ta gökyüzüne değdi.', 'Sabah erkenden kalkıp yola çıktık.'], dogru: 1, cozum: 'Yanaklar kırmızılık bakımından "gibi" edatıyla elmaya benzetilmiştir: <b>benzetme</b>. A kişileştirme, C abartmadır.' },
      { seviye: 1, soru: 'Aşağıdaki cümlelerin hangisinde <b>kişileştirme</b> vardır?', secenekler: ['Güneş bize gülümsüyordu.', 'Su gibi berrak bir sesi vardı.', 'Bu çanta bir ton ağırlığında.', 'Her gün kitap okurum.'], dogru: 0, cozum: 'Gülümsemek insana ait bir özelliktir; güneşe verilmiştir: <b>kişileştirme</b>.' },
      { seviye: 2, soru: 'Aşağıdakilerin hangisinde <b>abartma</b> sanatı kullanılmıştır?', secenekler: ['Martılar sabah bana "Günaydın!" dedi.', 'Bulutlar pamuk gibiydi.', 'Öyle çok ağladı ki gözyaşları sel oldu.', 'Rüzgâr kapımı tıklattı.'], dogru: 2, cozum: 'Gözyaşlarının sel olması gerçekte mümkün değildir; durum olduğundan çok büyük gösterilmiştir: <b>abartma</b>.' },
      { seviye: 2, soru: '"Gel benim yanıma, dedi deniz, anlatayım sana dalgaları." dizesinde hangi söz sanatı kullanılmıştır?', secenekler: ['Abartma', 'Konuşturma', 'Benzetme', 'Hiçbir söz sanatı yoktur.'], dogru: 1, cozum: 'Deniz konuşturulmuştur: <b>konuşturma</b> (aynı zamanda kişileştirme).' },
      { seviye: 3, soru: '"Annemin sesi, bahar yağmuru kadar yumuşaktı." cümlesinde <b>benzetme yönü</b> hangisidir?', secenekler: ['Annemin sesi', 'bahar yağmuru', 'kadar', 'yumuşaklık'], dogru: 3, cozum: 'Ses ile yağmur arasındaki ortak özellik <b>yumuşaklık</b>tır. "Annemin sesi" benzeyen, "bahar yağmuru" benzetilen, "kadar" benzetme edatıdır.' },
      { seviye: 3, soru: 'Aşağıdakilerin hangisinde <b>birden fazla</b> söz sanatı bir arada kullanılmıştır?', secenekler: ['Gözlerin deniz gibi maviydi.', 'Sana bin kere söyledim.', 'Ay, gökyüzünden bize göz kırptı.', 'Dağlar, kar gibi beyaz bir yorgan örtünüp uyuyordu.'], dogru: 3, cozum: '"Dağlar, kar gibi beyaz bir yorgan örtünüp uyuyordu." cümlesinde karın beyazlığı ile yorgan arasında <b>benzetme</b>, dağların yorgan örtünüp uyuması ile <b>kişileştirme</b> vardır. Diğerlerinde tek bir sanat vardır.' }
    ]
  });

  /* ---------- 9. ANLATIM BOZUKLUKLARI ---------- */
  konular.push({
    id: 'anlatim-bozukluklari', ad: 'Anlatım Bozuklukları', ikon: '🔧', ozet: 'Gereksiz sözcük, çelişki, yanlış anlam, deyim',
    anlatim: `
<div class="blok"><h3>Anlama dayalı anlatım bozuklukları</h3>
<div class="tb-wrap"><table class="tb"><tr><th>Tür</th><th>Bozuk cümle</th><th>Doğrusu</th></tr>
<tr><td><b>Gereksiz sözcük</b></td><td>Sınava <b>yaklaşık</b> on gün <b>kadar</b> kaldı.</td><td>Sınava yaklaşık on gün kaldı.</td></tr>
<tr><td><b>Gereksiz sözcük</b></td><td>Kitabı <b>geri</b> iade etti.</td><td>Kitabı iade etti.</td></tr>
<tr><td><b>Anlamca çelişen sözcükler</b></td><td><b>Mutlaka</b> gelmiş <b>olabilir</b>.</td><td>Mutlaka gelmiştir. / Gelmiş olabilir.</td></tr>
<tr><td><b>Sözcüğün yanlış anlamda kullanılması</b></td><td>Bu olaydan çok <b>etkinlendik</b>.</td><td>Bu olaydan çok <b>etkilendik</b>.</td></tr>
<tr><td><b>Mantık hatası</b></td><td>Fiyatlar çok <b>pahalı</b>.</td><td>Fiyatlar çok <b>yüksek</b>. (Ürün pahalı olur.)</td></tr>
<tr><td><b>Deyimin yanlış kullanımı</b></td><td>Sınavı kazanınca <b>gözü kara</b> oldu.</td><td>Sınavı kazanınca <b>ağzı kulaklarına vardı</b>.</td></tr></table></div>
<div class="ipucu">✅ Gereksiz sözcüğü bulmak için sözcüğü çıkar: Anlam değişmiyorsa o sözcük gereksizdir.</div>
<div class="dikkat">⚠️ Sık yapılan hatalar: "karşılıklı birbirine", "geri iade", "en son", "yaklaşık … kadar", "ilk önce", "pahalı fiyat".</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Aşağıdaki cümlelerin hangisinde <b>gereksiz sözcük</b> kullanımından kaynaklanan bir anlatım bozukluğu vardır?', secenekler: ['Sınava on beş gün kaldı.', 'Sınava yaklaşık on beş gün kadar kaldı.', 'Yarın erkenden yola çıkacağız.', 'Ödevlerimi akşam bitirdim.'], dogru: 1, cozum: '"Yaklaşık" ve "kadar" aynı anlamı (tahmin) verir. Biri gereksizdir.' },
      { seviye: 1, soru: 'Aşağıdaki cümlelerin hangisinde <b>anlatım bozukluğu</b> vardır?', secenekler: ['Kütüphaneden aldığı kitabı geri iade etti.', 'Kütüphaneden aldığı kitabı iade etti.', 'Kütüphaneden aldığı kitabı geri getirdi.', 'Kitabı okuyup bitirdi.'], dogru: 0, cozum: '"İade etmek" zaten "geri vermek" demektir. "Geri" sözcüğü gereksizdir.' },
      { seviye: 2, soru: 'Aşağıdaki cümlelerin hangisinde <b>anlamca çelişen</b> sözcükler bir arada kullanılmıştır?', secenekler: ['Toplantıya mutlaka katılacak.', 'Toplantıya katılmış olabilir.', 'Toplantıya mutlaka katılmış olabilir.', 'Toplantıya kesinlikle gelmeyecek.'], dogru: 2, cozum: '"Mutlaka" kesinlik, "olabilir" ise olasılık bildirir. İkisi aynı cümlede çelişir.' },
      { seviye: 2, soru: 'Aşağıdaki cümlelerin hangisinde bir sözcük <b>yanlış anlamda</b> kullanılmıştır?', secenekler: ['Okulda yeni bir etkinlik düzenlendi.', 'Bu kötü olaydan hepimiz çok etkinlendik.', 'Kitaptan çok etkilendik.', 'Etkili bir konuşma yaptı.'], dogru: 1, cozum: '"Etkinlenmek" yerine <b>etkilenmek</b> kullanılmalıydı. Etkinlik "faaliyet" anlamındadır.' },
      { seviye: 3, soru: 'Aşağıdaki cümlelerin hangisinde <b>anlatım bozukluğu yoktur</b>?', secenekler: ['Herkes birbirini karşılıklı selamladı.', 'Bu mağazadaki fiyatlar çok pahalı.', 'Kazanacağından kesinlikle eminim galiba.', 'Yağmur yağınca yollar kayganlaştı.'], dogru: 3, cozum: '"Birbirini" ile "karşılıklı" aynı anlamdadır (gereksiz sözcük); fiyat pahalı olmaz, yüksek olur; "kesinlikle" ile "galiba" çelişir. Bozukluk içermeyen cümle: <b>Yağmur yağınca yollar kayganlaştı.</b>' },
      { seviye: 3, soru: 'Aşağıdaki cümlelerin hangisinde <b>deyim yanlış anlamda</b> kullanılmıştır?', secenekler: ['Sınavdan yüksek puan alınca gözü kara oldu.', 'Müjdeli haberi duyunca ağzı kulaklarına vardı.', 'Bu problem için çok kafa yordu.', 'Kaybettiği defteri bulmak için her yeri altüst etti.'], dogru: 0, cozum: '"Gözü kara" korkusuz, cesur demektir; sevinç bildirmez. Bu cümlede "ağzı kulaklarına varmak" gibi bir deyim kullanılmalıydı.' }
    ]
  });

  /* ---------- 10. SÖZEL MANTIK VE GÖRSEL OKUMA ---------- */
  function tabloHTML(basliklar, satirlar) {
    return `<div class="tb-wrap"><table class="tb"><tr>${basliklar.map(b => `<th>${b}</th>`).join('')}</tr>${satirlar.map(s => `<tr>${s.map(h => `<td>${h}</td>`).join('')}</tr>`).join('')}</table></div>`;
  }
  function sutunTR(veri, max) {
    const x0 = 46, y0 = 190, gw = 370, gh = 160, bw = gw / veri.length; let s = '<svg class="fig" viewBox="0 0 440 220">';
    for (let v = 0; v <= max; v += 2) { const y = y0 - gh * v / max; s += `<line class="${v ? 'ld' : 'l'}" x1="${x0}" y1="${y}" x2="${x0 + gw}" y2="${y}" style="${v ? 'opacity:.5' : ''}"/><text x="${x0 - 8}" y="${y + 5}" text-anchor="end" class="m">${v}</text>`; }
    veri.forEach((d, i) => { const h = gh * d[1] / max, x = x0 + i * bw + bw * 0.22; s += `<rect x="${x}" y="${y0 - h}" width="${bw * 0.56}" height="${h}" rx="4" class="fa" style="opacity:.85"/><text x="${x + bw * 0.28}" y="${y0 + 20}" text-anchor="middle" class="m">${d[0]}</text>`; });
    return s + `<line class="l" x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 - gh - 6}"/><text x="${x0 - 34}" y="14" class="m">Kitap</text></svg>`;
  }
  // Oturma düzeni şeması
  function sandalyeler(isimler) {
    let s = '<svg class="fig" viewBox="0 0 440 110">';
    isimler.forEach((n, i) => { const x = 20 + i * 82; s += `<rect x="${x}" y="20" width="70" height="50" rx="12" class="${n ? 'fs' : 'fc2'} bi"/><text x="${x + 35}" y="51" text-anchor="middle">${n || '?'}</text><text x="${x + 35}" y="92" text-anchor="middle" class="m">${i + 1}</text>`; });
    return s + '<text x="10" y="106" class="m">sol</text><text x="430" y="106" text-anchor="end" class="m">sağ</text></svg>';
  }
  konular.push({
    id: 'sozel-mantik', ad: 'Sözel Mantık ve Görsel Okuma', ikon: '🧠', ozet: 'Tablo, grafik okuma ve akıl yürütme',
    anlatim: `
<div class="blok"><h3>Sözel mantık soruları nasıl çözülür?</h3>
<ol><li>Bilgileri dikkatle oku ve <b>kesin bilgileri</b> (en sağda, birinci, pazartesi…) önce yerleştir.</li>
<li>Bir <b>tablo ya da şema</b> çiz. Kafandan çözmeye çalışma!</li>
<li>"Hemen solunda / hemen sonra" gibi <b>bitişiklik</b> bilgilerini birlikte düşün.</li>
<li>Olasılıkları dene, çelişki çıkan durumu ele.</li></ol>
<p><b>Örnek:</b> Ali, Bora, Cem, Deniz ve Ece yan yana oturacak. Cem en solda, Ece en sağda; Deniz, Ece'nin hemen solunda; Ali, Bora'nın hemen solunda.</p>
<figure>${sandalyeler(['Cem', 'Ali', 'Bora', 'Deniz', 'Ece'])}<figcaption>Önce kesin yerler (Cem 1, Ece 5, Deniz 4), sonra kalan 2 ve 3 numaralı yerlere Ali-Bora sırası.</figcaption></figure></div>

<div class="blok"><h3>Tablo ve grafik okuma</h3>
<ul><li>Önce <b>başlığa</b> ve <b>birimlere</b> bak (adet, kişi, TL, saat…).</li>
<li>Eksenlerde hangi bilginin gösterildiğini belirle.</li>
<li>Seçeneklerdeki her ifadeyi <b>tek tek</b> grafikle karşılaştır; hesap gerekiyorsa kâğıda yaz.</li>
<li>"Hangisi söylenemez / yanlıştır" köküne dikkat et!</li></ul>
<div class="ipucu">✅ LGS'de sözel mantık soruları zaman alır. Önce kolay soruları çöz, bunlara sona doğru dönebilirsin.</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Aşağıdaki tabloda bir kütüphanenin çalışma saatleri verilmiştir.' + tabloHTML(['Gün', 'Açılış', 'Kapanış'], [['Pazartesi', '09.00', '17.00'], ['Salı', 'Kapalı', '—'], ['Çarşamba', '10.00', '18.00'], ['Perşembe', '09.00', '17.00'], ['Cuma', '10.00', '16.00']]) + 'Buna göre aşağıdakilerden hangisi <b>yanlıştır</b>?', secenekler: ['Kütüphane salı günü kapalıdır.', 'En geç kapanış çarşamba günüdür.', 'Cuma günü kütüphane 6 saat açıktır.', 'Pazartesi günü kütüphane 10.00\'da açılır.'], dogru: 3, cozum: 'Tabloya göre pazartesi açılış saati <b>09.00</b>\'dır. Diğer ifadeler doğrudur (cuma 10.00–16.00 = 6 saat).' },
      { seviye: 2, soru: 'Ali, Bora, Cem, Deniz ve Ece yan yana dizilmiş beş sandalyeye oturacaktır.<br>• Cem en solda oturuyor.<br>• Ece en sağda oturuyor.<br>• Deniz, Ece\'nin hemen solunda oturuyor.<br>• Ali, Bora\'nın hemen solunda oturuyor.<br><br>Buna göre <b>ortadaki</b> sandalyede kim oturur?', sekil: sandalyeler(['', '', '', '', '']), secenekler: ['Ali', 'Cem', 'Deniz', 'Bora'], dogru: 3, cozum: 'Cem 1, Ece 5, Deniz 4. Kalan 2 ve 3 için Ali, Bora\'nın hemen solunda olduğundan Ali 2, Bora 3.<br>Ortadaki (3.) sandalye: <b>Bora</b>' },
      { seviye: 2, soru: 'Bir okulda öğrencilerin seçtikleri kulüpler ve öğrenci sayıları tabloda verilmiştir.' + tabloHTML(['Kulüp', 'Öğrenci sayısı'], [['Satranç', '12'], ['Müzik', '18'], ['Spor', '25'], ['Resim', '15']]) + 'Buna göre aşağıdakilerden hangisi <b>söylenemez</b>?', secenekler: ['En çok öğrenci spor kulübünü seçmiştir.', 'Müzik kulübünü seçenler, satranç kulübünü seçenlerden 6 fazladır.', 'Resim ve satranç kulübünü seçenlerin toplamı, spor kulübünü seçenlerden fazladır.', 'Kulüp seçen toplam öğrenci sayısı 65\'tir.'], dogru: 3, cozum: 'Toplam: 12 + 18 + 25 + 15 = <b>70</b>, 65 değildir. (Resim ve satranç toplamı 15 + 12 = 27 &gt; 25 olduğundan o ifade doğrudur.)' },
      { seviye: 2, soru: 'Bir yarışmada Ayşe, Burak, Ceren ve Doruk ilk dört sırayı paylaşmıştır.<br>• Burak ikinci olmuştur.<br>• Ayşe, Burak\'tan önce bitirmiştir.<br>• Ceren, Doruk\'tan sonra bitirmiştir.<br><br>Buna göre yarışmayı <b>sonuncu</b> bitiren kimdir?', secenekler: ['Ayşe', 'Burak', 'Ceren', 'Doruk'], dogru: 2, cozum: 'Burak 2. ve Ayşe ondan önce → Ayşe 1. Kalan 3. ve 4. sıralarda Ceren, Doruk\'tan sonra geldiği için Doruk 3., <b>Ceren 4.</b>' },
      { seviye: 3, soru: 'Elif, hafta içi beş günün her birinde farklı bir kursa gidecektir: yüzme, satranç, resim, keman ve İngilizce.<br>• Yüzme kursu pazartesi günüdür.<br>• İngilizce kursu cuma günüdür.<br>• Keman kursu, resim kursundan hemen sonraki gündür.<br>• Satranç kursu perşembe günü değildir.<br><br>Buna göre Elif <b>çarşamba</b> günü hangi kursa gider?', sekil: tabloHTML(['Pzt', 'Salı', 'Çar', 'Per', 'Cuma'], [['Yüzme', '?', '?', '?', 'İngilizce']]), secenekler: ['Satranç', 'Keman', 'İngilizce', 'Resim'], dogru: 3, cozum: 'Salı, çarşamba, perşembe günlerine satranç, resim, keman yerleşecek. Resim-keman ardışık olmalı: (Salı-Çar) ya da (Çar-Per).<br>• Resim salı, keman çarşamba olursa satranç perşembeye kalır ✗ (satranç perşembe değil).<br>• Resim çarşamba, keman perşembe → satranç salı ✔<br>Çarşamba: <b>Resim</b>' },
      { seviye: 3, soru: 'Aylin\'in dört ayda okuduğu kitap sayıları aşağıdaki grafikte verilmiştir.<br><br>Buna göre aşağıdakilerden hangisi <b>doğrudur</b>?', sekil: sutunTR([['Ocak', 4], ['Şubat', 6], ['Mart', 3], ['Nisan', 7]], 8), secenekler: ['En az kitap şubat ayında okunmuştur.', 'Dört ayda toplam 20 kitap okunmuştur.', 'Nisan ayında okunan kitap sayısı, ocak ayındakinin iki katıdır.', 'Marttan nisana okunan kitap sayısı azalmıştır.'], dogru: 1, cozum: '4 + 6 + 3 + 7 = <b>20</b>. En az kitap martta (3) okunmuştur; nisandaki 7, ocaktaki 4 sayısının iki katı değildir; marttan nisana kitap sayısı artmıştır.' }
    ]
  });

  return { id: 'turkce', ad: 'Türkçe', ikon: 'Aa', aciklama: '7. sınıf konuları · LGS sözel bölüm', konular };
})();
