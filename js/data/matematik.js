/* 7. Sınıf Matematik — konu anlatımları, çizimler, sorular ve soru üreticileri */
window.LGS_MAT = (function () {
  'use strict';
  const { rnd, pick, N, D, F, fr, frH, ex, mc } = window.U;
  const PS = n => (n < 0 ? `(${N(n)})` : `(+${n})`);
  const nz = (r, a, b) => { let v = 0; while (v === 0) v = rnd(r, a, b); return v; };
  const S = s => s; // metin seçenekleri için biçimlendirici
  const yuzde = v => '%' + String(v).replace('.', ',');

  /* ===================== ÇİZİM YARDIMCILARI ===================== */
  function okUcu(x, y, dx, dy, cls) {
    const L = Math.hypot(dx, dy) || 1; const ux = dx / L, uy = dy / L;
    const p1 = [x - 9 * ux + 5 * uy, y - 9 * uy - 5 * ux], p2 = [x - 9 * ux - 5 * uy, y - 9 * uy + 5 * ux];
    return `<polygon class="${cls || 'fa'}" points="${x},${y} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}"/>`;
  }
  // Tam sayı doğrusu
  function sayiDogrusu(min, max, isaret, ziplama) {
    isaret = isaret || {}; ziplama = ziplama || [];
    const W = 440, x0 = 30, x1 = 410, y = ziplama.length ? 78 : 50, n = max - min, st = (x1 - x0) / n;
    const X = v => x0 + (v - min) * st;
    let s = `<svg class="fig" viewBox="0 0 ${W} ${y + 40}" role="img" aria-label="Sayı doğrusu">`;
    s += `<line class="l" x1="${x0 - 18}" y1="${y}" x2="${x1 + 18}" y2="${y}"/>`;
    s += `<path class="l" d="M${x1 + 11} ${y - 5} L${x1 + 18} ${y} L${x1 + 11} ${y + 5}"/><path class="l" d="M${x0 - 11} ${y - 5} L${x0 - 18} ${y} L${x0 - 11} ${y + 5}"/>`;
    for (let v = min; v <= max; v++) {
      const x = X(v);
      s += `<line class="l" x1="${x}" y1="${y - 6}" x2="${x}" y2="${y + 6}"/><text x="${x}" y="${y + 26}" text-anchor="middle" class="${v === 0 ? '' : 'm'}">${N(v)}</text>`;
    }
    ziplama.forEach(([a, b, lbl]) => {
      const xa = X(a), xb = X(b), mid = (xa + xb) / 2, h = Math.min(55, Math.abs(xb - xa) / 2 + 10);
      s += `<path class="la" d="M${xa} ${y - 8} Q${mid} ${y - 8 - h} ${xb} ${y - 8}"/>` + okUcu(xb, y - 8, xb - mid, h);
      if (lbl) s += `<text x="${mid}" y="${y - 12 - h / 2}" text-anchor="middle" class="a">${lbl}</text>`;
    });
    for (const [v, lbl] of Object.entries(isaret)) {
      const x = X(+v);
      s += `<circle cx="${x}" cy="${y}" r="7" class="fa"/><text x="${x}" y="${y - 14}" text-anchor="middle" class="a">${lbl}</text>`;
    }
    return s + '</svg>';
  }
  // Kesirli sayı doğrusu (parca: bir birimin kaç eş parçaya bölündüğü)
  function kesirDogrusu(min, max, parca, isaret) {
    const W = 440, x0 = 30, x1 = 410, y = 46, st = (x1 - x0) / ((max - min) * parca);
    const X = v => x0 + (v - min) * parca * st;
    let s = `<svg class="fig" viewBox="0 0 ${W} 90"><line class="l" x1="${x0 - 15}" y1="${y}" x2="${x1 + 15}" y2="${y}"/>`;
    for (let i = 0; i <= (max - min) * parca; i++) {
      const x = x0 + i * st; const tam = i % parca === 0;
      s += `<line class="l" x1="${x}" y1="${y - (tam ? 9 : 5)}" x2="${x}" y2="${y + (tam ? 9 : 5)}"/>`;
      if (tam) s += `<text x="${x}" y="${y + 30}" text-anchor="middle">${N(min + i / parca)}</text>`;
    }
    for (const [v, lbl] of Object.entries(isaret || {})) {
      s += `<circle cx="${X(+v)}" cy="${y}" r="7" class="fa"/><text x="${X(+v)}" y="${y - 14}" text-anchor="middle" class="a">${lbl}</text>`;
    }
    return s + '</svg>';
  }
  // Kesir şeridi
  function kesirSeridi(n, d, etiket) {
    const W = 360, w = 320 / d;
    let s = `<svg class="fig sm" viewBox="0 0 ${W} ${etiket ? 86 : 64}">`;
    for (let i = 0; i < d; i++) s += `<rect x="${20 + i * w}" y="10" width="${w}" height="44" class="${i < n ? 'fs' : 'fc'} bi" style="${i < n ? 'fill:var(--accent);opacity:.8' : ''}"/>`;
    if (etiket) s += `<text x="180" y="78" text-anchor="middle">${etiket}</text>`;
    return s + '</svg>';
  }
  // Cebir karoları
  function karolar(xPos, xNeg, bir, eksi) {
    let s = '', cx = 10;
    for (let i = 0; i < xPos; i++) { s += `<rect x="${cx}" y="10" width="26" height="66" rx="4" class="fi bi"/><text x="${cx + 13}" y="48" text-anchor="middle">x</text>`; cx += 34; }
    for (let i = 0; i < xNeg; i++) { s += `<rect x="${cx}" y="10" width="26" height="66" rx="4" class="fr bi"/><text x="${cx + 13}" y="48" text-anchor="middle">−x</text>`; cx += 34; }
    if (xPos + xNeg) cx += 10;
    for (let i = 0; i < bir; i++) { s += `<rect x="${cx}" y="50" width="26" height="26" rx="4" class="fw bi"/><text x="${cx + 13}" y="68" text-anchor="middle">1</text>`; cx += 32; }
    for (let i = 0; i < eksi; i++) { s += `<rect x="${cx}" y="50" width="26" height="26" rx="4" class="fr bi"/><text x="${cx + 13}" y="68" text-anchor="middle" font-size="12">−1</text>`; cx += 32; }
    return `<svg class="fig sm" viewBox="0 0 ${cx + 6} 86">${s}</svg>`;
  }
  // Eşit kollu terazi
  function terazi(sol, sag, dengeli) {
    const gen = it => (it === 'x' ? 28 : 42);
    const item = (it, x) => it === 'x'
      ? `<rect x="${x}" y="${136}" width="28" height="28" rx="4" class="fi bi"/><text x="${x + 14}" y="155" text-anchor="middle">x</text>`
      : `<path d="M${x} 164 L${x + 5} 138 L${x + 37} 138 L${x + 42} 164 Z" class="fw bi"/><text x="${x + 21}" y="157" text-anchor="middle" font-size="11">${it}</text>`;
    const kefe = (items, cx) => {
      const w = items.reduce((a, it) => a + gen(it) + 4, -4); let x = cx - w / 2; let s = '';
      items.forEach(it => { s += item(it, x); x += gen(it) + 4; });
      return s;
    };
    return `<svg class="fig" viewBox="0 64 440 166" role="img" aria-label="Terazi">
      <path d="M200 222 L240 222 L226 100 L214 100 Z" class="fc2 bi"/>
      <line class="l" x1="40" y1="100" x2="400" y2="100" style="stroke-width:4"/><circle cx="220" cy="100" r="6" class="fk"/>
      <line class="lm" x1="120" y1="100" x2="50" y2="166"/><line class="lm" x1="120" y1="100" x2="190" y2="166"/>
      <line class="lm" x1="320" y1="100" x2="250" y2="166"/><line class="lm" x1="320" y1="100" x2="390" y2="166"/>
      <path d="M40 166 Q120 186 200 166 Z" class="fs bi"/><path d="M240 166 Q320 186 400 166 Z" class="fs bi"/>
      ${kefe(sol, 120)}${kefe(sag, 320)}
      ${dengeli === false ? '' : '<text x="220" y="80" text-anchor="middle" class="m">denge</text>'}
    </svg>`;
  }
  // Paralel iki doğru ve kesen: konum etiketleri {ust:{UR,UL,LL,LR}, alt:{...}}
  function paralel(ust, alt, notOlcekli) {
    const P = [[214, 70], [166, 150]];
    const temiz = o => { const r = {}; for (const k in o) r[k] = String(o[k]).replace(/<[^>]+>/g, ''); return r; };
    const yaz = (p, e) => {
      e = temiz(e); let s = ''; const [x, y] = p;
      if (e.UR) s += `<text x="${x + 14}" y="${y - 8}" class="a">${e.UR}</text>`;
      if (e.UL) s += `<text x="${x - 12}" y="${y - 8}" text-anchor="end" class="a">${e.UL}</text>`;
      if (e.LL) s += `<text x="${x - 24}" y="${y + 22}" text-anchor="end" class="a">${e.LL}</text>`;
      if (e.LR) s += `<text x="${x + 10}" y="${y + 22}" class="a">${e.LR}</text>`;
      return s;
    };
    return `<svg class="fig" viewBox="0 0 440 230" role="img" aria-label="Paralel doğrular">
      <line class="l" x1="30" y1="70" x2="400" y2="70"/><line class="l" x1="30" y1="150" x2="400" y2="150"/>
      <line class="l" x1="130" y1="210" x2="250" y2="10"/>
      <path class="l" d="M393 65 L401 70 L393 75"/><path class="l" d="M393 145 L401 150 L393 155"/>
      <text x="410" y="75">d₁</text><text x="410" y="155">d₂</text><text x="256" y="18">k</text>
      ${yaz(P[0], ust || {})}${yaz(P[1], alt || {})}
      <text x="30" y="222" class="m">d₁ ∥ d₂ ${notOlcekli ? '· Şekil ölçekli değildir.' : ''}</text>
    </svg>`;
  }
  // Kesişen iki doğru
  function kesisen(e) {
    return `<svg class="fig sm" viewBox="0 0 440 200"><line class="l" x1="60" y1="40" x2="380" y2="160"/><line class="l" x1="60" y1="160" x2="380" y2="40"/>
      <circle cx="220" cy="100" r="4" class="fk"/>
      <text x="220" y="70" text-anchor="middle" class="a">${e.ust || ''}</text><text x="220" y="142" text-anchor="middle" class="a">${e.alt || ''}</text>
      <text x="150" y="106" text-anchor="middle" class="a">${e.sol || ''}</text><text x="290" y="106" text-anchor="middle" class="a">${e.sag || ''}</text></svg>`;
  }
  // Yamuk
  function yamuk(a, c, h) {
    return `<svg class="fig sm" viewBox="0 0 360 190"><path d="M40 160 L320 160 L250 40 L110 40 Z" class="fs bi"/>
      <line class="ld" x1="110" y1="40" x2="110" y2="160"/><path class="lm" d="M110 148 L122 148 L122 160"/>
      <text x="180" y="182" text-anchor="middle">${a} cm</text><text x="180" y="30" text-anchor="middle">${c} cm</text><text x="102" y="106" text-anchor="end">${h} cm</text></svg>`;
  }
  function paralelkenar(taban, kenar, h) {
    return `<svg class="fig sm" viewBox="0 0 360 180"><path d="M40 150 L260 150 L320 40 L100 40 Z" class="fs bi"/>
      <line class="ld" x1="100" y1="40" x2="100" y2="150"/><path class="lm" d="M100 138 L112 138 L112 150"/>
      <text x="150" y="172" text-anchor="middle">${taban} cm</text><text x="92" y="100" text-anchor="end">${h} cm</text><text x="302" y="100">${kenar} cm</text></svg>`;
  }
  // Sütun grafiği
  function sutun(veri, max, birim, baslik) {
    const W = 440, H = 230, x0 = 46, y0 = 190, gw = 370, gh = 160; const bw = gw / veri.length;
    let s = `<svg class="fig" viewBox="0 0 ${W} ${H}">`;
    const adim = max <= 10 ? 2 : max <= 25 ? 5 : 10;
    for (let v = 0; v <= max; v += adim) { const y = y0 - gh * v / max; s += `<line class="${v ? 'ld' : 'l'}" x1="${x0}" y1="${y}" x2="${x0 + gw}" y2="${y}" style="${v ? 'opacity:.5' : ''}"/><text x="${x0 - 8}" y="${y + 5}" text-anchor="end" class="m">${v}</text>`; }
    veri.forEach((d, i) => { const h = gh * d[1] / max; const x = x0 + i * bw + bw * 0.2; s += `<rect x="${x}" y="${y0 - h}" width="${bw * 0.6}" height="${h}" rx="4" class="fa" style="opacity:.85"/><text x="${x + bw * 0.3}" y="${y0 + 20}" text-anchor="middle" class="m">${d[0]}</text>`; });
    s += `<line class="l" x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 - gh - 8}"/>`;
    if (birim) s += `<text x="${x0 - 30}" y="16" class="m">${birim}</text>`;
    if (baslik) s += `<text x="${x0 + gw / 2}" y="16" text-anchor="middle">${baslik}</text>`;
    return s + '</svg>';
  }
  // Daire grafiği
  function pasta(dilimler) {
    const cx = 150, cy = 110, r = 90; let a0 = -90; let s = '<svg class="fig sm" viewBox="0 0 300 220" style="max-width:260px">';
    const sinif = ['fI', 'fW', 'fG', 'fR', 'fa'];
    dilimler.forEach((d, i) => {
      const a1 = a0 + d[1]; const rad = a => a * Math.PI / 180;
      const p0 = [cx + r * Math.cos(rad(a0)), cy + r * Math.sin(rad(a0))], p1 = [cx + r * Math.cos(rad(a1)), cy + r * Math.sin(rad(a1))];
      s += `<path d="M${cx} ${cy} L${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A${r} ${r} 0 ${d[1] > 180 ? 1 : 0} 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} Z" class="${sinif[i % 5]}" style="opacity:.8;stroke:var(--card);stroke-width:2"/>`;
      const m = rad((a0 + a1) / 2);
      s += `<text x="${(cx + r * 0.58 * Math.cos(m)).toFixed(1)}" y="${(cy + r * 0.58 * Math.sin(m)).toFixed(1)}" text-anchor="middle" font-size="12">${d[0]}</text>`;
      if (d[2]) s += `<text x="${(cx + r * 0.58 * Math.cos(m)).toFixed(1)}" y="${(cy + r * 0.58 * Math.sin(m) + 15).toFixed(1)}" text-anchor="middle" font-size="12">${d[2]}</text>`;
      a0 = a1;
    });
    return s + '</svg>';
  }

  /* ===================== KONULAR ===================== */
  const konular = [];

  /* ---------- 1. TAM SAYILAR ---------- */
  konular.push({
    id: 'tam-sayilar', ad: 'Tam Sayılarla İşlemler', ikon: '±', ozet: 'Sayı doğrusu, dört işlem, kuvvetler',
    anlatim: `
<div class="blok"><h3>Tam sayı nedir?</h3>
<p>Negatif tam sayılar, sıfır ve pozitif tam sayıların hepsine <b>tam sayılar</b> denir: { …, −3, −2, −1, 0, 1, 2, 3, … }. <b>Sıfır</b> ne pozitif ne de negatiftir.</p>
<figure>${sayiDogrusu(-5, 5, { '-3': 'A', '2': 'B' })}<figcaption>Sayı doğrusunda sağa gittikçe sayılar büyür. A = −3, B = 2 ve −3 &lt; 2</figcaption></figure>
<div class="bilgi">💡 <b>Mutlak değer</b>, bir sayının sıfıra olan uzaklığıdır. |−4| = 4 ve |4| = 4. Uzaklık hiçbir zaman negatif olmaz.</div></div>

<div class="blok"><h3>Toplama</h3>
<ul><li><b>Aynı işaretliler:</b> Mutlak değerler toplanır, ortak işaret konur. (−3) + (−5) = −8</li>
<li><b>Farklı işaretliler:</b> Büyük mutlak değerden küçüğü çıkarılır, mutlak değeri büyük olanın işareti konur. (−7) + (+4) = −3</li></ul>
<figure>${sayiDogrusu(-8, 2, {}, [[-7, -3, '+4']])}<figcaption>−7'den başlayıp 4 birim sağa gidince −3'e ulaşırız.</figcaption></figure></div>

<div class="blok"><h3>Çıkarma</h3>
<p>Çıkarma işlemi, <b>çıkanın ters işaretlisini eklemektir.</b></p>
<span class="formul">a − b = a + (−b)</span>
<p>(+3) − (−5) = (+3) + (+5) = 8 &nbsp;&nbsp;|&nbsp;&nbsp; (−2) − (+6) = (−2) + (−6) = −8</p></div>

<div class="blok"><h3>Çarpma ve bölme</h3>
<div class="tb-wrap"><table class="tb"><tr><th>İşaretler</th><th>Sonuç</th><th>Örnek</th></tr>
<tr><td>(+) · (+)</td><td>+</td><td>(+3) · (+4) = 12</td></tr>
<tr><td>(−) · (−)</td><td>+</td><td>(−3) · (−4) = 12</td></tr>
<tr><td>(+) · (−)</td><td>−</td><td>(+3) · (−4) = −12</td></tr>
<tr><td>(−) : (+)</td><td>−</td><td>(−12) : (+3) = −4</td></tr></table></div>
<div class="ipucu">✅ Çarpımda <b>çift sayıda</b> negatif varsa sonuç pozitif, <b>tek sayıda</b> negatif varsa sonuç negatiftir.</div></div>

<div class="blok"><h3>Tam sayıların kuvvetleri</h3>
<p>(−2)³ = (−2) · (−2) · (−2) = −8 &nbsp;&nbsp; (−2)⁴ = 16</p>
<ul><li>Negatif sayının <b>çift</b> kuvveti pozitiftir.</li><li>Negatif sayının <b>tek</b> kuvveti negatiftir.</li><li>(−1)'in çift kuvveti 1, tek kuvveti −1'dir.</li></ul>
<div class="dikkat">⚠️ (−3)² = 9 ama −3² = −9. Parantez yoksa üs yalnızca 3'e aittir!</div></div>

<div class="ornek"><b>Örnek:</b> Sabah −4 °C olan hava öğlene kadar 9 °C ısınmış, akşama doğru 7 °C soğumuştur. Akşam sıcaklık kaç °C'dir?
<details class="coz"><summary>Çözümü göster</summary>(−4) + 9 − 7 = 5 − 7 = <b>−2 °C</b></details></div>`,
    sorular: [
      { seviye: 1, soru: 'Aşağıdaki sayı doğrusunda A noktası hangi tam sayıyı göstermektedir?', sekil: sayiDogrusu(-4, 4, { '-3': 'A' }), secenekler: ['3', '−2', '−3', '−4'], dogru: 2, cozum: 'Sıfırın solundaki sayılar negatiftir. A noktası sıfırın 3 birim solundadır, yani <b>−3</b>.' },
      { seviye: 1, soru: 'Aşağıdaki sıralamalardan hangisi doğrudur?', secenekler: ['−7 &gt; −2', '−5 &lt; −8', '0 &lt; −1', '−3 &gt; −9'], dogru: 3, cozum: 'Negatif sayılarda mutlak değeri küçük olan daha büyüktür. Sayı doğrusunda −3, −9\'un sağındadır, bu yüzden <b>−3 &gt; −9</b>.' },
      { seviye: 2, soru: '(−3) · (+4) − (−12) : (+3) işleminin sonucu kaçtır?', secenekler: ['−8', '−16', '8', '−4'], dogru: 0, cozum: 'Önce çarpma ve bölme yapılır:<br>(−3)·(+4) = −12 ve (−12):(+3) = −4<br>−12 − (−4) = −12 + 4 = <b>−8</b>' },
      { seviye: 2, soru: 'Bir şehirde beş gün boyunca ölçülen en düşük sıcaklıklar −6 °C, −2 °C, 3 °C, −4 °C ve −1 °C\'dir. Bu sıcaklıkların toplamı kaç °C\'dir?', secenekler: ['−16', '−10', '10', '−4'], dogru: 1, cozum: 'Negatifler: (−6)+(−2)+(−4)+(−1) = −13<br>−13 + 3 = <b>−10</b>' },
      { seviye: 3, soru: 'Zemin katın 0, zemin altındaki katların negatif tam sayılarla gösterildiği bir binada asansör −3. kattan hareket ediyor. Önce 7 kat çıkıyor, sonra 5 kat iniyor ve en son 2 kat daha çıkıyor.<br><br>Buna göre asansör son durumda kaçıncı kattadır?', sekil: (function () {
        let s = '<svg class="fig sm" viewBox="0 0 240 250"><rect x="70" y="10" width="100" height="230" class="fc2 bi"/>';
        for (let k = 4; k >= -4; k--) { const y = 10 + (4 - k) * 25.5; s += `<line class="lm" x1="70" y1="${y}" x2="170" y2="${y}"/><text x="60" y="${y + 18}" text-anchor="end" class="${k === 0 ? '' : 'm'}">${k === 0 ? 'Zemin 0' : N(k)}</text>`; }
        s += '<rect x="100" y="' + (10 + 7 * 25.5 + 3) + '" width="40" height="20" rx="3" class="fa"/><text x="120" y="' + (10 + 7 * 25.5 + 18) + '" text-anchor="middle" style="fill:#fff" font-size="11">🛗</text>';
        s += '<line class="ld" x1="20" y1="' + (10 + 5 * 25.5) + '" x2="230" y2="' + (10 + 5 * 25.5) + '"/><text x="230" y="' + (10 + 5 * 25.5 - 4) + '" text-anchor="end" class="m">yer</text>';
        return s + '</svg>';
      })(), secenekler: ['−1', '0', '2', '1'], dogru: 3, cozum: '(−3) + 7 − 5 + 2 = 4 − 5 + 2 = <b>1</b>. Asansör 1. kattadır.' },
      { seviye: 3, soru: '(−1)<sup>25</sup> + (−1)<sup>24</sup> − (−2)<sup>3</sup> işleminin sonucu kaçtır?', secenekler: ['−8', '6', '8', '10'], dogru: 2, cozum: '(−1)²⁵ = −1 (tek kuvvet), (−1)²⁴ = 1 (çift kuvvet), (−2)³ = −8<br>−1 + 1 − (−8) = 0 + 8 = <b>8</b>' },
      { seviye: 3, soru: 'Deniz seviyesinin 40 m altında bulunan bir denizaltı her dakika 6 m yükselmektedir. Deniz seviyesi 0 kabul edildiğine göre 5 dakika sonra denizaltının bulunduğu konum hangi tam sayı ile gösterilir?', secenekler: ['−10', '−70', '10', '−34'], dogru: 0, cozum: 'Başlangıç: −40. 5 dakikada 5 · 6 = 30 m yükselir.<br>−40 + 30 = <b>−10</b>' }
    ],
    uret: {
      1: r => {
        const a = nz(r, -15, 15), b = nz(r, -15, 15), top = r() < 0.5; const ans = top ? a + b : a - b;
        const w = top ? [-ans, a - b, Math.abs(a) + Math.abs(b)] : [a + b, -ans, Math.abs(a) + Math.abs(b), Math.abs(a - b)];
        const cozum = top
          ? (Math.sign(a) === Math.sign(b)
            ? `Aynı işaretli sayılar toplanırken mutlak değerler toplanır, ortak işaret konur: ${PS(a)} + ${PS(b)} = <b>${N(ans)}</b>`
            : `Farklı işaretli sayılarda büyük mutlak değerden küçüğü çıkarılır, büyüğün işareti konur: ${Math.max(Math.abs(a), Math.abs(b))} − ${Math.min(Math.abs(a), Math.abs(b))} = ${Math.abs(ans)} → <b>${N(ans)}</b>`)
          : `Çıkarma işleminde çıkanın işareti değiştirilip toplanır:<br>${PS(a)} − ${PS(b)} = ${PS(a)} + ${PS(-b)} = <b>${N(ans)}</b>`;
        return Object.assign({ soru: `${PS(a)} ${top ? '+' : '−'} ${PS(b)} işleminin sonucu kaçtır?`, cozum }, mc(r, ans, w));
      },
      2: r => {
        if (r() < 0.5) {
          const a = nz(r, -12, 12), b = nz(r, -9, 9); const ans = a * b;
          return Object.assign({ soru: `${PS(a)} · ${PS(b)} işleminin sonucu kaçtır?`, cozum: `İşaretler ${ans > 0 ? 'aynı olduğundan sonuç pozitiftir' : 'farklı olduğundan sonuç negatiftir'}: ${Math.abs(a)} · ${Math.abs(b)} = ${Math.abs(ans)} → <b>${N(ans)}</b>` }, mc(r, ans, [-ans, a + b, -(a + b)]));
        }
        const q = nz(r, -12, 12); let b = nz(r, -9, 9); if (Math.abs(b) === 1) b *= 3; const p = q * b;
        return Object.assign({ soru: `${PS(p)} : ${PS(b)} işleminin sonucu kaçtır?`, cozum: `${Math.abs(p)} : ${Math.abs(b)} = ${Math.abs(q)}. İşaretler ${q > 0 ? 'aynı → sonuç pozitif' : 'farklı → sonuç negatif'}: <b>${N(q)}</b>` }, mc(r, q, [-q, p - b, q + b]));
      },
      3: r => {
        const t = rnd(r, 0, 2);
        if (t === 0) {
          const t0 = rnd(r, -12, -1), u = rnd(r, 5, 15), d = rnd(r, 3, 14); const ans = t0 + u - d;
          return Object.assign({ soru: `Bir kentte sabah sıcaklık ${N(t0)} °C olarak ölçülmüştür. Öğlene kadar hava ${u} °C ısınmış, akşama kadar ise ${d} °C soğumuştur.<br><br>Buna göre akşam ölçülen sıcaklık kaç °C'dir?`, cozum: `${PS(t0)} + ${u} − ${d} = ${N(t0 + u)} − ${d} = <b>${N(ans)}</b> °C` }, mc(r, ans, [t0 - u + d, -ans, t0 + u + d]));
        }
        if (t === 1) {
          const p = rnd(r, 2, 5), q = rnd(r, 10, 31); const ans = Math.pow(-2, p) + Math.pow(-1, q);
          return Object.assign({ soru: `(−2)<sup>${p}</sup> + (−1)<sup>${q}</sup> işleminin sonucu kaçtır?`, cozum: `(−2)<sup>${p}</sup> = ${N(Math.pow(-2, p))} (${p % 2 ? 'tek' : 'çift'} kuvvet), (−1)<sup>${q}</sup> = ${N(Math.pow(-1, q))} (${q % 2 ? 'tek' : 'çift'} kuvvet)<br>Toplam: <b>${N(ans)}</b>` }, mc(r, ans, [Math.pow(2, p) + Math.pow(-1, q), Math.pow(-2, p) - Math.pow(-1, q), -ans]));
        }
        const d = rnd(r, 6, 18) * 5, h = rnd(r, 3, 9), m = rnd(r, 3, 12); const ans = -d + h * m;
        return Object.assign({ soru: `Deniz seviyesinin ${d} m altındaki bir dalgıç her dakika ${h} m yükselmektedir. Deniz seviyesi 0 kabul edilirse ${m} dakika sonra dalgıcın konumu hangi tam sayı ile gösterilir?`, cozum: `Başlangıç konumu ${N(-d)}. ${m} dakikada ${m} · ${h} = ${h * m} m yükselir.<br>${N(-d)} + ${h * m} = <b>${N(ans)}</b>` }, mc(r, ans, [-d - h * m, d - h * m, -ans]));
      }
    }
  });

  /* ---------- 2. RASYONEL SAYILAR ---------- */
  konular.push({
    id: 'rasyonel', ad: 'Rasyonel Sayılar', ikon: '½', ozet: 'Kesir, ondalık gösterim ve işlemler',
    anlatim: `
<div class="blok"><h3>Rasyonel sayı nedir?</h3>
<p>a ve b tam sayı, b ≠ 0 olmak üzere ${F('a', 'b')} şeklinde yazılabilen sayılara <b>rasyonel sayı</b> denir. Her tam sayı bir rasyonel sayıdır: 5 = ${F(5, 1)}</p>
<figure>${kesirSeridi(3, 8, '3/8 boyalı')}<figcaption>Bütün 8 eş parçaya bölünmüş, 3'ü boyanmıştır: ${F(3, 8)}</figcaption></figure>
<figure>${kesirDogrusu(-1, 1, 4, { '-0.75': 'A', '0.5': 'B' })}<figcaption>Her birim 4 eş parçaya bölünmüş: A = −${F(3, 4)}, B = ${F(2, 4)} = ${F(1, 2)}</figcaption></figure></div>

<div class="blok"><h3>Ondalık gösterim</h3>
<p>Pay paydaya bölünür: ${F(3, 4)} = 3 : 4 = 0,75 &nbsp;&nbsp; ${F(1, 5)} = 0,2</p>
<p><b>Devirli ondalık:</b> Virgülden sonra tekrar eden basamaklar üstüne çizgi çekilerek gösterilir: ${F(1, 3)} = 0,333… = 0,<span style="text-decoration:overline">3</span></p>
<div class="bilgi">💡 Paydası yalnızca 2 ve 5 çarpanlarından oluşan (sadeleşmiş) kesirler <b>sonlu</b> ondalık sayıdır; diğerleri devirlidir.</div></div>

<div class="blok"><h3>Sıralama</h3>
<ul><li>Paydalar eşitse payı büyük olan büyüktür.</li><li>Payları eşitse paydası küçük olan büyüktür.</li><li>Negatiflerde sıralama tersine döner: −${F(1, 2)} &gt; −${F(3, 4)}</li></ul></div>

<div class="blok"><h3>Dört işlem</h3>
<span class="formul">${F('a', 'b')} + ${F('c', 'd')} = ${F('a·d + b·c', 'b·d')}</span>
<ul><li><b>Toplama/çıkarma:</b> Paydalar eşitlenir, paylar toplanır/çıkarılır. ${F(1, 3)} + ${F(1, 4)} = ${F(4, 12)} + ${F(3, 12)} = ${F(7, 12)}</li>
<li><b>Çarpma:</b> Pay ile pay, payda ile payda çarpılır. ${F(2, 3)} · ${F(3, 5)} = ${F(6, 15)} = ${F(2, 5)}</li>
<li><b>Bölme:</b> Birinci kesir aynen yazılır, ikincisi ters çevrilip çarpılır. ${F(3, 4)} : ${F(1, 2)} = ${F(3, 4)} · ${F(2, 1)} = ${F(3, 2)}</li></ul>
<div class="dikkat">⚠️ Paydaları toplamak yanlıştır: ${F(1, 2)} + ${F(1, 3)} ≠ ${F(2, 5)}</div></div>

<div class="ornek"><b>Örnek:</b> Bir su deposunun ${F(2, 5)}'i doludur. Depoya, deponun ${F(3, 10)}'u kadar daha su eklenirse depo kaçta kaçı dolu olur?
<details class="coz"><summary>Çözümü göster</summary>${F(2, 5)} + ${F(3, 10)} = ${F(4, 10)} + ${F(3, 10)} = <b>${F(7, 10)}</b></details></div>`,
    sorular: [
      { seviye: 1, soru: 'Şekilde boyalı kısım bütünün kaçta kaçıdır?', sekil: kesirSeridi(3, 8), secenekler: [F(5, 8), F(3, 8), F(3, 5), F(8, 3)], dogru: 1, cozum: 'Bütün 8 eş parçaya ayrılmış ve 3 parça boyanmış: <b>' + F(3, 8) + '</b>' },
      { seviye: 1, soru: '0,<span style="text-decoration:overline">3</span> devirli ondalık sayısının kesir olarak gösterimi aşağıdakilerden hangisidir?', secenekler: [F(3, 10), F(33, 100), F(1, 3), F(3, 100)], dogru: 2, cozum: '0,333… sayısı 1\'in 3\'e bölümüdür: 1 : 3 = 0,333… Bu yüzden cevap <b>' + F(1, 3) + '</b>.' },
      { seviye: 2, soru: 'Aşağıdaki sayı doğrusunda K noktasının gösterdiği rasyonel sayı hangisidir?', sekil: kesirDogrusu(-1, 1, 4, { '-0.75': 'K' }), secenekler: ['−' + F(1, 4), '−' + F(3, 4), F(3, 4), '−' + F(3, 8)], dogru: 1, cozum: '−1 ile 0 arası 4 eş parçaya bölünmüştür. K, sıfırın 3 parça solunda: <b>−' + F(3, 4) + '</b>' },
      { seviye: 2, soru: 'Uzunluğu ' + F(3, 4) + ' m olan bir kurdele, her biri ' + F(1, 8) + ' m uzunluğunda parçalara ayrılıyor. Kaç parça elde edilir?', secenekler: ['4', '8', '3', '6'], dogru: 3, cozum: F(3, 4) + ' : ' + F(1, 8) + ' = ' + F(3, 4) + ' · ' + F(8, 1) + ' = ' + F(24, 4) + ' = <b>6</b> parça' },
      { seviye: 3, soru: 'Bir kek tarifinde 2' + F(3, 4) + ' su bardağı un kullanılmaktadır. Bu tarifin yarısı kadar kek yapmak isteyen Zeynep kaç su bardağı un kullanmalıdır?', secenekler: ['1' + F(1, 2), '1' + F(3, 8), '1' + F(1, 4), '1' + F(3, 4)], dogru: 1, cozum: '2' + F(3, 4) + ' = ' + F(11, 4) + '. Yarısı: ' + F(11, 4) + ' : 2 = ' + F(11, 8) + ' = <b>1' + F(3, 8) + '</b>' },
      { seviye: 3, soru: 'Bir öğrenci harçlığının ' + F(1, 3) + '\'ini kitaba, ' + F(1, 4) + '\'ünü kırtasiyeye harcamış ve geriye 150 TL kalmıştır. Öğrencinin harçlığı kaç TL\'dir?', secenekler: ['360', '300', '420', '250'], dogru: 0, cozum: 'Harcanan: ' + F(1, 3) + ' + ' + F(1, 4) + ' = ' + F(7, 12) + '. Kalan: ' + F(5, 12) + '.<br>' + F(5, 12) + ' → 150 TL ise ' + F(1, 12) + ' → 30 TL. Tamamı 12 · 30 = <b>360 TL</b>' }
    ],
    uret: {
      1: r => {
        if (r() < 0.5) {
          let n, d; do { d = pick(r, [2, 4, 5, 8, 10, 20, 25]); n = rnd(r, 1, d - 1); } while (n % d === 0);
          const sg = r() < 0.3 ? -1 : 1; const v = sg * n / d;
          return Object.assign({ soru: `${sg < 0 ? '−' : ''}${F(n, d)} rasyonel sayısının ondalık gösterimi aşağıdakilerden hangisidir?`, cozum: `Pay paydaya bölünür: ${n} : ${d} = ${D(n / d)}${sg < 0 ? ', işaret negatif' : ''} → <b>${D(v)}</b>` }, mc(r, v, [v * 10, v / 10, -v, v + 0.1, v + 0.5], D));
        }
        const set = []; const vals = new Set();
        while (set.length < 4) { const d = rnd(r, 2, 9); const n = nz(r, -8, 8); const f = fr(n, d); const k = f[0] / f[1]; if (!vals.has(k)) { vals.add(k); set.push(f); } }
        const enBuyuk = r() < 0.5; const sorted = set.slice().sort((a, b) => a[0] / a[1] - b[0] / b[1]);
        const ans = enBuyuk ? sorted[3] : sorted[0];
        return Object.assign({ soru: `Aşağıdaki rasyonel sayılardan hangisi en ${enBuyuk ? 'büyüktür' : 'küçüktür'}?`, cozum: `Sayıları ondalık olarak düşünelim: ${sorted.map(f => frH(f) + ' ≈ ' + D(Math.round(f[0] / f[1] * 100) / 100)).join(', ')}.<br>En ${enBuyuk ? 'büyüğü' : 'küçüğü'}: <b>${frH(ans)}</b>` }, mc(r, ans, set.filter(f => f !== ans), frH));
      },
      2: r => {
        const ds = [2, 3, 4, 5, 6, 8, 10, 12]; let b = pick(r, ds), d = pick(r, ds); if (b === d) d = pick(r, ds.filter(x => x !== b));
        const a = rnd(r, 1, b - 1) * (r() < 0.3 ? -1 : 1), c = rnd(r, 1, d - 1), s = r() < 0.5 ? 1 : -1;
        const ans = fr(a * d + s * c * b, b * d);
        const ah = a < 0 ? '(' + frH([a, b]) + ')' : frH([a, b]);
        return Object.assign({ soru: `${ah} ${s > 0 ? '+' : '−'} ${frH([c, d])} işleminin sonucu kaçtır?`, cozum: `Paydalar ${b * d / window.U.gcd(b, d)} olacak şekilde eşitlenir.<br>${frH([a, b])} ${s > 0 ? '+' : '−'} ${frH([c, d])} = ${F(N(a * d) + (s > 0 ? ' + ' : ' − ') + c * b, b * d)} = <b>${frH(ans)}</b>` }, mc(r, ans, [fr(a + s * c, b + d), fr(a + s * c, b * d), fr(a * d - s * c * b, b * d)], frH));
      },
      3: r => {
        if (r() < 0.6) {
          const p = pick(r, [[1, 3], [2, 5], [1, 4], [3, 8], [1, 2], [2, 7], [1, 5]]), q = pick(r, [[1, 2], [1, 3], [1, 4], [2, 3], [3, 4], [2, 5]]);
          const kalan = [p[1] - p[0], p[1]]; const ans = fr(kalan[0] * (q[1] - q[0]), kalan[1] * q[1]);
          const isim = pick(r, ['Elif', 'Kerem', 'Ada', 'Mert', 'Zeynep']);
          return Object.assign({ soru: `${isim} okuduğu kitabın önce ${F(p[0], p[1])}'ini, sonra kalan sayfaların ${F(q[0], q[1])}'ini okumuştur.<br><br>Buna göre ${isim} kitabın kaçta kaçını <b>okumamıştır</b>?`, cozum: `İlk okumadan sonra kalan: 1 − ${F(p[0], p[1])} = ${F(kalan[0], kalan[1])}<br>Kalanın ${F(q[0], q[1])}'i okunursa okunmayan kısım kalanın ${F(q[1] - q[0], q[1])}'i olur:<br>${F(kalan[0], kalan[1])} · ${F(q[1] - q[0], q[1])} = <b>${frH(ans)}</b>` }, mc(r, ans, [fr(p[1] * q[1] - p[0] * q[1] - q[0] * p[1], p[1] * q[1]), fr(kalan[1] * q[1] - kalan[0] * (q[1] - q[0]), kalan[1] * q[1]), fr(kalan[0] * q[0], kalan[1] * q[1])].filter(f => f[0] > 0), frH));
        }
        const A = nz(r, -30, 30), B = pick(r, [-15, -12, -8, -5, -4, 4, 5, 8, 12, 15]), C = rnd(r, 1, 20);
        const ans = (A * B + 10 * C) / 100;
        return Object.assign({ soru: `${D(A / 10).replace(/^−/, '(−') + (A < 0 ? ')' : '')} · ${B < 0 ? '(' + D(B / 10) + ')' : D(B / 10)} + ${D(C / 10)} işleminin sonucu kaçtır?`, cozum: `Önce çarpma: ${D(A / 10)} · ${D(B / 10)} = ${D(A * B / 100)}<br>Sonra toplama: ${D(A * B / 100)} + ${D(C / 10)} = <b>${D(ans)}</b>` }, mc(r, ans, [(-A * B + 10 * C) / 100, (A * B - 10 * C) / 100, (A + B + C) / 10], D));
      }
    }
  });

  /* ---------- 3. CEBİRSEL İFADELER ---------- */
  konular.push({
    id: 'cebirsel', ad: 'Cebirsel İfadeler', ikon: 'x', ozet: 'Terim, katsayı, sadeleştirme, örüntüler',
    anlatim: `
<div class="blok"><h3>Temel kavramlar</h3>
<p>İçinde bilinmeyen (değişken) bulunan ifadelere <b>cebirsel ifade</b> denir. Örnek: <b>3x − 7</b></p>
<div class="tb-wrap"><table class="tb"><tr><th>Kavram</th><th>3x − 7 ifadesinde</th></tr>
<tr><td>Değişken</td><td>x</td></tr><tr><td>Terimler</td><td>3x ve −7</td></tr><tr><td>Katsayı</td><td>3 (x'in önündeki sayı)</td></tr><tr><td>Sabit terim</td><td>−7</td></tr></table></div>
<p><b>Benzer terimler:</b> Değişkeni ve üssü aynı olan terimlerdir. 4x ile −2x benzerdir; 4x ile 4 benzer değildir.</p></div>

<div class="blok"><h3>Cebir karoları ile modelleme</h3>
<figure>${karolar(3, 0, 2, 0)}<figcaption>Uzun karo <b>x</b>'i, küçük kare <b>1</b>'i gösterir. Model: 3x + 2</figcaption></figure>
<figure>${karolar(2, 1, 0, 3)}<figcaption>Kırmızı karolar negatiftir. Bir x ile bir −x birbirini götürür → 2x − x − 3 = x − 3</figcaption></figure></div>

<div class="blok"><h3>Toplama ve çıkarma</h3>
<p>Yalnızca <b>benzer terimler</b> toplanıp çıkarılır; katsayılar toplanır, değişken aynen yazılır.</p>
<p>5x + 3 − 2x − 8 = (5x − 2x) + (3 − 8) = <b>3x − 5</b></p></div>

<div class="blok"><h3>Bir sayıyla çarpma (dağılma özelliği)</h3>
<span class="formul">a · (b + c) = a·b + a·c</span>
<p>3(2x − 4) = 6x − 12 &nbsp;&nbsp; −2(x − 5) = −2x + 10</p>
<div class="dikkat">⚠️ Parantezin önündeki eksi, parantez içindeki <b>tüm</b> terimlerin işaretini değiştirir.</div></div>

<div class="blok"><h3>Sayı örüntüleri</h3>
<figure><svg class="fig" viewBox="0 0 440 110">
<g class="la" style="stroke-width:4">
<path d="M20 30 h40 v40 h-40 z"/>
<path d="M110 30 h40 v40 h-40 z M150 30 h40 v40 h-40"/>
<path d="M240 30 h40 v40 h-40 z M280 30 h40 v40 h-40 M320 30 h40 v40 h-40"/></g>
<text x="40" y="96" text-anchor="middle" class="m">1. adım: 4</text><text x="150" y="96" text-anchor="middle" class="m">2. adım: 7</text><text x="300" y="96" text-anchor="middle" class="m">3. adım: 10</text></svg>
<figcaption>Her adımda 3 kibrit çöpü eklenir.</figcaption></figure>
<p>Ardışık terimler arasındaki fark sabitse genel terim <b>(fark) · n + (düzeltme)</b> şeklindedir. 4, 7, 10, … için fark 3: 3n + 1 (n = 1 için 3·1 + 1 = 4 ✔)</p>
<div class="ipucu">✅ Kontrol et: Bulduğun kuralı ilk terime uygula; tutuyorsa doğrudur.</div></div>

<div class="ornek"><b>Örnek:</b> x = −2 için 4x − 3 ifadesinin değeri kaçtır?
<details class="coz"><summary>Çözümü göster</summary>4 · (−2) − 3 = −8 − 3 = <b>−11</b></details></div>`,
    sorular: [
      { seviye: 1, soru: '3x − 7 cebirsel ifadesinin katsayısı ve sabit terimi sırasıyla aşağıdakilerden hangisidir?', secenekler: ['3 ve 7', 'x ve −7', '3 ve −7', '−7 ve 3'], dogru: 2, cozum: 'x\'in önündeki sayı katsayıdır: 3. Değişken içermeyen terim sabit terimdir: <b>−7</b>.' },
      { seviye: 1, soru: 'Aşağıdaki cebir karoları hangi cebirsel ifadeyi modellemektedir?', sekil: karolar(3, 0, 0, 2), secenekler: ['3x + 2', '3x − 2', '2x − 3', '5x'], dogru: 1, cozum: '3 tane pozitif x karosu (3x) ve 2 tane negatif birim karo (−2) vardır: <b>3x − 2</b>' },
      { seviye: 2, soru: 'a = −2 için 4a − 3 ifadesinin değeri kaçtır?', secenekler: ['5', '−11', '−5', '11'], dogru: 1, cozum: '4 · (−2) − 3 = −8 − 3 = <b>−11</b>' },
      { seviye: 3, soru: 'Kenar uzunlukları (2x + 3) cm ve (x − 1) cm olan bir dikdörtgenin çevresini gösteren cebirsel ifade aşağıdakilerden hangisidir?', sekil: '<svg class="fig sm" viewBox="0 0 320 150"><rect x="40" y="20" width="240" height="100" class="fs bi"/><text x="160" y="142" text-anchor="middle">(2x + 3) cm</text><text x="290" y="75">(x − 1) cm</text></svg>', secenekler: ['3x + 2', '6x + 8', '6x + 4', '2x² + x − 3'], dogru: 2, cozum: 'Çevre = 2 · (uzun kenar + kısa kenar) = 2 · (2x + 3 + x − 1) = 2 · (3x + 2) = <b>6x + 4</b>' },
      { seviye: 3, soru: 'Aşağıda kibrit çöpleriyle oluşturulan örüntünün ilk üç adımı verilmiştir.<br><br>Bu örüntünün 20. adımında kaç kibrit çöpü kullanılır?', sekil: '<svg class="fig" viewBox="0 0 440 110"><g class="la" style="stroke-width:4"><path d="M20 30 h40 v40 h-40 z"/><path d="M110 30 h40 v40 h-40 z M150 30 h40 v40 h-40"/><path d="M240 30 h40 v40 h-40 z M280 30 h40 v40 h-40 M320 30 h40 v40 h-40"/></g><text x="40" y="96" text-anchor="middle" class="m">1. adım</text><text x="150" y="96" text-anchor="middle" class="m">2. adım</text><text x="300" y="96" text-anchor="middle" class="m">3. adım</text></svg>', secenekler: ['60', '61', '80', '64'], dogru: 1, cozum: 'Çöp sayıları: 4, 7, 10, … Her adımda 3 artıyor → kural 3n + 1.<br>20. adım: 3 · 20 + 1 = <b>61</b>' }
    ],
    uret: {
      1: r => {
        const v = pick(r, ['x', 'y', 'a', 'm']); const a = rnd(r, 2, 9); let c; do { c = nz(r, -8, 8); } while (a + c === 0);
        const b = rnd(r, 1, 12); let d; do { d = rnd(r, 1, 12); } while (d === b);
        const ans = ex([[a + c, v], [b - d, '']]);
        return Object.assign({ soru: `${ex([[a, v], [b, ''], [c, v], [-d, '']])} ifadesinin en sade hâli aşağıdakilerden hangisidir?`, cozum: `Benzer terimler bir araya getirilir:<br>(${ex([[a, v]])} ${c < 0 ? '−' : '+'} ${ex([[Math.abs(c), v]])}) + (${b} − ${d}) = <b>${ans}</b>` }, mc(r, ans, [ex([[a - c, v], [b - d, '']]), ex([[a + c, v], [b + d, '']]), ex([[a + c, v], [d - b, '']]), (a + c + b - d) + '<i>' + v + '</i>'], S));
      },
      2: r => {
        const v = pick(r, ['x', 'a', 'n']); const a = nz(r, -6, 6), b = nz(r, -10, 10), k = nz(r, -5, 5); const ans = a * k + b;
        return Object.assign({ soru: `${v} = ${N(k)} için ${ex([[a, v], [b, '']])} ifadesinin değeri kaçtır?`, cozum: `${v} yerine ${N(k)} yazılır: ${N(a)} · ${PS(k)} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${N(a * k)} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = <b>${N(ans)}</b>` }, mc(r, ans, [a * -k + b, a * k - b, a + k + b]));
      },
      3: r => {
        if (r() < 0.5) {
          const a = rnd(r, 2, 5), b = rnd(r, 1, 4), c = nz(r, -6, 6), d = rnd(r, 2, 4); let e; do { e = rnd(r, 1, 3); } while (a * b === d * e); const f = rnd(r, 1, 6);
          const ans = ex([[a * b - d * e, 'x'], [a * c + d * f, '']]);
          return Object.assign({ soru: `${a}(${ex([[b, 'x'], [c, '']])}) − ${d}(${ex([[e, 'x'], [-f, '']])}) ifadesinin en sade hâli aşağıdakilerden hangisidir?`, cozum: `Dağılma özelliği: ${ex([[a * b, 'x'], [a * c, '']])} ${'−'} ${d * e}x + ${d * f}<br>(Eksi, ikinci parantezdeki tüm işaretleri değiştirir.)<br>Benzer terimler: <b>${ans}</b>` }, mc(r, ans, [ex([[a * b - d * e, 'x'], [a * c - d * f, '']]), ex([[a * b + d * e, 'x'], [a * c + d * f, '']]), ex([[a * b - d * e, 'x'], [c + d * f, '']]), ex([[a * b + d * e, 'x'], [a * c - d * f, '']]), ex([[b - e, 'x'], [c + f, '']])], S));
        }
        const k = rnd(r, 2, 7); const m = rnd(r, -k + 1, 6); const n = pick(r, [10, 15, 20, 25, 30, 50]); const t = i => k * i + m;
        return Object.assign({ soru: `Bir sayı örüntüsünün ilk dört terimi: ${t(1)}, ${t(2)}, ${t(3)}, ${t(4)}, …<br><br>Bu örüntünün ${n}. terimi kaçtır?`, cozum: `Ardışık terimler arasındaki fark ${k} → genel terim ${ex([[k, 'n'], [m, '']])} (n = 1 için ${t(1)} ✔)<br>${n}. terim: ${k} · ${n} ${m < 0 ? '−' : '+'} ${Math.abs(m)} = <b>${t(n)}</b>` }, mc(r, t(n), [k * n, t(1) * n, t(n) + k, t(n) - k]));
      }
    }
  });

  /* ---------- 4. EŞİTLİK VE DENKLEM ---------- */
  konular.push({
    id: 'denklem', ad: 'Eşitlik ve Denklem', ikon: '=', ozet: 'Terazi modeli, denklem çözme, problemler',
    anlatim: `
<div class="blok"><h3>Eşitliğin korunumu</h3>
<p>Eşit kollu bir terazi dengedeyken <b>iki kefeye de aynı işlemi</b> yaparsak denge bozulmaz. Denklem çözmenin temel fikri budur.</p>
<figure>${terazi(['x', 'x', '3'], ['x', '8'])}<figcaption>2x + 3 = x + 8 → İki kefeden de birer x alalım: x + 3 = 8 → İki kefeden 3 alalım: x = 5</figcaption></figure></div>

<div class="blok"><h3>Birinci dereceden bir bilinmeyenli denklem</h3>
<p>İçinde tek bilinmeyen bulunan ve bilinmeyenin üssü 1 olan eşitliklerdir: 2x + 5 = 13</p>
<ol><li>Bilinmeyenli terimleri bir tarafa, sayıları diğer tarafa topla.</li><li>Eşitliğin bir tarafından diğer tarafa geçen terimin işareti değişir (aslında iki tarafa aynı işlem yapılır).</li><li>Bilinmeyenin katsayısına böl.</li></ol>
<p>2x + 5 = 13 → 2x = 13 − 5 → 2x = 8 → <b>x = 4</b></p>
<div class="ipucu">✅ Kontrol: x = 4'ü yerine koy: 2·4 + 5 = 13 ✔</div></div>

<div class="blok"><h3>Parantezli denklemler</h3>
<p>3(x − 2) = x + 4 → 3x − 6 = x + 4 → 3x − x = 4 + 6 → 2x = 10 → <b>x = 5</b></p></div>

<div class="blok"><h3>Problemleri denkleme çevirme</h3>
<div class="tb-wrap"><table class="tb"><tr><th>Sözel ifade</th><th>Cebirsel</th></tr>
<tr><td>Bir sayının 3 katı</td><td>3x</td></tr><tr><td>Bir sayının 5 fazlası</td><td>x + 5</td></tr>
<tr><td>Bir sayının yarısının 2 eksiği</td><td>x/2 − 2</td></tr><tr><td>Ardışık iki sayı</td><td>x ve x + 1</td></tr></table></div></div>

<div class="ornek"><b>Örnek:</b> Bir sayının 3 katının 5 fazlası 26'dır. Bu sayı kaçtır?
<details class="coz"><summary>Çözümü göster</summary>3x + 5 = 26 → 3x = 21 → <b>x = 7</b></details></div>`,
    sorular: [
      { seviye: 1, soru: 'Şekildeki eşit kollu terazi dengededir. Kutuların her birinin kütlesi x kg olduğuna göre x kaçtır?', sekil: terazi(['x', '5 kg'], ['12 kg']), secenekler: ['17', '7', '6', '5'], dogru: 1, cozum: 'x + 5 = 12 → x = 12 − 5 = <b>7</b>' },
      { seviye: 1, soru: 'Aşağıdakilerden hangisi 2x − 5 = 9 denkleminin çözümüdür?', secenekler: ['2', '−7', '7', '14'], dogru: 2, cozum: '2x = 9 + 5 = 14 → x = <b>7</b>' },
      { seviye: 2, soru: 'Şekildeki eşit kollu terazi dengededir. Özdeş kutuların her biri kaç kg\'dır?', sekil: terazi(['x', 'x', 'x', '4 kg'], ['x', '10 kg']), secenekler: ['2', '3', '4', '6'], dogru: 1, cozum: '3x + 4 = x + 10<br>3x − x = 10 − 4 → 2x = 6 → <b>x = 3</b> kg' },
      { seviye: 3, soru: 'Ali\'nin yaşı kardeşinin yaşının 3 katıdır. 4 yıl sonra ikisinin yaşları toplamı 32 olacaktır.<br><br>Buna göre Ali bugün kaç yaşındadır?', secenekler: ['18', '6', '24', '12'], dogru: 0, cozum: 'Kardeş: x, Ali: 3x. 4 yıl sonra: (x + 4) + (3x + 4) = 32<br>4x + 8 = 32 → 4x = 24 → x = 6. Ali: 3 · 6 = <b>18</b>' },
      { seviye: 3, soru: 'Bir otoparkta yalnızca otomobil ve motosiklet bulunmaktadır. Toplam araç sayısı 30, toplam tekerlek sayısı 100\'dür.<br><br>Otoparkta kaç otomobil vardır? (Otomobil 4, motosiklet 2 tekerleklidir.)', secenekler: ['10', '15', '20', '25'], dogru: 2, cozum: 'Otomobil sayısı x, motosiklet 30 − x.<br>4x + 2(30 − x) = 100 → 4x + 60 − 2x = 100 → 2x = 40 → <b>x = 20</b>' }
    ],
    uret: {
      1: r => {
        if (r() < 0.5) {
          const a = nz(r, -12, 12), x = nz(r, -10, 15); const b = x + a;
          return Object.assign({ soru: `${ex([[1, 'x'], [a, '']])} = ${N(b)} denkleminde x kaçtır?`, cozum: `${a > 0 ? 'Her iki taraftan ' + a + ' çıkarılır' : 'Her iki tarafa ' + Math.abs(a) + ' eklenir'}: x = ${N(b)} ${a > 0 ? '−' : '+'} ${Math.abs(a)} = <b>${N(x)}</b>` }, mc(r, x, [b + a, -x, b]));
        }
        const a = rnd(r, 2, 9), x = nz(r, -9, 12); const b = a * x;
        return Object.assign({ soru: `${a}x = ${N(b)} denkleminde x kaçtır?`, cozum: `Her iki taraf ${a}'e bölünür: x = ${N(b)} : ${a} = <b>${N(x)}</b>` }, mc(r, x, [b - a, -x, b + a]));
      },
      2: r => {
        const a = rnd(r, 2, 9), x = nz(r, -9, 12), b = nz(r, -15, 15); const c = a * x + b;
        const w = [(c + b) % a === 0 ? (c + b) / a : null, c - b, -x];
        return Object.assign({ soru: `${ex([[a, 'x'], [b, '']])} = ${N(c)} denklemini sağlayan x değeri kaçtır?`, cozum: `${a}x = ${N(c)} ${b > 0 ? '−' : '+'} ${Math.abs(b)} = ${N(c - b)}<br>x = ${N(c - b)} : ${a} = <b>${N(x)}</b>` }, mc(r, x, w));
      },
      3: r => {
        if (r() < 0.5) {
          const x = nz(r, -6, 10), a = rnd(r, 2, 6), b = nz(r, -5, 7); let c; do { c = rnd(r, 1, 9); } while (c === a); const d = a * (x + b) - c * x;
          return Object.assign({ soru: `${a}(${ex([[1, 'x'], [b, '']])}) = ${ex([[c, 'x'], [d, '']])} denkleminin çözümü kaçtır?`, cozum: `${ex([[a, 'x'], [a * b, '']])} = ${ex([[c, 'x'], [d, '']])}<br>${a}x − ${c}x = ${N(d)} ${a * b < 0 ? '+' : '−'} ${Math.abs(a * b)} → ${a - c}x = ${N(d - a * b)}<br>x = <b>${N(x)}</b>` }, mc(r, x, [-x, x + 2, (d - b) % (a - c) === 0 ? (d - b) / (a - c) : null]));
        }
        let k1, k2, m, x, n; do { k1 = rnd(r, 3, 7); k2 = rnd(r, 1, k1 - 1); m = rnd(r, 1, 12); x = rnd(r, 3, 15); n = (k1 - k2) * x - m; } while (n <= 0);
        const kat = k => (k === 1 ? 'kendisinin' : k + ' katının'); const kat2 = k => (k === 1 ? 'aynı sayının' : 'aynı sayının ' + k + ' katının');
        return Object.assign({ soru: `Bir sayının ${kat(k1)} ${m} eksiği, ${kat2(k2)} ${n} fazlasına eşittir.<br><br>Bu sayı kaçtır?`, cozum: `${k1}x − ${m} = ${k2 === 1 ? '' : k2}x + ${n}<br>${k1 - k2}x = ${n + m} → x = <b>${x}</b>` }, mc(r, x, [x + 1, (n - m) % (k1 - k2) === 0 ? (n - m) / (k1 - k2) : null, x * 2]));
      }
    }
  });

  /* ---------- 5. ORAN VE ORANTI ---------- */
  konular.push({
    id: 'oran-oranti', ad: 'Oran ve Orantı', ikon: '∶', ozet: 'Doğru ve ters orantı, birim oran',
    anlatim: `
<div class="blok"><h3>Oran</h3>
<p>Aynı birimdeki iki çokluğun bölme yoluyla karşılaştırılmasına <b>oran</b> denir. a'nın b'ye oranı ${F('a', 'b')} veya a : b şeklinde yazılır.</p>
<p>12 kız, 18 erkek öğrenci → kızların erkeklere oranı ${F(12, 18)} = ${F(2, 3)}</p>
<div class="bilgi">💡 <b>Birim oran:</b> Paydası 1 olacak şekilde yazılan orandır. 240 km'yi 3 saatte giden araç saatte 80 km gider.</div></div>

<div class="blok"><h3>Orantı</h3>
<p>İki oranın eşitliğine <b>orantı</b> denir: ${F('a', 'b')} = ${F('c', 'd')} ise <b>a · d = b · c</b> (içler dışlar çarpımı)</p>
<p>${F(3, 4)} = ${F('x', 20)} → 4x = 60 → x = 15</p></div>

<div class="blok"><h3>Doğru orantı</h3>
<p>Bir çokluk artarken diğeri <b>aynı oranda artıyorsa</b> doğru orantılıdır. Oranları sabittir. Grafiği başlangıç noktasından geçen bir doğrudur.</p>
<figure><svg class="fig sm" viewBox="0 0 320 230"><line class="l" x1="40" y1="190" x2="300" y2="190"/><line class="l" x1="40" y1="190" x2="40" y2="20"/>
<line class="la" x1="40" y1="190" x2="280" y2="30"/>
${[1, 2, 3, 4].map(i => `<circle cx="${40 + i * 55}" cy="${190 - i * 36.6}" r="5" class="fa"/><line class="ld" x1="${40 + i * 55}" y1="190" x2="${40 + i * 55}" y2="${190 - i * 36.6}"/><text x="${40 + i * 55}" y="208" text-anchor="middle" class="m">${i}</text><text x="34" y="${195 - i * 36.6}" text-anchor="end" class="m">${i * 15}</text>`).join('')}
<text x="300" y="208" text-anchor="end" class="m">Kütle (kg)</text><text x="46" y="18" class="m">Fiyat (TL)</text></svg>
<figcaption>Elmanın kilogramı 15 TL: kütle 2 katına çıkınca fiyat da 2 katına çıkar.</figcaption></figure></div>

<div class="blok"><h3>Ters orantı</h3>
<p>Bir çokluk artarken diğeri <b>aynı oranda azalıyorsa</b> ters orantılıdır. Çarpımları sabittir.</p>
<div class="tb-wrap"><table class="tb"><tr><th>İşçi sayısı</th><td>2</td><td>4</td><td>6</td><td>12</td></tr><tr><th>Gün sayısı</th><td>12</td><td>6</td><td>4</td><td>2</td></tr><tr><th>Çarpım</th><td>24</td><td>24</td><td>24</td><td>24</td></tr></table></div>
<div class="dikkat">⚠️ "İşçi artarsa iş daha <b>kısa</b> sürer" → ters orantı. Soruyu okurken önce ilişkinin türünü belirle!</div></div>

<div class="ornek"><b>Örnek:</b> 6 musluk bir havuzu 8 saatte dolduruyor. 2 musluk bozulursa havuz kaç saatte dolar?
<details class="coz"><summary>Çözümü göster</summary>Ters orantı: 6 · 8 = 48 → 4 musluk: 48 : 4 = <b>12 saat</b></details></div>`,
    sorular: [
      { seviye: 1, soru: 'Bir sınıfta 12 kız ve 18 erkek öğrenci vardır. Kız öğrenci sayısının erkek öğrenci sayısına oranı kaçtır?', secenekler: [F(3, 2), F(2, 5), F(2, 3), F(3, 5)], dogru: 2, cozum: F(12, 18) + ' oranı 6 ile sadeleşir: <b>' + F(2, 3) + '</b>' },
      { seviye: 2, soru: 'Aşağıdaki grafikte bir manavda satılan elmanın kütlesi ile fiyatı arasındaki ilişki gösterilmiştir.<br><br>Buna göre 5 kg elma kaç TL\'dir?', sekil: `<svg class="fig sm" viewBox="0 0 320 230"><line class="l" x1="40" y1="190" x2="300" y2="190"/><line class="l" x1="40" y1="190" x2="40" y2="20"/><line class="la" x1="40" y1="190" x2="250" y2="44"/><circle cx="145" cy="117" r="5" class="fa"/><line class="ld" x1="145" y1="190" x2="145" y2="117"/><line class="ld" x1="40" y1="117" x2="145" y2="117"/><text x="145" y="208" text-anchor="middle" class="m">2</text><text x="34" y="122" text-anchor="end" class="m">30</text><text x="300" y="208" text-anchor="end" class="m">Kütle (kg)</text><text x="46" y="18" class="m">Fiyat (TL)</text></svg>`, secenekler: ['60', '75', '90', '150'], dogru: 1, cozum: 'Grafik başlangıç noktasından geçen doğru → doğru orantı. 2 kg = 30 TL ise 1 kg = 15 TL.<br>5 kg = 5 · 15 = <b>75 TL</b>' },
      { seviye: 2, soru: '4 kişilik bir kek tarifinde 3 yumurta kullanılmaktadır. Aynı tarifle 12 kişilik kek yapmak için kaç yumurta gerekir?', secenekler: ['9', '6', '12', '16'], dogru: 0, cozum: 'Kişi sayısı 3 katına çıktı (4 → 12), yumurta da 3 katına çıkar: 3 · 3 = <b>9</b>' },
      { seviye: 3, soru: 'Bir haritada 1 cm, gerçekte 5 km\'lik uzaklığı göstermektedir. Bu haritada iki şehir arasındaki uzaklık 7,5 cm olarak ölçülmüştür.<br><br>İki şehir arasındaki gerçek uzaklık kaç km\'dir?', secenekler: ['35', '12,5', '75', '37,5'], dogru: 3, cozum: 'Doğru orantı: 7,5 · 5 = <b>37,5 km</b>' },
      { seviye: 3, soru: 'Aynı güçteki 6 musluk boş bir havuzu 8 saatte doldurmaktadır. Musluklardan 2 tanesi bozulursa kalan musluklar havuzu kaç saatte doldurur?', secenekler: ['6', '10', '12', '16'], dogru: 2, cozum: 'Musluk azalırsa süre artar → ters orantı. Toplam iş: 6 · 8 = 48.<br>4 musluk: 48 : 4 = <b>12 saat</b>' }
    ],
    uret: {
      1: r => {
        const b = rnd(r, 2, 9); let a; do { a = rnd(r, 1, 12); } while (a === b); const k = rnd(r, 2, 6); const c = b * k; const ans = a * k;
        return Object.assign({ soru: `${F(a, b)} = ${F('x', c)} orantısında x kaçtır?`, cozum: `İçler dışlar çarpımı: ${b} · x = ${a} · ${c} → x = ${a * c} : ${b} = <b>${ans}</b><br>(Payda ${k} ile genişletilmiş, pay da ${k} ile çarpılır.)` }, mc(r, ans, [c - b + a, a + k, ans + k]));
      },
      2: r => {
        const urun = pick(r, [['kg elma', 'kg elmanın'], ['kg portakal', 'kg portakalın'], ['defter', 'defterin'], ['kg domates', 'kg domatesin'], ['kalem', 'kalemin']]);
        const u = rnd(r, 8, 45), n = rnd(r, 2, 6), m = rnd(r, n + 1, 12); const p = n * u;
        return Object.assign({ soru: `${n} ${urun[0]} ${p} TL olduğuna göre ${m} ${urun[1]} fiyatı kaç TL'dir?`, cozum: `Doğru orantı. Birim fiyat: ${p} : ${n} = ${u} TL<br>${m} · ${u} = <b>${m * u} TL</b>` }, mc(r, m * u, [p + (m - n), m * u - u, m * u + u]));
      },
      3: r => {
        if (r() < 0.55) {
          const k1 = rnd(r, 2, 8), d1 = rnd(r, 3, 12), T = k1 * d1; const bol = []; for (let i = 2; i <= 16; i++) if (T % i === 0 && i !== k1) bol.push(i);
          if (!bol.length) return konular[4].uret[2](r);
          const k2 = pick(r, bol); const ans = T / k2;
          return Object.assign({ soru: `Aynı hızda çalışan ${k1} işçi bir işi ${d1} günde bitirmektedir. Aynı işi aynı hızda çalışan ${k2} işçi kaç günde bitirir?`, cozum: `İşçi sayısı ${k2 > k1 ? 'artarsa' : 'azalırsa'} gün sayısı ${k2 > k1 ? 'azalır' : 'artar'} → ters orantı.<br>${k1} · ${d1} = ${k2} · x → x = ${T} : ${k2} = <b>${ans}</b>` }, mc(r, ans, [(d1 * k2) % k1 === 0 ? d1 * k2 / k1 : null, d1 + k1 - k2, T]));
        }
        const p = rnd(r, 2, 6); let q; do { q = rnd(r, 2, 8); } while (q === p); const k = rnd(r, 3, 15); const top = (p + q) * k;
        return Object.assign({ soru: `${top} TL, iki kardeş arasında yaşları olan ${p} ve ${q} sayılarıyla doğru orantılı olarak paylaştırılıyor.<br><br>Yaşı ${q} olan kardeş kaç TL alır?`, cozum: `Toplam pay: ${p} + ${q} = ${p + q}. Bir pay: ${top} : ${p + q} = ${k} TL<br>${q} pay: ${q} · ${k} = <b>${q * k} TL</b>` }, mc(r, q * k, [p * k, top / 2, top - p]));
      }
    }
  });

  /* ---------- 6. YÜZDELER ---------- */
  function yuzdeIzgara(n) {
    let s = '<svg class="fig sm" viewBox="0 0 220 220">';
    for (let i = 0; i < 100; i++) { const x = 10 + (i % 10) * 20, y = 10 + Math.floor(i / 10) * 20; s += `<rect x="${x}" y="${y}" width="20" height="20" class="${i < n ? 'fa' : 'fc'} bd" style="${i < n ? 'opacity:.8' : ''}"/>`; }
    return s + '</svg>';
  }
  konular.push({
    id: 'yuzdeler', ad: 'Yüzdeler', ikon: '%', ozet: 'Yüzde hesaplama, indirim, zam, kâr-zarar',
    anlatim: `
<div class="blok"><h3>Yüzde nedir?</h3>
<p>Paydası 100 olan oranlara <b>yüzde</b> denir. %35 = ${F(35, 100)}, "yüzde otuz beş" diye okunur.</p>
<figure>${yuzdeIzgara(35)}<figcaption>100 eş kareden 35'i boyalı: %35</figcaption></figure>
<div class="tb-wrap"><table class="tb"><tr><th>Yüzde</th><td>%10</td><td>%20</td><td>%25</td><td>%50</td><td>%75</td></tr><tr><th>Kesir</th><td>${F(1, 10)}</td><td>${F(1, 5)}</td><td>${F(1, 4)}</td><td>${F(1, 2)}</td><td>${F(3, 4)}</td></tr><tr><th>Ondalık</th><td>0,1</td><td>0,2</td><td>0,25</td><td>0,5</td><td>0,75</td></tr></table></div></div>

<div class="blok"><h3>Bir sayının yüzdesini bulma</h3>
<span class="formul">A'nın %p'si = A · ${F('p', 100)}</span>
<p>240'ın %25'i = 240 · ${F(25, 100)} = 60</p>
<div class="ipucu">✅ Kısa yol: %10'u bulmak için sayıyı 10'a böl. 240'ın %10'u 24 → %30'u 72</div></div>

<div class="blok"><h3>İndirim ve zam</h3>
<ul><li><b>%20 indirim:</b> Yeni fiyat, eski fiyatın %80'idir. 500 TL → 500 · 0,8 = 400 TL</li>
<li><b>%20 zam:</b> Yeni fiyat, eski fiyatın %120'sidir. 500 TL → 500 · 1,2 = 600 TL</li></ul>
<div class="dikkat">⚠️ Önce %20 zam sonra %20 indirim yapılırsa fiyat eski hâline <b>dönmez</b>! 100 → 120 → 96</div></div>

<div class="blok"><h3>Kâr ve zarar</h3>
<p>Kâr ve zarar her zaman <b>maliyet (alış fiyatı)</b> üzerinden hesaplanır. Maliyeti 200 TL olan ürün %15 kârla 200 + 30 = 230 TL'ye satılır.</p></div>

<div class="ornek"><b>Örnek:</b> Bir sınıftaki 30 öğrencinin %40'ı kızdır. Sınıfta kaç erkek öğrenci vardır?
<details class="coz"><summary>Çözümü göster</summary>Erkekler %60: 30 · ${F(60, 100)} = <b>18</b></details></div>`,
    sorular: [
      { seviye: 1, soru: 'Aşağıda 100 eş kareden oluşan tabloda boyalı kısım tüm tablonun yüzde kaçıdır?', sekil: yuzdeIzgara(35), secenekler: ['%65', '%3,5', '%35', '%53'], dogru: 2, cozum: '100 karenin 35\'i boyalı: <b>%35</b>' },
      { seviye: 1, soru: '%25 aşağıdaki kesirlerden hangisine eşittir?', secenekler: [F(1, 4), F(1, 25), F(2, 5), F(1, 5)], dogru: 0, cozum: '%25 = ' + F(25, 100) + ' = <b>' + F(1, 4) + '</b>' },
      { seviye: 2, soru: 'Bir sınıftaki 30 öğrencinin %40\'ı kızdır. Bu sınıfta kaç erkek öğrenci vardır?', secenekler: ['12', '18', '20', '10'], dogru: 1, cozum: 'Erkeklerin oranı %100 − %40 = %60. 30 · ' + F(60, 100) + ' = <b>18</b>' },
      { seviye: 3, soru: 'Fiyatı 800 TL olan bir ayakkabıya önce %20 zam yapılmış, ardından yeni fiyat üzerinden %25 indirim uygulanmıştır.<br><br>Ayakkabının son fiyatı kaç TL\'dir?', secenekler: ['760', '800', '840', '720'], dogru: 3, cozum: 'Zamlı fiyat: 800 · 1,2 = 960 TL<br>İndirimli fiyat: 960 · 0,75 = <b>720 TL</b>' },
      { seviye: 3, soru: 'Bir okuldaki 7. sınıf öğrencilerinin %60\'ı satranç kursuna gitmektedir. Satranç kursuna gitmeyen öğrenci sayısı 48 olduğuna göre okulda kaç 7. sınıf öğrencisi vardır?', secenekler: ['80', '96', '120', '160'], dogru: 2, cozum: 'Gitmeyenler %40. %40 → 48 ise %10 → 12, %100 → <b>120</b>' }
    ],
    uret: {
      1: r => {
        const p = pick(r, [10, 20, 25, 50, 5, 15, 30, 40, 75, 60]); const A = rnd(r, 2, 20) * 20; const ans = A * p / 100;
        const ek = { 5: 'i', 10: 'u', 15: 'i', 20: 'si', 25: 'i', 30: 'u', 40: 'ı', 50: 'si', 60: 'ı', 75: 'i' }[p];
        return Object.assign({ soru: `${A} sayısının %${p}'${ek} kaçtır?`, cozum: `${A} · ${F(p, 100)} = <b>${ans}</b>` }, mc(r, ans, [A * p / 10, A - ans, ans * 2]));
      },
      2: r => {
        const P = rnd(r, 5, 50) * 20, d = pick(r, [10, 20, 25, 30, 40, 50, 15, 5]); const fark = P * d / 100; const zam = r() < 0.4;
        const ans = zam ? P + fark : P - fark;
        const urun = pick(r, ['bir montun', 'bir bisikletin', 'bir çantanın', 'bir kulaklığın', 'bir ayakkabının']);
        return Object.assign({ soru: `Fiyatı ${P} TL olan ${urun} fiyatına %${d} ${zam ? 'zam' : 'indirim'} yapılmıştır. Ürünün yeni fiyatı kaç TL'dir?`, cozum: `${zam ? 'Zam' : 'İndirim'} miktarı: ${P} · ${F(d, 100)} = ${fark} TL<br>Yeni fiyat: ${P} ${zam ? '+' : '−'} ${fark} = <b>${ans} TL</b>` }, mc(r, ans, [fark, zam ? P - fark : P + fark, zam ? P + d : P - d]));
      },
      3: r => {
        if (r() < 0.5) {
          let P, a, b, P1, ans;
          do { P = rnd(r, 2, 20) * 100; a = pick(r, [10, 20, 25, 50]); b = pick(r, [10, 20, 25, 50]); P1 = P * (100 + a) / 100; ans = P1 - P1 * b / 100; } while (!Number.isInteger(ans));
          return Object.assign({ soru: `Fiyatı ${P} TL olan bir ürüne önce %${a} zam, ardından yeni fiyatı üzerinden %${b} indirim yapılmıştır.<br><br>Ürünün son fiyatı kaç TL'dir?`, cozum: `Zamlı fiyat: ${P} · ${D((100 + a) / 100)} = ${P1} TL<br>İndirimli fiyat: ${P1} · ${D((100 - b) / 100)} = <b>${ans} TL</b>` }, mc(r, ans, [P * (100 + a - b) / 100, P, P1]));
        }
        const B = rnd(r, 2, 30) * 10; const p = pick(r, [10, 20, 25, 30, 40, 50, 60, 75, 80]); const A = B * p / 100;
        if (!Number.isInteger(A)) return konular[5].uret[2](r);
        return Object.assign({ soru: `Bir kütüphanedeki ${B} kitabın ${A} tanesi romandır. Romanlar tüm kitapların yüzde kaçıdır?`, cozum: `${F(A, B)} = ${F(p, 100)} → <b>%${p}</b>` }, mc(r, p, [100 - p, A, p / 2], yuzde));
      }
    }
  });

  /* ---------- 7. DOĞRULAR VE AÇILAR ---------- */
  konular.push({
    id: 'acilar', ad: 'Doğrular ve Açılar', ikon: '∠', ozet: 'Tümler, bütünler, paralel doğrular',
    anlatim: `
<div class="blok"><h3>Açı türleri</h3>
<figure><svg class="fig" viewBox="0 0 440 120">
<g><line class="l" x1="20" y1="90" x2="90" y2="90"/><line class="l" x1="20" y1="90" x2="75" y2="40"/><path class="la" d="M45 90 A25 25 0 0 0 39 73" style="stroke-width:2"/><text x="55" y="112" text-anchor="middle" class="m">Dar (&lt;90°)</text></g>
<g><line class="l" x1="130" y1="90" x2="200" y2="90"/><line class="l" x1="130" y1="90" x2="130" y2="25"/><path class="lm" d="M130 76 h14 v14"/><text x="160" y="112" text-anchor="middle" class="m">Dik (90°)</text></g>
<g><line class="l" x1="260" y1="90" x2="320" y2="90"/><line class="l" x1="260" y1="90" x2="225" y2="40"/><path class="la" d="M282 90 A22 22 0 0 0 248 72" style="stroke-width:2"/><text x="270" y="112" text-anchor="middle" class="m">Geniş (90°–180°)</text></g>
<g><line class="l" x1="345" y1="90" x2="430" y2="90"/><circle cx="388" cy="90" r="3" class="fk"/><path class="la" d="M408 90 A20 20 0 0 0 368 90" style="stroke-width:2"/><text x="388" y="112" text-anchor="middle" class="m">Doğru (180°)</text></g>
</svg></figure></div>

<div class="blok"><h3>Tümler, bütünler, ters açılar</h3>
<ul><li><b>Tümler açılar:</b> Ölçüleri toplamı 90° olan açılar. 35° ile 55°</li>
<li><b>Bütünler açılar:</b> Ölçüleri toplamı 180° olan açılar. 110° ile 70°</li>
<li><b>Ters açılar:</b> Kesişen iki doğrunun oluşturduğu karşılıklı açılar <b>eşittir</b>.</li></ul>
<figure>${kesisen({ ust: 'a', alt: 'a', sol: 'b', sag: 'b' })}<figcaption>Ters açılar eşit: a = a, b = b. Komşu açılar bütünler: a + b = 180°</figcaption></figure></div>

<div class="blok"><h3>Paralel iki doğrunun bir kesenle yaptığı açılar</h3>
<figure>${paralel({ UR: 'a', UL: 'b', LL: 'a', LR: 'b' }, { UR: 'a', UL: 'b', LL: 'a', LR: 'b' })}<figcaption>Paralel doğrularda yalnızca iki farklı açı ölçüsü oluşur: <b>a</b> (dar) ve <b>b</b> (geniş), a + b = 180°</figcaption></figure>
<ul><li><b>Yöndeş açılar</b> (aynı konumdakiler) eşittir.</li><li><b>İç ters açılar</b> (paralellerin arasında, kesenin farklı tarafında) eşittir.</li><li><b>Dış ters açılar</b> eşittir.</li><li>Biri dar biri geniş olan iki açı <b>bütünlerdir</b>.</li></ul>
<div class="ipucu">✅ Pratik kural: Şekildeki dar açılar birbirine, geniş açılar birbirine eşittir. Bir dar ile bir geniş açının toplamı 180°'dir.</div></div>

<div class="ornek"><b>Örnek:</b> Bütünleri, tümlerinin 3 katı olan açı kaç derecedir?
<details class="coz"><summary>Çözümü göster</summary>180 − x = 3(90 − x) → 180 − x = 270 − 3x → 2x = 90 → <b>x = 45°</b></details></div>`,
    sorular: [
      { seviye: 1, soru: 'Ölçüsü 90°\'den büyük, 180°\'den küçük olan açıya ne ad verilir?', secenekler: ['Dar açı', 'Dik açı', 'Geniş açı', 'Doğru açı'], dogru: 2, cozum: '90° ile 180° arasındaki açılar <b>geniş açıdır</b>.' },
      { seviye: 2, soru: 'Şekilde kesişen iki doğru verilmiştir. Buna göre x kaç derecedir?', sekil: kesisen({ ust: '130°', sag: 'x' }), secenekler: ['130', '50', '40', '60'], dogru: 1, cozum: 'Komşu açılar bir doğru üzerinde olduğundan bütünlerdir: x = 180° − 130° = <b>50°</b>' },
      { seviye: 3, soru: 'Bütünleri, tümlerinin 3 katı olan açı kaç derecedir?', secenekler: ['30', '45', '60', '22,5'], dogru: 1, cozum: '180 − x = 3(90 − x) → 180 − x = 270 − 3x → 2x = 90 → <b>x = 45°</b>' },
      { seviye: 3, soru: 'Şekilde d₁ ∥ d₂ olduğuna göre x kaçtır?', sekil: paralel({ UR: '(2x + 20)°' }, { LL: '(3x − 10)°' }, true), secenekler: ['10', '30', '50', '80'], dogru: 1, cozum: 'Her iki açı da dar açıdır. Paralel doğrularda dar açılar birbirine eşittir (yöndeş + ters açı):<br>2x + 20 = 3x − 10 → <b>x = 30</b>' }
    ],
    uret: {
      1: r => {
        if (r() < 0.5) {
          const x = rnd(r, 8, 82);
          return Object.assign({ soru: `${x}°'lik bir açının tümleri kaç derecedir?`, cozum: `Tümler açıların toplamı 90°'dir: 90° − ${x}° = <b>${90 - x}°</b>` }, mc(r, 90 - x, [180 - x, 360 - x, x]));
        }
        const x = rnd(r, 10, 170);
        return Object.assign({ soru: `${x}°'lik bir açının bütünleri kaç derecedir?`, cozum: `Bütünler açıların toplamı 180°'dir: 180° − ${x}° = <b>${180 - x}°</b>` }, mc(r, 180 - x, [x < 90 ? 90 - x : 360 - x, 360 - x, x]));
      },
      2: r => {
        const a = rnd(r, 35, 80); const konum = ['UR', 'UL', 'LL', 'LR']; const dar = k => k === 'UR' || k === 'LL';
        const k1 = pick(r, konum.filter(dar)); const k2 = pick(r, konum); const ans = dar(k2) ? a : 180 - a;
        const ust = {}, alt = {}; ust[k1] = a + '°'; alt[k2] = 'x';
        return Object.assign({ soru: 'Şekilde d₁ ∥ d₂ doğruları k doğrusu ile kesilmiştir. Buna göre x kaç derecedir?', sekil: paralel(ust, alt, true), cozum: `${a}° dar bir açıdır. x ${dar(k2) ? 'de dar açı olduğundan ona eşittir' : 'geniş açı olduğundan onunla bütünlerdir: 180° − ' + a + '°'} → <b>x = ${ans}°</b>` }, mc(r, ans, [dar(k2) ? 180 - a : a, 90 - a, 2 * a]));
      },
      3: r => {
        const A = rnd(r, 40, 80), x = rnd(r, 5, 20), p = rnd(r, 2, 4), q = p + rnd(r, 1, 3); const s = A - p * x, t = A - q * x;
        if (q * x + t <= 0 || A - q * x === 0) return konular[6].uret[2](r);
        const e1 = `(${ex([[p, 'x'], [s, '']])})°`, e2 = `(${ex([[q, 'x'], [t, '']])})°`;
        const ayni = r() < 0.5; const ust = { UR: e1 }, alt = {};
        if (ayni) alt.LL = e2;
        else alt.UR = e2;
        return Object.assign({ soru: 'Şekilde d₁ ∥ d₂ olduğuna göre x kaçtır?', sekil: paralel(ust, alt, true), cozum: `İki açı da dar açı olduğundan eşittir (${ayni ? 'yöndeş açının ters açısı' : 'yöndeş açılar'}):<br>${ex([[p, 'x'], [s, '']])} = ${ex([[q, 'x'], [t, '']])} → ${q - p}x = ${N(s - t)} → <b>x = ${x}</b>` }, mc(r, x, [A, x + 5, x * 2]));
      }
    }
  });

  /* ---------- 8. ÇOKGENLER VE ALAN ---------- */
  konular.push({
    id: 'cokgenler', ad: 'Çokgenler ve Alan', ikon: '⬠', ozet: 'İç-dış açılar, köşegen, dörtgen alanları',
    anlatim: `
<div class="blok"><h3>Çokgenin iç açıları</h3>
<p>n kenarlı bir çokgen, bir köşesinden çizilen köşegenlerle <b>(n − 2)</b> üçgene ayrılır. Her üçgenin iç açıları toplamı 180° olduğundan:</p>
<span class="formul">İç açılar toplamı = (n − 2) · 180°</span>
<figure><svg class="fig sm" viewBox="0 0 260 230"><path d="M130 20 L240 100 L198 215 L62 215 L20 100 Z" class="fs bi"/>
<line class="la" x1="130" y1="20" x2="198" y2="215" style="stroke-width:2"/><line class="la" x1="130" y1="20" x2="62" y2="215" style="stroke-width:2"/>
<text x="185" y="120" text-anchor="middle">1</text><text x="130" y="170" text-anchor="middle">2</text><text x="75" y="120" text-anchor="middle">3</text></svg>
<figcaption>Beşgen 3 üçgene ayrılır: 3 · 180° = 540°</figcaption></figure>
<div class="tb-wrap"><table class="tb"><tr><th>Çokgen</th><td>Üçgen</td><td>Dörtgen</td><td>Beşgen</td><td>Altıgen</td><td>Sekizgen</td></tr><tr><th>İç açılar toplamı</th><td>180°</td><td>360°</td><td>540°</td><td>720°</td><td>1080°</td></tr></table></div>
<ul><li><b>Dış açılar toplamı</b> her çokgende <b>360°</b>'dir.</li><li>Bir köşeden çizilebilen köşegen sayısı: <b>n − 3</b></li></ul></div>

<div class="blok"><h3>Düzgün çokgenler</h3>
<p>Tüm kenarları ve tüm açıları eşit olan çokgenlerdir. Bir dış açı = 360° : n, bir iç açı = 180° − dış açı.</p>
<p>Düzgün altıgen: dış açı 360 : 6 = 60°, iç açı 180 − 60 = 120°</p></div>

<div class="blok"><h3>Dörtgenlerde alan</h3>
<div class="grid g2">
<figure>${paralelkenar(12, 9, 7)}<figcaption><b>Paralelkenar:</b> Alan = taban · yükseklik = 12 · 7 = 84 cm²</figcaption></figure>
<figure>${yamuk(14, 8, 6)}<figcaption><b>Yamuk:</b> Alan = ${F('(alt + üst)', 2)} · h = ${F('(14 + 8)', 2)} · 6 = 66 cm²</figcaption></figure></div>
<div class="dikkat">⚠️ Paralelkenarda alan hesaplarken <b>yan kenarı değil yüksekliği</b> kullan!</div>
<p><b>Eşkenar dörtgen:</b> Alan = ${F('köşegen₁ · köşegen₂', 2)}</p></div>

<div class="ornek"><b>Örnek:</b> Bir iç açısı 140° olan düzgün çokgen kaç kenarlıdır?
<details class="coz"><summary>Çözümü göster</summary>Dış açı = 180 − 140 = 40°. n = 360 : 40 = <b>9</b></details></div>`,
    sorular: [
      { seviye: 1, soru: 'Bir üçgenin iki iç açısının ölçüleri 50° ve 70°\'dir. Üçüncü açının ölçüsü kaç derecedir?', secenekler: ['70', '60', '120', '50'], dogru: 1, cozum: '180° − (50° + 70°) = <b>60°</b>' },
      { seviye: 2, soru: 'Bir köşesinden 5 köşegen çizilebilen çokgen kaç kenarlıdır?', secenekler: ['5', '7', '8', '10'], dogru: 2, cozum: 'Bir köşeden çizilen köşegen sayısı n − 3 = 5 → <b>n = 8</b>' },
      { seviye: 2, soru: 'Şekildeki dörtgende verilenlere göre x kaç derecedir?', sekil: '<svg class="fig sm" viewBox="0 0 300 200"><path d="M40 170 L260 170 L220 40 L70 30 Z" class="fs bi"/><text x="62" y="160" class="a">85°</text><text x="226" y="160" class="a">x</text><text x="196" y="62" class="a">110°</text><text x="78" y="56" class="a">95°</text></svg>', secenekler: ['60', '70', '80', '90'], dogru: 1, cozum: 'Dörtgenin iç açıları toplamı 360°: 360 − (85 + 110 + 95) = <b>70°</b>' },
      { seviye: 3, soru: 'Şekildeki paralelkenarın alanı kaç cm²\'dir?', sekil: paralelkenar(12, 9, 7), secenekler: ['108', '84', '42', '63'], dogru: 1, cozum: 'Alan = taban · yükseklik = 12 · 7 = <b>84 cm²</b> (9 cm yan kenardır, yükseklik değildir.)' },
      { seviye: 3, soru: 'Bir düzgün beşgen ile bir eşkenar üçgen, bir kenarları ortak olacak şekilde yan yana getiriliyor. Ortak kenarın bir ucundaki beşgen iç açısı ile üçgen iç açısının toplamı kaç derecedir?', secenekler: ['168', '180', '148', '120'], dogru: 0, cozum: 'Düzgün beşgenin bir iç açısı: 540 : 5 = 108°. Eşkenar üçgenin bir açısı 60°.<br>108 + 60 = <b>168°</b>' }
    ],
    uret: {
      1: r => {
        const n = rnd(r, 4, 12); const ans = (n - 2) * 180;
        return Object.assign({ soru: `${n} kenarlı bir çokgenin iç açılarının ölçüleri toplamı kaç derecedir?`, cozum: `(n − 2) · 180° = (${n} − 2) · 180° = <b>${ans}°</b>` }, mc(r, ans, [n * 180, (n - 1) * 180, 360]));
      },
      2: r => {
        const n = pick(r, [3, 4, 5, 6, 8, 9, 10, 12]); const dis = 360 / n, ic = 180 - dis; const icMi = r() < 0.6;
        const ad = { 3: 'eşkenar üçgenin', 4: 'karenin', 5: 'düzgün beşgenin', 6: 'düzgün altıgenin', 8: 'düzgün sekizgenin', 9: 'düzgün dokuzgenin', 10: 'düzgün ongenin', 12: 'düzgün onikigenin' }[n];
        return Object.assign({ soru: `Bir ${ad} bir ${icMi ? 'iç' : 'dış'} açısının ölçüsü kaç derecedir?`, cozum: `Bir dış açı = 360° : ${n} = ${dis}°${icMi ? `<br>Bir iç açı = 180° − ${dis}° = <b>${ic}°</b>` : ' → <b>' + dis + '°</b>'}` }, mc(r, icMi ? ic : dis, [icMi ? dis : ic, (n - 2) * 180, 180 / n]));
      },
      3: r => {
        const t = rnd(r, 0, 2);
        if (t === 0) {
          const n = pick(r, [5, 6, 8, 9, 10, 12, 15, 18, 20]); const ic = 180 - 360 / n;
          return Object.assign({ soru: `Bir iç açısının ölçüsü ${ic}° olan düzgün çokgen kaç kenarlıdır?`, cozum: `Bir dış açı = 180° − ${ic}° = ${360 / n}°<br>n = 360° : ${360 / n}° = <b>${n}</b>` }, mc(r, n, [n + 1, n - 1, n + 2]));
        }
        if (t === 1) {
          let a, c, h; do { a = rnd(r, 8, 20); c = rnd(r, 4, a - 2); h = rnd(r, 3, 12); } while (((a + c) * h) % 2);
          const ans = (a + c) * h / 2;
          return Object.assign({ soru: 'Şekildeki yamuğun alanı kaç cm²\'dir?', sekil: yamuk(a, c, h), cozum: `Alan = ${F('(alt taban + üst taban)', 2)} · yükseklik = ${F('(' + a + ' + ' + c + ')', 2)} · ${h} = <b>${ans} cm²</b>` }, mc(r, ans, [(a + c) * h, a * h, c * h]));
        }
        const b = rnd(r, 6, 16), h = rnd(r, 3, 10); let k; do { k = rnd(r, h + 1, h + 6); } while (k === b);
        return Object.assign({ soru: 'Şekildeki paralelkenarın alanı kaç cm²\'dir?', sekil: paralelkenar(b, k, h), cozum: `Alan = taban · yükseklik = ${b} · ${h} = <b>${b * h} cm²</b><br>(${k} cm yan kenardır, alana katılmaz.)` }, mc(r, b * h, [b * k, b * h / 2, 2 * (b + k)]));
      }
    }
  });

  /* ---------- 9. ÇEMBER VE DAİRE ---------- */
  konular.push({
    id: 'cember', ad: 'Çember ve Daire', ikon: '◯', ozet: 'Çevre, alan, merkez açı, daire dilimi',
    anlatim: `
<div class="blok"><h3>Çemberin elemanları</h3>
<figure><svg class="fig sm" viewBox="0 0 300 240"><circle cx="150" cy="120" r="95" class="fs bi"/><circle cx="150" cy="120" r="4" class="fk"/><text x="140" y="114" text-anchor="end">O</text>
<line class="la" x1="150" y1="120" x2="245" y2="120"/><text x="198" y="112" text-anchor="middle" class="a">r</text>
<line class="lr" x1="83" y1="53" x2="217" y2="187"/><text x="100" y="58" class="r">çap</text>
<line class="lg" x1="70" y1="170" x2="150" y2="215"/><text x="88" y="206" class="g">kiriş</text>
<path d="M150 25 A95 95 0 0 1 233 74" fill="none" stroke="var(--warn)" stroke-width="5"/><text x="210" y="38" style="fill:var(--warn)">yay</text></svg>
<figcaption>O: merkez, r: yarıçap, çap = 2r (en uzun kiriş)</figcaption></figure>
<p><b>Çember</b> yalnızca sınır çizgisidir; <b>daire</b> ise çemberle birlikte içindeki bölgedir.</p></div>

<div class="blok"><h3>Çevre ve alan</h3>
<span class="formul">Çemberin uzunluğu = 2 · π · r</span>
<span class="formul">Dairenin alanı = π · r²</span>
<p>π ≈ 3,14 (sorularda genellikle <b>π = 3</b> alınır). r = 5 cm, π = 3 → çevre 2·3·5 = 30 cm, alan 3·25 = 75 cm²</p>
<div class="dikkat">⚠️ Soruda çap verilmişse önce yarıçapı bul (çap : 2).</div></div>

<div class="blok"><h3>Merkez açı, yay ve daire dilimi</h3>
<figure>${pasta([['α', 90, ''], ['', 270, '']]).replace('<svg class="fig sm"', '<svg class="fig sm" style="max-width:220px"')}<figcaption>Merkez açısı α olan daire dilimi, dairenin ${F('α', '360°')}'si kadardır.</figcaption></figure>
<span class="formul">Yay uzunluğu = 2πr · ${F('α', 360)} &nbsp;&nbsp; Dilim alanı = πr² · ${F('α', 360)}</span>
<p>r = 4, α = 90°, π = 3: dilim alanı = 3 · 16 · ${F(1, 4)} = 12</p></div>

<div class="ornek"><b>Örnek:</b> Yarıçapı 30 cm olan bir bisiklet tekerleği 10 tur attığında bisiklet kaç metre yol alır? (π = 3)
<details class="coz"><summary>Çözümü göster</summary>Bir tur = 2 · 3 · 30 = 180 cm. 10 tur = 1800 cm = <b>18 m</b></details></div>`,
    sorular: [
      { seviye: 1, soru: 'Çapı 14 cm olan bir çemberin yarıçapı kaç cm\'dir?', secenekler: ['28', '7', '14', '3,5'], dogru: 1, cozum: 'Yarıçap, çapın yarısıdır: 14 : 2 = <b>7 cm</b>' },
      { seviye: 2, soru: 'Yarıçapı 30 cm olan bir bisiklet tekerleği 10 tur attığında bisiklet kaç metre yol alır? (π = 3 alınız.)', secenekler: ['9', '1,8', '18', '180'], dogru: 2, cozum: 'Bir tur = çemberin uzunluğu = 2 · 3 · 30 = 180 cm<br>10 tur = 1800 cm = <b>18 m</b>' },
      { seviye: 3, soru: 'Yarıçapı 20 cm olan daire şeklindeki bir pizza 8 eş dilime ayrılıyor. Bir dilimin alanı kaç cm²\'dir? (π = 3 alınız.)', secenekler: ['150', '75', '300', '50'], dogru: 0, cozum: 'Pizzanın alanı: 3 · 20² = 1200 cm²<br>Bir dilim: 1200 : 8 = <b>150 cm²</b>' },
      { seviye: 3, soru: 'Bir kenarı 10 cm olan karenin içine, kenarlarına teğet olacak şekilde bir daire çiziliyor. Karenin içinde dairenin dışında kalan (boyalı) bölgenin alanı kaç cm²\'dir? (π = 3 alınız.)', sekil: '<svg class="fig sm" viewBox="0 0 220 220"><rect x="10" y="10" width="200" height="200" class="fa" style="opacity:.75"/><circle cx="110" cy="110" r="100" class="fc bi"/><text x="110" y="232" text-anchor="middle" class="m">10 cm</text></svg>', secenekler: ['75', '70', '25', '40'], dogru: 2, cozum: 'Karenin alanı: 10 · 10 = 100 cm². Dairenin yarıçapı 5 cm → alanı 3 · 25 = 75 cm²<br>Boyalı alan: 100 − 75 = <b>25 cm²</b>' }
    ],
    uret: {
      1: r => {
        const rr = rnd(r, 2, 15); const capMi = r() < 0.4;
        return Object.assign({ soru: `${capMi ? 'Çapı ' + 2 * rr : 'Yarıçapı ' + rr} cm olan bir çemberin uzunluğu kaç cm'dir? (π = 3 alınız.)`, cozum: `${capMi ? 'Yarıçap ' + rr + ' cm. ' : ''}Çevre = 2 · π · r = 2 · 3 · ${rr} = <b>${6 * rr} cm</b>` }, mc(r, 6 * rr, [3 * rr, 3 * rr * rr, 12 * rr]));
      },
      2: r => {
        const rr = rnd(r, 2, 12); const capMi = r() < 0.4;
        return Object.assign({ soru: `${capMi ? 'Çapı ' + 2 * rr : 'Yarıçapı ' + rr} cm olan bir dairenin alanı kaç cm²'dir? (π = 3 alınız.)`, cozum: `${capMi ? 'Yarıçap ' + rr + ' cm. ' : ''}Alan = π · r² = 3 · ${rr}² = 3 · ${rr * rr} = <b>${3 * rr * rr} cm²</b>` }, mc(r, 3 * rr * rr, [6 * rr, 12 * rr * rr, 9 * rr * rr]));
      },
      3: r => {
        let a, rr, ans, alanMi = r() < 0.6;
        do { a = pick(r, [30, 45, 60, 90, 120, 150, 180, 240, 270]); rr = rnd(r, 2, 12); ans = alanMi ? 3 * rr * rr * a / 360 : 6 * rr * a / 360; } while (!Number.isInteger(ans));
        const sekil = pasta([[a + '°', a, ''], ['', 360 - a, '']]);
        return Object.assign({ soru: `Yarıçapı ${rr} cm olan bir dairede merkez açısı ${a}° olan daire diliminin ${alanMi ? 'alanı kaç cm²' : 'yay uzunluğu kaç cm'}'dir? (π = 3 alınız.)`, sekil, cozum: alanMi ? `Dairenin alanı 3 · ${rr * rr} = ${3 * rr * rr} cm². Dilim, dairenin ${F(a, 360)}'ı kadardır:<br>${3 * rr * rr} · ${F(a, 360)} = <b>${ans} cm²</b>` : `Çember uzunluğu 2 · 3 · ${rr} = ${6 * rr} cm. Yay, çemberin ${F(a, 360)}'ı kadardır:<br>${6 * rr} · ${F(a, 360)} = <b>${ans} cm</b>` }, mc(r, ans, alanMi ? [3 * rr * rr, 6 * rr * a / 360, 3 * rr * rr - ans] : [3 * rr * rr * a / 360, 6 * rr, 6 * rr - ans]));
      }
    }
  });

  /* ---------- 10. VERİ ANALİZİ ---------- */
  konular.push({
    id: 'veri', ad: 'Veri Analizi', ikon: '📊', ozet: 'Ortalama, ortanca, tepe değer, grafikler',
    anlatim: `
<div class="blok"><h3>Merkezî eğilim ölçüleri</h3>
<p>Veri: <b>4, 7, 7, 3, 9</b></p>
<ul><li><b>Aritmetik ortalama:</b> Veriler toplanıp veri sayısına bölünür. (4 + 7 + 7 + 3 + 9) : 5 = 30 : 5 = <b>6</b></li>
<li><b>Ortanca (medyan):</b> Veriler sıralanır, ortadaki değer alınır. 3, 4, <b>7</b>, 7, 9 → 7. Veri sayısı çiftse ortadaki iki sayının ortalaması alınır.</li>
<li><b>Tepe değer (mod):</b> En çok tekrar eden değer → <b>7</b></li>
<li><b>Açıklık:</b> En büyük − en küçük = 9 − 3 = <b>6</b></li></ul>
<div class="dikkat">⚠️ Ortancayı bulmadan önce verileri mutlaka <b>küçükten büyüğe sırala</b>!</div></div>

<div class="blok"><h3>Grafik türleri</h3>
<figure>${sutun([['Pzt', 12], ['Salı', 8], ['Çar', 15], ['Per', 10], ['Cuma', 20]], 20, 'Adet', 'Satılan karpuz')}<figcaption><b>Sütun grafiği:</b> Kategorileri karşılaştırmak için kullanılır.</figcaption></figure>
<figure>${pasta([['Futbol', 120, '120°'], ['Basketbol', 90, '90°'], ['Voleybol', 90, '90°'], ['Yüzme', 60, '60°']])}<figcaption><b>Daire grafiği:</b> Bütünün parçalarını gösterir. Tüm açılar toplamı 360°'dir.</figcaption></figure>
<p>Daire grafiğinde bir dilimin temsil ettiği kişi sayısı = ${F('dilim açısı', '360°')} · toplam</p>
<p><b>Çizgi grafiği</b> ise zamana bağlı değişimi (sıcaklık, boy uzunluğu vb.) göstermek için kullanılır.</p></div>

<div class="ornek"><b>Örnek:</b> 4 sayının ortalaması 12'dir. Bu sayılara hangi sayı eklenirse ortalama 13 olur?
<details class="coz"><summary>Çözümü göster</summary>4 sayının toplamı 48. 5 sayının toplamı 5 · 13 = 65. Eklenen: 65 − 48 = <b>17</b></details></div>`,
    sorular: [
      { seviye: 1, soru: '4, 7, 7, 3, 9, 7, 4 veri grubunun tepe değeri (modu) kaçtır?', secenekler: ['4', '9', '7', '3'], dogru: 2, cozum: 'En çok tekrar eden değer 7\'dir (3 kez): <b>7</b>' },
      { seviye: 2, soru: 'Aşağıdaki sütun grafiğinde bir manavın beş günde sattığı karpuz sayıları verilmiştir.<br><br>Manavın günlük ortalama karpuz satışı kaçtır?', sekil: sutun([['Pzt', 12], ['Salı', 8], ['Çar', 15], ['Per', 10], ['Cuma', 20]], 20, 'Adet'), secenekler: ['12', '13', '15', '65'], dogru: 1, cozum: 'Toplam: 12 + 8 + 15 + 10 + 20 = 65. Ortalama: 65 : 5 = <b>13</b>' },
      { seviye: 2, soru: '5, 8, 3, 9, 8, 2, 7 veri grubunun ortancası (medyanı) kaçtır?', secenekler: ['9', '8', '6', '7'], dogru: 3, cozum: 'Sıralayalım: 2, 3, 5, <b>7</b>, 8, 8, 9 → 7 veri var, 4. sıradaki değer: <b>7</b>' },
      { seviye: 3, soru: 'Bir sınıftaki 36 öğrencinin en sevdiği spor dalları aşağıdaki daire grafiğinde gösterilmiştir.<br><br>Buna göre voleybolu en çok seven öğrenci sayısı kaçtır?', sekil: pasta([['Futbol', 120, '120°'], ['Basketbol', 90, '90°'], ['Voleybol', 90, '?'], ['Yüzme', 60, '60°']]), secenekler: ['9', '12', '6', '10'], dogru: 0, cozum: 'Voleybol dilimi: 360 − (120 + 90 + 60) = 90°<br>' + F(90, 360) + ' · 36 = ' + F(1, 4) + ' · 36 = <b>9</b>' }
    ],
    uret: {
      1: r => {
        const k = rnd(r, 4, 5), m = rnd(r, 5, 40); let v, son;
        do { v = []; for (let i = 0; i < k - 1; i++) v.push(rnd(r, Math.max(1, m - 8), m + 8)); son = k * m - v.reduce((a, b) => a + b, 0); } while (son < 1 || Math.abs(son - m) > 12);
        v.push(son); const top = k * m;
        return Object.assign({ soru: `${v.join(', ')} sayılarının aritmetik ortalaması kaçtır?`, cozum: `Toplam: ${v.join(' + ')} = ${top}<br>Ortalama: ${top} : ${k} = <b>${m}</b>` }, mc(r, m, [top, m + 1, m - 2]));
      },
      2: r => {
        const k = pick(r, [5, 7, 6]); let v; do { v = []; for (let i = 0; i < k; i++) v.push(rnd(r, 1, 40)); } while (k % 2 === 0 && (([...v].sort((a, b) => a - b)[k / 2 - 1] + [...v].sort((a, b) => a - b)[k / 2]) % 2));
        const s = [...v].sort((a, b) => a - b); const med = k % 2 ? s[(k - 1) / 2] : (s[k / 2 - 1] + s[k / 2]) / 2;
        const ort = Math.round(v.reduce((a, b) => a + b, 0) / k);
        return Object.assign({ soru: `${v.join(', ')} veri grubunun ortancası (medyanı) kaçtır?`, cozum: `Önce sıralanır: ${s.join(', ')}<br>${k % 2 ? `Ortadaki (${(k + 1) / 2}. sıradaki) değer` : `Ortadaki iki değerin ortalaması: (${s[k / 2 - 1]} + ${s[k / 2]}) : 2`} = <b>${med}</b>` }, mc(r, med, [v[Math.floor(k / 2)], ort, s[k - 1] - s[0]]));
      },
      3: r => {
        if (r() < 0.55) {
          const m = rnd(r, 10, 30); let m2, x; do { m2 = m + nz(r, -3, 5); x = 5 * m2 - 4 * m; } while (x <= 0);
          return Object.assign({ soru: `4 sayının aritmetik ortalaması ${m}'dir. Bu sayılara bir sayı daha eklendiğinde 5 sayının aritmetik ortalaması ${m2} oluyor.<br><br>Eklenen sayı kaçtır?`, cozum: `4 sayının toplamı: 4 · ${m} = ${4 * m}<br>5 sayının toplamı: 5 · ${m2} = ${5 * m2}<br>Eklenen sayı: ${5 * m2} − ${4 * m} = <b>${x}</b>` }, mc(r, x, [m2, 4 * (m2 - m), x + m2 - m]));
        }
        const M = rnd(r, 5, 25); const digerleri = new Set(); while (digerleri.size < 4) { const t = rnd(r, 1, 35); if (t !== M) digerleri.add(t); }
        const v = window.U.shuffle(r, [M, M, M, ...digerleri]); const ac = Math.max(...v) - Math.min(...v); const ans = ac + M;
        return Object.assign({ soru: `${v.join(', ')} veri grubunun açıklığı ile tepe değerinin toplamı kaçtır?`, cozum: `Açıklık: en büyük − en küçük = ${Math.max(...v)} − ${Math.min(...v)} = ${ac}<br>Tepe değer (en çok tekrar eden): ${M}<br>Toplam: <b>${ans}</b>` }, mc(r, ans, [Math.max(...v) + M, ac, Math.max(...v) + Math.min(...v)]));
      }
    }
  });

  return { id: 'matematik', ad: 'Matematik', ikon: 'π', aciklama: '7. sınıf konuları · LGS sayısal bölüm', konular };
})();
