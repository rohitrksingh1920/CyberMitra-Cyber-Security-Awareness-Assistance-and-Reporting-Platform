
    function openCyberMitraLanding() {
      var el = document.getElementById('cybermitra-landing');
      if (el) {
        el.classList.add('show');
        el.setAttribute('aria-hidden', 'false');
      }
    }
    function closeCyberMitraLanding() {
      var el = document.getElementById('cybermitra-landing');
      if (el) {
        el.classList.remove('show');
        el.setAttribute('aria-hidden', 'true');
      }
    }
    function chooseCyberMitraVictim() {
      closeCyberMitraLanding();
      if (typeof openCyberPopup === 'function') {
        setTimeout(function () { openCyberPopup('portal'); }, 120);
      }
    }
    function chooseCyberMitraLearner() {
      closeCyberMitraLanding();
      var target = document.getElementById('learn');
      if (target) {
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    }
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(openCyberMitraLanding, 250);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCyberMitraLanding();
    });
    document.getElementById('cybermitra-landing')?.addEventListener('click', function (e) {
      if (e.target === this) closeCyberMitraLanding();
    });
  