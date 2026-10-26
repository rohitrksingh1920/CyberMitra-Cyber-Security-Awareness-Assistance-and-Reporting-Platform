/* ==========================================================================
   CyberMitra hero shield — scroll-reactive, drawn in the logo's scan-line style
   - rotates / tilts / grows as the visitor scrolls past the hero
   - a "threat" node closes in on the shield as you scroll, the scan band sweeps it
   - colours come from the CSS theme tokens, so it re-paints for light & dark mode
   - pauses when off-screen or the tab is hidden; honours prefers-reduced-motion
   ========================================================================== */
(function () {
  'use strict';

  var canvas = document.getElementById('cybermitra-3d-hero');
  var hero = document.querySelector('.hero');
  if (!canvas || !hero) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var width = 0, height = 0, cx = 0, cy = 0, narrow = false;
  var particles = [], rafId = 0, running = false, inView = true;
  var state = { rotation: -0.18, tilt: -0.12, scale: 0.82, threat: 0 };
  var C = {};

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    function g(n, d) { var v = cs.getPropertyValue(n).trim(); return v || d; }
    C.ink = g('--ink', '#16120f'); C.paper = g('--paper', '#f3eee5'); C.surface = g('--surface', '#fbf8f1');
    C.copper = g('--copper', '#b5632a'); C.copper2 = g('--copper-2', '#d98b4e'); C.danger = g('--danger', '#b73a2b');
    C.dark = document.documentElement.getAttribute('data-theme') === 'dark';
  }
  function rgba(hex, a) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h, 16);
    return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  function resize() {
    var rect = hero.getBoundingClientRect();
    width = Math.max(1, rect.width); height = Math.max(1, rect.height);
    narrow = width < 760;
    canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = width * (narrow ? 0.72 : 0.77); cy = height * 0.48;
    createParticles(); draw(0);
  }
  function createParticles() {
    particles = [];
    var count = narrow ? 26 : 54;
    for (var i = 0; i < count; i++) particles.push({
      angle: Math.random() * Math.PI * 2, radius: 100 + Math.random() * 150, z: Math.random() * 2 - 1,
      speed: 0.00015 + Math.random() * 0.00025, size: 1 + Math.random() * 2.2, alpha: 0.2 + Math.random() * 0.6
    });
  }
  function project(x, y, z, rot, tilt, scale) {
    var cr = Math.cos(rot), sr = Math.sin(rot);
    var rx = x * cr - z * sr, rz = x * sr + z * cr;
    var ct = Math.cos(tilt), st = Math.sin(tilt);
    var ry = y * ct - rz * st, rz2 = y * st + rz * ct;
    var p = 1 / (1 + rz2 / 420), s = scale * (narrow ? 0.72 : 1.22);
    return { x: cx + rx * p * s, y: cy + ry * p * s, p: p };
  }
  function shieldPoints(scale, ox, oy) {
    var src = [[0, -155, 0], [92, -112, 0], [112, -18, 0], [83, 90, 0], [0, 155, 0], [-83, 90, 0], [-112, -18, 0], [-92, -112, 0]];
    return src.map(function (p) { var q = project(p[0], p[1], p[2], state.rotation, state.tilt, scale); return { x: q.x + ox, y: q.y + oy }; });
  }
  function poly(pts) { ctx.beginPath(); pts.forEach(function (p, i) { i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); }); ctx.closePath(); }
  function bounds(pts) {
    var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    pts.forEach(function (p) { x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y); x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y); });
    return { x0: x0, y0: y0, x1: x1, y1: y1 };
  }

  function drawShield(progress) {
    var back = shieldPoints(state.scale * 1.1, 12, 10);
    var front = shieldPoints(state.scale, 0, 0);

    // offset "shadow" shield in copper
    ctx.save(); poly(back);
    ctx.fillStyle = rgba(C.copper, C.dark ? 0.16 : 0.2); ctx.fill();
    ctx.strokeStyle = rgba(C.copper, 0.7); ctx.lineWidth = 2; ctx.stroke(); ctx.restore();

    // body: solid ink, then cut with horizontal scan-lines (like the CYBERMITRA letters)
    var b = bounds(front);
    ctx.save(); poly(front); ctx.clip();
    ctx.fillStyle = rgba(C.ink, 1); ctx.fillRect(b.x0 - 4, b.y0 - 4, b.x1 - b.x0 + 8, b.y1 - b.y0 + 8);
    ctx.fillStyle = C.paper;
    var gap = Math.max(3, 5.5 * state.scale * (narrow ? 0.75 : 1.22));
    for (var y = b.y0 + gap * 0.5; y < b.y1; y += gap * 2) ctx.fillRect(b.x0 - 4, y, b.x1 - b.x0 + 8, gap * 0.55);
    ctx.restore();
    ctx.save(); poly(front); ctx.lineWidth = 3.2; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();

    // check-mark: paper halo + copper stroke so it reads on top of the stripes
    var a = project(-45, 2, -5, state.rotation, state.tilt, state.scale);
    var m = project(-10, 38, -5, state.rotation, state.tilt, state.scale);
    var c = project(55, -45, -5, state.rotation, state.tilt, state.scale);
    var lw = Math.max(5, 11 * state.scale * (narrow ? 0.75 : 1.22));
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(m.x, m.y); ctx.lineTo(c.x, c.y);
    ctx.strokeStyle = C.paper; ctx.lineWidth = lw + 8; ctx.stroke();
    ctx.strokeStyle = C.copper; ctx.lineWidth = lw; ctx.stroke(); ctx.restore();

    // scan band sweeping over the shield
    var scan = ((progress * 2.4 + (reduceMotion ? 0 : performance.now() / 5200)) % 1.2) - 0.1;
    var sy = b.y0 + scan * (b.y1 - b.y0);
    ctx.save(); poly(front); ctx.clip();
    var sg = ctx.createLinearGradient(0, sy - 16, 0, sy + 16);
    sg.addColorStop(0, rgba(C.copper2, 0)); sg.addColorStop(0.5, rgba(C.copper2, 0.75)); sg.addColorStop(1, rgba(C.copper2, 0));
    ctx.fillStyle = sg; ctx.fillRect(b.x0 - 4, sy - 16, b.x1 - b.x0 + 8, 32); ctx.restore();
  }

  function drawNetwork(progress) {
    var nodes = [[-190, -90, -0.7], [-150, 95, 0.4], [155, -115, -0.4], [185, 75, 0.7], [-225, 12, 0.2], [225, -15, -0.2]];
    var pr = nodes.map(function (n) { return project(n[0], n[1], n[2] * 120, state.rotation, state.tilt, state.scale); });
    ctx.save(); ctx.lineWidth = 1.2;
    pr.forEach(function (a, i) { pr.forEach(function (b, j) {
      if (j <= i) return; var d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 190) { ctx.strokeStyle = rgba(C.ink, clamp(0.3 - d / 700, 0.05, 0.24)); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }); });
    ctx.restore();
    pr.forEach(function (p, i) {
      var pulse = 1 + Math.sin(progress * 5 + i + (reduceMotion ? 0 : performance.now() / 700)) * 0.18;
      var threatNode = i === 5 && state.threat > 0.25;
      ctx.save(); ctx.beginPath(); ctx.arc(p.x, p.y, (3.6 + i % 3) * pulse, 0, Math.PI * 2);
      ctx.fillStyle = threatNode ? C.danger : C.copper; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = C.paper; ctx.stroke(); ctx.restore();
    });
  }
  function drawParticles(time) {
    particles.forEach(function (p) {
      p.angle += p.speed * Math.max(1, time ? 16 : 0);
      var q = project(Math.cos(p.angle) * p.radius, Math.sin(p.angle) * p.radius * 0.72, p.z * 80, state.rotation, state.tilt, state.scale);
      ctx.save(); ctx.globalAlpha = p.alpha * q.p * (C.dark ? 0.8 : 0.55); ctx.fillStyle = C.dark ? C.copper2 : C.ink;
      ctx.beginPath(); ctx.arc(q.x, q.y, p.size * q.p, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    });
  }
  function drawThreat(progress) {
    if (state.threat <= 0.02) return;
    var x = lerp(width * 0.98, cx + 80, state.threat), y = lerp(cy - 80, cy - 15, state.threat);
    var pulse = 1 + Math.sin(progress * 12 + (reduceMotion ? 0 : performance.now() / 160)) * 0.12;
    ctx.save();
    ctx.setLineDash([5, 8]); ctx.lineWidth = 1.5; ctx.strokeStyle = rgba(C.danger, 0.55);
    ctx.beginPath(); ctx.moveTo(width * 0.98, cy - 80); ctx.lineTo(cx + 65, cy - 15); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(x, y, 8 * pulse, 0, Math.PI * 2); ctx.fillStyle = C.danger; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = C.paper; ctx.stroke();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath();
    ctx.moveTo(x - 3, y - 3); ctx.lineTo(x + 3, y + 3); ctx.moveTo(x + 3, y - 3); ctx.lineTo(x - 3, y + 3); ctx.stroke();
    ctx.restore();
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    var rect = hero.getBoundingClientRect();
    var progress = clamp(-rect.top / Math.max(1, rect.height), -0.25, 1.5);
    if (reduceMotion) progress = 0;
    state.rotation = lerp(state.rotation, -0.18 + progress * 5.2, 0.1);
    state.tilt = lerp(state.tilt, -0.12 + Math.sin(progress * Math.PI) * 0.55, 0.1);
    state.scale = lerp(state.scale, 0.82 + progress * 0.3, 0.08);
    state.threat = lerp(state.threat, clamp(progress * 1.35, 0, 1), 0.08);
    drawParticles(time); drawNetwork(progress); drawShield(progress); drawThreat(progress);
  }

  function loop(t) {
    if (!running) return;
    draw(t); rafId = requestAnimationFrame(loop);
  }
  function start() { if (running || reduceMotion || !inView || document.hidden) return; running = true; rafId = requestAnimationFrame(loop); }
  function stop() { running = false; cancelAnimationFrame(rafId); }

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  document.addEventListener('cm:theme', function () { readColors(); draw(0); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { inView = en[0].isIntersecting; inView ? start() : stop(); }, { rootMargin: '120px' }).observe(hero);
  }
  if (reduceMotion) window.addEventListener('scroll', function () { draw(0); }, { passive: true });

  readColors(); resize(); start();
})();
