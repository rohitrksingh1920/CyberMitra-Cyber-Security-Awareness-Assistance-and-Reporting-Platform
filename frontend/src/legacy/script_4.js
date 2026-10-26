
    (function () {
      // ---- scroll progress bar ----
      var bar = document.createElement('div');
      bar.id = 'cybermitra-scroll-progress';
      document.body.appendChild(bar);

      function updateProgress() {
        var h = document.documentElement;
        var scrollTop = h.scrollTop || document.body.scrollTop;
        var scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
        var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        bar.style.width = pct + '%';
      }
      window.addEventListener('scroll', updateProgress, { passive: true });
      window.addEventListener('resize', updateProgress);
      updateProgress();

      var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      // ---- tag cards for individual staggered reveal ----
      var cardSelectors = '.why-card, .rule-card, .rl-card, .report-card, .cybermitra-step, .quick-action, .cybermitra-option, .hero-float-card';
      var cards = document.querySelectorAll(cardSelectors);
      cards.forEach(function (el, i) {
        el.classList.add('sv-reveal');
        el.style.transitionDelay = ((i % 6) * 0.07) + 's';
      });

      // ---- tag top-level section content that isn't already a card ----
      var sectionKids = document.querySelectorAll('section:not(.hero) > .wrap > *');
      sectionKids.forEach(function (el) {
        if (el.classList.contains('sv-reveal')) return;
        if (el.querySelector && el.querySelector(cardSelectors)) return; // let children stagger instead
        el.classList.add('sv-reveal');
      });

      // ---- observe & reveal on scroll ----
      var targets = document.querySelectorAll('.sv-reveal, .sv-reveal-scale, .sv-reveal-left, .sv-reveal-right');
      if (!('IntersectionObserver' in window)) {
        targets.forEach(function (t) { t.classList.add('sv-in'); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('sv-in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      targets.forEach(function (t) { io.observe(t); });
    })();
  