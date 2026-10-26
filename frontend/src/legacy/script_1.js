function openCyberPopup(panel) {
  document.getElementById("cyber-extra-modal").classList.add("show");
  showCyberPanel(panel || "portal");
}
function closeCyberPopup() {
  document.getElementById("cyber-extra-modal").classList.remove("show");
}
function showCyberPanel(panel) {
  document
    .querySelectorAll("#cyber-extra-modal .cyber-panel")
    .forEach(function (x) {
      x.classList.remove("show");
    });
  document
    .querySelectorAll("#cyber-extra-modal .cyber-tab")
    .forEach(function (x) {
      x.classList.remove("active");
    });
  document.getElementById("cyber-panel-" + panel).classList.add("show");
  document.getElementById("cyber-tab-" + panel).classList.add("active");
}
document
  .getElementById("cyber-extra-modal")
  .addEventListener("click", function (e) {
    if (e.target === this) closeCyberPopup();
  });
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeCyberPopup();
});
function generateCyberFIR() {
  var hi = typeof currentLang === "function" && currentLang() === "hi";
  var name =
    document.getElementById("cyber-fir-name").value.trim() ||
    "________________";
  var phone =
    document.getElementById("cyber-fir-phone").value.trim() ||
    "________________";
  var date =
    document.getElementById("cyber-fir-date").value || "________________";
  var type = document.getElementById("cyber-fir-type").value;
  var desc =
    document.getElementById("cyber-fir-desc").value.trim() ||
    "________________";
  var evidence =
    document.getElementById("cyber-fir-evidence").value.trim() ||
    "________________";
  var draft = hi
    ? `विषय: साइबर अपराध की शिकायत

शिकायतकर्ता का नाम: ${name}
संपर्क नंबर: ${phone}
घटना की तारीख: ${date}
अपराध का प्रकार: ${type}

घटना का विवरण:
${desc}

उपलब्ध सबूत:
${evidence}

निवेदन:
कृपया शिकायत दर्ज कर आवश्यक जाँच एवं कार्रवाई करने की कृपा करें।

दिनांक: ${date}
हस्ताक्षर: __________________`
    : `Subject: Cyber Crime Complaint

Complainant Name: ${name}
Contact Number: ${phone}
Date of Incident: ${date}
Type of Cyber Crime: ${type}

Incident Description:
${desc}

Available Evidence:
${evidence}

Request:
I request that my complaint be recorded and necessary investigation and action be taken.

Date: ${date}
Signature: __________________`;

  var out = document.getElementById("cyber-fir-output");
  out.textContent = draft;
  out.classList.add("show");
}
function copyCyberFIR() {
  var out = document.getElementById("cyber-fir-output");
  if (!out.classList.contains("show")) generateCyberFIR();
  // cmCopy (features_core.js) handles the clipboard + the toast, with a fallback for plain-http
  if (window.cmCopy)
    window.cmCopy(
      out.textContent,
      typeof currentLang === "function" && currentLang() === "hi"
        ? "ड्राफ़्ट"
        : "draft",
    );
  else navigator.clipboard.writeText(out.textContent);
}
