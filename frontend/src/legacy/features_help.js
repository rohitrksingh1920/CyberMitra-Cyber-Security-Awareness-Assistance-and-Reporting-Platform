/* ==========================================================================
   CyberMitra — guided & playful features
   1. "What happened?" triage helper  (#triage)
   2. Red-flag hunt mini-game         (#hunt-app)
   3. Search / command palette        (Ctrl/⌘ + K  or  /)
   Everything is bilingual and runs fully in the browser.
   ========================================================================== */
(function () {
  "use strict";
  var T = function (en, hi) {
    return window.cmT ? window.cmT(en, hi) : en;
  };
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function bi(o) {
    return (
      '<span class="en">' + o.en + '</span><span class="hi">' + o.hi + "</span>"
    );
  }
  var finePointer =
    window.matchMedia &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ======================================================================
     1. TRIAGE
     ====================================================================== */
  var SCEN = [
    {
      id: "money",
      ico: "💸",
      fir: "Financial Fraud",
      t: {
        en: "I lost money (UPI, card, bank)",
        hi: "मेरे पैसे कट गए (UPI, कार्ड, बैंक)",
      },
      s: {
        en: "A payment I didn’t mean to make, or was tricked into",
        hi: "ऐसा भुगतान जो मैं करना नहीं चाहता/चाहती था, या ठगी से करवाया गया",
      },
    },
    {
      id: "otp",
      ico: "🔢",
      fir: "Phishing",
      t: {
        en: "I shared an OTP, PIN or password",
        hi: "मैंने OTP, PIN या पासवर्ड बता दिया",
      },
      s: {
        en: "Over a call, message or a fake page",
        hi: "कॉल, संदेश या नकली पेज पर",
      },
    },
    {
      id: "link",
      ico: "🔗",
      fir: "Phishing",
      t: {
        en: "I clicked a link or installed an app",
        hi: "मैंने लिंक खोला या ऐप इंस्टॉल किया",
      },
      s: {
        en: "And now something feels off",
        hi: "और अब कुछ गड़बड़ लग रही है",
      },
    },
    {
      id: "account",
      ico: "🔓",
      fir: "Account Hacking",
      t: {
        en: "My social or email account was hacked",
        hi: "मेरा सोशल या ईमेल अकाउंट हैक हो गया",
      },
      s: {
        en: "Locked out, or posting things I didn’t",
        hi: "लॉगिन नहीं हो रहा, या मेरे नाम से पोस्ट हो रहा है",
      },
    },
    {
      id: "threat",
      ico: "😨",
      fir: "Online Harassment",
      t: {
        en: "Someone is threatening or blackmailing me",
        hi: "कोई मुझे धमका या ब्लैकमेल कर रहा है",
      },
      s: {
        en: "Photos, videos, chats or money demands",
        hi: "फ़ोटो, वीडियो, चैट या पैसों की माँग",
      },
    },
    {
      id: "id",
      ico: "🪪",
      fir: "Identity Theft",
      t: {
        en: "My Aadhaar / PAN / ID was misused",
        hi: "मेरा आधार / पैन / ID दुरुपयोग हुआ",
      },
      s: {
        en: "Loans, SIMs or accounts I didn’t open",
        hi: "ऐसे लोन, सिम या खाते जो मैंने नहीं खोले",
      },
    },
  ];
  var WHEN = [
    {
      id: "hour",
      big: { en: "< 1 hour", hi: "1 घंटे से कम" },
      s: { en: "It just happened", hi: "अभी-अभी हुआ" },
    },
    {
      id: "day",
      big: { en: "Today", hi: "आज" },
      s: { en: "Within the last 24 hours", hi: "पिछले 24 घंटों में" },
    },
    {
      id: "old",
      big: { en: "Earlier", hi: "पहले" },
      s: { en: "More than a day ago", hi: "एक दिन से ज़्यादा पहले" },
    },
  ];
  var STEP = {
    call: {
      b: { en: "Call 1930 now", hi: "अभी 1930 पर कॉल करें" },
      d: {
        en: "National Cyber Crime Helpline. Have the amount, time and the UPI ID / account number the money went to. In the first hours they may still be able to flag the transfer.",
        hi: "राष्ट्रीय साइबर क्राइम हेल्पलाइन। राशि, समय और जिस UPI ID / खाते में पैसा गया वह तैयार रखें। शुरुआती घंटों में वे ट्रांसफ़र को फ़्लैग करवा सकते हैं।",
      },
    },
    late: {
      b: {
        en: "Still report it — even if it was a while ago",
        hi: "फिर भी रिपोर्ट करें — चाहे समय बीत चुका हो",
      },
      d: {
        en: "Speed helps most, but late reports still matter: they link cases together and help get scammers’ accounts blocked. 1930 is open for these too.",
        hi: "जल्दी करना सबसे अच्छा है, पर देर से की गई रिपोर्ट भी मायने रखती है: इससे मामले जुड़ते हैं और ठगों के खाते बंद करवाने में मदद मिलती है। 1930 इनके लिए भी उपलब्ध है।",
      },
    },
    bank: {
      b: {
        en: "Call your bank or UPI app’s helpline",
        hi: "अपने बैंक या UPI ऐप की हेल्पलाइन पर कॉल करें",
      },
      d: {
        en: "Ask them to block the card / UPI ID and raise a dispute on the transaction. Write down the complaint number they give you.",
        hi: "कार्ड / UPI ID ब्लॉक करवाएँ और लेन-देन पर डिस्प्यूट दर्ज करवाएँ। वे जो शिकायत नंबर दें, उसे लिख लें।",
      },
    },
    nomore: {
      b: { en: "Don’t send any more money", hi: "और पैसे न भेजें" },
      d: {
        en: "Anyone asking for a “recovery fee”, “tax” or “refund charge” to get your money back is part of the scam.",
        hi: "जो भी पैसे वापस दिलाने के लिए “रिकवरी फ़ीस”, “टैक्स” या “रिफ़ंड चार्ज” माँगे, वह इसी ठगी का हिस्सा है।",
      },
    },
    pin: {
      b: {
        en: "Change your UPI PIN and card PIN",
        hi: "UPI PIN और कार्ड PIN बदलें",
      },
      d: {
        en: "Do it inside the official bank app. If an OTP was shared, ask the bank to block the card until you are sure it is safe.",
        hi: "यह आधिकारिक बैंक ऐप के अंदर से करें। अगर OTP बताया गया है, तो कार्ड सुरक्षित होने तक बैंक से उसे ब्लॉक करवाएँ।",
      },
    },
    pw: {
      b: {
        en: "Change the passwords that may be exposed",
        hi: "जो पासवर्ड उजागर हो सकते हैं उन्हें बदलें",
      },
      d: {
        en: "Start with email and banking, then anything that reuses the same password. Turn on two-step verification (2FA).",
        hi: "ईमेल और बैंकिंग से शुरू करें, फिर वे सभी जगह जहाँ वही पासवर्ड इस्तेमाल हुआ है। टू-स्टेप वेरिफ़िकेशन (2FA) चालू करें।",
      },
    },
    watch: {
      b: {
        en: "Watch your statements for the next few days",
        hi: "अगले कुछ दिन अपने स्टेटमेंट पर नज़र रखें",
      },
      d: {
        en: "Check SMS alerts and the bank app. If any unfamiliar debit appears, call 1930 and your bank straight away.",
        hi: "SMS अलर्ट और बैंक ऐप देखते रहें। कोई अनजान डेबिट दिखे तो तुरंत 1930 और बैंक को कॉल करें।",
      },
    },
    app: {
      b: {
        en: "Remove the app, then scan your phone",
        hi: "ऐप हटाएँ, फिर फ़ोन स्कैन करें",
      },
      d: {
        en: "Uninstall the unknown app (Settings → Apps), revoke any permissions it asked for, turn off screen-sharing, and run a Play Protect / antivirus scan.",
        hi: "अनजान ऐप अनइंस्टॉल करें (सेटिंग्स → ऐप्स), उसे दी गई अनुमतियाँ हटाएँ, स्क्रीन-शेयरिंग बंद करें और Play Protect / एंटीवायरस स्कैन चलाएँ।",
      },
    },
    recover: {
      b: {
        en: "Recover the account from the official page",
        hi: "आधिकारिक पेज से अकाउंट वापस पाएँ",
      },
      d: {
        en: "Use the platform’s own “forgot password / hacked account” page — never a link someone sent you. Log out of all other devices and tell your contacts not to trust messages from you meanwhile.",
        hi: "प्लैटफ़ॉर्म का अपना “पासवर्ड भूल गए / हैक अकाउंट” पेज इस्तेमाल करें — किसी का भेजा लिंक नहीं। बाकी सभी डिवाइस से लॉग-आउट करें और अपने संपर्कों को बताएँ कि तब तक आपके नाम के संदेशों पर भरोसा न करें।",
      },
    },
    nopay: {
      b: {
        en: "Don’t pay, and don’t panic-reply",
        hi: "पैसे न दें, घबराकर जवाब भी न दें",
      },
      d: {
        en: "Paying usually brings more demands. Screenshot everything first, then block the profile. Don’t delete the chat.",
        hi: "पैसे देने से आमतौर पर और माँगें आती हैं। पहले सब कुछ का स्क्रीनशॉट लें, फिर प्रोफ़ाइल ब्लॉक करें। चैट डिलीट न करें।",
      },
    },
    safe: {
      b: {
        en: "If you feel unsafe, call 112",
        hi: "अगर असुरक्षित महसूस करें तो 112 पर कॉल करें",
      },
      d: {
        en: "Police emergency. Women’s helpline: 1091 · Child helpline: 1098.",
        hi: "पुलिस आपातकालीन सेवा। महिला हेल्पलाइन: 1091 · चाइल्ड हेल्पलाइन: 1098।",
      },
    },
    aadhaar: {
      b: {
        en: "Lock your Aadhaar biometrics",
        hi: "अपने आधार बायोमेट्रिक्स लॉक करें",
      },
      d: {
        en: "You can lock biometrics from the official myAadhaar portal or the mAadhaar app, so your fingerprint / iris can’t be used to authenticate.",
        hi: "आधिकारिक myAadhaar पोर्टल या mAadhaar ऐप से बायोमेट्रिक्स लॉक किए जा सकते हैं, ताकि आपकी उँगली / आँख से प्रमाणीकरण न हो सके।",
      },
    },
    credit: {
      b: {
        en: "Check your credit report and statements",
        hi: "अपनी क्रेडिट रिपोर्ट और स्टेटमेंट जाँचें",
      },
      d: {
        en: "Look for loans, cards or accounts you never opened. Credit bureaus give one free report a year.",
        hi: "ऐसे लोन, कार्ड या खाते खोजें जो आपने कभी नहीं खोले। क्रेडिट ब्यूरो साल में एक मुफ़्त रिपोर्ट देते हैं।",
      },
    },
    evidence: {
      b: {
        en: "Save the evidence — delete nothing",
        hi: "सबूत सुरक्षित रखें — कुछ भी डिलीट न करें",
      },
      d: {
        en: "Screenshots of chats, phone numbers, links, UPI IDs, the transaction ID / UTR and bank SMS. Keep the originals too.",
        hi: "चैट, फ़ोन नंबर, लिंक, UPI ID, ट्रांज़ैक्शन ID / UTR और बैंक SMS के स्क्रीनशॉट रखें। मूल संदेश भी रहने दें।",
      },
    },
    file: {
      b: {
        en: "File a complaint on cybercrime.gov.in",
        hi: "cybercrime.gov.in पर शिकायत दर्ज करें",
      },
      d: {
        en: "Use the evidence you just saved. The draft helper below can write a first version for you.",
        hi: "अभी सहेजे सबूत का उपयोग करें। नीचे दिया ड्राफ़्ट हेल्पर आपके लिए पहला मसौदा लिख सकता है।",
      },
    },
    tell: {
      b: { en: "Tell someone you trust", hi: "किसी भरोसेमंद को बताएँ" },
      d: {
        en: "A parent, teacher, friend or elder. You didn’t do anything stupid — this is their full-time job, and it happens to careful people too.",
        hi: "माता-पिता, शिक्षक, दोस्त या कोई बड़ा। आपने कोई बेवकूफ़ी नहीं की — यह उनका पूरा-समय का काम है, और सावधान लोगों के साथ भी होता है।",
      },
    },
  };
  var PLAN = {
    money: ["call", "bank", "nomore", "evidence", "file", "tell"],
    otp: ["bank", "pin", "pw", "watch", "evidence", "file", "tell"],
    link: ["app", "pw", "watch", "evidence", "file", "tell"],
    account: ["recover", "pw", "evidence", "file", "tell"],
    threat: ["nopay", "evidence", "safe", "file", "tell"],
    id: ["aadhaar", "credit", "watch", "evidence", "file", "tell"],
  };

  var tri = { step: 1, scen: null, when: null, done: {} };
  var triEl = document.getElementById("triage");

  function planFor(sc, when) {
    var ids = PLAN[sc].slice();
    if (sc === "money" && when === "old") ids[0] = "late";
    return ids;
  }
  function triRender() {
    if (!triEl) return;
    var labels = [
      { en: "What happened", hi: "क्या हुआ" },
      { en: "When", hi: "कब" },
      { en: "Your plan", hi: "आपकी योजना" },
    ];
    var steps =
      '<ol class="triage-steps">' +
      labels
        .map(function (l, i) {
          var cls =
            tri.step === i + 1
              ? "is-current"
              : tri.step > i + 1
                ? "is-done"
                : "";
          return (
            '<li class="' +
            cls +
            '" data-go="' +
            (i + 1) +
            '">' +
            bi(l) +
            "</li>"
          );
        })
        .join("") +
      "</ol>";
    var pane = "";
    if (tri.step === 1) {
      pane =
        '<div class="triage-pane show"><p class="triage-q">' +
        bi({ en: "What happened?", hi: "क्या हुआ?" }) +
        '</p><div class="scenario-grid">' +
        SCEN.map(function (s) {
          return (
            '<button type="button" class="scenario" data-scen="' +
            s.id +
            '"><span class="ico">' +
            s.ico +
            "</span><span><strong>" +
            bi(s.t) +
            "</strong><small>" +
            bi(s.s) +
            "</small></span></button>"
          );
        }).join("") +
        "</div></div>";
    } else if (tri.step === 2) {
      pane =
        '<div class="triage-pane show"><p class="triage-q">' +
        bi({
          en: "How long ago did it happen?",
          hi: "यह कितनी देर पहले हुआ?",
        }) +
        '</p><div class="time-row">' +
        WHEN.map(function (w) {
          return (
            '<button type="button" class="time-btn" data-when="' +
            w.id +
            '"><strong>' +
            bi(w.big) +
            "</strong><small>" +
            bi(w.s) +
            "</small></button>"
          );
        }).join("") +
        "</div>" +
        '<button type="button" class="triage-back" data-go="1">← ' +
        bi({ en: "Back", hi: "वापस" }) +
        "</button></div>";
    } else {
      var ids = planFor(tri.scen, tri.when),
        total = ids.length;
      var done = ids.filter(function (id) {
        return tri.done[id];
      }).length;
      var urgent = tri.scen === "money" && tri.when !== "old";
      var banner = urgent
        ? '<div class="triage-urgent"><div><b>' +
          bi({
            en: "The first hours matter most. Call 1930 now.",
            hi: "शुरुआती घंटे सबसे अहम हैं। अभी 1930 पर कॉल करें।",
          }) +
          "</b>" +
          bi({
            en: "Then work through the list below.",
            hi: "फिर नीचे की सूची पूरी करें।",
          }) +
          '</div><a class="btn" href="tel:1930" data-copy="1930">📞 1930</a></div>'
        : tri.scen === "threat"
          ? '<div class="triage-urgent"><div><b>' +
            bi({
              en: "You’re not alone — and none of this is your fault.",
              hi: "आप अकेले नहीं हैं — और इसमें आपकी कोई गलती नहीं है।",
            }) +
            "</b>" +
            bi({
              en: "If you feel unsafe right now, call 112.",
              hi: "अगर अभी असुरक्षित महसूस करें तो 112 पर कॉल करें।",
            }) +
            '</div><a class="btn" href="tel:112" data-copy="112">📞 112</a></div>'
          : '<div class="triage-urgent calm"><div><b>' +
            bi({
              en: "Take a breath. This is manageable if you go step by step.",
              hi: "एक गहरी साँस लें। कदम-दर-कदम चलें तो यह संभाला जा सकता है।",
            }) +
            "</b>" +
            bi({
              en: "Tick each step off as you do it.",
              hi: "हर कदम पूरा होते ही टिक करें।",
            }) +
            "</div></div>";
      var items = ids
        .map(function (id) {
          var s = STEP[id];
          return (
            '<li class="plan-item' +
            (tri.done[id] ? " done" : "") +
            (id === "call" ? " first-aid" : "") +
            '" data-step="' +
            id +
            '" role="checkbox" aria-checked="' +
            (tri.done[id] ? "true" : "false") +
            '" tabindex="0"><span class="box"></span><span><b>' +
            bi(s.b) +
            '</b><span class="d">' +
            bi(s.d) +
            "</span></span></li>"
          );
        })
        .join("");
      pane =
        '<div class="triage-pane show">' +
        banner +
        '<div class="plan-meta"><span>' +
        done +
        " / " +
        total +
        '</span><div class="plan-progress"><i style="width:' +
        Math.round((done / total) * 100) +
        '%"></i></div></div>' +
        '<ul class="plan-list">' +
        items +
        "</ul>" +
        '<div class="plan-done-msg' +
        (done === total ? " show" : "") +
        '"><b>' +
        bi({
          en: "That’s the whole list. Well done.",
          hi: "पूरी सूची हो गई। शाबाश।",
        }) +
        "</b> " +
        bi({
          en: "Keep your reference number and screenshots safe, and check your bank app for a few days.",
          hi: "अपना रेफ़रेंस नंबर और स्क्रीनशॉट सुरक्षित रखें, और कुछ दिन बैंक ऐप देखते रहें।",
        }) +
        "</div>" +
        '<div class="plan-actions"><button type="button" class="btn" data-act="draft">📄 ' +
        bi({
          en: "Start my complaint draft",
          hi: "मेरा शिकायत ड्राफ़्ट शुरू करें",
        }) +
        "</button>" +
        '<a class="btn btn-outline" href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">cybercrime.gov.in ↗</a>' +
        '<button type="button" class="btn btn-outline" data-act="restart">↺ ' +
        bi({ en: "Start over", hi: "फिर से शुरू करें" }) +
        "</button></div></div>";
    }
    triEl.innerHTML = steps + pane;
  }
  function triDraft() {
    var sc = SCEN.filter(function (s) {
      return s.id === tri.scen;
    })[0];
    var wh = WHEN.filter(function (w) {
      return w.id === tri.when;
    })[0];
    if (typeof openCyberPopup === "function") openCyberPopup("fir");
    setTimeout(function () {
      var sel = document.getElementById("cyber-fir-type");
      if (sel && sc)
        Array.prototype.forEach.call(sel.options, function (o) {
          if (o.text.indexOf(sc.fir) === 0) sel.value = o.value || o.text;
        });
      var d = document.getElementById("cyber-fir-date");
      if (d && wh && wh.id !== "old")
        d.value = new Date().toISOString().slice(0, 10);
      var desc = document.getElementById("cyber-fir-desc");
      if (desc && !desc.value && sc)
        desc.value =
          T("What happened: ", "क्या हुआ: ") +
          sc.t.en +
          ". " +
          T("When: ", "कब: ") +
          wh.s.en +
          ".\n\n";
    }, 80);
  }
  if (triEl) {
    triEl.addEventListener("click", function (e) {
      var t = e.target.closest(
        "[data-scen],[data-when],[data-go],[data-step],[data-act]",
      );
      if (!t || (t.hasAttribute("data-copy") && finePointer)) {
        if (!t) return;
      }
      if (t.dataset.scen) {
        tri = { step: 2, scen: t.dataset.scen, when: null, done: {} };
        triRender();
      } else if (t.dataset.when) {
        tri.when = t.dataset.when;
        tri.step = 3;
        tri.done = {};
        triRender();
      } else if (t.dataset.go) {
        var g = +t.dataset.go;
        if (g < tri.step) {
          tri.step = g;
          triRender();
        }
      } else if (t.dataset.step) {
        tri.done[t.dataset.step] = !tri.done[t.dataset.step];
        triRender();
        var again = triEl.querySelector('[data-step="' + t.dataset.step + '"]');
        if (again) again.focus({ preventScroll: true });
      } else if (t.dataset.act === "restart") {
        tri = { step: 1, scen: null, when: null, done: {} };
        triRender();
      } else if (t.dataset.act === "draft") triDraft();
    });
    triEl.addEventListener("keydown", function (e) {
      if (
        (e.key === " " || e.key === "Enter") &&
        e.target.classList.contains("plan-item")
      ) {
        e.preventDefault();
        e.target.click();
      }
    });
    triRender();
  }

  /* ======================================================================
     2. RED-FLAG HUNT
     ====================================================================== */
  // each message = list of parts. {f:1,w:{...}} marks a red flag and carries the explanation
  var HUNT = [
    {
      from: { en: "SMS · from “VM-SBIALT”", hi: "SMS · “VM-SBIALT” की ओर से" },
      parts: [
        { en: "SBI ALERT: ", hi: "SBI अलर्ट: " },
        {
          en: "Your KYC will EXPIRE today.",
          hi: "आपका KYC आज ही समाप्त हो जाएगा।",
          f: 1,
          w: {
            en: "Manufactured urgency — banks don’t cancel accounts with a same-day countdown.",
            hi: "बनावटी जल्दबाज़ी — बैंक उसी दिन की उलटी गिनती देकर खाते बंद नहीं करते।",
          },
        },
        {
          en: " Your account will be blocked. ",
          hi: " आपका खाता ब्लॉक हो जाएगा। ",
          f: 1,
          w: {
            en: "A threat meant to make you panic and skip thinking.",
            hi: "डराने वाली धमकी, ताकि आप घबराकर सोचना छोड़ दें।",
          },
        },
        { en: "Update now: ", hi: "अभी अपडेट करें: ", s: 1 },
        {
          en: "bit.ly/sbi-kyc-upd8",
          hi: "bit.ly/sbi-kyc-upd8",
          f: 1,
          w: {
            en: "A shortened link hides the real address. Real banks use their own domain.",
            hi: "छोटा किया हुआ लिंक असली पता छिपा देता है। असली बैंक अपना ही डोमेन इस्तेमाल करते हैं।",
          },
        },
        { en: " Help: ", hi: " मदद: ", s: 1 },
        {
          en: "98XXXXXX10",
          hi: "98XXXXXX10",
          f: 1,
          w: {
            en: "A personal mobile number, not the bank’s official helpline.",
            hi: "यह किसी का निजी मोबाइल नंबर है, बैंक की आधिकारिक हेल्पलाइन नहीं।",
          },
        },
      ],
    },
    {
      from: {
        en: "WhatsApp · +91 9XXXX XXXXX (not in contacts)",
        hi: "WhatsApp · +91 9XXXX XXXXX (संपर्कों में नहीं)",
      },
      parts: [
        { en: "Hi! HR Team here. ", hi: "नमस्ते! HR टीम से बोल रहे हैं। " },
        {
          en: "You’re SELECTED for work-from-home data entry",
          hi: "आप वर्क-फ़्रॉम-होम डेटा एंट्री के लिए चुन लिए गए हैं",
        },
        {
          en: " — ₹35,000/month ",
          hi: " — ₹35,000 प्रति माह ",
          f: 1,
          w: {
            en: "A very high salary for very little work is the classic bait.",
            hi: "बहुत कम काम के बदले बहुत ज़्यादा वेतन — यही पुराना चारा है।",
          },
        },
        {
          en: "with no interview needed. ",
          hi: "और कोई इंटरव्यू नहीं। ",
          f: 1,
          w: {
            en: "Real hiring has an interview or a test. “No interview” means no real employer.",
            hi: "असली भर्ती में इंटरव्यू या टेस्ट होता है। “कोई इंटरव्यू नहीं” यानी कोई असली नियोक्ता नहीं।",
          },
        },
        {
          en: "Pay ₹1,500 registration fee today",
          hi: "आज ₹1,500 रजिस्ट्रेशन फ़ीस दें",
          f: 1,
          w: {
            en: "A real employer never asks you to pay to get hired.",
            hi: "असली नियोक्ता नौकरी देने के लिए कभी पैसे नहीं माँगता।",
          },
        },
        { en: " to confirm your slot. ", hi: " ताकि आपकी जगह पक्की हो। " },
        {
          en: "Reply fast, only on WhatsApp!",
          hi: "जल्दी जवाब दें, सिर्फ़ WhatsApp पर!",
          f: 1,
          w: {
            en: "Pressure to stay on a private chat keeps you away from anyone who could warn you.",
            hi: "निजी चैट पर ही रहने का दबाव आपको उन लोगों से दूर रखता है जो आपको सावधान कर सकते हैं।",
          },
        },
      ],
    },
    {
      from: { en: "SMS · “PhonePe”", hi: "SMS · “PhonePe”" },
      parts: [
        { en: "PhonePe: ", hi: "PhonePe: " },
        {
          en: "You have a Collect Request of ₹1 ",
          hi: "आपके पास ₹1 का कलेक्ट रिक्वेस्ट है ",
          f: 1,
          w: {
            en: "A “collect request” asks to take money from you. It is never a refund or a gift.",
            hi: "“कलेक्ट रिक्वेस्ट” आपसे पैसे निकालने की माँग है। यह रिफ़ंड या तोहफ़ा कभी नहीं होता।",
          },
        },
        {
          en: "from ‘Cashback Refund Team’. ",
          hi: "‘Cashback Refund Team’ की ओर से। ",
        },
        {
          en: "Enter your UPI PIN to RECEIVE ₹4,999 cashback.",
          hi: "₹4,999 कैशबैक पाने के लिए अपना UPI PIN डालें।",
          f: 1,
          w: {
            en: "You never need a PIN to receive money — only to send it.",
            hi: "पैसे पाने के लिए PIN कभी नहीं चाहिए — सिर्फ़ भेजने के लिए चाहिए।",
          },
        },
        {
          en: " Offer valid for 10 minutes.",
          hi: " ऑफ़र सिर्फ़ 10 मिनट के लिए।",
          f: 1,
          w: {
            en: "A countdown so you act before you think.",
            hi: "उलटी गिनती, ताकि आप सोचने से पहले ही कर दें।",
          },
        },
      ],
    },
  ];
  var hu = { i: 0, picked: {}, checked: false, caught: 0, total: 0, wrong: 0 };
  var huEl = document.getElementById("hunt-app");

  function huRender() {
    if (!huEl) return;
    if (hu.i >= HUNT.length) {
      var pct = hu.total
        ? Math.round((Math.max(0, hu.caught - hu.wrong * 0.5) / hu.total) * 100)
        : 0;
      var msg =
        pct >= 80
          ? {
              en: "Sharp eyes. These messages would have a hard time with you.",
              hi: "पैनी नज़र। इन संदेशों के लिए आपको फँसाना मुश्किल होगा।",
            }
          : pct >= 50
            ? {
                en: "Good start. Look again at the urgency and the “pay first” tricks — they show up everywhere.",
                hi: "अच्छी शुरुआत। जल्दबाज़ी और “पहले पैसे दो” वाली चालों को दोबारा देखें — ये हर जगह दिखती हैं।",
              }
            : {
                en: "These are designed to fool people — that’s the point. The case files above show the patterns; try again after a look.",
                hi: "ये लोगों को फँसाने के लिए ही बने हैं। ऊपर की केस फ़ाइलों में पैटर्न देखें, फिर दोबारा आज़माएँ।",
              };
      huEl.innerHTML =
        '<div class="hunt-card"><div class="hunt-final"><div class="score-big">' +
        hu.caught +
        "/" +
        hu.total +
        "</div><p>" +
        bi(msg) +
        '</p><p class="hunt-hint">' +
        bi({
          en:
            "False alarms: " +
            hu.wrong +
            " — flagging everything isn’t the answer either.",
          hi:
            "गलत अलार्म: " + hu.wrong + " — हर चीज़ पर शक करना भी हल नहीं है।",
        }) +
        '</p><button type="button" class="btn" data-hunt="again">↺ ' +
        bi({ en: "Play again", hi: "फिर खेलें" }) +
        "</button></div></div>";
      return;
    }
    var m = HUNT[hu.i],
      k = 0;
    var body = m.parts
      .map(function (p, idx) {
        if (p.s)
          return (
            '<span class="en">' +
            esc(p.en) +
            '</span><span class="hi">' +
            esc(p.hi) +
            "</span>"
          ); // plain connective text
        var cls = "flag-chip" + (hu.picked[idx] ? " picked" : "");
        return (
          '<button type="button" class="' +
          cls +
          '" data-p="' +
          idx +
          '" data-flag="' +
          (p.f ? 1 : 0) +
          '"><span class="en">' +
          esc(p.en) +
          '</span><span class="hi">' +
          esc(p.hi) +
          "</span></button>"
        );
      })
      .join("");
    var dots = HUNT.map(function (_, i) {
      return '<i class="' + (i <= hu.i ? "on" : "") + '"></i>';
    }).join("");
    var flags = m.parts.filter(function (p) {
      return p.f;
    });
    huEl.innerHTML =
      '<div class="hunt-card' +
      (hu.checked ? " checked" : "") +
      '" id="hunt-card">' +
      '<div class="hunt-bar"><span>' +
      bi({ en: "MESSAGE", hi: "संदेश" }) +
      " " +
      (hu.i + 1) +
      " / " +
      HUNT.length +
      '</span><span class="dots">' +
      dots +
      "</span></div>" +
      '<div class="hunt-from">' +
      bi(m.from) +
      '</div><div class="hunt-msg">' +
      body +
      "</div>" +
      '<div class="hunt-result"><div class="hunt-verdict" id="hunt-verdict"></div><ul class="hunt-why">' +
      flags
        .map(function (p) {
          return (
            '<li data-why="' +
            m.parts.indexOf(p) +
            '"><b>' +
            bi({ en: esc(p.en.trim()), hi: esc(p.hi.trim()) }) +
            "</b> — " +
            bi(p.w) +
            "</li>"
          );
        })
        .join("") +
      "</ul></div>" +
      '<div class="hunt-foot"><span class="hunt-hint">' +
      (hu.checked
        ? ""
        : bi({
            en:
              "Tap the suspicious parts · " +
              flags.length +
              " red flags hidden here",
            hi:
              "संदिग्ध हिस्सों पर टैप करें · यहाँ " +
              flags.length +
              " रेड फ़्लैग छिपे हैं",
          })) +
      "</span>" +
      (hu.checked
        ? '<button type="button" class="btn-small" data-hunt="next">' +
          bi(
            hu.i + 1 < HUNT.length
              ? { en: "Next message →", hi: "अगला संदेश →" }
              : { en: "See my score →", hi: "मेरा स्कोर देखें →" },
          ) +
          "</button>"
        : '<button type="button" class="btn-small" data-hunt="check">' +
          bi({ en: "Check my answers", hi: "मेरे जवाब जाँचें" }) +
          "</button>") +
      "</div></div>";
  }
  function huCheck() {
    var m = HUNT[hu.i],
      got = 0,
      flags = 0,
      wrong = 0;
    m.parts.forEach(function (p, idx) {
      if (p.f) {
        flags++;
        if (hu.picked[idx]) got++;
      } else if (hu.picked[idx]) wrong++;
    });
    hu.caught += got;
    hu.total += flags;
    hu.wrong += wrong;
    hu.checked = true;
    huRender();
    var card = document.getElementById("hunt-card");
    card.querySelectorAll(".flag-chip").forEach(function (c) {
      var idx = +c.dataset.p,
        isFlag = c.dataset.flag === "1";
      if (isFlag && hu.picked[idx]) c.classList.add("hit");
      else if (isFlag) c.classList.add("missed");
      else if (hu.picked[idx]) c.classList.add("false");
    });
    card.querySelectorAll(".hunt-why li").forEach(function (li) {
      if (hu.picked[+li.dataset.why]) li.classList.add("got");
    });
    var v = document.getElementById("hunt-verdict");
    v.innerHTML = bi({
      en:
        "You caught " +
        got +
        " of " +
        flags +
        (wrong ? " (and flagged " + wrong + " that were fine)" : ""),
      hi:
        flags +
        " में से " +
        got +
        " पकड़े" +
        (wrong ? " (और " + wrong + " सही हिस्से गलत चुने)" : ""),
    });
  }
  if (huEl) {
    huEl.addEventListener("click", function (e) {
      var chip = e.target.closest(".flag-chip");
      if (chip && !hu.checked) {
        var i = +chip.dataset.p;
        hu.picked[i] = !hu.picked[i];
        chip.classList.toggle("picked", !!hu.picked[i]);
        return;
      }
      var b = e.target.closest("[data-hunt]");
      if (!b) return;
      if (b.dataset.hunt === "check") huCheck();
      else if (b.dataset.hunt === "next") {
        hu.i++;
        hu.picked = {};
        hu.checked = false;
        huRender();
      } else if (b.dataset.hunt === "again") {
        hu = {
          i: 0,
          picked: {},
          checked: false,
          caught: 0,
          total: 0,
          wrong: 0,
        };
        huRender();
      }
    });
    huRender();
  }

  /* ======================================================================
     3. SEARCH / COMMAND PALETTE
     ====================================================================== */
  var pal = document.getElementById("palette"),
    palIn = document.getElementById("palette-input"),
    palList = document.getElementById("palette-list");
  var items = [],
    shown = [],
    sel = 0,
    lastFocus = null;

  function flash(el) {
    if (!el) return;
    el.animate(
      [
        { boxShadow: "0 0 0 0 var(--copper)" },
        { boxShadow: "0 0 0 10px transparent" },
      ],
      { duration: 900 },
    );
  }
  function goTo(sel_, fn) {
    var el = typeof sel_ === "string" ? document.querySelector(sel_) : sel_;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (fn) fn(el);
    flash(el);
  }
  function buildIndex() {
    items = [];
    function flat(o, out) {
      out = out || [];
      if (typeof o === "string") out.push(o);
      else if (Array.isArray(o))
        o.forEach(function (x) {
          flat(x, out);
        });
      else if (o && typeof o === "object")
        Object.keys(o).forEach(function (k) {
          flat(o[k], out);
        });
      return out;
    }
    var A = function (g, ico, en, hi, sub, run, deep) {
      items.push({
        g: g,
        ico: ico,
        en: en,
        hi: hi,
        sub: sub || { en: "", hi: "" },
        run: run,
        deep: deep ? norm(flat(deep).join(" ")) : "",
      });
    };
    var G = {
      act: { en: "Quick actions", hi: "त्वरित कार्य" },
      sec: { en: "Jump to", hi: "यहाँ जाएँ" },
      top: { en: "Case files", hi: "केस फ़ाइलें" },
      rul: { en: "13 rules", hi: "13 नियम" },
      glo: { en: "Word guide", hi: "शब्द गाइड" },
      real: { en: "Real fraud patterns", hi: "असली धोखाधड़ी के तरीके" },
      con: { en: "Helplines", hi: "हेल्पलाइन" },
    };
    A(
      G.act,
      "🆘",
      "Emergency numbers (SOS)",
      "आपातकालीन नंबर (SOS)",
      { en: "1930 · 112 · 1091 · 1098", hi: "1930 · 112 · 1091 · 1098" },
      function () {
        if (window.openSOS) openSOS();
      },
    );
    A(
      G.act,
      "🧭",
      "Something just happened — get my checklist",
      "कुछ अभी हुआ है — मेरी चेकलिस्ट दें",
      null,
      function () {
        goTo("#help");
      },
    );
    A(
      G.act,
      "📄",
      "Draft a complaint (FIR helper)",
      "शिकायत का ड्राफ़्ट बनाएँ (FIR हेल्पर)",
      null,
      function () {
        openCyberPopup("fir");
      },
    );
    A(
      G.act,
      "🔎",
      "Check a phone number, UPI ID or link",
      "फ़ोन नंबर, UPI ID या लिंक जाँचें",
      null,
      function () {
        openCyberPopup("check");
      },
    );
    A(G.act, "📮", "Track a complaint", "शिकायत ट्रैक करें", null, function () {
      openCyberPopup("track");
    });
    A(
      G.act,
      "🌓",
      "Switch light / dark mode",
      "लाइट / डार्क मोड बदलें",
      null,
      function () {
        window.cmToggleTheme && window.cmToggleTheme(null);
      },
    );
    A(
      G.act,
      "🌐",
      "Switch language: English ↔ हिन्दी",
      "भाषा बदलें: English ↔ हिन्दी",
      null,
      function () {
        setLang(
          document.documentElement.getAttribute("data-lang") === "hi"
            ? "en"
            : "hi",
        );
      },
    );
    A(
      G.act,
      "📞",
      "Copy helpline 1930",
      "हेल्पलाइन 1930 कॉपी करें",
      null,
      function () {
        window.cmCopy("1930");
      },
    );
    [
      ["#help", "🧭", "Get help", "मदद पाएँ"],
      ["#learn", "📁", "The 13 case files", "13 केस फ़ाइलें"],
      ["#hunt", "🚩", "Red-flag hunt (game)", "रेड-फ़्लैग की खोज (खेल)"],
      ["#realcases", "🎧", "Real fraud patterns", "असली धोखाधड़ी के तरीके"],
      ["#quiz", "❓", "Quick quiz", "त्वरित क्विज़"],
      [
        "#report",
        "📝",
        "How to report cyber crime",
        "साइबर अपराध की रिपोर्ट कैसे करें",
      ],
      ["#about", "ℹ️", "About CyberMitra", "सायबरमित्र के बारे में"],
    ].forEach(function (s) {
      A(G.sec, s[1], s[2], s[3], null, function () {
        goTo(s[0]);
      });
    });
    if (typeof TOPICS !== "undefined")
      TOPICS.forEach(function (t, i) {
        A(
          G.top,
          t.icon,
          t.en.title,
          t.hi.title,
          { en: t.en.sub, hi: t.hi.sub },
          function () {
            var ex = document.getElementById("exhibit-" + i);
            if (ex && !ex.classList.contains("open")) toggleExhibit(i);
            setTimeout(function () {
              goTo(ex);
            }, 60);
          },
          [t.en, t.hi],
        );
      });
    if (typeof REALCASES !== "undefined")
      REALCASES.forEach(function (r, i) {
        A(
          G.real,
          "🎧",
          r.title.en,
          r.title.hi,
          { en: r.badge.en, hi: r.badge.hi },
          function () {
            goTo(document.querySelectorAll(".rl-card")[i]);
          },
          [r.desc, r.signs],
        );
      });
    if (typeof RULES !== "undefined")
      RULES.forEach(function (r, i) {
        A(G.rul, String(i + 1).padStart(2, "0"), r.en, r.hi, null, function () {
          var c = document.querySelectorAll(".rule-card")[i];
          goTo(c);
        });
      });
    if (typeof GLOSSARY !== "undefined")
      GLOSSARY.forEach(function (g, i) {
        A(G.glo, "📖", g.en.t, g.hi.t, { en: g.en.d, hi: g.hi.d }, function () {
          goTo(document.querySelectorAll(".gloss-card")[i]);
        });
      });
    if (typeof CONTACTS !== "undefined")
      CONTACTS.forEach(function (c) {
        A(
          G.con,
          "☎️",
          c.label.en + " — " + c.val,
          c.label.hi + " — " + c.val,
          { en: "Press Enter to copy", hi: "कॉपी करने के लिए Enter दबाएँ" },
          function () {
            window.cmCopy(c.val);
          },
        );
      });
  }
  function norm(s) {
    return String(s).toLowerCase();
  }
  function lang() {
    return document.documentElement.getAttribute("data-lang") === "hi"
      ? "hi"
      : "en";
  }
  function filter(q) {
    q = norm(q).trim();
    if (!q)
      return items.filter(function (it) {
        return it.g.en === "Quick actions" || it.g.en === "Jump to";
      });
    var toks = q.split(/\s+/);
    var scored = [];
    items.forEach(function (it) {
      var title = norm(it.en + " " + it.hi),
        hay =
          title +
          " " +
          norm(it.sub.en + " " + it.sub.hi) +
          " " +
          (it.deep || "");
      var ok = toks.every(function (t) {
        return hay.indexOf(t) >= 0;
      });
      if (!ok) return;
      var s = 0;
      toks.forEach(function (t) {
        var p = title.indexOf(t);
        s += p === 0 ? 6 : p > 0 ? 4 : 1;
      });
      if (it.g.en === "Quick actions") s += 1;
      scored.push({ it: it, s: s });
    });
    scored.sort(function (a, b) {
      return b.s - a.s;
    });
    return scored.slice(0, 40).map(function (x) {
      return x.it;
    });
  }
  function hl(text, q) {
    var t = esc(text);
    q = q.trim();
    if (!q) return t;
    q.split(/\s+/).forEach(function (tok) {
      if (!tok) return;
      var re = new RegExp(
        "(" + tok.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")",
        "ig",
      );
      t = t.replace(re, "<mark>$1</mark>");
    });
    return t;
  }
  function paintList() {
    var L = lang(),
      q = palIn.value;
    shown = filter(q);
    if (!shown.length) {
      palList.innerHTML =
        '<div class="palette-empty"><span class="hand">hmm…</span>' +
        T(
          "Nothing matches “" +
            esc(q) +
            "”. Try “OTP”, “loan”, “1930” or “job”.",
          "“" +
            esc(q) +
            "” से कुछ नहीं मिला। “OTP”, “लोन”, “1930” या “नौकरी” आज़माएँ।",
        ) +
        "</div>";
      return;
    }
    sel = Math.min(sel, shown.length - 1);
    var html = "",
      lastG = null;
    shown.forEach(function (it, i) {
      if (it.g !== lastG) {
        html +=
          '<div class="palette-group" role="presentation">' +
          esc(it.g[L]) +
          "</div>";
        lastG = it.g;
      }
      html +=
        '<div class="palette-item" role="option" id="pi-' +
        i +
        '" data-i="' +
        i +
        '" aria-selected="' +
        (i === sel ? "true" : "false") +
        '"><span class="p-ico" aria-hidden="true">' +
        it.ico +
        '</span><span class="p-txt"><b>' +
        hl(it[L], q) +
        "</b>" +
        (it.sub[L] ? "<small>" + esc(it.sub[L]) + "</small>" : "") +
        "</span></div>";
    });
    palList.innerHTML = html;
    var cur = document.getElementById("pi-" + sel);
    if (cur) cur.scrollIntoView({ block: "nearest" });
    palIn.setAttribute("aria-activedescendant", "pi-" + sel);
  }
  function openPal() {
    if (!pal) return;
    buildIndex();
    sel = 0;
    palIn.value = "";
    palIn.placeholder = T(
      "Search topics, rules, helplines…",
      "विषय, नियम, हेल्पलाइन खोजें…",
    );
    lastFocus = document.activeElement;
    pal.classList.add("show");
    pal.setAttribute("aria-hidden", "false");
    paintList();
    setTimeout(function () {
      palIn.focus();
    }, 30);
  }
  function closePal() {
    if (!pal || !pal.classList.contains("show")) return;
    pal.classList.remove("show");
    pal.setAttribute("aria-hidden", "true");
    if (lastFocus && lastFocus.focus)
      try {
        lastFocus.focus({ preventScroll: true });
      } catch (e) {}
  }
  function runSel(i) {
    var it = shown[i];
    if (!it) return;
    closePal();
    setTimeout(function () {
      it.run();
    }, 90);
  }
  if (pal) {
    var opener = document.getElementById("open-palette");
    if (opener) opener.addEventListener("click", openPal);
    var navSearch = document.getElementById("nav-search");
    if (navSearch)
      navSearch.addEventListener("click", function () {
        var tb = document.getElementById("topbar");
        if (tb) tb.classList.remove("menu-open");
        var mb = document.getElementById("menu-btn");
        if (mb) mb.setAttribute("aria-expanded", "false");
        openPal();
      });
    palIn.addEventListener("input", function () {
      sel = 0;
      paintList();
    });
    palList.addEventListener("click", function (e) {
      var r = e.target.closest(".palette-item");
      if (r) runSel(+r.dataset.i);
    });
    palList.addEventListener("mousemove", function (e) {
      var r = e.target.closest(".palette-item");
      if (!r || +r.dataset.i === sel) return;
      sel = +r.dataset.i;
      palList.querySelectorAll(".palette-item").forEach(function (n) {
        n.setAttribute(
          "aria-selected",
          +n.dataset.i === sel ? "true" : "false",
        );
      });
    });
    pal.addEventListener("mousedown", function (e) {
      if (e.target === pal) closePal();
    });
    document.addEventListener("keydown", function (e) {
      var typing = /input|textarea|select/i.test(e.target.tagName || "");
      if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        pal.classList.contains("show") ? closePal() : openPal();
        return;
      }
      if (e.key === "/" && !typing && !pal.classList.contains("show")) {
        e.preventDefault();
        openPal();
        return;
      }
      if (!pal.classList.contains("show")) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closePal();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        sel = Math.min(shown.length - 1, sel + 1);
        paintList();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        sel = Math.max(0, sel - 1);
        paintList();
      } else if (e.key === "Enter") {
        e.preventDefault();
        runSel(sel);
      } else if (e.key === "Tab") {
        e.preventDefault();
        palIn.focus();
      }
    });
    new MutationObserver(function () {
      if (pal.classList.contains("show")) paintList();
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-lang"],
    });
  }

  // re-render the helpers' aria/labels when the language flips (content itself is bilingual markup)
})();
