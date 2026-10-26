
(function(){
  function syncLandingLanguageButtons(){
    var lang = document.documentElement.getAttribute('data-lang') || 'en';
    document.querySelectorAll('[data-cybermitra-lang]').forEach(function(btn){
      btn.classList.toggle('active', btn.getAttribute('data-cybermitra-lang') === lang);
    });
  }
  window.addEventListener('load', syncLandingLanguageButtons);
  var oldSetLang = window.setLang;
  if (typeof oldSetLang === 'function' && !window.__cybermitraLangWrapped) {
    window.setLang = function(lang){
      oldSetLang(lang);
      syncLandingLanguageButtons();
    };
    window.__cybermitraLangWrapped = true;
  }
})();
