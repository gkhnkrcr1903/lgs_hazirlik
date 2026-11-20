/* LGS Hazırlık — uygulama */
(function () {
  'use strict';
  const U = window.U;
  const DERS = { turkce: window.LGS_TR, sosyal: window.LGS_SOS, din: window.LGS_DIN, matematik: window.LGS_MAT };
  const DERS_SIRA = ['turkce', 'sosyal', 'din', 'matematik']; // LGS'deki sıra
  const HARF = ['A', 'B', 'C', 'D'];
  const SEV = {
    1: { ad: 'Kolay', acik: 'Temel kavramlar ve basit uygulamalar' },
    2: { ad: 'Orta', acik: 'Birkaç adımlı sorular' },
    3: { ad: 'LGS Seviyesi', acik: 'Yeni nesil, yorum gerektiren sorular' }
  };
  const UNVAN = ['Çaylak', 'Meraklı', 'Azimli', 'Çalışkan', 'Parlak', 'Usta', 'Uzman', 'Bilge', 'LGS Şampiyonu'];

  // El yazımı sorulara kalıcı kimlik ver
  for (const d of DERS_SIRA) {
    DERS[d].konular.forEach(k => (k.sorular || []).forEach((q, i) => { q.id = `${d}:${k.id}:${i}`; }));
  }
  const konuBul = (d, k) => DERS[d] && DERS[d].konular.find(x => x.id === k);

  /* ================= Kayıt (localStorage) ================= */
  const KEY = 'lgs-hazirlik-v1';
  const varsayilan = () => ({ ad: '', xp: 0, konu: {}, yanlis: [], gecmis: [], deneme: {}, gunler: [], cozulen: 0, dogru: 0, tema: 'auto' });
  let S;
  try { S = Object.assign(varsayilan(), JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { S = varsayilan(); }
  function kaydet() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* özel mod */ } }

  const bugun = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  function gunIsaretle() { const t = bugun(); if (!S.gunler.includes(t)) { S.gunler.push(t); if (S.gunler.length > 400) S.gunler.shift(); } }
  function seri() {
    const set = new Set(S.gunler); let n = 0; const d = new Date();
    if (!set.has(bugun(d))) d.setDate(d.getDate() - 1);
    while (set.has(bugun(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function seviyeHesap(xp) {
    let lv = 1, need = 100, rem = xp;
    while (rem >= need) { rem -= need; lv++; need += 50; }
    return { lv, rem, need, unvan: UNVAN[Math.min(lv - 1, UNVAN.length - 1)] };
  }
  const konuKey = (d, k) => d + '/' + k;
  function konuStat(d, k) { return S.konu[konuKey(d, k)] || {}; }
  function seviyeAcik(d, k, s) { if (s === 1) return true; const st = konuStat(d, k); return (st['s' + (s - 1)] || 0) >= 0.6; }
  function yildiz(d, k) { const st = konuStat(d, k); let n = 0; for (let s = 1; s <= 3; s++) if ((st['s' + s] || 0) >= 0.6) n++; return n; }
  function ustalik(d, k) { const st = konuStat(d, k); return ((st.s1 || 0) + (st.s2 || 0) + (st.s3 || 0)) / 3; }
  function dersUstalik(d) { const ks = DERS[d].konular; return ks.reduce((a, k) => a + ustalik(d, k.id), 0) / ks.length; }
  const yildizHTML = n => `<span class="stars">${'★'.repeat(n)}<span class="off">${'★'.repeat(3 - n)}</span></span>`;

  function cevapKaydet(q, dogruMu) {
    S.cozulen++; if (dogruMu) { S.dogru++; S.xp += 10; }
    const key = konuKey(q.ders, q.konu);
    const st = S.konu[key] || (S.konu[key] = {});
    st.d = (st.d || 0) + (dogruMu ? 1 : 0); st.t = (st.t || 0) + 1;
    const ix = S.yanlis.findIndex(x => x.id === q.id);
    if (!dogruMu && ix < 0) { S.yanlis.unshift(snap(q)); if (S.yanlis.length > 120) S.yanlis.pop(); }
    if (dogruMu && ix >= 0 && quiz && quiz.tur === 'yanlis') S.yanlis.splice(ix, 1);
    gunIsaretle();
  }
  const snap = q => ({ id: q.id, ders: q.ders, konu: q.konu, konuAd: q.konuAd, seviye: q.seviye, soru: q.soru, sekil: q.sekil || '', secenekler: q.secenekler, dogru: q.dogru, cozum: q.cozum || '', yan: q.yan || false, tarih: Date.now() });

  /* ================= Soru seçimi ================= */
  // Sıralı seçenekler (I-IV, sayılar) ve "yoktur/hiçbiri" içerenler karıştırılmaz
  const sabitSecenek = q => q.uretildi || q.secenekler.every(s => /^[IVX]+$|^−?[\d,]+$/.test(s)) || q.secenekler.some(s => /yoktur|Hiçbiri/i.test(s));
  function hazirla(q, d, k) {
    const o = Object.assign({}, q, { ders: d, konu: k.id, konuAd: k.ad });
    if (!sabitSecenek(q)) {
      const sira = U.shuffle(Math.random, [0, 1, 2, 3]);
      o.secenekler = sira.map(i => q.secenekler[i]); o.dogru = sira.indexOf(q.dogru);
    }
    return o;
  }
  // Bir konudan, belirli seviyede, kullanılmamış tek soru
  function soruSec(d, k, s, r, kullanilan) {
    const el = (k.sorular || []).filter(q => q.seviye === s && !kullanilan.has(q.id));
    const gen = k.uret && k.uret[s];
    if (el.length && (!gen || r() < 0.55)) return hazirla(U.pick(r, el), d, k);
    if (gen) {
      for (let t = 0; t < 8; t++) {
        const q = gen(r); q.seviye = s; q.uretildi = true; q.id = `g:${d}:${k.id}:${U.hash(q.soru + q.secenekler.join('|'))}`;
        if (!kullanilan.has(q.id)) return hazirla(q, d, k);
      }
    }
    const kalan = (k.sorular || []).filter(q => !kullanilan.has(q.id));
    if (kalan.length) {
      // en yakın seviyedekini tercih et
      kalan.sort((a, b) => Math.abs(a.seviye - s) - Math.abs(b.seviye - s));
      const yakin = kalan.filter(q => q.seviye === kalan[0].seviye);
      return hazirla(U.pick(r, yakin), d, k);
    }
    return null;
  }
  function seviyeTesti(d, k, s, adet, r) {
    const out = []; const used = new Set();
    const el = U.shuffle(r, (k.sorular || []).filter(q => q.seviye === s));
    const gen = k.uret && k.uret[s];
    // El yazımı soruların hepsi + gerekirse üretilmiş sorular
    for (const q of el) { if (out.length >= adet) break; out.push(hazirla(q, d, k)); used.add(q.id); }
    let deneme = 0;
    while (gen && out.length < adet && deneme++ < 40) {
      const q = gen(r); q.seviye = s; q.uretildi = true; q.id = `g:${d}:${k.id}:${U.hash(q.soru + q.secenekler.join('|'))}`;
      if (!used.has(q.id)) { used.add(q.id); out.push(hazirla(q, d, k)); }
    }
    return U.shuffle(r, out);
  }
  function seviyeAgirlik(r, agirlik) { const x = r(); let a = 0; for (let s = 1; s <= 3; s++) { a += agirlik[s - 1]; if (x < a) return s; } return 3; }

  // Deneme tanımları
  const DENEME_SAY = { matematik: 12, turkce: 12, sosyal: 8, din: 8, karma: 8, lgs: 9 };
  function denemeOlustur(tur, no) {
    const r = U.rng(`deneme-${tur}-${no}`);
    const used = new Set(); const qs = [];
    const al = (d, adet, agirlik) => {
      const ks = DERS[d].konular; const sira = [];
      // konuları eşit dağıt
      let pool = [];
      while (sira.length < adet) { if (!pool.length) pool = U.shuffle(r, ks.slice()); sira.push(pool.pop()); }
      const list = [];
      for (const k of sira) { const q = soruSec(d, k, seviyeAgirlik(r, agirlik), r, used); if (q) { used.add(q.id); list.push(q); } }
      // konu sırasını korumak için ders içinde konu sırasına göre diz
      list.sort((a, b) => ks.findIndex(k => k.id === a.konu) - ks.findIndex(k => k.id === b.konu));
      qs.push(...list);
    };
    let baslik, sure;
    if (tur === 'matematik') { al('matematik', 10, [0.25, 0.45, 0.3]); baslik = `Matematik Denemesi ${no}`; sure = 20; }
    else if (tur === 'turkce') { al('turkce', 10, [0.25, 0.45, 0.3]); baslik = `Türkçe Denemesi ${no}`; sure = 20; }
    else if (tur === 'sosyal') { al('sosyal', 10, [0.25, 0.45, 0.3]); baslik = `Sosyal Bilgiler Denemesi ${no}`; sure = 15; }
    else if (tur === 'din') { al('din', 10, [0.25, 0.45, 0.3]); baslik = `Din Kültürü Denemesi ${no}`; sure = 15; }
    else if (tur === 'karma') { al('turkce', 5, [0.2, 0.5, 0.3]); al('matematik', 5, [0.2, 0.5, 0.3]); baslik = `Karma Deneme ${no}`; sure = 20; }
    else { al('turkce', 20, [0.15, 0.45, 0.4]); al('sosyal', 10, [0.15, 0.45, 0.4]); al('din', 10, [0.15, 0.45, 0.4]); al('matematik', 20, [0.15, 0.45, 0.4]); baslik = `Genel LGS Denemesi ${no}`; sure = 120; }
    return { id: `${tur}-${no}`, tur, baslik, sure, sorular: qs };
  }

  /* ================= Yönlendirme ================= */
  const app = document.getElementById('app');
  let quiz = null, sonSonuc = null, sonDers = 'matematik', timerId = null;

  function git(h) { if (location.hash === h) route(); else location.hash = h; }
  window.addEventListener('hashchange', route);

  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
    const v = parts[0] || '';
    if (quiz && !quiz.bitti && v !== 'test') {
      if (!confirm('Test yarıda kalacak. Çıkmak istiyor musun?')) { location.hash = '#/test'; return; }
      testDurdur(); quiz = null;
    }
    document.body.classList.toggle('in-quiz', v === 'test');
    document.body.className = document.body.className.replace(/\bders-\w+/g, '').trim();
    const tab = { '': 'home', ders: 'ders', konu: 'ders', denemeler: 'denemeler', ilerleme: 'ilerleme', yanlislar: 'ilerleme' }[v];
    document.querySelectorAll('.tabbar a').forEach(a => a.classList.toggle('on', a.dataset.tab === tab));
    document.querySelector('.tabbar a[data-tab="ders"]').setAttribute('href', '#/ders/' + sonDers);
    xpGuncelle();
    try {
      if (v === '') vAna();
      else if (v === 'ders' && DERS[parts[1]]) vDers(parts[1]);
      else if (v === 'konu' && konuBul(parts[1], parts[2])) vKonu(parts[1], parts[2], parts[3] || '');
      else if (v === 'denemeler') vDenemeler();
      else if (v === 'ilerleme') vIlerleme();
      else if (v === 'yanlislar') vYanlislar();
      else if (v === 'test' && quiz) { vTest(); return; }
      else if (v === 'sonuc' && sonSonuc) vSonuc();
      else { location.hash = '#/'; return; }
    } catch (e) { console.error(e); app.innerHTML = `<div class="card">Bir hata oluştu: ${U.esc(e.message)}</div>`; }
    window.scrollTo(0, 0);
  }

  function xpGuncelle() { document.getElementById('xpChip').textContent = '⭐ ' + S.xp; }
  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
  }

  /* ================= Ana sayfa ================= */
  function vAna() {
    const sv = seviyeHesap(S.xp);
    const basari = S.cozulen ? Math.round(100 * S.dogru / S.cozulen) : 0;
    const dersKart = d => {
      const D = DERS[d]; const u = Math.round(100 * dersUstalik(d));
      return `<a class="card ders-card ders-${d}" href="#/ders/${d}">
        <div class="ders-ikon">${D.ikon}</div>
        <div style="flex:1;min-width:0"><h3>${D.ad}</h3><div class="muted small">${D.konular.length} konu · anlatım + seviyeli test</div>
        <div class="pbar"><div style="width:${u}%"></div></div><div class="small muted" style="margin-top:4px">Ustalık %${u}</div></div>
      </a>`;
    };
    app.innerHTML = `
      <section class="hero">
        <svg class="hero-deco" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="none" stroke="#fff" stroke-width="8"/><path d="M30 52l13 13 28-30" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <h1>Merhaba ${S.ad ? U.esc(S.ad) : 'LGS adayı'} 👋</h1>
        <p>Bugün biraz konu, biraz soru: küçük adımlar büyük başarı getirir.</p>
        ${S.ad ? '' : '<input id="adInput" placeholder="Adını yaz (isteğe bağlı)" maxlength="20" autocomplete="off">'}
        <div class="lv">
          <div class="lv-badge">${sv.lv}</div>
          <div style="flex:1"><b>${sv.unvan}</b> · Seviye ${sv.lv}
            <div class="bar"><div style="width:${Math.round(100 * sv.rem / sv.need)}%"></div></div>
            <div class="small" style="opacity:.9;margin-top:4px">Sonraki seviyeye ${sv.need - sv.rem} puan</div></div>
        </div>
      </section>
      <div class="stats">
        <div class="stat"><b>${S.cozulen}</b><span>Çözülen soru</span></div>
        <div class="stat"><b>%${basari}</b><span>Başarı</span></div>
        <div class="stat"><b>🔥 ${seri()}</b><span>Gün serisi</span></div>
      </div>
      <div class="section"><h2>Dersler</h2></div>
      <div class="grid g2">${DERS_SIRA.map(dersKart).join('')}</div>
      <div class="section"><h2>Hızlı başla</h2></div>
      <div class="grid g2">
        <button class="card action" data-act="gunun"><span class="ai">🎯</span><span><b>Günün Sorusu</b><span class="muted small">Her gün yeni bir soru</span></span><span class="go">›</span></button>
        <button class="card action" data-act="karma-hizli"><span class="ai">⚡</span><span><b>10 Soruluk Karma Deneme</b><span class="muted small">5 Türkçe + 5 Matematik · 20 dk</span></span><span class="go">›</span></button>
        <a class="card action" href="#/denemeler"><span class="ai">🏆</span><span><b>Genel LGS Denemesi</b><span class="muted small">60 soru: Türkçe, Sosyal, Din, Matematik · 120 dk</span></span><span class="go">›</span></a>
        <a class="card action" href="#/yanlislar"><span class="ai">🔁</span><span><b>Yanlışlarım</b><span class="muted small">${S.yanlis.length} soru tekrar bekliyor</span></span><span class="go">›</span></a>
      </div>
      <div class="section"><h2>Nasıl çalışmalıyım?</h2></div>
      <div class="card small">
        <ol style="margin:0;padding-left:1.2em">
          <li><b>Konu anlatımını oku</b>, çizimleri ve örnek çözümleri incele.</li>
          <li><b>Seviye 1'den başla.</b> %60 ve üzeri yaparsan bir sonraki seviye açılır ve ⭐ kazanırsın.</li>
          <li>Haftada en az bir <b>10 soruluk deneme</b> çöz, ayda bir <b>Genel LGS denemesi</b> yap.</li>
          <li><b>Yanlışlarım</b> bölümündeki soruları doğru yapana kadar tekrar et.</li>
        </ol>
      </div>
      <footer class="alt">Veriler yalnızca bu cihazda saklanır · LGS Hazırlık</footer>`;
    const inp = document.getElementById('adInput');
    if (inp) inp.addEventListener('change', () => { S.ad = inp.value.trim().slice(0, 20); kaydet(); vAna(); });
  }

  /* ================= Ders sayfası ================= */
  function vDers(d) {
    sonDers = d; document.body.classList.add('ders-' + d);
    document.querySelector('.tabbar a[data-tab="ders"]').setAttribute('href', '#/ders/' + d);
    const D = DERS[d];
    app.innerHTML = `
      <div class="seg seg-wide" style="margin-bottom:14px">
        ${DERS_SIRA.map(x => `<a href="#/ders/${x}" class="${x === d ? 'on' : ''}">${DERS[x].ikon} ${DERS[x].kisa || DERS[x].ad}</a>`).join('')}
      </div>
      <div class="page-head"><div class="ders-ikon">${D.ikon}</div><div><h1>${D.ad}</h1><div class="muted small">${D.aciklama}</div></div></div>
      <div class="grid g2">
        ${D.konular.map((k, i) => {
          const u = Math.round(100 * ustalik(d, k.id));
          return `<a class="card konu-item" href="#/konu/${d}/${k.id}">
            <span class="ki">${k.ikon || i + 1}</span>
            <span class="kx"><b>${k.ad}</b><span class="muted small">${k.ozet}</span>
              <span class="pbar" style="display:block"><span style="display:block;height:100%;width:${u}%;background:var(--accent);border-radius:99px"></span></span></span>
            ${yildizHTML(yildiz(d, k.id))}
          </a>`;
        }).join('')}
      </div>
      <div class="section"><h2>${D.ad} denemeleri</h2><a href="#/denemeler" class="small">Tümü ›</a></div>
      <button class="card action" data-act="deneme" data-tur="${d}" data-no="1"><span class="ai">📝</span><span><b>${D.ad} Denemesi 1</b><span class="muted small">10 soru · 20 dakika · tüm konulardan</span></span><span class="go">›</span></button>`;
  }

  /* ================= Konu sayfası ================= */
  function vKonu(d, kid, sekme) {
    sonDers = d; document.body.classList.add('ders-' + d);
    const k = konuBul(d, kid); const st = konuStat(d, kid);
    if (!sekme) sekme = (st.t ? 'test' : 'anlatim');
    const lvl = s => {
      const acik = seviyeAcik(d, kid, s); const en = st['s' + s];
      return `<button class="lvl ${acik ? '' : 'locked'}" data-act="seviye" data-d="${d}" data-k="${kid}" data-s="${s}">
        <span class="ln">${acik ? s : '🔒'}</span>
        <span class="lx"><b>Seviye ${s} · ${SEV[s].ad}</b><span class="muted small">${SEV[s].acik}</span>
        <span class="small" style="display:block;font-weight:800;color:${en >= 0.6 ? 'var(--ok)' : 'var(--muted)'}">${en != null ? 'En iyi sonuç: %' + Math.round(en * 100) : (acik ? 'Henüz çözülmedi' : `Açmak için Seviye ${s - 1}'de %60 yap`)}</span></span>
        <span class="stars">${en >= 0.6 ? '★' : '<span class="off">★</span>'}</span>
      </button>`;
    };
    app.innerHTML = `
      <a class="back" href="#/ders/${d}">‹ ${DERS[d].ad}</a>
      <div class="page-head"><div class="ders-ikon">${k.ikon || '•'}</div><div><h1>${k.ad}</h1><div class="muted small">${k.ozet}</div></div></div>
      <div class="seg seg-wide" style="margin-bottom:14px">
        <a href="#/konu/${d}/${kid}/anlatim" class="${sekme === 'anlatim' ? 'on' : ''}">📖 Konu Anlatımı</a>
        <a href="#/konu/${d}/${kid}/test" class="${sekme === 'test' ? 'on' : ''}">✏️ Seviyeli Test</a>
      </div>
      ${sekme === 'anlatim' ? `
        <article class="anlatim">${k.anlatim}</article>
        <a class="btn block" href="#/konu/${d}/${kid}/test">Konuyu anladım, teste geç ›</a>`
        : `
        ${lvl(1)}${lvl(2)}${lvl(3)}
        <div class="section"><h2>Konu testi</h2></div>
        <button class="card action" data-act="konutesti" data-d="${d}" data-k="${kid}"><span class="ai">🧪</span><span><b>${k.ad} Konu Testi</b><span class="muted small">Karışık seviye · deneme formatında · sonuçta çözümler</span></span><span class="go">›</span></button>
        <p class="small muted" style="margin-top:12px">💡 Seviye testlerinde her sorudan hemen sonra doğru cevabı ve çözümünü görürsün.</p>`}`;
  }

  /* ================= Denemeler ================= */
  function vDenemeler() {
    const kart = (tur, no, alt) => {
      const sn = S.deneme[`${tur}-${no}`];
      return `<button class="deneme-card" data-act="deneme" data-tur="${tur}" data-no="${no}">
        <span class="dn">Deneme ${no}</span><span class="ds">${alt}</span>
        <span class="dr ${sn ? '' : 'yok'}">${sn ? `✔ En iyi net: ${U.D(sn.net)}` : 'Çözülmedi'}</span></button>`;
    };
    const blok = (tur, baslik, alt, ikon) => `
      <div class="section"><h2>${ikon} ${baslik}</h2></div>
      <div class="dgrid">${Array.from({ length: DENEME_SAY[tur] }, (_, i) => kart(tur, i + 1, alt)).join('')}</div>`;
    app.innerHTML = `
      <div class="lgs-banner">
        <h2>🏆 Genel LGS Denemeleri</h2>
        <p style="opacity:.92">Gerçek sınav gibi: 20 Türkçe, 10 Sosyal Bilgiler, 10 Din Kültürü ve 20 Matematik sorusu, 120 dakika. 3 yanlış 1 doğruyu götürür.</p>
        <div class="dgrid" style="margin-top:10px">${Array.from({ length: DENEME_SAY.lgs }, (_, i) => {
          const sn = S.deneme[`lgs-${i + 1}`];
          return `<button class="btn" data-act="deneme" data-tur="lgs" data-no="${i + 1}">LGS ${i + 1}${sn ? ` · ${U.D(sn.net)} net` : ''}</button>`;
        }).join('')}</div>
      </div>
      ${blok('karma', 'Karma Denemeler', '5 Türkçe + 5 Mat · 20 dk', '⚡')}
      ${blok('turkce', 'Türkçe Denemeleri', '10 soru · 20 dk', '📘')}
      ${blok('matematik', 'Matematik Denemeleri', '10 soru · 20 dk', '📐')}
      ${blok('sosyal', 'Sosyal Bilgiler Denemeleri', '10 soru · 15 dk', '🌍')}
      ${blok('din', 'Din Kültürü Denemeleri', '10 soru · 15 dk', '☪️')}
      <div class="section"><h2>🎲 Rastgele</h2></div>
      <button class="card action" data-act="rastgele"><span class="ai">🎲</span><span><b>Rastgele 10 Soruluk Deneme</b><span class="muted small">Her seferinde farklı sorular</span></span><span class="go">›</span></button>`;
  }

  /* ================= İlerleme ================= */
  function vIlerleme() {
    const sv = seviyeHesap(S.xp);
    const gec = S.gecmis.slice(-12);
    const grafik = gec.length ? (() => {
      const w = 320, h = 140, n = gec.length, pad = 24;
      const pts = gec.map((g, i) => [pad + (n === 1 ? (w - 2 * pad) / 2 : i * (w - 2 * pad) / (n - 1)), h - 20 - (h - 40) * Math.max(0, g.net) / g.n]);
      return `<svg class="fig" viewBox="0 0 ${w} ${h}">
        <line class="lm" x1="${pad}" y1="${h - 20}" x2="${w - pad}" y2="${h - 20}"/>
        <line class="ld" x1="${pad}" y1="20" x2="${w - pad}" y2="20"/><text class="m" x="${pad}" y="14">%100</text>
        <polyline class="la" points="${pts.map(p => p.join(',')).join(' ')}"/>
        ${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="5" class="fa"/><text class="m" x="${p[0]}" y="${h - 4}" text-anchor="middle">${i + 1}</text>`).join('')}
      </svg><p class="small muted center">Son denemelerdeki net / soru sayısı oranın</p>`;
    })() : '<p class="muted">Henüz deneme çözmedin.</p>';
    app.innerHTML = `
      <div class="page-head"><div class="ders-ikon" style="background:var(--mat-soft);color:var(--mat)">${sv.lv}</div><div><h1>${sv.unvan}</h1><div class="muted small">Seviye ${sv.lv} · ${S.xp} puan · ${S.cozulen} soru · 🔥 ${seri()} gün</div></div></div>
      <div class="grid g2">
        ${DERS_SIRA.map(d => `<div class="card ders-${d}"><h3>${DERS[d].ikon} ${DERS[d].ad} · %${Math.round(100 * dersUstalik(d))}</h3>
          ${DERS[d].konular.map(k => {
            const u = Math.round(100 * ustalik(d, k.id)); const st = konuStat(d, k.id);
            return `<a class="mrow" href="#/konu/${d}/${k.id}/test" style="text-decoration:none;color:inherit"><span class="mn">${k.ad}<br><span class="muted small">${st.t ? `${st.d}/${st.t} doğru` : 'başlanmadı'}</span></span><span class="pbar"><div style="width:${u}%"></div></span><span class="mp">%${u}</span></a>`;
          }).join('')}</div>`).join('')}
      </div>
      <div class="section"><h2>Deneme gelişimi</h2></div>
      <div class="card">${grafik}
        ${S.gecmis.slice(-8).reverse().map(g => `<div class="mrow"><span class="mn">${g.baslik}<br><span class="muted small">${new Date(g.tarih).toLocaleDateString('tr-TR')} · ${g.d}D ${g.y}Y ${g.b}B</span></span><span class="mp" style="width:auto">${U.D(g.net)} net</span></div>`).join('')}
      </div>
      <div class="section"><h2>Diğer</h2></div>
      <div class="grid g2">
        <a class="card action" href="#/yanlislar"><span class="ai">🔁</span><span><b>Yanlışlarım</b><span class="muted small">${S.yanlis.length} soru</span></span><span class="go">›</span></a>
        <button class="card action" data-act="sifirla"><span class="ai">🗑️</span><span><b>İlerlemeyi sıfırla</b><span class="muted small">Tüm puan ve sonuçları siler</span></span><span class="go">›</span></button>
      </div>`;
  }

  /* ================= Yanlışlarım ================= */
  function vYanlislar() {
    const list = S.yanlis;
    app.innerHTML = `
      <a class="back" href="#/ilerleme">‹ İlerleme</a>
      <div class="page-head"><div class="ders-ikon" style="background:var(--bad-soft);color:var(--bad)">🔁</div><div><h1>Yanlışlarım</h1><div class="muted small">Doğru çözdüğün soru listeden çıkar.</div></div></div>
      ${list.length ? `
        <button class="btn block" data-act="yanlis-coz">${Math.min(10, list.length)} yanlışı yeniden çöz</button>
        <div class="inceleme" style="margin-top:12px">${list.map((q, i) => `
          <details class="ders-${q.ders}"><summary><span class="durum y">✗</span><span style="flex:1">${DERS[q.ders].ad} · ${q.konuAd}</span><span class="tag plain">S${q.seviye}</span></summary>
          <div class="ib">${soruGovde(q)}${secenekListe(q, null)}${q.cozum ? `<div class="cozum"><h4>Çözüm</h4>${q.cozum}</div>` : ''}
          <button class="btn ghost" style="margin-top:10px" data-act="yanlis-sil" data-i="${i}">Listeden çıkar</button></div></details>`).join('')}</div>`
        : '<div class="empty"><div class="big">🎉</div><p>Hiç yanlışın yok! Yeni sorular çözmeye devam et.</p><a class="btn" href="#/ders/matematik">Derslere git</a></div>'}`;
  }

  /* ================= Test motoru ================= */
  function testBaslat(o) {
    if (!o.sorular || !o.sorular.length) { toast('Bu bölüm için soru bulunamadı.'); return; }
    testDurdur();
    quiz = Object.assign({ mod: 'pratik', i: 0, bitti: false, sure: 0, bas: Date.now() }, o);
    quiz.cevap = new Array(quiz.sorular.length).fill(null);
    if (quiz.sure) {
      quiz.bitis = Date.now() + quiz.sure * 60000;
      timerId = setInterval(sayacTik, 1000);
    }
    git('#/test');
  }
  function testDurdur() { if (timerId) { clearInterval(timerId); timerId = null; } }
  function sayacTik() {
    if (!quiz || quiz.bitti) return testDurdur();
    const kalan = Math.max(0, Math.round((quiz.bitis - Date.now()) / 1000));
    const el = document.getElementById('timer');
    if (el) { el.textContent = '⏱ ' + sureYaz(kalan); el.classList.toggle('az', kalan < 120); }
    if (kalan <= 0) { toast('Süre doldu!'); testBitir(); }
  }
  const sureYaz = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  function soruGovde(q) {
    return `<div class="qtext">${q.soru}</div>${q.sekil ? `<div class="qfig">${q.sekil}</div>` : ''}`;
  }
  function secenekListe(q, secilen) {
    return `<div class="opts">${q.secenekler.map((s, i) => {
      let c = ''; if (i === q.dogru) c = 'dogru'; else if (i === secilen) c = 'yanlis';
      return `<button class="opt ${c}" disabled><span class="harf">${HARF[i]}</span><span>${s}</span></button>`;
    }).join('')}</div>`;
  }

  function vTest() {
    const z = quiz; const q = z.sorular[z.i]; const n = z.sorular.length;
    document.body.classList.add('ders-' + q.ders);
    document.body.className = document.body.className.replace(/\bders-\w+/g, '').trim() + ' in-quiz ders-' + q.ders;
    const cev = z.cevap[z.i];
    const kilit = z.mod === 'pratik' && cev != null;
    const cevapSayisi = z.cevap.filter(x => x != null).length;
    const opts = q.secenekler.map((s, i) => {
      let c = '';
      if (kilit) { if (i === q.dogru) c = 'dogru'; else if (i === cev) c = 'yanlis'; }
      else if (i === cev) c = 'secili';
      return `<button class="opt ${c}" data-act="sec" data-i="${i}" ${kilit ? 'disabled' : ''}><span class="harf">${HARF[i]}</span><span>${s}</span></button>`;
    }).join('');
    let fb = '';
    if (kilit) {
      const ok = cev === q.dogru;
      fb = `<div class="fb ${ok ? 'ok' : 'no'}"><h4>${ok ? '✅ Harika, doğru!' : `❌ Yanlış. Doğru cevap: ${HARF[q.dogru]}`}</h4>${q.cozum ? q.cozum : ''}</div>`;
    }
    // Genel denemede bölüm başlığı
    let bolum = '';
    if (z.tur === 'lgs' || z.tur === 'karma') {
      const ilk = z.sorular.findIndex(x => x.ders === q.ders);
      if (ilk === z.i) bolum = `<div style="margin-top:12px"><span class="bolum">${DERS[q.ders].ad} bölümü başlıyor</span></div>`;
    }
    const son = z.i === n - 1;
    const optik = z.mod === 'deneme' ? (() => {
      let h = ''; let onceki = null;
      z.sorular.forEach((s, i) => {
        if ((z.tur === 'lgs' || z.tur === 'karma') && s.ders !== onceki) { if (onceki) h += '</div>'; h += `<div class="optik-baslik">${DERS[s.ders].ad}</div><div class="optik">`; onceki = s.ders; }
        else if (onceki === null) { h += '<div class="optik">'; onceki = '_'; }
        h += `<button class="${z.cevap[i] != null ? 'dolu' : ''} ${i === z.i ? 'cur' : ''}" data-act="atla" data-i="${i}">${i + 1}${z.cevap[i] != null ? HARF[z.cevap[i]] : ''}</button>`;
      });
      return h + '</div>';
    })() : '';
    const uzun = (q.soru.length > 260 || q.sekil) ? 'yan' : '';
    app.innerHTML = `
      <div class="quiz">
        <div class="qtop">
          <div class="qtop-row">
            <button class="icon-btn" data-act="cik" aria-label="Çık">✕</button>
            <div class="qt">${z.baslik}</div>
            ${z.sure ? `<span class="timer" id="timer">⏱ ${sureYaz(Math.max(0, Math.round((z.bitis - Date.now()) / 1000)))}</span>` : `<span class="chip">${z.i + 1}/${n}</span>`}
          </div>
          <div class="qprog"><div style="width:${100 * (z.mod === 'deneme' ? cevapSayisi : z.i + (kilit ? 1 : 0)) / n}%"></div></div>
          ${bolum}
        </div>
        <div class="qcard ${uzun}">
          <div class="qmeta"><span class="qno">Soru ${z.i + 1}</span><span class="tag">${DERS[q.ders].ad}</span><span class="tag plain">${q.konuAd}</span><span class="tag plain">${'★'.repeat(q.seviye)} ${SEV[q.seviye].ad}</span></div>
          <div>${soruGovde(q)}</div>
          <div><div class="opts" style="margin-top:0">${opts}</div>${fb}
          ${z.mod === 'deneme' && cev != null ? '<button class="btn ghost block" style="margin-top:10px" data-act="bos">Cevabı sil (boş bırak)</button>' : ''}</div>
        </div>
        ${z.mod === 'deneme' ? `<details class="card" style="margin-top:12px" ${n <= 12 ? 'open' : ''}><summary style="font-weight:800;cursor:pointer">Cevap kâğıdı · ${cevapSayisi}/${n} işaretli</summary>${optik}</details>` : ''}
        <div class="qnav">
          <button class="btn alt" data-act="onceki" ${z.i === 0 ? 'disabled' : ''}>‹ Önceki</button>
          ${z.mod === 'pratik'
            ? (son ? `<button class="btn" data-act="bitir" ${kilit ? '' : 'disabled'}>Sonuçları gör</button>` : `<button class="btn" data-act="sonraki" ${kilit ? '' : 'disabled'}>Sonraki ›</button>`)
            : (son ? '<button class="btn" data-act="bitir">Testi bitir ✔</button>' : '<button class="btn" data-act="sonraki">Sonraki ›</button>')}
        </div>
        ${z.mod === 'deneme' && !son ? '<button class="btn ghost block" data-act="bitir">Testi şimdi bitir</button>' : ''}
      </div>`;
  }

  function sec(i) {
    const z = quiz; if (!z || z.bitti) return;
    if (z.mod === 'pratik') {
      if (z.cevap[z.i] != null) return;
      z.cevap[z.i] = i;
      const q = z.sorular[z.i];
      cevapKaydet(q, i === q.dogru); kaydet(); xpGuncelle();
      vTest();
      const fbEl = app.querySelector('.fb'); if (fbEl) fbEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      z.cevap[z.i] = (z.cevap[z.i] === i) ? null : i;
      vTest();
    }
  }

  function testBitir() {
    const z = quiz; if (!z || z.bitti) return;
    testDurdur();
    z.bitti = true;
    const sonuc = z.sorular.map((q, i) => ({ q, c: z.cevap[i], durum: z.cevap[i] == null ? 'b' : (z.cevap[i] === q.dogru ? 'd' : 'y') }));
    if (z.mod === 'deneme') sonuc.forEach(s => { if (s.durum !== 'b') cevapKaydet(s.q, s.durum === 'd'); });
    const say = arr => ({ d: arr.filter(s => s.durum === 'd').length, y: arr.filter(s => s.durum === 'y').length, b: arr.filter(s => s.durum === 'b').length, n: arr.length });
    const top = say(sonuc);
    const net = x => Math.round((x.d - x.y / 3) * 100) / 100;
    top.net = net(top); top.sure = Math.round((Date.now() - z.bas) / 1000);
    const dersler = {};
    DERS_SIRA.forEach(d => { const a = sonuc.filter(s => s.q.ders === d); if (a.length) { dersler[d] = say(a); dersler[d].net = net(dersler[d]); } });
    const konular = {};
    sonuc.forEach(s => { const key = s.q.ders + '/' + s.q.konu; (konular[key] = konular[key] || { ders: s.q.ders, konu: s.q.konu, ad: s.q.konuAd, d: 0, n: 0 }); konular[key].n++; if (s.durum === 'd') konular[key].d++; });
    // Seviye testi en iyi skor
    if (z.tur === 'seviye') {
      const key = konuKey(z.ders, z.konu); const st = S.konu[key] || (S.konu[key] = {});
      const oran = top.d / top.n; const once = st['s' + z.seviye] || 0;
      st['s' + z.seviye] = Math.max(once, oran);
      if (oran >= 0.6 && once < 0.6) { S.xp += 25; top.yildiz = true; }
    }
    if (z.mod === 'deneme') {
      const kayit = { id: z.denemeId || z.tur, baslik: z.baslik, tarih: Date.now(), d: top.d, y: top.y, b: top.b, n: top.n, net: top.net, sure: Math.round((Date.now() - z.bas) / 1000) };
      S.gecmis.push(kayit); if (S.gecmis.length > 60) S.gecmis.shift();
      if (z.denemeId) { const o = S.deneme[z.denemeId]; if (!o || o.net < top.net) S.deneme[z.denemeId] = { net: top.net, tarih: Date.now() }; }
      S.xp += 20; // deneme tamamlama bonusu
    }
    gunIsaretle(); kaydet();
    sonSonuc = { z, sonuc, top, dersler, konular: Object.values(konular) };
    git('#/sonuc');
  }

  function vSonuc() {
    const { z, sonuc, top, dersler, konular } = sonSonuc;
    const oran = top.n ? top.d / top.n : 0;
    const C = 2 * Math.PI * 62;
    const mesaj = oran >= 0.85 ? 'Muhteşem! 🏆' : oran >= 0.6 ? 'Çok iyi gidiyorsun! 💪' : oran >= 0.4 ? 'Fena değil, biraz tekrar! 📖' : 'Konu anlatımına dönüp tekrar deneyelim 🌱';
    const ilk = z.sorular[0];
    document.body.classList.add('ders-' + (Object.keys(dersler).length > 1 ? 'matematik' : ilk.ders));
    app.innerHTML = `
      <div class="card center">
        <h2>${z.baslik}</h2>
        <svg class="ring" viewBox="0 0 150 150"><circle class="bg" cx="75" cy="75" r="62" fill="none" stroke-width="14"/>
          <circle class="fgc" cx="75" cy="75" r="62" fill="none" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C * oran} ${C}" transform="rotate(-90 75 75)"/>
          <text x="75" y="76" text-anchor="middle" font-size="30">%${Math.round(oran * 100)}</text><text x="75" y="100" text-anchor="middle" font-size="12" style="fill:var(--muted)">başarı</text></svg>
        <h3>${mesaj}</h3>
        ${top.yildiz ? '<p class="ipucu" style="text-align:left">⭐ Bu seviyeyi geçtin! +25 bonus puan ve bir sonraki seviye açıldı.</p>' : ''}
        <div class="sonuc-kutu">
          <div class="k-d"><b>${top.d}</b><span>Doğru</span></div>
          <div class="k-y"><b>${top.y}</b><span>Yanlış</span></div>
          <div class="k-b"><b>${top.b}</b><span>Boş</span></div>
          <div class="k-n"><b>${z.mod === 'deneme' ? U.D(top.net) : '+' + top.d * 10}</b><span>${z.mod === 'deneme' ? 'Net' : 'Puan'}</span></div>
        </div>
        ${z.mod === 'deneme' ? `<p class="small muted" style="margin-top:10px">Net = Doğru − Yanlış ÷ 3 (LGS'de olduğu gibi). Süre: ${sureYaz(top.sure)}</p>` : ''}
      </div>
      ${Object.keys(dersler).length > 1 ? `<div class="grid g2" style="margin-top:12px">${Object.entries(dersler).map(([d, x]) => `
        <div class="card ders-${d}"><h3>${DERS[d].ikon} ${DERS[d].ad}</h3><div class="sonuc-kutu">
        <div class="k-d"><b>${x.d}</b><span>D</span></div><div class="k-y"><b>${x.y}</b><span>Y</span></div><div class="k-b"><b>${x.b}</b><span>B</span></div><div class="k-n"><b>${U.D(x.net)}</b><span>Net</span></div></div></div>`).join('')}</div>` : ''}
      ${konular.length > 1 ? `<div class="section"><h2>Konu analizi</h2></div><div class="card">${konular.map(k => {
        const p = Math.round(100 * k.d / k.n);
        return `<a class="mrow ders-${k.ders}" href="#/konu/${k.ders}/${k.konu}/anlatim" style="text-decoration:none;color:inherit"><span class="mn">${k.ad}<br><span class="muted small">${DERS[k.ders].ad} · ${k.d}/${k.n} doğru ${p < 60 ? '· <b style="color:var(--bad)">tekrar et ›</b>' : ''}</span></span><span class="pbar"><div style="width:${p}%;background:${p >= 60 ? 'var(--ok)' : 'var(--bad)'}"></div></span><span class="mp">%${p}</span></a>`;
      }).join('')}</div>` : ''}
      <div class="btn-row" style="margin-top:14px">
        <button class="btn" data-act="tekrar">🔄 Tekrar dene</button>
        ${z.tur === 'seviye' ? `<a class="btn alt" href="#/konu/${z.ders}/${z.konu}/test">Seviyelere dön</a>` : '<a class="btn alt" href="#/">Ana sayfa</a>'}
      </div>
      <div class="section"><h2>Cevapları incele</h2></div>
      <div class="inceleme">${sonuc.map((s, i) => `
        <details class="ders-${s.q.ders}" ${s.durum === 'y' && z.mod === 'deneme' && i < 3 ? 'open' : ''}><summary><span class="durum ${s.durum}">${s.durum === 'd' ? '✓' : s.durum === 'y' ? '✗' : '–'}</span>
          <span style="flex:1">Soru ${i + 1} · ${s.q.konuAd}</span><span class="small muted">${s.c != null ? 'Senin: ' + HARF[s.c] + ' · ' : ''}Doğru: ${HARF[s.q.dogru]}</span></summary>
          <div class="ib">${soruGovde(s.q)}${secenekListe(s.q, s.c)}${s.q.cozum ? `<div class="cozum"><h4>💡 Çözüm</h4>${s.q.cozum}</div>` : ''}</div></details>`).join('')}</div>`;
  }

  /* ================= Olaylar ================= */
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const a = b.dataset.act;
    const r = U.rng(Date.now() ^ Math.floor(Math.random() * 1e9));
    if (a === 'sec') sec(+b.dataset.i);
    else if (a === 'sonraki') { if (quiz.i < quiz.sorular.length - 1) { quiz.i++; vTest(); window.scrollTo(0, 0); } }
    else if (a === 'onceki') { if (quiz.i > 0) { quiz.i--; vTest(); window.scrollTo(0, 0); } }
    else if (a === 'atla') { quiz.i = +b.dataset.i; vTest(); window.scrollTo(0, 0); }
    else if (a === 'bos') { quiz.cevap[quiz.i] = null; vTest(); }
    else if (a === 'bitir') {
      if (quiz.mod === 'deneme') {
        const bos = quiz.cevap.filter(x => x == null).length;
        if (!confirm(bos ? `${bos} soru boş. Testi bitirmek istiyor musun?` : 'Testi bitirmek istiyor musun?')) return;
      }
      testBitir();
    }
    else if (a === 'cik') { git('#/'); }
    else if (a === 'seviye') {
      const d = b.dataset.d, k = b.dataset.k, s = +b.dataset.s;
      if (!seviyeAcik(d, k, s)) { toast(`Önce Seviye ${s - 1}'de en az %60 başarı yakala 🔒`); return; }
      const K = konuBul(d, k);
      testBaslat({ mod: 'pratik', tur: 'seviye', ders: d, konu: k, seviye: s, baslik: `${K.ad} · Seviye ${s}`, sorular: seviyeTesti(d, K, s, 6, r) });
    }
    else if (a === 'konutesti') {
      const d = b.dataset.d, K = konuBul(d, b.dataset.k); const used = new Set(); const qs = [];
      for (let i = 0; i < 10; i++) { const q = soruSec(d, K, [1, 1, 2, 2, 2, 2, 3, 3, 3, 3][i], r, used); if (q && !used.has(q.id)) { used.add(q.id); qs.push(q); } }
      qs.sort((x, y) => x.seviye - y.seviye);
      testBaslat({ mod: 'deneme', tur: 'konutesti', baslik: `${K.ad} Konu Testi`, sorular: qs, sure: Math.max(5, qs.length * 2) });
    }
    else if (a === 'deneme') {
      const D = denemeOlustur(b.dataset.tur, +b.dataset.no);
      if (D.tur === 'lgs' && !confirm(`${D.baslik}\n\n${D.sorular.length} soru, ${D.sure} dakika. Başlamaya hazır mısın?`)) return;
      testBaslat({ mod: 'deneme', tur: D.tur, denemeId: D.id, baslik: D.baslik, sorular: D.sorular, sure: D.sure });
    }
    else if (a === 'karma-hizli') { const no = 1 + Math.floor(Math.random() * DENEME_SAY.karma); const D = denemeOlustur('karma', no); testBaslat({ mod: 'deneme', tur: 'karma', denemeId: D.id, baslik: D.baslik, sorular: D.sorular, sure: D.sure }); }
    else if (a === 'rastgele') {
      const D = denemeOlustur('karma', 'r' + Date.now());
      testBaslat({ mod: 'deneme', tur: 'karma', baslik: 'Rastgele Deneme', sorular: D.sorular, sure: 20 });
    }
    else if (a === 'gunun') {
      const gr = U.rng('gunun-' + bugun());
      const d = U.pick(gr, DERS_SIRA); const K = U.pick(gr, DERS[d].konular);
      const q = soruSec(d, K, U.pick(gr, [2, 3]), gr, new Set());
      testBaslat({ mod: 'pratik', tur: 'gunun', baslik: '🎯 Günün Sorusu', sorular: [q] });
    }
    else if (a === 'yanlis-coz') {
      const qs = S.yanlis.slice(0, 10).map(x => Object.assign({}, x));
      testBaslat({ mod: 'pratik', tur: 'yanlis', baslik: 'Yanlışlarımı Çözüyorum', sorular: U.shuffle(r, qs) });
    }
    else if (a === 'yanlis-sil') { S.yanlis.splice(+b.dataset.i, 1); kaydet(); vYanlislar(); }
    else if (a === 'tekrar') {
      const z = sonSonuc.z;
      if (z.tur === 'seviye') { const K = konuBul(z.ders, z.konu); testBaslat({ mod: 'pratik', tur: 'seviye', ders: z.ders, konu: z.konu, seviye: z.seviye, baslik: z.baslik, sorular: seviyeTesti(z.ders, K, z.seviye, 6, r) }); }
      else testBaslat({ mod: z.mod, tur: z.tur, denemeId: z.denemeId, baslik: z.baslik, sorular: z.sorular, sure: z.sure });
    }
    else if (a === 'sifirla') {
      if (confirm('Tüm ilerlemen, puanların ve deneme sonuçların silinecek. Emin misin?')) { const t = S.tema; S = varsayilan(); S.tema = t; kaydet(); toast('İlerleme sıfırlandı'); route(); }
    }
  });

  // Klavye kısayolları (tablet klavyesi / bilgisayar)
  document.addEventListener('keydown', e => {
    if (!quiz || quiz.bitti || !location.hash.startsWith('#/test') || e.target.tagName === 'INPUT') return;
    const k = e.key.toUpperCase();
    const ix = { A: 0, B: 1, C: 2, D: 3, 1: 0, 2: 1, 3: 2, 4: 3 }[k];
    if (ix != null) sec(ix);
    else if (e.key === 'ArrowRight' || e.key === 'Enter') { const btn = app.querySelector('[data-act="sonraki"]:not([disabled])'); if (btn) btn.click(); }
    else if (e.key === 'ArrowLeft') { const btn = app.querySelector('[data-act="onceki"]:not([disabled])'); if (btn) btn.click(); }
  });

  // Tema
  function temaUygula() { if (S.tema === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', S.tema); }
  document.getElementById('temaBtn').addEventListener('click', () => {
    const koyu = S.tema === 'dark' || (S.tema === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
    S.tema = koyu ? 'light' : 'dark'; kaydet(); temaUygula();
  });
  temaUygula();

  // Çevrimdışı kullanım
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }

  route();
})();
