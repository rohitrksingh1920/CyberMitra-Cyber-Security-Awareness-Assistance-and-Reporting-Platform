(function () {
  "use strict";

  function apiBase() {
    return (window.CYBERMITRA_API_BASE || "/api").replace(/\/$/, "");
  }

  function isHi() {
    return typeof currentLang === "function" && currentLang() === "hi";
  }

  function t(en, hi) {
    return isHi() ? hi : en;
  }

  // The FIR form's Crime Type <select> shows bilingual display labels.
  // Map them to the backend's CrimeType enum values.
  function mapCrimeType(displayValue) {
    var v = (displayValue || "").toLowerCase();
    if (v.indexOf("financial") !== -1) return "financial_fraud";
    if (v.indexOf("phishing") !== -1) return "other";
    if (v.indexOf("hacking") !== -1) return "other";
    if (v.indexOf("identity") !== -1) return "identity_theft";
    if (v.indexOf("harassment") !== -1) return "cyberbullying";
    return "other";
  }

  async function submitCyberComplaint() {
    var btn = document.getElementById("cyber-fir-submit-btn");
    var refBox = document.getElementById("cyber-fir-refbox");
    var name = document.getElementById("cyber-fir-name").value.trim();
    var phone = document.getElementById("cyber-fir-phone").value.trim();
    var date = document.getElementById("cyber-fir-date").value;
    var typeSelect = document.getElementById("cyber-fir-type");
    var desc = document.getElementById("cyber-fir-desc").value.trim();
    var evidence = document.getElementById("cyber-fir-evidence").value.trim();

    if (!name || name.length < 2) {
      refBox.textContent = t(
        "Please enter your name.",
        "कृपया अपना नाम दर्ज करें।",
      );
      refBox.classList.add("show", "error");
      return;
    }
    if (!phone || phone.replace(/\D/g, "").length < 6) {
      refBox.textContent = t(
        "Please enter a valid contact number.",
        "कृपया एक मान्य संपर्क नंबर दर्ज करें।",
      );
      refBox.classList.add("show", "error");
      return;
    }
    if (!desc || desc.length < 10) {
      refBox.textContent = t(
        "Please describe the incident in a bit more detail (10+ characters).",
        "कृपया घटना का थोड़ा और विस्तार से वर्णन करें (10+ अक्षर)।",
      );
      refBox.classList.add("show", "error");
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = t("Submitting…", "जमा हो रहा है…");
    }
    refBox.classList.remove("show", "error");

    try {
      var res = await fetch(apiBase() + "/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          contact_number: phone,
          incident_date: date || null,
          crime_type: mapCrimeType(typeSelect ? typeSelect.value : ""),
          description: desc,
          evidence_notes: evidence || null,
        }),
      });

      if (!res.ok) {
        var errBody = await res.json().catch(function () {
          return {};
        });
        throw new Error(
          errBody.detail
            ? JSON.stringify(errBody.detail)
            : "HTTP " + res.status,
        );
      }

      var data = await res.json();
      refBox.innerHTML =
        "<b>" +
        t("Saved! Your reference code:", "सुरक्षित हो गया! आपका संदर्भ कोड:") +
        "</b><br/>" +
        '<span class="cyber-ref-code">' +
        data.reference_code +
        "</span><br/>" +
        "<small>" +
        t(
          "Keep this code to track your complaint status. This is not an official FIR — please also file at cybercrime.gov.in.",
          "इस कोड को अपनी शिकायत की स्थिति ट्रैक करने के लिए सुरक्षित रखें। यह आधिकारिक FIR नहीं है — कृपया cybercrime.gov.in पर भी शिकायत दर्ज करें।",
        ) +
        "</small>";
      refBox.classList.add("show");
    } catch (err) {
      refBox.textContent = t(
        "Could not submit right now. Please try again in a moment.",
        "अभी जमा नहीं हो सका। कृपया थोड़ी देर बाद पुनः प्रयास करें।",
      );
      refBox.classList.add("show", "error");
      console.error("CyberMitra submitCyberComplaint error:", err);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML =
          '<span class="en">Submit to CyberMitra &amp; Get Reference No.</span><span class="hi">CyberMitra में जमा करें और संदर्भ संख्या पाएँ</span>';
      }
    }
  }

  async function trackCyberComplaint() {
    var input = document.getElementById("cyber-track-ref");
    var out = document.getElementById("cyber-track-output");
    var ref = (input.value || "").trim();
    if (!ref) {
      out.textContent = t(
        "Enter a reference code first.",
        "पहले एक संदर्भ कोड दर्ज करें।",
      );
      out.classList.add("show");
      return;
    }
    out.textContent = t("Looking up…", "खोजा जा रहा है…");
    out.classList.add("show");
    try {
      var res = await fetch(
        apiBase() + "/complaints/" + encodeURIComponent(ref),
      );
      if (res.status === 404) {
        out.textContent = t(
          "No complaint found with that reference code. Double-check and try again.",
          "उस संदर्भ कोड से कोई शिकायत नहीं मिली। जाँचकर पुनः प्रयास करें।",
        );
        return;
      }
      if (!res.ok) throw new Error("HTTP " + res.status);
      var data = await res.json();
      var statusLabels = {
        received: t("Received", "प्राप्त हुआ"),
        under_review: t("Under Review", "समीक्षा के अंतर्गत"),
        guidance_sent: t("Guidance Sent", "मार्गदर्शन भेजा गया"),
        closed: t("Closed", "बंद"),
      };
      out.innerHTML =
        "<b>" +
        t("Status:", "स्थिति:") +
        "</b> " +
        (statusLabels[data.status] || data.status) +
        "<br/>" +
        "<b>" +
        t("Name:", "नाम:") +
        "</b> " +
        data.name +
        "<br/>" +
        "<b>" +
        t("Submitted:", "जमा किया गया:") +
        "</b> " +
        new Date(data.created_at).toLocaleString();
    } catch (err) {
      out.textContent = t(
        "Could not fetch status right now. Please try again shortly.",
        "अभी स्थिति नहीं मिल सकी। कृपया थोड़ी देर बाद पुनः प्रयास करें।",
      );
      console.error("CyberMitra trackCyberComplaint error:", err);
    }
  }

  async function checkSuspectEntity() {
    var type = document.getElementById("cyber-check-type").value;
    var valueInput = document.getElementById("cyber-check-value");
    var out = document.getElementById("cyber-check-output");
    var value = (valueInput.value || "").trim();
    if (!value) {
      out.textContent = t(
        "Enter a value to check.",
        "जाँचने के लिए एक मान दर्ज करें।",
      );
      out.classList.add("show");
      return;
    }
    out.textContent = t("Checking…", "जाँच हो रही है…");
    out.classList.add("show");
    try {
      var res = await fetch(apiBase() + "/suspects/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: value, entity_type: type }),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      var data = await res.json();
      out.textContent = data.message;
      out.classList.toggle("error", data.found);
    } catch (err) {
      out.textContent = t(
        "Could not check right now. Please try again shortly.",
        "अभी जाँच नहीं हो सकी। कृपया थोड़ी देर बाद पुनः प्रयास करें।",
      );
      console.error("CyberMitra checkSuspectEntity error:", err);
    }
  }

  async function reportSuspectEntity() {
    var type = document.getElementById("cyber-check-type").value;
    var valueInput = document.getElementById("cyber-check-value");
    var out = document.getElementById("cyber-check-output");
    var value = (valueInput.value || "").trim();
    if (!value) {
      out.textContent = t(
        "Enter a value to report.",
        "रिपोर्ट करने के लिए एक मान दर्ज करें।",
      );
      out.classList.add("show");
      return;
    }
    out.textContent = t("Reporting…", "रिपोर्ट किया जा रहा है…");
    out.classList.add("show");
    try {
      var res = await fetch(apiBase() + "/suspects/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: value, entity_type: type }),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      out.textContent = t(
        "Thanks — reported. This will help warn other users.",
        "धन्यवाद — रिपोर्ट कर दिया गया। इससे अन्य उपयोगकर्ताओं को सचेत करने में मदद मिलेगी।",
      );
    } catch (err) {
      out.textContent = t(
        "Could not submit the report right now. Please try again shortly.",
        "अभी रिपोर्ट जमा नहीं हो सकी। कृपया थोड़ी देर बाद पुनः प्रयास करें।",
      );
      console.error("CyberMitra reportSuspectEntity error:", err);
    }
  }

  window.submitCyberComplaint = submitCyberComplaint;
  window.trackCyberComplaint = trackCyberComplaint;
  window.checkSuspectEntity = checkSuspectEntity;
  window.reportSuspectEntity = reportSuspectEntity;
})();
