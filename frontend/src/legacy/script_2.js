(function () {
  function updateFloatingLanguage() {
    var hindi = typeof currentLang === "function" && currentLang() === "hi";

    var data = {
      ".float-report-title": hindi
        ? "साइबर अपराध रिपोर्ट करें"
        : "Report Cyber Crime",
      ".float-report-sub": hindi
        ? "आधिकारिक पोर्टल खोलें ↗"
        : "Open official portal ↗",
      ".float-fir-title": hindi ? "FIR प्रारूप" : "FIR Format",
      ".float-fir-sub": hindi
        ? "शिकायत ड्राफ्ट बनाएँ"
        : "Create a complaint draft",
      ".float-help-title": hindi ? "आपातकालीन सहायता" : "Emergency Help",
      ".float-help-sub": hindi ? "तुरंत सहायता पाएँ" : "Get immediate guidance",
    };

    Object.keys(data).forEach(function (selector) {
      var el = document.querySelector(selector);
      if (el) el.textContent = data[selector];
    });
  }

  window.updateCyberMitraFloatingLanguage = updateFloatingLanguage;

  document.addEventListener("DOMContentLoaded", updateFloatingLanguage);

  // Detect the site's one-tap language switch even if its existing
  // language function doesn't call our function directly.
  var lastLang = null;
  setInterval(function () {
    var lang = typeof currentLang === "function" ? currentLang() : "en";
    if (lang !== lastLang) {
      lastLang = lang;
      updateFloatingLanguage();
    }
  }, 250);
})();
