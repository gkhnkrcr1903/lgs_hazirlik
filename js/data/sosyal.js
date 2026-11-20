/* 7. Sınıf Sosyal Bilgiler — konu anlatımları, şemalar ve sorular */
window.LGS_SOS = (function () {
  'use strict';

  // Zaman çizelgesi: [[yıl, olay], ...]
  function zaman(olaylar) {
    const W = 440, x0 = 30, x1 = 410, n = olaylar.length; const st = (x1 - x0) / (n - 1 || 1);
    let s = `<svg class="fig" viewBox="0 0 ${W} 150"><line class="l" x1="${x0 - 15}" y1="70" x2="${x1 + 15}" y2="70" style="stroke-width:3"/>`;
    olaylar.forEach((o, i) => {
      const x = x0 + i * st; const ust = i % 2 === 0;
      s += `<circle cx="${x}" cy="70" r="8" class="fa"/><text x="${x}" y="${ust ? 50 : 98}" text-anchor="middle">${o[0]}</text>`;
      s += `<text x="${x}" y="${ust ? 30 : 118}" text-anchor="middle" class="m">${o[1]}</text>`;
      if (o[2]) s += `<text x="${x}" y="${ust ? 14 : 134}" text-anchor="middle" class="m">${o[2]}</text>`;
    });
    return s + '</svg>';
  }
  // Oklu akış
  function akis(kutular) {
    const W = 440, n = kutular.length, gap = 22, bw = (W - 20 - gap * (n - 1)) / n;
    let s = `<svg class="fig" viewBox="0 0 ${W} 90">`;
    kutular.forEach((k, i) => {
      const x = 10 + i * (bw + gap);
      s += `<rect x="${x}" y="12" width="${bw}" height="58" rx="12" class="${k[2] || 'fs'} bi"/><text x="${x + bw / 2}" y="${k[1] ? 37 : 46}" text-anchor="middle">${k[0]}</text>`;
      if (k[1]) s += `<text x="${x + bw / 2}" y="57" text-anchor="middle" class="m">${k[1]}</text>`;
      if (i < n - 1) { const ax = x + bw + 2; s += `<line class="la" x1="${ax}" y1="41" x2="${ax + gap - 7}" y2="41" style="stroke-width:2.5"/><polygon class="fa" points="${ax + gap - 3},41 ${ax + gap - 10},36 ${ax + gap - 10},46"/>`; }
    });
    return s + '</svg>';
  }
  const tablo = (b, satir) => `<div class="tb-wrap"><table class="tb"><tr>${b.map(x => `<th>${x}</th>`).join('')}</tr>${satir.map(r => `<tr>${r.map(h => `<td>${h}</td>`).join('')}</tr>`).join('')}</table></div>`;
  const P = t => `<div class="paragraf">${t}</div>`;
  const konular = [];

  /* ---------- 1. İLETİŞİM ---------- */
  konular.push({
    id: 'iletisim', ad: 'İletişim ve İnsan İlişkileri', ikon: '🗣️', ozet: 'İletişim ögeleri, empati, ben dili, kitle iletişimi',
    anlatim: `
<div class="blok"><h3>İletişim süreci</h3>
<figure>${akis([['Gönderici', 'mesajı oluşturur', 'fi'], ['Mesaj', 'kanal ile iletilir', 'fw'], ['Alıcı', 'mesajı alır', 'fg'], ['Geri bildirim', 'cevap verir', 'fr']])}</figure>
<p>İletişim; duygu, düşünce ve bilgilerin karşı tarafa aktarılmasıdır. <b>Sözlü</b> (konuşma), <b>sözsüz</b> (beden dili, jest, mimik) ve <b>yazılı</b> olabilir.</p></div>
<div class="blok"><h3>Etkili iletişim</h3>
<ul><li><b>Empati:</b> Kendini karşındakinin yerine koyarak onun duygularını anlamak.</li>
<li><b>Etkin dinleme:</b> Sözü kesmeden, göz teması kurarak dinlemek.</li>
<li><b>Ben dili:</b> Suçlamadan kendi duygunu anlatmak. "Geç kaldığında <b>endişeleniyorum</b>." (Ben dili) — "Hep geç kalıyorsun!" (Sen dili)</li></ul>
<div class="dikkat">⚠️ İletişimi engelleyen tutumlar: suçlamak, emir vermek, alay etmek, önyargılı olmak, sözü kesmek.</div></div>
<div class="blok"><h3>Kitle iletişim araçları ve haklar</h3>
<p>Gazete, televizyon, radyo, internet gibi araçlar çok sayıda insana aynı anda ulaşır. Anayasamız <b>haberleşme özgürlüğünü</b>, <b>basın özgürlüğünü</b> ve <b>özel hayatın gizliliğini</b> güvence altına alır.</p>
<div class="ipucu">✅ Bilinçli medya kullanıcısı: Haberi birden fazla kaynaktan doğrular, kişisel bilgilerini paylaşmaz, başkalarının haklarına saygı gösterir.</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Kendini karşısındaki kişinin yerine koyarak onun duygu ve düşüncelerini anlamaya ne ad verilir?', secenekler: ['Empati', 'Önyargı', 'Sempati', 'Geri bildirim'], dogru: 0, cozum: 'Karşıdakinin yerine kendini koyarak onu anlamaya <b>empati</b> denir.' },
      { seviye: 1, soru: 'Aşağıdakilerden hangisi <b>sözsüz</b> iletişime örnektir?', secenekler: ['Telefonda konuşmak', 'Mektup yazmak', 'Başını sallayarak onaylamak', 'Sınıfta sunum yapmak'], dogru: 2, cozum: 'Baş sallamak bir beden dili hareketidir; söz kullanılmadan mesaj verilir: <b>sözsüz iletişim</b>.' },
      { seviye: 2, soru: 'Aşağıdaki ifadelerden hangisi <b>ben dili</b> ile kurulmuştur?', secenekler: ['Odanı hiç toplamıyorsun!', 'Eşyalarımı izinsiz aldığında üzülüyorum.', 'Sen zaten hiç dinlemezsin.', 'Hemen sesini kes!'], dogru: 1, cozum: 'Ben dilinde kişi karşısındakini suçlamadan kendi duygusunu anlatır: "… <b>üzülüyorum</b>." Diğerleri suçlayıcı sen dilidir.' },
      { seviye: 2, soru: 'Aşağıdakilerden hangisi etkili iletişimi <b>engelleyen</b> bir tutumdur?', secenekler: ['Göz teması kurmak', 'Karşıdakinin sözünü kesmek', 'Anlamadığı yeri sormak', 'Sakin bir ses tonu kullanmak'], dogru: 1, cozum: 'Söz kesmek karşıdakini değersiz hissettirir ve iletişimi engeller.' },
      { seviye: 3, soru: P('Bir öğrenci, sosyal medyada gördüğü "Yarın okullar tatil!" mesajını hemen arkadaşlarıyla paylaşmak yerine önce Millî Eğitim Bakanlığının ve valiliğin resmî hesaplarını kontrol etmiştir.') + 'Bu öğrencinin davranışı en çok hangi özellikle ilişkilidir?', secenekler: ['Bilinçli medya okuryazarlığı', 'Özel hayatın gizliliği', 'Basın özgürlüğü', 'Sözsüz iletişim'], dogru: 0, cozum: 'Öğrenci haberi doğrulamadan yaymamış, güvenilir kaynaklardan kontrol etmiştir: <b>bilinçli medya okuryazarlığı</b>.' },
      { seviye: 3, soru: 'Bir kişinin izni olmadan fotoğraflarının internette paylaşılması aşağıdaki haklardan hangisinin ihlalidir?', secenekler: ['Eğitim hakkı', 'Seyahat özgürlüğü', 'Özel hayatın gizliliği', 'Mülkiyet hakkı'], dogru: 2, cozum: 'Kişinin fotoğrafları onun özel hayatına aittir. İzinsiz paylaşım <b>özel hayatın gizliliği</b> hakkını ihlal eder.' }
    ]
  });

  /* ---------- 2. OSMANLI KURULUŞ ---------- */
  konular.push({
    id: 'kurulus', ad: 'Anadolu\'da Türkler ve Osmanlı\'nın Kuruluşu', ikon: '🏰', ozet: 'Malazgirt, beylikler, Osman ve Orhan Bey',
    anlatim: `
<div class="blok"><h3>Anadolu'nun Türk yurdu oluşu</h3>
<figure>${zaman([['1071', 'Malazgirt', 'Anadolu kapısı açıldı'], ['1176', 'Miryokefalon', 'Anadolu Türk yurdu'], ['1243', 'Kösedağ', 'Moğol baskısı'], ['1299', 'Osmanlı', 'kuruluş']])}</figure>
<ul><li><b>Malazgirt (1071):</b> Büyük Selçuklu Sultanı Alparslan, Bizans'ı yendi; Anadolu'nun kapıları Türklere açıldı.</li>
<li><b>Miryokefalon (1176):</b> Türkiye Selçuklu Sultanı II. Kılıç Arslan Bizans'ı yendi; Bizans'ın Türkleri Anadolu'dan çıkarma umudu sona erdi.</li>
<li><b>Kösedağ (1243):</b> Moğollara yenilen Türkiye Selçukluları zayıfladı, Anadolu'da <b>beylikler dönemi</b> başladı.</li></ul></div>
<div class="blok"><h3>Osmanlı Beyliği'nin kuruluşu</h3>
<p>Osmanlı Beyliği 1299'da <b>Söğüt ve Domaniç</b> çevresinde Osman Bey tarafından kuruldu. Bizans sınırında olması, gaza (cihat) anlayışı ve adaletli yönetim hızla büyümesini sağladı.</p>
${tablo(['Hükümdar', 'Önemli gelişmeler'], [['Osman Bey', 'Bafeus (Koyunhisar) Savaşı (1302): Bizans\'la ilk savaş'], ['Orhan Bey', 'Bursa\'nın alınması (1326) ve başkent yapılması, ilk Osmanlı parası (akçe), ilk düzenli ordu (yaya ve müsellem), ilk medrese (İznik), Rumeli\'ye geçiş'], ['I. Murat', 'Edirne\'nin alınması, Sırpsındığı (1364), I. Kosova (1389)'], ['Yıldırım Bayezid', 'Ankara Savaşı\'nda (1402) Timur\'a yenilgi → Fetret Devri']])}
<div class="ipucu">✅ "İlk"leri hatırlamak için: <b>Orhan Bey</b> döneminde devletleşme başladı (para, ordu, medrese).</div></div>
<div class="blok"><h3>Fetret Devri</h3><p>Ankara Savaşı'ndan sonra Yıldırım Bayezid'in oğulları arasında taht kavgası yaşandı (1402–1413). Bu karışık döneme <b>Fetret Devri</b> denir. Çelebi Mehmet devletin birliğini yeniden sağladı.</p></div>`,
    sorular: [
      { seviye: 1, soru: 'Anadolu\'nun kapılarını Türklere açan savaş aşağıdakilerden hangisidir?', secenekler: ['Kösedağ Savaşı', 'Malazgirt Savaşı', 'Ankara Savaşı', 'Mohaç Savaşı'], dogru: 1, cozum: '1071 <b>Malazgirt</b> Zaferi ile Alparslan Bizans\'ı yenmiş ve Anadolu\'nun kapıları Türklere açılmıştır.' },
      { seviye: 1, soru: 'Osmanlı Beyliği hangi bölgede kurulmuştur?', secenekler: ['Söğüt ve Domaniç çevresi', 'Konya ve Karaman çevresi', 'Edirne çevresi', 'Kayseri ve Sivas çevresi'], dogru: 0, cozum: 'Osman Bey Osmanlı Beyliği\'ni <b>Söğüt ve Domaniç</b> çevresinde kurmuştur.' },
      { seviye: 2, soru: 'Osmanlı Devleti\'nde ilk paranın basılması, ilk düzenli ordunun kurulması ve ilk medresenin açılması hangi hükümdar döneminde gerçekleşmiştir?', secenekler: ['Osman Bey', 'I. Murat', 'Orhan Bey', 'Yıldırım Bayezid'], dogru: 2, cozum: 'Akçe, yaya-müsellem ordusu ve İznik Medresesi <b>Orhan Bey</b> dönemindedir.' },
      { seviye: 2, soru: 'Türkiye Selçuklu Devleti\'nin Moğollara yenildiği ve Anadolu\'da beylikler döneminin başlamasına yol açan savaş hangisidir?', secenekler: ['Miryokefalon', 'Malazgirt', 'Kösedağ', 'Sırpsındığı'], dogru: 2, cozum: '1243 <b>Kösedağ</b> yenilgisiyle Türkiye Selçukluları zayıflamış, beylikler ortaya çıkmıştır.' },
      { seviye: 3, soru: zaman([['1071', 'I'], ['1176', 'II'], ['1243', 'III'], ['1402', 'IV']]) + 'Zaman çizelgesinde numaralandırılan olaylarla ilgili aşağıdaki eşleştirmelerden hangisi <b>doğrudur</b>?', secenekler: ['I – Kösedağ Savaşı', 'II – Miryokefalon Savaşı', 'III – Ankara Savaşı', 'IV – Malazgirt Savaşı'], dogru: 1, cozum: '1071 Malazgirt, 1176 <b>Miryokefalon</b>, 1243 Kösedağ, 1402 Ankara Savaşı\'dır.' },
      { seviye: 3, soru: P('Ankara Savaşı\'ndan sonra Yıldırım Bayezid\'in oğulları arasında taht mücadelesi başlamış, Osmanlı toprakları bir süre parçalı bir görünüm kazanmıştır. Çelebi Mehmet bu mücadeleyi kazanarak devletin birliğini yeniden sağlamıştır.') + 'Metinde anlatılan döneme ne ad verilir?', secenekler: ['Lale Devri', 'Fetret Devri', 'Beylikler Dönemi', 'Islahat Dönemi'], dogru: 1, cozum: '1402–1413 arasındaki taht kavgası dönemine <b>Fetret Devri</b> denir.' },
      { seviye: 2, soru: 'Bizans\'ın Türkleri Anadolu\'dan çıkarma umudunu sona erdiren savaş aşağıdakilerden hangisidir?', secenekler: ['Miryokefalon Savaşı', 'Bafeus Savaşı', 'Kösedağ Savaşı', 'I. Kosova Savaşı'], dogru: 0, cozum: '1176 <b>Miryokefalon</b> Zaferi ile Anadolu\'nun Türk yurdu olduğu kesinleşmiştir.' }
    ]
  });

  /* ---------- 3. OSMANLI YÜKSELİŞİ ---------- */
  konular.push({
    id: 'yukselis', ad: 'İstanbul\'un Fethi ve Osmanlı\'nın Yükselişi', ikon: '⚔️', ozet: 'Fatih, Yavuz, Kanuni; devlet teşkilatı',
    anlatim: `
<div class="blok"><h3>İstanbul'un Fethi (1453)</h3>
<p>II. Mehmet (Fatih), 29 Mayıs 1453'te İstanbul'u fethetti. Gemiler karadan yürütüldü, büyük toplar kullanıldı.</p>
<ul><li>Orta Çağ kapandı, Yeni Çağ başladı.</li><li>İstanbul başkent oldu; Osmanlı'nın iki yakası (Anadolu ve Rumeli) birleşti.</li><li>Bizans İmparatorluğu sona erdi.</li></ul></div>
<div class="blok"><h3>Yükselme dönemi önemli olaylar</h3>
<figure>${zaman([['1453', 'İstanbul', 'Fatih'], ['1514', 'Çaldıran', 'Yavuz'], ['1517', 'Ridaniye', 'halifelik'], ['1526', 'Mohaç', 'Kanuni'], ['1538', 'Preveze', 'Barbaros']])}</figure>
<ul><li><b>Yavuz Sultan Selim:</b> Çaldıran (1514, Safevîler), Mercidabık (1516) ve Ridaniye (1517, Memlükler). Mısır seferi sonucunda <b>halifelik</b> Osmanlı'ya geçti.</li>
<li><b>Kanuni Sultan Süleyman:</b> Belgrad (1521), Rodos (1522), Mohaç (1526) ile Macaristan; Barbaros Hayreddin Paşa komutasında <b>Preveze Deniz Zaferi (1538)</b> ile Akdeniz Türk gölü oldu.</li></ul></div>
<div class="blok"><h3>Devlet teşkilatı</h3>
${tablo(['Kurum', 'Görevi'], [['Divan-ı Hümayun', 'Devlet işlerinin görüşüldüğü meclis'], ['Tımar sistemi', 'Toprağın vergisi karşılığında asker (tımarlı sipahi) yetiştirilmesi'], ['Devşirme sistemi', 'Hristiyan ailelerden alınan çocukların eğitilip yönetici ve asker olarak yetiştirilmesi'], ['Kapıkulu ocakları', 'Padişaha bağlı maaşlı merkez ordusu (yeniçeriler)']])}</div>`,
    sorular: [
      { seviye: 1, soru: 'İstanbul hangi yılda fethedilmiştir?', secenekler: ['1071', '1299', '1453', '1517'], dogru: 2, cozum: 'İstanbul, II. Mehmet tarafından <b>1453</b>\'te fethedilmiştir.' },
      { seviye: 1, soru: 'Preveze Deniz Zaferi\'nde Osmanlı donanmasının komutanı kimdir?', secenekler: ['Piri Reis', 'Barbaros Hayreddin Paşa', 'Seydi Ali Reis', 'Turgut Reis'], dogru: 1, cozum: '1538 Preveze Deniz Zaferi\'ni <b>Barbaros Hayreddin Paşa</b> kazanmıştır.' },
      { seviye: 2, soru: 'Halifeliğin Osmanlı Devleti\'ne geçmesi aşağıdaki seferlerden hangisinin sonucudur?', secenekler: ['Mısır Seferi', 'Rodos Seferi', 'Belgrad Seferi', 'Çaldıran Seferi'], dogru: 0, cozum: 'Yavuz Sultan Selim\'in Memlüklere karşı düzenlediği <b>Mısır Seferi</b> (Mercidabık 1516, Ridaniye 1517) sonucunda halifelik Osmanlı\'ya geçmiştir.' },
      { seviye: 2, soru: 'Osmanlı Devleti\'nde toprağın vergi geliri karşılığında asker yetiştirilmesini sağlayan sistem hangisidir?', secenekler: ['Devşirme', 'İltizam', 'Tımar', 'Lonca'], dogru: 2, cozum: '<b>Tımar sistemi</b>nde dirlik sahipleri topraktan aldıkları vergi karşılığında tımarlı sipahi yetiştirirdi.' },
      { seviye: 3, soru: 'İstanbul\'un fethinin sonuçları arasında aşağıdakilerden hangisi <b>yoktur</b>?', secenekler: ['Orta Çağ\'ın kapanıp Yeni Çağ\'ın başlaması', 'Bizans İmparatorluğu\'nun sona ermesi', 'Anadolu ve Rumeli topraklarının birleşmesi', 'Halifeliğin Osmanlı\'ya geçmesi'], dogru: 3, cozum: 'Halifelik 1517\'de Yavuz Sultan Selim\'in Mısır Seferi ile geçmiştir; İstanbul\'un fethiyle ilgisi yoktur.' },
      { seviye: 3, soru: P('Osmanlı Devleti, savaşlarda esir alınan ya da Hristiyan ailelerden alınan çocukları Türk-İslam kültürüyle yetiştirmiş; bunlardan yetenekli olanlar Enderun\'da eğitilerek sadrazam, vezir ve komutan olmuştur.') + 'Metinde anlatılan uygulama aşağıdakilerden hangisidir?', secenekler: ['Tımar sistemi', 'Devşirme sistemi', 'Divan teşkilatı', 'Ahilik teşkilatı'], dogru: 1, cozum: 'Hristiyan ailelerden çocuk alınıp yetiştirilmesi <b>devşirme sistemi</b>dir.' },
      { seviye: 2, soru: 'Aşağıdaki savaşlardan hangisi Kanuni Sultan Süleyman döneminde yapılmıştır?', secenekler: ['Çaldıran Savaşı', 'Otlukbeli Savaşı', 'Mohaç Savaşı', 'Ankara Savaşı'], dogru: 2, cozum: '1526 <b>Mohaç</b> Meydan Muharebesi Kanuni döneminde kazanılmıştır. Çaldıran Yavuz, Otlukbeli Fatih, Ankara Yıldırım dönemindedir.' }
    ]
  });

  /* ---------- 4. NÜFUS VE YERLEŞME ---------- */
  konular.push({
    id: 'nufus', ad: 'Nüfus, Yerleşme ve Göç', ikon: '🏙️', ozet: 'Nüfus dağılımı, göç nedenleri ve sonuçları',
    anlatim: `
<div class="blok"><h3>Nüfusun dağılışını etkileyen faktörler</h3>
${tablo(['Doğal faktörler', 'Beşerî ve ekonomik faktörler'], [['İklim (ılıman yerler kalabalık)', 'Sanayi ve iş imkânı'], ['Yer şekilleri (düz alanlar kalabalık)', 'Ulaşım kolaylığı'], ['Su kaynakları', 'Ticaret, turizm, eğitim ve sağlık imkânları'], ['Toprak verimliliği', 'Tarihî ve kültürel özellikler']])}
<p>Türkiye'de kıyılar, sanayi bölgeleri ve büyükşehirler kalabalık; yüksek ve engebeli Doğu Anadolu'nun bazı bölümleri ile iç kesimlerdeki kurak alanlar seyrek nüfusludur.</p></div>
<div class="blok"><h3>Göç</h3>
<figure>${akis([['İtici', 'işsizlik, afet', 'fr'], ['GÖÇ', 'yer değiştirme', 'fw'], ['Çekici', 'iş, eğitim, sağlık', 'fg']])}</figure>
<ul><li><b>İç göç:</b> Ülke içinde yer değiştirme (köyden kente).</li><li><b>Dış göç:</b> Ülkeler arası göç (beyin göçü, işçi göçü).</li></ul>
<div class="dikkat">⚠️ Göç alan şehirlerde: konut, altyapı, trafik ve işsizlik sorunları; göç veren yerlerde: nüfusun yaşlanması ve tarımda iş gücü azalması görülür.</div>
<div class="bilgi">💡 Türkiye'de nüfus sayımları günümüzde <b>Adrese Dayalı Nüfus Kayıt Sistemi</b> ile TÜİK tarafından yapılır.</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Aşağıdakilerden hangisi nüfusun dağılışını etkileyen <b>doğal</b> faktörlerdendir?', secenekler: ['Sanayi', 'Ulaşım', 'İklim', 'Turizm'], dogru: 2, cozum: 'İklim insanın etkisi olmadan oluşan <b>doğal</b> bir faktördür. Diğerleri beşerî ve ekonomik faktörlerdir.' },
      { seviye: 1, soru: 'Köyden kente yapılan göç aşağıdakilerden hangisine örnektir?', secenekler: ['Dış göç', 'İç göç', 'Beyin göçü', 'Mevsimlik dış göç'], dogru: 1, cozum: 'Ülke içinde gerçekleşen yer değiştirme <b>iç göç</b>tür.' },
      { seviye: 2, soru: 'Aşağıdakilerden hangisi göç için <b>çekici</b> bir faktördür?', secenekler: ['Doğal afetler', 'İş imkânlarının fazla olması', 'Toprakların verimsiz olması', 'Eğitim olanaklarının yetersizliği'], dogru: 1, cozum: 'İnsanları bir yere doğru çeken neden çekici faktördür: <b>iş imkânı</b>. Diğerleri insanları bulunduğu yerden iten faktörlerdir.' },
      { seviye: 2, soru: 'Yoğun göç alan büyükşehirlerde aşağıdaki sorunlardan hangisinin görülmesi <b>beklenmez</b>?', secenekler: ['Trafik sıkışıklığı', 'Konut yetersizliği', 'Tarım alanlarında iş gücünün azalması', 'Altyapı yetersizliği'], dogru: 2, cozum: 'Tarımda iş gücü azalması <b>göç veren</b> kırsal alanların sorunudur.' },
      { seviye: 3, soru: 'Aşağıdaki tabloda bazı ilçelerin özellikleri verilmiştir.' + tablo(['İlçe', 'Yer şekli', 'Sanayi', 'İklim'], [['K', 'Düz ova', 'Gelişmiş', 'Ilıman'], ['L', 'Dağlık', 'Yok', 'Sert'], ['M', 'Plato', 'Az', 'Kurak'], ['N', 'Dağlık', 'Az', 'Ilıman']]) + 'Buna göre nüfusun en <b>yoğun</b> olması beklenen ilçe hangisidir?', secenekler: ['K', 'L', 'M', 'N'], dogru: 0, cozum: 'Düz yer şekli, gelişmiş sanayi ve ılıman iklim nüfusu artıran özelliklerin hepsi <b>K</b> ilçesinde vardır.' },
      { seviye: 3, soru: P('Yüksek öğrenim gören doktor, mühendis ve bilim insanlarının daha iyi çalışma koşulları için başka ülkelere gitmesi ülkemizin önemli sorunlarındandır.') + 'Metinde anlatılan göç türü hangisidir?', secenekler: ['Mevsimlik göç', 'Zorunlu göç', 'Beyin göçü', 'İç göç'], dogru: 2, cozum: 'Nitelikli ve eğitimli insanların başka ülkelere göçü <b>beyin göçü</b>dür.' }
    ]
  });

  /* ---------- 5. EKONOMİ VE SOSYAL HAYAT ---------- */
  konular.push({
    id: 'ekonomi', ad: 'Ekonomi ve Sosyal Hayat', ikon: '🏪', ozet: 'Ahilik, lonca, vakıf, kervansaray, meslekler',
    anlatim: `
<div class="blok"><h3>Türk-İslam dünyasında ekonomik kurumlar</h3>
${tablo(['Kurum', 'Özelliği'], [['<b>Ahilik</b>', 'Ahi Evran öncülüğünde 13. yüzyılda Anadolu\'da kurulan esnaf ve sanatkâr teşkilatı. Mesleki eğitim + ahlak eğitimi'], ['<b>Lonca</b>', 'Osmanlı\'da Ahiliğin devamı olan esnaf örgütü; fiyat ve kaliteyi denetlerdi'], ['<b>Vakıf</b>', 'Bir malın gelirinin sürekli olarak bir hayır işine ayrılması (çeşme, cami, imaret, medrese)'], ['<b>Kervansaray</b>', 'Ticaret yolları üzerinde tüccarların konakladığı güvenli yapılar']])}
<figure>${akis([['Çırak', 'öğrenir', 'fi'], ['Kalfa', 'ustalaşır', 'fw'], ['Usta', 'iş yeri açar', 'fg']])}<figcaption>Ahilik ve loncalarda meslek eğitimi basamakları</figcaption></figure>
<div class="ipucu">✅ Ahilik ilkeleri: dürüstlük, kaliteli üretim, yardımlaşma, israftan kaçınma, ölçü ve tartıda hile yapmamak.</div></div>
<div class="blok"><h3>Üretim, dağıtım, tüketim</h3>
<p>Üretilen mallar ulaşım ağlarıyla tüketiciye ulaşır. Teknolojinin gelişmesiyle bazı meslekler ortadan kalkmış, yazılım uzmanlığı, veri analistliği gibi yeni meslekler ortaya çıkmıştır.</p>
<p><b>Bilinçli tüketici:</b> İhtiyacı kadar alır, fiş/fatura ister, son kullanma tarihine bakar, hakkını Tüketici Hakem Heyetinde arar.</p></div>`,
    sorular: [
      { seviye: 1, soru: 'Anadolu\'da 13. yüzyılda Ahi Evran öncülüğünde kurulan esnaf ve sanatkâr teşkilatı hangisidir?', secenekler: ['Lonca', 'Ahilik', 'Vakıf', 'Divan'], dogru: 1, cozum: '<b>Ahilik</b> teşkilatı Ahi Evran öncülüğünde kurulmuştur.' },
      { seviye: 1, soru: 'Bir malın gelirinin sürekli olarak bir hayır işine ayrılmasıyla oluşan kurum aşağıdakilerden hangisidir?', secenekler: ['Vakıf', 'Kervansaray', 'Medrese', 'Lonca'], dogru: 0, cozum: 'Gelirin hayır işine ayrılmasıyla <b>vakıf</b> kurulur.' },
      { seviye: 2, soru: 'Ahilik teşkilatında meslek eğitiminin doğru sıralaması hangisidir?', secenekler: ['Usta → Kalfa → Çırak', 'Kalfa → Çırak → Usta', 'Çırak → Kalfa → Usta', 'Çırak → Usta → Kalfa'], dogru: 2, cozum: 'Mesleğe <b>çırak</b> olarak başlanır, <b>kalfa</b> olunur, sonunda <b>usta</b> olunur.' },
      { seviye: 2, soru: 'Ticaret yolları üzerinde tüccarların güvenle konaklamasını sağlayan yapılar aşağıdakilerden hangisidir?', secenekler: ['Darüşşifa', 'Kervansaray', 'İmaret', 'Bedesten'], dogru: 1, cozum: 'Ticaret yollarındaki konaklama yapıları <b>kervansaray</b>dır.' },
      { seviye: 3, soru: P('Ahi teşkilatına bağlı bir esnaf, kusurlu ürettiği bir ayakkabıyı satmaz; eksik tartan ya da müşterisini aldatan esnaf ise teşkilattan uzaklaştırılırdı.') + 'Bu bilgiler Ahiliğin hangi ilkesini ön plana çıkarmaktadır?', secenekler: ['Dürüst ve kaliteli üretim', 'Devlet yönetimine katılım', 'Askerî eğitim', 'Dış ticareti artırma'], dogru: 0, cozum: 'Kusurlu ürün satmamak ve hile yapmamak <b>dürüstlük ve kaliteli üretim</b> ilkesidir.' },
      { seviye: 3, soru: 'Aşağıdakilerden hangisi bilinçli bir tüketicinin davranışı <b>değildir</b>?', secenekler: ['Satın aldığı ürünün fişini istemek', 'Son kullanma tarihini kontrol etmek', 'İndirim var diye ihtiyacı olmayan ürünler almak', 'Ayıplı ürün için Tüketici Hakem Heyetine başvurmak'], dogru: 2, cozum: 'İhtiyaç dışı alışveriş israftır; bilinçli tüketici <b>ihtiyacı kadar</b> alır.' }
    ]
  });

  /* ---------- 6. BİLİM VE TEKNOLOJİ ---------- */
  konular.push({
    id: 'bilim', ad: 'Bilim ve Teknolojinin Gelişimi', ikon: '🔭', ozet: 'Türk-İslam bilginleri, matbaa, Rönesans',
    anlatim: `
<div class="blok"><h3>Türk-İslam bilginleri</h3>
${tablo(['Bilgin', 'Alanı ve katkısı'], [['Harezmi', 'Matematik: cebirin kurucusu; "algoritma" kavramı'], ['İbn-i Sina', 'Tıp: <i>El-Kanun fi\'t-Tıb</i> yüzyıllarca Avrupa\'da ders kitabı oldu'], ['Biruni', 'Astronomi, coğrafya: Dünya\'nın çevresini hesapladı'], ['Uluğ Bey', 'Astronomi: Semerkant\'ta gözlemevi kurdu'], ['Ali Kuşçu', 'Astronomi ve matematik: İstanbul\'da çalışmalar'], ['Cezeri', 'Mekanik: otomatik makineler (sibernetiğin öncüsü)'], ['Piri Reis', 'Denizcilik: <i>Kitab-ı Bahriye</i> ve dünya haritası']])}</div>
<div class="blok"><h3>Avrupa'da bilimsel gelişmeler ve matbaa</h3>
<ul><li><b>Matbaa:</b> Avrupa'da 15. yüzyılda Gutenberg geliştirdi; bilgi hızla yayıldı.</li>
<li>Osmanlı'da ilk Türk matbaası <b>İbrahim Müteferrika</b> tarafından <b>1727</b>'de kuruldu.</li>
<li><b>Rönesans:</b> Avrupa'da bilim ve sanatta yeniden doğuş; özgür düşünce gelişti.</li></ul>
<figure>${akis([['Yazı', 'bilgiyi kaydetme', 'fi'], ['Kâğıt', 'kolay yazım', 'fw'], ['Matbaa', 'hızlı çoğaltma', 'fg'], ['İnternet', 'anında paylaşım', 'fr']])}<figcaption>Bilginin aktarımında dönüm noktaları</figcaption></figure></div>`,
    sorular: [
      { seviye: 1, soru: 'Osmanlı Devleti\'nde ilk Türk matbaasını kuran kişi kimdir?', secenekler: ['Piri Reis', 'İbrahim Müteferrika', 'Evliya Çelebi', 'Katip Çelebi'], dogru: 1, cozum: 'İlk Türk matbaasını 1727\'de <b>İbrahim Müteferrika</b> kurmuştur.' },
      { seviye: 1, soru: 'Cebirin kurucusu kabul edilen ve "algoritma" kavramına adını veren bilgin kimdir?', secenekler: ['Harezmi', 'İbn-i Sina', 'Cezeri', 'Uluğ Bey'], dogru: 0, cozum: 'Cebirin kurucusu <b>Harezmi</b>\'dir; algoritma sözcüğü onun adından gelir.' },
      { seviye: 2, soru: '"El-Kanun fi\'t-Tıb" adlı eseri yüzyıllarca Avrupa üniversitelerinde ders kitabı olarak okutulan bilgin kimdir?', secenekler: ['Biruni', 'Ali Kuşçu', 'İbn-i Sina', 'Farabi'], dogru: 2, cozum: 'Tıp alanındaki bu eser <b>İbn-i Sina</b>\'ya aittir.' },
      { seviye: 2, soru: 'Kitab-ı Bahriye adlı eseri yazan ve ünlü dünya haritasını çizen denizcimiz kimdir?', secenekler: ['Barbaros Hayreddin Paşa', 'Seydi Ali Reis', 'Piri Reis', 'Turgut Reis'], dogru: 2, cozum: '<b>Piri Reis</b> Kitab-ı Bahriye\'yi yazmış ve dünya haritasını çizmiştir.' },
      { seviye: 3, soru: 'Aşağıdaki bilgin ve çalışma alanı eşleştirmelerinden hangisi <b>yanlıştır</b>?', secenekler: ['Uluğ Bey – Astronomi', 'Cezeri – Mekanik', 'Biruni – Coğrafya', 'Harezmi – Tıp'], dogru: 3, cozum: 'Harezmi bir <b>matematik</b> bilginidir; tıp alanında İbn-i Sina öne çıkar.' },
      { seviye: 3, soru: P('Matbaanın yaygınlaşmasıyla kitaplar daha ucuz ve hızlı çoğaltılmaya başlanmış, okuma yazma bilenlerin sayısı artmış, bilimsel bilgiler kısa sürede geniş kitlelere ulaşmıştır.') + 'Bu metinden aşağıdaki yargılardan hangisine ulaşılabilir?', secenekler: ['Matbaa yalnızca dinî kitaplar için kullanılmıştır.', 'Teknolojik gelişmeler bilginin yayılmasını hızlandırır.', 'Matbaa ilk olarak Osmanlı\'da icat edilmiştir.', 'Kitapların fiyatı matbaadan sonra artmıştır.'], dogru: 1, cozum: 'Metin matbaanın bilgiyi hızlı ve geniş kitlelere ulaştırdığını anlatır: <b>teknolojik gelişmeler bilginin yayılmasını hızlandırır</b>.' }
    ]
  });

  /* ---------- 7. ETKİN VATANDAŞLIK ---------- */
  konular.push({
    id: 'vatandaslik', ad: 'Etkin Vatandaşlık ve Demokrasi', ikon: '🗳️', ozet: 'Demokrasi, güçler ayrılığı, haklar ve sorumluluklar',
    anlatim: `
<div class="blok"><h3>Demokrasi</h3>
<p>Halkın kendi kendini seçtiği temsilcilerle yönettiği yönetim biçimidir. Temel ilkeleri: <b>eşitlik, özgürlük, adalet, seçim, çoğulculuk, hukukun üstünlüğü</b>.</p>
<div class="bilgi">💡 Türkiye'de 18 yaşını dolduran her vatandaş seçme hakkına sahiptir.</div></div>
<div class="blok"><h3>Güçler ayrılığı</h3>
<figure><svg class="fig" viewBox="0 0 440 190">
<rect x="150" y="6" width="140" height="40" rx="10" class="fa"/><text x="220" y="31" text-anchor="middle" style="fill:#fff">ANAYASA</text>
<path class="lm" d="M220 46 V62 M75 62 H365 M75 62 V78 M220 62 V78 M365 62 V78"/>
<rect x="8" y="78" width="134" height="100" rx="12" class="fi bi"/><text x="75" y="104" text-anchor="middle">Yasama</text><text x="75" y="128" text-anchor="middle" class="m">TBMM</text><text x="75" y="150" text-anchor="middle" class="m">kanun yapar</text>
<rect x="153" y="78" width="134" height="100" rx="12" class="fw bi"/><text x="220" y="104" text-anchor="middle">Yürütme</text><text x="220" y="128" text-anchor="middle" class="m">Cumhurbaşkanı</text><text x="220" y="150" text-anchor="middle" class="m">kanunu uygular</text>
<rect x="298" y="78" width="134" height="100" rx="12" class="fg bi"/><text x="365" y="104" text-anchor="middle">Yargı</text><text x="365" y="128" text-anchor="middle" class="m">Mahkemeler</text><text x="365" y="150" text-anchor="middle" class="m">karar verir</text>
</svg></figure>
<p>Türkiye Büyük Millet Meclisi <b>600</b> milletvekilinden oluşur. Anayasa devletin temel kanunudur; hiçbir kanun Anayasa'ya aykırı olamaz.</p></div>
<div class="blok"><h3>Haklar ve sorumluluklar</h3>
<p>Her hak beraberinde sorumluluk getirir: Eğitim hakkı → okula düzenli gitmek; çevre hakkı → çevreyi korumak; seçme hakkı → oy kullanmak.</p>
<div class="ipucu">✅ Etkin vatandaş; sivil toplum kuruluşlarına (STK) katılır, kamu malını korur, vergisini öder, haklarını yasal yollarla arar.</div></div>`,
    sorular: [
      { seviye: 1, soru: 'Türkiye\'de kanun yapma (yasama) yetkisi hangisine aittir?', secenekler: ['Cumhurbaşkanı', 'Türkiye Büyük Millet Meclisi', 'Anayasa Mahkemesi', 'Valilikler'], dogru: 1, cozum: 'Yasama yetkisi <b>TBMM</b>\'ye aittir.' },
      { seviye: 1, soru: 'Devletin temel kanunu olan ve diğer kanunların aykırı olamayacağı belge hangisidir?', secenekler: ['Yönetmelik', 'Genelge', 'Anayasa', 'Tüzük'], dogru: 2, cozum: 'Devletin temel kanunu <b>Anayasa</b>\'dır.' },
      { seviye: 2, soru: 'Aşağıdakilerden hangisi demokrasinin temel ilkelerinden biri <b>değildir</b>?', secenekler: ['Hukukun üstünlüğü', 'Çoğulculuk', 'Yetkinin tek kişide toplanması', 'Serbest seçim'], dogru: 2, cozum: 'Demokraside yetki tek kişide toplanmaz; <b>güçler ayrılığı</b> esastır.' },
      { seviye: 2, soru: 'Türkiye Büyük Millet Meclisi kaç milletvekilinden oluşur?', secenekler: ['450', '550', '600', '650'], dogru: 2, cozum: 'TBMM <b>600</b> milletvekilinden oluşur.' },
      { seviye: 3, soru: 'Aşağıdaki hak ve sorumluluk eşleştirmelerinden hangisi <b>yanlıştır</b>?', secenekler: ['Eğitim hakkı – Okula düzenli devam etmek', 'Sağlıklı çevrede yaşama hakkı – Çevreyi temiz tutmak', 'Seçme hakkı – Vergi ödememek', 'Mülkiyet hakkı – Başkasının malına zarar vermemek'], dogru: 2, cozum: 'Seçme hakkının sorumluluğu <b>oy kullanmak</b>tır. Vergi ödemek ise her vatandaşın görevidir.' },
      { seviye: 3, soru: P('Bir mahallede yaşayanlar, parkın bakımsız olduğunu fark edince belediyeye dilekçe vermiş, bir derneğin desteğiyle ağaç dikme etkinliği düzenlemiştir.') + 'Mahalle sakinlerinin bu davranışı en çok hangi kavramla ilişkilidir?', secenekler: ['Etkin vatandaşlık', 'Güçler ayrılığı', 'Beyin göçü', 'Tüketici hakları'], dogru: 0, cozum: 'Sorunlara karşı duyarlı olup yasal yollarla çözüm aramak ve STK\'larla iş birliği yapmak <b>etkin vatandaşlık</b>tır.' }
    ]
  });

  /* ---------- 8. KÜRESEL BAĞLANTILAR ---------- */
  konular.push({
    id: 'kuresel', ad: 'Küresel Bağlantılar', ikon: '🌍', ozet: 'Ticaret yolları, uluslararası kuruluşlar',
    anlatim: `
<div class="blok"><h3>Tarihî ticaret yolları</h3>
<p><b>İpek Yolu</b> Çin'den başlayıp Orta Asya ve Anadolu üzerinden Avrupa'ya uzanırdı; ipek, porselen, baharat taşınırdı. <b>Baharat Yolu</b> ise Hindistan'dan Kızıldeniz ve Basra Körfezi üzerinden Akdeniz'e ulaşırdı.</p>
<div class="dikkat">⚠️ Coğrafi Keşifler (15–16. yüzyıl) sonrasında Ümit Burnu yolunun bulunmasıyla bu yollar önemini kaybetti; Akdeniz limanları zayıfladı.</div></div>
<div class="blok"><h3>Uluslararası kuruluşlar</h3>
${tablo(['Kuruluş', 'Amacı', 'Türkiye'], [['Birleşmiş Milletler (BM)', 'Dünya barışını korumak (1945)', 'Kurucu üye'], ['NATO', 'Askerî savunma iş birliği', '1952\'de üye'], ['Türk Devletleri Teşkilatı', 'Türk dünyası arasında iş birliği', 'Kurucu üye'], ['İslam İşbirliği Teşkilatı', 'İslam ülkeleri arasında dayanışma', 'Üye']])}
<p>Türkiye; Asya, Avrupa ve Afrika'ya yakınlığı, boğazları ve enerji koridorları sayesinde stratejik bir <b>köprü</b> ülkedir.</p></div>`,
    sorular: [
      { seviye: 1, soru: 'Çin\'den başlayıp Orta Asya ve Anadolu üzerinden Avrupa\'ya uzanan tarihî ticaret yolu hangisidir?', secenekler: ['Baharat Yolu', 'Kral Yolu', 'İpek Yolu', 'Kürk Yolu'], dogru: 2, cozum: 'Çin\'den Avrupa\'ya uzanan yol <b>İpek Yolu</b>\'dur.' },
      { seviye: 1, soru: 'Dünya barışını korumak amacıyla 1945\'te kurulan ve Türkiye\'nin kurucu üyesi olduğu kuruluş hangisidir?', secenekler: ['Birleşmiş Milletler', 'NATO', 'Avrupa Birliği', 'Türk Devletleri Teşkilatı'], dogru: 0, cozum: '1945\'te kurulan <b>Birleşmiş Milletler</b>\'in Türkiye kurucu üyesidir.' },
      { seviye: 2, soru: 'Coğrafi Keşiflerden sonra İpek ve Baharat yollarının önemini kaybetmesi aşağıdakilerden hangisini olumsuz etkilemiştir?', secenekler: ['Okyanus kıyısındaki Avrupa limanlarını', 'Akdeniz\'deki ticaret limanlarını', 'Amerika kıtasının keşfini', 'Atlas Okyanusu ticaretini'], dogru: 1, cozum: 'Yeni deniz yolu ticaret yönünü okyanuslara çevirmiş, <b>Akdeniz limanları</b> önemini kaybetmiştir.' },
      { seviye: 3, soru: P('Türkiye; Asya, Avrupa ve Afrika kıtalarının birbirine en çok yaklaştığı yerde bulunur. Boğazları ve petrol-doğal gaz boru hatları sayesinde ülkeler arasında önemli bir geçiş noktasıdır.') + 'Metinde Türkiye\'nin hangi özelliği vurgulanmaktadır?', secenekler: ['İklim çeşitliliği', 'Nüfusunun genç olması', 'Stratejik konumu', 'Tarım ürünlerinin çeşitliliği'], dogru: 2, cozum: 'Kıtalar arasında köprü olması ve geçiş noktası olması <b>stratejik konum</b>u anlatır.' },
      { seviye: 2, soru: 'Türk dünyası arasında ekonomik, kültürel ve siyasi iş birliğini geliştirmek amacıyla kurulan kuruluş hangisidir?', secenekler: ['NATO', 'Türk Devletleri Teşkilatı', 'Dünya Sağlık Örgütü', 'UNICEF'], dogru: 1, cozum: '<b>Türk Devletleri Teşkilatı</b> Türk dünyası arasında iş birliğini amaçlar.' }
    ]
  });

  return { id: 'sosyal', ad: 'Sosyal Bilgiler', kisa: 'Sosyal', ikon: '🌍', aciklama: '7. sınıf konuları · LGS sözel bölüm', konular };
})();
