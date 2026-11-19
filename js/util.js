/* Ortak yardımcı fonksiyonlar */
window.U = (function () {
  'use strict';

  // Tohumlanabilir rastgele sayı üreteci (aynı deneme hep aynı soruları üretsin diye)
  function rng(seed) {
    let a = typeof seed === 'number' ? seed : hash(String(seed));
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  const rnd = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
  function shuffle(r, arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; };

  // Sayı gösterimi: eksi işareti tipografik "−"
  const N = n => (n < 0 ? '−' + Math.abs(n) : String(n));
  // Negatifse parantez içinde
  const P = n => (n < 0 ? '(' + N(n) + ')' : String(n));
  // Ondalık gösterim (virgüllü)
  const D = x => N(Math.round(x * 10000) / 10000).replace('.', ',');

  // Kesir HTML
  const F = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
  function fr(n, d) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return [n / g, d / g]; }
  function frH(f) {
    const [n, d] = fr(f[0], f[1]);
    if (d === 1) return N(n);
    return (n < 0 ? '−' : '') + F(Math.abs(n), d);
  }

  // Cebirsel ifade: [[katsayı,'x'],[sabit,'']]
  function ex(terms) {
    let s = '';
    terms.filter(t => t[0] !== 0).forEach(([c, v], i) => {
      const abs = Math.abs(c);
      const body = v ? (abs === 1 ? '' : abs) + '<i>' + v + '</i>' : String(abs);
      if (i === 0) s += (c < 0 ? '−' : '') + body;
      else s += (c < 0 ? ' − ' : ' + ') + body;
    });
    return s || '0';
  }

  // Çoktan seçmeli seçenek üretici: doğru + yanlışlar -> 4 farklı seçenek
  function mc(r, correct, wrongs, fmt) {
    fmt = fmt || N;
    const out = [fmt(correct)];
    const add = v => {
      if (v == null) return;
      if (typeof v === 'number' && !isFinite(v)) return;
      const s = fmt(v);
      if (!out.includes(s)) out.push(s);
    };
    (wrongs || []).forEach(add);
    let k = 1;
    while (out.length < 4 && k < 60) {
      if (typeof correct === 'number') { add(correct + k); add(correct - k); }
      else if (Array.isArray(correct)) { add([correct[0] + k, correct[1]]); add([correct[0] - k, correct[1]]); }
      k++;
    }
    const four = out.slice(0, 4);
    const order = shuffle(r, [0, 1, 2, 3]);
    return { secenekler: order.map(i => four[i]), dogru: order.indexOf(0) };
  }

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  return { rng, hash, rnd, pick, shuffle, gcd, N, P, D, F, fr, frH, ex, mc, esc };
})();
