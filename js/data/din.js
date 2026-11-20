/* 7. Sınıf Din Kültürü ve Ahlak Bilgisi — konu anlatımları, şemalar ve sorular */
window.LGS_DIN = (function () {
  'use strict';

  function akis(kutular) {
    const W = 440, n = kutular.length, gap = 16, bw = (W - 20 - gap * (n - 1)) / n;
    let s = `<svg class="fig" viewBox="0 0 ${W} 90">`;
    kutular.forEach((k, i) => {
      const x = 10 + i * (bw + gap);
      s += `<rect x="${x}" y="12" width="${bw}" height="58" rx="12" class="${k[2] || 'fs'} bi"/><text x="${x + bw / 2}" y="${k[1] ? 37 : 46}" text-anchor="middle" style="font-size:13px">${k[0]}</text>`;
      if (k[1]) s += `<text x="${x + bw / 2}" y="57" text-anchor="middle" class="m" style="font-size:11px">${k[1]}</text>`;
      if (i < n - 1) { const ax = x + bw + 1; s += `<line class="la" x1="${ax}" y1="41" x2="${ax + gap - 5}" y2="41" style="stroke-width:2"/><polygon class="fa" points="${ax + gap - 1},41 ${ax + gap - 7},37 ${ax + gap - 7},45"/>`; }
    });
    return s + '</svg>';
  }
  const tablo = (b, satir) => `<div class="tb-wrap"><table class="tb"><tr>${b.map(x => `<th>${x}</th>`).join('')}</tr>${satir.map(r => `<tr>${r.map(h => `<td>${h}</td>`).join('')}</tr>`).join('')}</table></div>`;
  const P = t => `<div class="paragraf">${t}</div>`;
  const konular = [];

  /* ---------- 1. MELEK VE AHİRET ---------- */
  konular.push({
    id: 'melek-ahiret', ad: 'Melek ve Ahiret İnancı', ikon: '✨', ozet: 'Melekler, cinler, ahiret hayatının aşamaları',
    anlatim: `
<div class="blok"><h3>Melekler</h3>
<p>Melekler Allah'ın nurdan yarattığı, gözle görülmeyen, Allah'a her zaman itaat eden varlıklardır. Yemez, içmez, uyumaz; erkeklik ve dişilik özellikleri yoktur.</p>
${tablo(['Dört büyük melek', 'Görevi'], [['Cebrail', 'Peygamberlere vahiy getirmek'], ['Mikail', 'Tabiat olaylarını düzenlemek'], ['İsrafil', 'Sur\'a üflemek (kıyamet ve diriliş)'], ['Azrail', 'Canlıların ruhunu almak']])}
<ul><li><b>Kiramen Katibin:</b> İnsanların iyi ve kötü davranışlarını yazan melekler</li><li><b>Hafaza melekleri:</b> İnsanları koruyan melekler</li><li><b>Münker ve Nekir:</b> Kabirde sorgulayan melekler</li></ul></div>
<div class="blok"><h3>Cinler ve şeytan</h3><p>Cinler <b>ateşten</b> yaratılmış, akıl ve irade sahibi varlıklardır; içlerinde iyi olanlar da kötü olanlar da vardır. Şeytan insanları kötülüğe yönelten varlıktır. Kur'an'da cinlerle ilgili <b>Cin suresi</b> vardır.</p></div>
<div class="blok"><h3>Ahiret hayatının aşamaları</h3>
<figure>${akis([['Kıyamet', 'evrenin sonu', 'fr'], ['Ba\'s', 'diriliş', 'fw'], ['Haşr', 'toplanma', 'fi'], ['Mizan', 'tartı', 'fg'], ['Sırat', 'köprü', 'fs']])}</figure>
<p>Ölümle başlayan ve kıyamete kadar süren kabir hayatına <b>berzah</b> denir. Hesaptan sonra insanlar <b>cennet</b> ya da <b>cehennem</b>e gider.</p>
<div class="ipucu">✅ Ahiret inancı insanı sorumluluk sahibi yapar; adalet duygusunu güçlendirir, kötülükten uzaklaştırır.</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Peygamberlere vahiy getirmekle görevli melek hangisidir?', secenekler: ['Mikail', 'Cebrail', 'İsrafil', 'Azrail'], dogru: 1, cozum: 'Vahiy meleği <b>Cebrail</b>\'dir.' },
      { seviye: 1, soru: 'Cinler neden yaratılmıştır?', secenekler: ['Nurdan', 'Topraktan', 'Ateşten', 'Sudan'], dogru: 2, cozum: 'Cinler <b>ateşten</b>, melekler nurdan, insan topraktan yaratılmıştır.' },
      { seviye: 2, soru: 'İnsanların iyi ve kötü davranışlarını yazan meleklere ne ad verilir?', secenekler: ['Hafaza melekleri', 'Münker ve Nekir', 'Kiramen Katibin', 'Hamele-i Arş'], dogru: 2, cozum: 'Amelleri yazan melekler <b>Kiramen Katibin</b>\'dir.' },
      { seviye: 2, soru: 'Ölümden sonra başlayıp kıyamete kadar süren hayata ne ad verilir?', secenekler: ['Mahşer', 'Berzah (kabir hayatı)', 'Mizan', 'Ba\'s'], dogru: 1, cozum: 'Ölüm ile kıyamet arasındaki kabir hayatına <b>berzah</b> denir.' },
      { seviye: 3, soru: 'Ahiret hayatının aşamaları aşağıdakilerin hangisinde doğru sıralanmıştır?', secenekler: ['Kıyamet – Ba\'s – Haşr – Mizan', 'Ba\'s – Kıyamet – Mizan – Haşr', 'Haşr – Kıyamet – Ba\'s – Mizan', 'Mizan – Haşr – Ba\'s – Kıyamet'], dogru: 0, cozum: 'Önce <b>kıyamet</b> kopar, sonra <b>ba\'s</b> (diriliş), ardından <b>haşr</b> (toplanma) ve <b>mizan</b> (amellerin tartılması) gerçekleşir.' },
      { seviye: 3, soru: P('Ahirete inanan bir insan, yaptığı her davranıştan hesaba çekileceğini bilir. Bu nedenle kimse görmese bile haksızlık yapmaz, emanete hıyanet etmez.') + 'Bu metinde ahiret inancının hangi etkisi vurgulanmaktadır?', secenekler: ['İnsana sorumluluk bilinci kazandırması', 'İnsanı zengin yapması', 'Dünya hayatını önemsiz göstermesi', 'İnsanı yalnızlığa yöneltmesi'], dogru: 0, cozum: 'Hesaba çekileceğini bilen kişi davranışlarına dikkat eder: <b>sorumluluk bilinci</b>.' },
      { seviye: 2, soru: 'Sur\'a üfleyerek kıyameti ve dirilişi başlatacak melek hangisidir?', secenekler: ['Azrail', 'Cebrail', 'İsrafil', 'Mikail'], dogru: 2, cozum: 'Sur\'a üflemekle görevli melek <b>İsrafil</b>\'dir.' }
    ]
  });

  /* ---------- 2. HAC VE KURBAN ---------- */
  konular.push({
    id: 'hac-kurban', ad: 'Hac ve Kurban', ikon: '🕋', ozet: 'Haccın farzları, umre, kurban ibadeti',
    anlatim: `
<div class="blok"><h3>Hac</h3>
<p>Hac; gücü yeten Müslümanın ömründe bir kez, <b>Zilhicce</b> ayında Kâbe'yi ve çevresindeki kutsal yerleri ziyaret etmesidir. İslam'ın beş şartından biridir.</p>
${tablo(['Haccın farzları', 'Açıklama'], [['İhram', 'Hacca niyet edip ihram örtüsüne girmek'], ['Arafat vakfesi', 'Arefe günü Arafat\'ta bir süre bulunmak'], ['Ziyaret tavafı', 'Kâbe\'nin etrafında yedi kez dönmek']])}
<ul><li><b>Sa'y:</b> Safa ile Merve tepeleri arasında yedi kez gidip gelmek</li><li><b>Umre:</b> Belirli günler dışında yılın her zamanında yapılabilen Kâbe ziyareti</li></ul>
<div class="bilgi">💡 Hac; eşitliği (herkes aynı ihramı giyer), kardeşliği ve sabrı öğretir.</div></div>
<div class="blok"><h3>Kurban</h3>
<p>Kurban, Allah'a yakınlaşmak amacıyla Kurban Bayramı günlerinde belirli şartlara uygun hayvanı kesmektir. Hz. İbrahim ve oğlu Hz. İsmail'in teslimiyeti kurban ibadetinin tarihî temelidir.</p>
${tablo(['Hayvan', 'En az yaşı', 'Ortaklık'], [['Koyun, keçi', '1 yaş', 'Tek kişi'], ['Sığır, manda', '2 yaş', '7 kişiye kadar'], ['Deve', '5 yaş', '7 kişiye kadar']])}
<div class="ipucu">✅ Kurban eti üçe bölünüp bir kısmının ihtiyaç sahiplerine verilmesi tavsiye edilir: paylaşma ve yardımlaşma.</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Hac ibadeti hangi ayda yerine getirilir?', secenekler: ['Ramazan', 'Recep', 'Zilhicce', 'Muharrem'], dogru: 2, cozum: 'Hac <b>Zilhicce</b> ayında yapılır.' },
      { seviye: 1, soru: 'Kurban ibadetinin tarihî temeli hangi peygamberlerle ilgilidir?', secenekler: ['Hz. Musa ve Hz. Harun', 'Hz. İbrahim ve Hz. İsmail', 'Hz. Yakup ve Hz. Yusuf', 'Hz. Davut ve Hz. Süleyman'], dogru: 1, cozum: 'Kurbanın tarihî temeli <b>Hz. İbrahim ve oğlu Hz. İsmail</b>\'in teslimiyetidir.' },
      { seviye: 2, soru: 'Aşağıdakilerden hangisi haccın <b>farzlarından değildir</b>?', secenekler: ['İhram', 'Arafat vakfesi', 'Ziyaret tavafı', 'Sa\'y'], dogru: 3, cozum: 'Haccın farzları ihram, Arafat vakfesi ve ziyaret tavafıdır. <b>Sa\'y</b> farz değildir (vaciptir).' },
      { seviye: 2, soru: 'Safa ile Merve tepeleri arasında yedi kez gidip gelmeye ne ad verilir?', secenekler: ['Tavaf', 'Sa\'y', 'Vakfe', 'Telbiye'], dogru: 1, cozum: 'Safa ve Merve arasında gidip gelmek <b>sa\'y</b>dır.' },
      { seviye: 2, soru: 'Büyükbaş bir kurbanlık hayvana en fazla kaç kişi ortak olabilir?', secenekler: ['3', '5', '7', '10'], dogru: 2, cozum: 'Sığır, manda ve deve gibi büyükbaş hayvanlara <b>7</b> kişiye kadar ortak olunabilir.' },
      { seviye: 3, soru: P('Hacda zengin-fakir, yönetici-işçi herkes aynı beyaz ihram örtüsüne bürünür; aynı yerde, aynı anda, aynı ibadeti yerine getirir.') + 'Bu metinde haccın hangi yönü ön plana çıkmaktadır?', secenekler: ['İnsanlar arasındaki eşitlik', 'Ticari faydaları', 'Seyahatin eğlenceli olması', 'Bedensel sağlık'], dogru: 0, cozum: 'Herkesin aynı kıyafeti giymesi ve aynı ibadeti yapması <b>eşitliği</b> vurgular.' },
      { seviye: 3, soru: 'Belirli günler dışında yılın her zamanında yapılabilen Kâbe ziyaretine ne ad verilir?', secenekler: ['Hac', 'Umre', 'Arefe', 'İtikâf'], dogru: 1, cozum: 'Zaman sınırı olmadan yapılan Kâbe ziyareti <b>umre</b>dir.' }
    ]
  });

  /* ---------- 3. AHLAKİ DAVRANIŞLAR ---------- */
  konular.push({
    id: 'ahlak', ad: 'Ahlaki Davranışlar', ikon: '🤝', ozet: 'Güzel ve kötü davranışlar, selamlaşma, sabır',
    anlatim: `
<div class="blok"><h3>Güzel ahlak</h3>
<p>İslam'da güzel ahlak imanın göstergesidir. Hz. Muhammed (s.a.v.) "Ben güzel ahlakı tamamlamak için gönderildim." buyurmuştur.</p>
${tablo(['Övülen davranışlar', 'Yerilen davranışlar'], [['Doğruluk, dürüstlük', 'Yalan söylemek'], ['Adalet', 'Haksızlık, zulüm'], ['Yardımlaşma, cömertlik', 'Cimrilik, bencillik'], ['Saygı, nezaket, selamlaşma', 'Kaba davranmak, alay etmek'], ['Sabır, hoşgörü', 'Öfke, kin'], ['Alçakgönüllülük', 'Kibir'], ['Güzel söz', 'Gıybet (arkadan çekiştirme), iftira']])}
<div class="dikkat">⚠️ <b>Gıybet:</b> Bir kişinin arkasından, duyduğunda hoşlanmayacağı şeyleri konuşmak. Kur'an'da Hucurat suresinde yasaklanmıştır.</div></div>
<div class="blok"><h3>Selamlaşma ve nezaket</h3>
<p>Selamlaşma sevgi ve barışı yayar. "Selamünaleyküm" (Allah'ın selamı üzerinize olsun) sözüne "Aleykümselam" diye karşılık verilir.</p>
<div class="ipucu">✅ Ahlaki davranış soruları genellikle bir olay anlatır; olaydaki kişinin davranışını <b>tek bir değerle</b> eşleştir (dürüstlük, merhamet, sabır…).</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Bir kişinin arkasından, duyduğunda hoşlanmayacağı şeyleri konuşmaya ne ad verilir?', secenekler: ['İftira', 'Gıybet', 'Kibir', 'Haset'], dogru: 1, cozum: 'Arkadan çekiştirmeye <b>gıybet</b> denir.' },
      { seviye: 1, soru: 'Aşağıdakilerden hangisi İslam\'da <b>yerilen</b> bir davranıştır?', secenekler: ['Selamlaşmak', 'Yardımlaşmak', 'Kibirlenmek', 'Sabretmek'], dogru: 2, cozum: '<b>Kibir</b> (büyüklenme) İslam\'da yerilen davranışlardandır.' },
      { seviye: 2, soru: P('Pazardan elma alan Ayşe, eve gelince satıcının fazla para üstü verdiğini fark etti. Ertesi gün pazara giderek fazla parayı satıcıya geri verdi.') + 'Ayşe\'nin davranışı aşağıdaki değerlerden hangisiyle ilgilidir?', secenekler: ['Cömertlik', 'Dürüstlük', 'Sabır', 'Misafirperverlik'], dogru: 1, cozum: 'Hakkı olmayan parayı geri vermek <b>dürüstlük</b>tür.' },
      { seviye: 2, soru: '"Selamünaleyküm" diyen birine verilen karşılık hangisidir?', secenekler: ['Aleykümselam', 'Maşallah', 'İnşallah', 'Elhamdülillah'], dogru: 0, cozum: 'Selama "<b>Aleykümselam</b>" diye karşılık verilir.' },
      { seviye: 3, soru: P('Sınavdan düşük not alan Emir, üzülmekle birlikte hemen umutsuzluğa kapılmadı. Eksik konularını belirleyip düzenli çalışmaya devam etti ve bir sonraki sınavda başarılı oldu.') + 'Emir\'in davranışında öne çıkan değer hangisidir?', secenekler: ['Sabır ve azim', 'Cömertlik', 'Merhamet', 'Vefa'], dogru: 0, cozum: 'Zorluk karşısında yılmadan çalışmaya devam etmek <b>sabır ve azim</b>dir.' },
      { seviye: 3, soru: 'Aşağıdaki davranış ve değer eşleştirmelerinden hangisi <b>yanlıştır</b>?', secenekler: ['Sokak hayvanlarına su koymak – Merhamet', 'Sırrı başkalarına söylememek – Emanete riayet', 'Başarısını sürekli övünerek anlatmak – Alçakgönüllülük', 'Hatasını kabul edip özür dilemek – Erdemlilik'], dogru: 2, cozum: 'Sürekli övünmek alçakgönüllülük değil, <b>kibir</b>dir.' }
    ]
  });

  /* ---------- 4. HZ. MUHAMMED ---------- */
  konular.push({
    id: 'hz-muhammed', ad: 'Allah\'ın Kulu ve Elçisi Hz. Muhammed', ikon: '🌙', ozet: 'Hayatı, peygamberlik, peygamberlerin özellikleri',
    anlatim: `
<div class="blok"><h3>Hayatı</h3>
<figure><svg class="fig" viewBox="0 0 440 150"><line class="l" x1="15" y1="70" x2="425" y2="70" style="stroke-width:3"/>
${[['571', 'Mekke\'de doğdu', 30], ['610', 'İlk vahiy (40 yaş)', 160], ['622', 'Hicret (Medine)', 290], ['632', 'Vefatı', 410]].map((o, i) => `<circle cx="${o[2]}" cy="70" r="8" class="fa"/><text x="${o[2]}" y="${i % 2 ? 98 : 50}" text-anchor="middle">${o[0]}</text><text x="${o[2]}" y="${i % 2 ? 118 : 30}" text-anchor="middle" class="m">${o[1]}</text>`).join('')}</svg></figure>
<ul><li>Babası <b>Abdullah</b>, annesi <b>Âmine</b>'dir. Babası o doğmadan, annesi 6 yaşındayken vefat etti. Önce dedesi <b>Abdülmuttalip</b>, sonra amcası <b>Ebu Talip</b> yanında büyüdü.</li>
<li>Dürüstlüğü nedeniyle gençliğinde <b>"Muhammedü'l-Emin"</b> (güvenilir Muhammed) diye anıldı.</li>
<li>Haksızlığa uğrayanları korumak için kurulan <b>Hilfü'l-Fudûl</b> (Erdemliler Topluluğu)'na katıldı.</li>
<li>Kâbe onarımında Hacerü'l-Esved'in yerine konmasında çıkan anlaşmazlığı adil bir hakemlikle çözdü.</li>
<li>40 yaşında <b>Hira Mağarası</b>'nda ilk vahiy geldi: Alak suresinin ilk ayetleri ("Oku!").</li></ul></div>
<div class="blok"><h3>Peygamberlerin ortak özellikleri</h3>
${tablo(['Sıfat', 'Anlamı'], [['Sıdk', 'Doğruluk'], ['Emanet', 'Güvenilirlik'], ['Fetanet', 'Akıllı ve zeki olma'], ['İsmet', 'Günah işlemekten korunmuş olma'], ['Tebliğ', 'Allah\'tan aldığı mesajı eksiksiz insanlara iletme']])}
<div class="ipucu">✅ Hz. Muhammed (s.a.v.) son peygamberdir; bu nedenle <b>Hâtemü\'l-Enbiya</b> (peygamberlerin sonuncusu) denir.</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Hz. Muhammed\'e (s.a.v.) ilk vahiy nerede gelmiştir?', secenekler: ['Sevr Mağarası', 'Hira Mağarası', 'Arafat Dağı', 'Kâbe'], dogru: 1, cozum: 'İlk vahiy <b>Hira Mağarası</b>\'nda gelmiştir.' },
      { seviye: 1, soru: 'Hz. Muhammed\'in (s.a.v.) gençliğinde dürüstlüğü nedeniyle aldığı lakap hangisidir?', secenekler: ['Muhammedü\'l-Emin', 'Seyfullah', 'Faruk', 'Sıddık'], dogru: 0, cozum: 'Güvenilir olduğu için <b>Muhammedü\'l-Emin</b> denmiştir.' },
      { seviye: 2, soru: 'Peygamberlerin Allah\'tan aldıkları mesajları eksiksiz olarak insanlara iletmesini ifade eden sıfat hangisidir?', secenekler: ['Sıdk', 'Fetanet', 'İsmet', 'Tebliğ'], dogru: 3, cozum: 'Mesajı eksiksiz iletmek <b>tebliğ</b> sıfatıdır.' },
      { seviye: 2, soru: 'Hz. Muhammed\'in (s.a.v.) Mekke\'den Medine\'ye göç ettiği olaya ne ad verilir ve hangi yılda olmuştur?', secenekler: ['Hicret – 622', 'Hicret – 610', 'Miraç – 622', 'Fetih – 630'], dogru: 0, cozum: 'Medine\'ye göç <b>Hicret</b>tir ve <b>622</b> yılında gerçekleşmiştir.' },
      { seviye: 3, soru: P('Mekke\'de haksızlığa uğrayan bir tüccarın hakkını almak için bir araya gelen kişiler, mazlumları koruyacaklarına söz verdiler. Henüz peygamberlik gelmeden önce genç Muhammed de bu topluluğa katıldı.') + 'Metinde sözü edilen topluluk hangisidir?', secenekler: ['Ensar', 'Hilfü\'l-Fudûl', 'Muhacir', 'Ashab-ı Suffa'], dogru: 1, cozum: 'Haksızlığa uğrayanları korumak için kurulan topluluk <b>Hilfü\'l-Fudûl</b>\'dür.' },
      { seviye: 3, soru: 'Hz. Muhammed\'in (s.a.v.) Kâbe onarımı sırasında Hacerü\'l-Esved\'in yerine konması konusundaki anlaşmazlığı çözmesi, onun en çok hangi özelliğini gösterir?', secenekler: ['Adaletli ve barışçı olması', 'Ticarete yatkın olması', 'Şiir yazması', 'Savaşçı olması'], dogru: 0, cozum: 'Tüm kabileleri memnun eden bir çözüm bulması <b>adaleti ve barışçılığı</b>nı gösterir.' },
      { seviye: 2, soru: 'Hz. Muhammed\'in (s.a.v.) annesinin adı nedir?', secenekler: ['Hatice', 'Halime', 'Âmine', 'Fatıma'], dogru: 2, cozum: 'Annesi <b>Âmine</b>\'dir. Halime sütannesi, Hatice eşi, Fatıma kızıdır.' }
    ]
  });

  /* ---------- 5. İSLAM DÜŞÜNCESİNDE YORUMLAR ---------- */
  konular.push({
    id: 'yorumlar', ad: 'İslam Düşüncesinde Yorumlar', ikon: '📚', ozet: 'İtikadi, fıkhi ve tasavvufi yorumlar',
    anlatim: `
<div class="blok"><h3>Yorum farklılıklarının nedenleri</h3>
<ul><li>Kur'an ayetlerinin ve hadislerin farklı anlamlara gelebilmesi</li><li>İnsanların anlayış ve bilgi düzeylerinin farklı olması</li><li>Farklı coğrafya, kültür ve yaşam koşulları</li></ul>
<div class="bilgi">💡 Bu yorumlar dinin kendisi değil, dinin anlaşılma biçimleridir. Hepsinin ortak noktası Kur'an ve sünnettir. Farklılıklar <b>zenginlik</b> olarak görülmelidir.</div></div>
<div class="blok"><h3>Yorum türleri</h3>
<figure><svg class="fig" viewBox="0 0 440 200">
<rect x="140" y="6" width="160" height="40" rx="10" class="fa"/><text x="220" y="31" text-anchor="middle" style="fill:#fff">Dinî yorumlar</text>
<path class="lm" d="M220 46 V60 M75 60 H365 M75 60 V72 M220 60 V72 M365 60 V72"/>
<rect x="8" y="72" width="134" height="40" rx="10" class="fi bi"/><text x="75" y="97" text-anchor="middle">İtikadi</text>
<rect x="153" y="72" width="134" height="40" rx="10" class="fw bi"/><text x="220" y="97" text-anchor="middle">Fıkhi</text>
<rect x="298" y="72" width="134" height="40" rx="10" class="fg bi"/><text x="365" y="97" text-anchor="middle">Tasavvufi</text>
<text x="75" y="134" text-anchor="middle" class="m">inanç konuları</text><text x="75" y="156" text-anchor="middle" class="m">Maturidilik</text><text x="75" y="176" text-anchor="middle" class="m">Eş'arilik</text>
<text x="220" y="134" text-anchor="middle" class="m">ibadet ve hukuk</text><text x="220" y="156" text-anchor="middle" class="m">Hanefi · Maliki</text><text x="220" y="176" text-anchor="middle" class="m">Şafii · Hanbeli</text>
<text x="365" y="134" text-anchor="middle" class="m">gönül ve ahlak</text><text x="365" y="156" text-anchor="middle" class="m">Yesevilik · Mevlevilik</text><text x="365" y="176" text-anchor="middle" class="m">Kadirilik · Bektaşilik</text>
</svg></figure>
${tablo(['Yorum', 'Öncüsü'], [['Maturidilik', 'İmam Maturidi'], ['Hanefilik', 'İmam Ebu Hanife'], ['Yesevilik', 'Hoca Ahmet Yesevi'], ['Mevlevilik', 'Mevlana Celaleddin Rumi'], ['Alevilik-Bektaşilik', 'Hacı Bektaş-ı Veli']])}
<div class="ipucu">✅ İtikadi = <b>inanç</b>, fıkhi = <b>ibadet/günlük hayat kuralları</b>, tasavvufi = <b>Allah sevgisi ve ahlakın yaşanması</b>.</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Aşağıdakilerden hangisi <b>fıkhi</b> (amelî) bir mezheptir?', secenekler: ['Maturidilik', 'Eş\'arilik', 'Hanefilik', 'Yesevilik'], dogru: 2, cozum: '<b>Hanefilik</b> ibadet ve günlük hayatla ilgili fıkhi bir mezheptir. Maturidilik ve Eş\'arilik itikadi, Yesevilik tasavvufi yorumdur.' },
      { seviye: 1, soru: 'Mevlevilik tasavvufi yorumunun öncüsü kimdir?', secenekler: ['Hacı Bektaş-ı Veli', 'Mevlana Celaleddin Rumi', 'Hoca Ahmet Yesevi', 'Yunus Emre'], dogru: 1, cozum: 'Mevlevilik <b>Mevlana</b>\'nın görüşleri etrafında oluşmuştur.' },
      { seviye: 2, soru: 'İslam\'ın inanç esaslarıyla ilgili konuları açıklayan yorumlara ne ad verilir?', secenekler: ['Fıkhi yorumlar', 'Tasavvufi yorumlar', 'İtikadi yorumlar', 'Siyasi yorumlar'], dogru: 2, cozum: 'İnanç (itikat) konularıyla ilgili yorumlar <b>itikadi</b> yorumlardır.' },
      { seviye: 2, soru: 'Aşağıdakilerden hangisi dinî yorum farklılıklarının nedenlerinden biri <b>değildir</b>?', secenekler: ['Ayetlerin farklı anlamlara gelebilmesi', 'Farklı kültür ve coğrafyalar', 'Kur\'an\'ın farklı nüshalarının olması', 'İnsanların anlayış düzeylerinin farklı olması'], dogru: 2, cozum: 'Kur\'an\'ın tek bir metni vardır; farklı nüshalar yorum farklılığının nedeni <b>değildir</b>.' },
      { seviye: 3, soru: P('Türkistan\'da yaşayan bu mutasavvıf, İslam\'ı Türklere anlayacakları dilde anlatmak için Türkçe hikmetler yazmıştır. Görüşleri "Divan-ı Hikmet" adlı eserde toplanmıştır.') + 'Metinde sözü edilen kişi kimdir?', secenekler: ['Hoca Ahmet Yesevi', 'Mevlana', 'İmam Maturidi', 'Ebu Hanife'], dogru: 0, cozum: 'Divan-ı Hikmet\'in yazarı ve Yesevilik\'in kurucusu <b>Hoca Ahmet Yesevi</b>\'dir.' },
      { seviye: 3, soru: 'Aşağıdaki yorum ve türü eşleştirmelerinden hangisi <b>doğrudur</b>?', secenekler: ['Şafiilik – İtikadi', 'Eş\'arilik – Fıkhi', 'Kadirilik – Tasavvufi', 'Maturidilik – Tasavvufi'], dogru: 2, cozum: '<b>Kadirilik</b> tasavvufi bir yorumdur. Şafiilik fıkhi, Eş\'arilik ve Maturidilik itikadidir.' }
    ]
  });

  return { id: 'din', ad: 'Din Kültürü ve Ahlak Bilgisi', kisa: 'Din Kültürü', ikon: '☪️', aciklama: '7. sınıf konuları · LGS sözel bölüm', konular };
})();
