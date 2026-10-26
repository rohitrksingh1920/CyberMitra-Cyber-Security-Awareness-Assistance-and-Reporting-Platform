/* ==========================================================================
   CyberMitra — core interactions
   theme toggle · nav (scrollspy, mobile menu) · toasts · copy-to-clipboard
   count-up numbers · keyboard/ARIA polish for the legacy widgets · quiz stats
   --------------------------------------------------------------------------
   Plain classic script (shares globals with the legacy scripts on purpose).
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var KEY = 'cybermitra-theme';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function lang() { return root.getAttribute('data-lang') === 'hi' ? 'hi' : 'en'; }
  function T(en, hi) { return lang() === 'hi' ? hi : en; }
  window.cmT = T;

  /* ---------------- toasts ---------------- */
  function toast(msg, kind) {
    var box = document.getElementById('toasts');
    if (!box) return;
    var el = document.createElement('div');
    el.className = 'toast' + (kind === 'bad' ? ' bad' : '');
    el.textContent = msg;
    box.appendChild(el);
    setTimeout(function () { el.remove(); }, 3100);
  }
  window.cmToast = toast;

  /* ---------------- copy to clipboard ---------------- */
  function legacyCopy(text) {
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, text.length);
      var done = false;
      try { done = document.execCommand('copy'); } catch (e) { }
      ta.remove();
      done ? resolve() : reject(new Error('copy failed'));
    });
  }
  function copyText(text) {
    // modern API first (needs https or localhost); fall back for plain-http LANs and older browsers
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return legacyCopy(text);
  }
  window.cmCopy = function (text, label) {
    copyText(text).then(function () {
      toast(T('Copied ' + (label || text), (label || text) + ' कॉपी हो गया'));
    }, function () { toast(T('Could not copy — long-press to select it', 'कॉपी नहीं हो सका'), 'bad'); });
  };

  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-copy]');
    if (!c) return;
    // on phones a tap should place the call; on desktop copying is more useful
    if (c.tagName === 'A' && !finePointer) return;
    e.preventDefault();
    window.cmCopy(c.getAttribute('data-copy'));
  });

  /* ---------------- theme ---------------- */
  function systemDark() { return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; }
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function current() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }

  function paint(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f0d0b' : '#f3eee5');
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', theme === 'dark'
        ? T('Switch to light mode', 'लाइट मोड चालू करें')
        : T('Switch to dark mode', 'डार्क मोड चालू करें'));
    }
    document.dispatchEvent(new CustomEvent('cm:theme', { detail: theme }));
  }

  function setTheme(next, origin, persist) {
    if (persist !== false) { try { localStorage.setItem(KEY, next); } catch (e) { } }
    if (next === current()) { paint(next); return; }
    // circular reveal from the toggle where the browser supports it
    if (document.startViewTransition && !reduceMotion && origin) {
      var x = origin.x, y = origin.y;
      var r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      var vt = document.startViewTransition(function () { paint(next); });
      vt.ready.then(function () {
        root.animate(
          { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + r + 'px at ' + x + 'px ' + y + 'px)'] },
          { duration: 620, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
        );
      }).catch(function () { });
      return;
    }
    root.classList.add('theme-anim');
    paint(next);
    setTimeout(function () { root.classList.remove('theme-anim'); }, 450);
  }
  window.cmSetTheme = setTheme;
  window.cmToggleTheme = function (origin) { setTheme(current() === 'dark' ? 'light' : 'dark', origin); };

  var tbtn = document.getElementById('theme-toggle');
  if (tbtn) {
    tbtn.addEventListener('click', function () {
      var r = tbtn.getBoundingClientRect();
      window.cmToggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    });
  }
  paint(current());                                   // sync aria + meta with whatever index.html decided
  if (window.matchMedia) {                            // follow the OS until the visitor makes a choice
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onSys = function (e) { if (!stored()) setTheme(e.matches ? 'dark' : 'light', null, false); };
    if (mq.addEventListener) mq.addEventListener('change', onSys); else if (mq.addListener) mq.addListener(onSys);
  }
  // keep the aria-label in the right language when the language flips
  new MutationObserver(function () { paint(current()); }).observe(root, { attributes: true, attributeFilter: ['data-lang'] });

  /* ---------------- nav: mobile menu + scrollspy ---------------- */
  var topbar = document.getElementById('topbar');
  var menuBtn = document.getElementById('menu-btn');
  function setMenu(open) {
    if (!topbar || !menuBtn) return;
    topbar.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(!topbar.classList.contains('menu-open')); });
    document.querySelectorAll('#site-nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  var links = Array.prototype.slice.call(document.querySelectorAll('#site-nav a[href^="#"]'));
  var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function spy() {
    var y = window.scrollY + 140, active = -1;
    targets.forEach(function (t, i) { if (t && t.offsetTop <= y) active = i; });
    links.forEach(function (a, i) { a.classList.toggle('is-active', i === active); });
  }
  window.addEventListener('scroll', spy, { passive: true });
  window.addEventListener('resize', spy);
  spy();

  /* ---------------- count-up for the hero numbers ---------------- */
  var counters = document.querySelectorAll('[data-count]');
  function runCount(el) {
    var to = parseInt(el.getAttribute('data-count'), 10), start = null;
    if (reduceMotion) { el.textContent = to; return; }
    el.textContent = '0';
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / 900);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { io.observe(c); });
  }

  /* ---------------- legacy widget polish (keyboard + ARIA) ---------------- */
  function enhanceExhibits() {
    document.querySelectorAll('.exhibit-head').forEach(function (h) {
      if (h.getAttribute('role')) return;
      h.setAttribute('role', 'button'); h.setAttribute('tabindex', '0');
      h.setAttribute('aria-expanded', h.parentElement.classList.contains('open') ? 'true' : 'false');
      h.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); h.click(); }
      });
    });
  }
  function syncExhibits() {
    document.querySelectorAll('.exhibit').forEach(function (ex) {
      var h = ex.querySelector('.exhibit-head');
      if (h) h.setAttribute('aria-expanded', ex.classList.contains('open') ? 'true' : 'false');
    });
  }
  enhanceExhibits();
  var list = document.getElementById('topics-list');
  if (list) new MutationObserver(function () { enhanceExhibits(); syncExhibits(); }).observe(list, { subtree: true, attributes: true, attributeFilter: ['class'], childList: true });

  // checklist: tick things off as you gather them
  document.addEventListener('click', function (e) {
    var li = e.target.closest('#checklist-items li');
    if (li) li.classList.toggle('ticked');
  });

  // modals: Esc closes, focus moves in and goes back out
  var modalSel = '.modal-overlay, .cyber-extra-modal, .cybermitra-landing';
  var lastFocus = null;
  function watchModal(m) {
    new MutationObserver(function () {
      var open = m.classList.contains('show');
      m.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) {
        lastFocus = document.activeElement;
        var f = m.querySelector('button, a[href], input, select, textarea');
        if (f) setTimeout(function () { try { f.focus({ preventScroll: true }); } catch (e) { } }, 60);
      } else if (lastFocus && lastFocus.focus) {
        try { lastFocus.focus({ preventScroll: true }); } catch (e) { }
        lastFocus = null;
      }
    }).observe(m, { attributes: true, attributeFilter: ['class'] });
  }
  document.querySelectorAll(modalSel).forEach(function (m) {
    m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
    if (m.classList.contains('modal-overlay')) m.setAttribute('aria-label', 'Emergency numbers');
    if (m.classList.contains('cyber-extra-modal')) m.setAttribute('aria-label', 'Cyber crime reporting');
    if (m.classList.contains('cybermitra-landing')) m.setAttribute('aria-label', 'How can we help you today?');
    watchModal(m);
  });
  // simple focus trap inside whichever modal is open
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var m = document.querySelector('.modal-overlay.show, .cyber-extra-modal.show, .cybermitra-landing.show');
    if (!m) return;
    var f = Array.prototype.slice.call(m.querySelectorAll('button, a[href], input, select, textarea')).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  // clicking the dark backdrop closes SOS / report popups too
  document.addEventListener('mousedown', function (e) {
    if (e.target.classList && e.target.classList.contains('modal-overlay') && typeof closeSOS === 'function') closeSOS();
    if (e.target.classList && e.target.classList.contains('cyber-extra-modal') && typeof closeCyberPopup === 'function') closeCyberPopup();
  });

  // quiz: keyboard shortcuts (1-4 / A-D pick an answer, Enter goes on)
  document.addEventListener('keydown', function (e) {
    if (/input|textarea|select/i.test((e.target.tagName || '')) || e.ctrlKey || e.metaKey || e.altKey) return;
    var quiz = document.getElementById('quiz-active');
    if (!quiz || quiz.style.display === 'none') return;
    var qs = document.getElementById('quiz');
    var r = qs.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;             // only while the quiz is on screen
    var ae = document.activeElement;                             // and only if focus isn't on some other control
    if (ae && ae !== document.body && !qs.contains(ae)) return;
    var k = e.key.toLowerCase(), idx = '1234'.indexOf(k);
    if (idx < 0) idx = 'abcd'.indexOf(k);
    if (idx >= 0) { var o = document.getElementById('opt-' + idx); if (o) { e.preventDefault(); o.click(); } return; }
    if (e.key === 'Enter') { var n = document.getElementById('quiz-next'); if (n && !n.disabled && document.activeElement !== n) { e.preventDefault(); n.click(); } }
  });

  /* ---------------- quiz → backend (anonymous score + community average) ---------------- */
  function apiBase() { return (window.CYBERMITRA_API_BASE || '/api').replace(/\/$/, ''); }
  window.cmQuizDone = function (score, total) {
    var line = document.getElementById('quiz-community');
    if (!line) {
      line = document.createElement('div'); line.id = 'quiz-community'; line.className = 'quiz-community';
      var res = document.getElementById('quiz-result'); var btn = res && res.querySelector('button');
      if (res) res.insertBefore(line, btn || null);
    }
    line.textContent = '';
    fetch(apiBase() + '/quiz/results', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ score: score, total: total }) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return fetch(apiBase() + '/quiz/stats'); })
      .then(function (r) { return r.json(); })
      .then(function (s) {
        if (!s || !s.attempts) return;
        var avg = Math.round((s.average_score_pct / 100) * total * 10) / 10;
        line.textContent = T(
          'Across ' + s.attempts + ' attempts, the average score is ' + avg + '/' + total + '.',
          s.attempts + ' प्रयासों में औसत स्कोर ' + avg + '/' + total + ' है।');
      })
      .catch(function () { /* the quiz works fine offline; the community line is a bonus */ });
  };
})();
