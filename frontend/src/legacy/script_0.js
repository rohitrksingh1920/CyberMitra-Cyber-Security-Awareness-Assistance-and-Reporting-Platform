/* LANGUAGE */
function setLang(l) {
  document.documentElement.setAttribute("data-lang", l);
  document.getElementById("btn-en").classList.toggle("active", l === "en");
  document.getElementById("btn-hi").classList.toggle("active", l === "hi");
  window.speechSynthesis && window.speechSynthesis.cancel();
  document
    .querySelectorAll(".play-btn.playing")
    .forEach((b) => b.classList.remove("playing"));
  try {
    localStorage.setItem("cybermitra-lang", l);
  } catch (e) {}
}
function currentLang() {
  return document.documentElement.getAttribute("data-lang") || "en";
}

/* SOS MODAL */
function openSOS() {
  document.getElementById("sos-modal").classList.add("show");
}
function closeSOS() {
  document.getElementById("sos-modal").classList.remove("show");
}
document.getElementById("sos-modal").addEventListener("click", function (e) {
  if (e.target === this) closeSOS();
});

/* GLOSSARY DATA */
const GLOSSARY = [
  {
    en: {
      t: "OTP (One-Time Password)",
      d: "A one-use code sent to confirm it's really you. Never share it.",
    },
    hi: {
      t: "OTP (वन-टाइम पासवर्ड)",
      d: "यह पुष्टि करने के लिए भेजा गया कोड कि यह सच में आप हैं। इसे किसी को न बताएँ।",
    },
  },
  {
    en: {
      t: "UPI PIN",
      d: "A secret number used only to send money through UPI — never to receive it.",
    },
    hi: {
      t: "UPI पिन",
      d: "एक गुप्त नंबर, जो सिर्फ़ UPI से पैसे भेजने के लिए इस्तेमाल होता है — पाने के लिए नहीं।",
    },
  },
  {
    en: {
      t: "Phishing",
      d: "A fake message or website that tricks you into giving personal information.",
    },
    hi: {
      t: "फ़िशिंग",
      d: "एक नकली संदेश या वेबसाइट जो आपसे निजी जानकारी छीनने की कोशिश करती है।",
    },
  },
  {
    en: {
      t: "Malware",
      d: "Harmful software that can damage your device or steal your data.",
    },
    hi: {
      t: "मैलवेयर",
      d: "हानिकारक सॉफ़्टवेयर जो आपके डिवाइस को नुकसान पहुँचा सकता है या डेटा चुरा सकता है।",
    },
  },
  {
    en: {
      t: "Two-Factor Authentication (2FA)",
      d: "An extra security step, besides your password, to prove it's you.",
    },
    hi: {
      t: "टू-फ़ैक्टर ऑथेंटिकेशन (2FA)",
      d: "पासवर्ड के अलावा एक अतिरिक्त सुरक्षा कदम, यह साबित करने के लिए कि यह आप ही हैं।",
    },
  },
  {
    en: {
      t: "KYC (Know Your Customer)",
      d: "The process banks use to verify your identity — always inside the official app, never by email.",
    },
    hi: {
      t: "KYC (नो योर कस्टमर)",
      d: "बैंकों द्वारा पहचान जाँचने की प्रक्रिया — हमेशा ऑफ़िशियल ऐप में, ईमेल से कभी नहीं।",
    },
  },
  {
    en: {
      t: "Vishing",
      d: "Voice phishing — a scam phone call pretending to be a bank, police officer, or courier company.",
    },
    hi: {
      t: "विशिंग",
      d: "वॉइस फ़िशिंग — बैंक, पुलिस अफ़सर या कूरियर कंपनी बनकर की गई धोखाधड़ी वाली कॉल।",
    },
  },
  {
    en: {
      t: "Deepfake",
      d: "AI-generated fake video or voice that mimics a real person, used to trick people into trusting it.",
    },
    hi: {
      t: "डीपफ़ेक",
      d: "AI से बनाई गई नकली वीडियो या आवाज़ जो किसी असली व्यक्ति की नकल करती है।",
    },
  },
  {
    en: {
      t: "Screen-sharing scam",
      d: "A caller convinces you to install an app that lets them see and control your phone remotely.",
    },
    hi: {
      t: "स्क्रीन-शेयरिंग धोखाधड़ी",
      d: "कॉलर आपसे ऐसा ऐप इंस्टॉल करवाता है जिससे वह दूर से आपका फ़ोन देख और नियंत्रित कर सके।",
    },
  },
];

/* TOPICS (13 booklet exhibits) */
const TOPICS = [
  {
    icon: "🕵️",
    en: {
      title: "Cyber Crime Awareness",
      sub: "The basics that apply to every scam",
      watch:
        "Scammers make first contact out of nowhere — a call, message or email — pretending to be someone you'd trust, like your bank or a delivery company. They create urgency or fear, hoping you act before you think.",
      warnings: [
        "Strangers asking for personal or bank details",
        "Offers or prizes that seem too good to be true",
        "Messages that create fear or push you to hurry",
        "Links or files from unknown senders",
      ],
      doList: [
        "Check before you trust",
        "Tell someone if something feels wrong",
        "Keep apps and phone updated",
      ],
      dontList: [
        "Share your OTP or password",
        "Click on unknown links",
        "React in a hurry",
      ],
      remember: "If you are not sure, don't click. Check first, act later.",
    },
    hi: {
      title: "साइबर अपराध जागरूकता",
      sub: "हर धोखाधड़ी पर लागू होने वाली बुनियादी बातें",
      watch:
        "धोखेबाज़ अचानक संपर्क करते हैं — कॉल, मैसेज या ईमेल से — और खुद को बैंक या डिलीवरी कंपनी जैसा भरोसेमंद बताते हैं। वे डर या जल्दी का माहौल बनाते हैं ताकि आप बिना सोचे कदम उठा लें।",
      warnings: [
        "अनजान लोगों का निजी या बैंक जानकारी माँगना",
        "बहुत अच्छे लगने वाले ऑफ़र या इनाम",
        "डर पैदा करने वाले या जल्दी करने को कहने वाले संदेश",
        "अनजान भेजने वाले का लिंक या फ़ाइल",
      ],
      doList: [
        "भरोसा करने से पहले जाँच करें",
        "कुछ गलत लगे तो किसी को बताएँ",
        "अपने ऐप और फ़ोन अपडेट रखें",
      ],
      dontList: [
        "अपना OTP या पासवर्ड किसी को न बताएँ",
        "अनजान लिंक पर क्लिक न करें",
        "जल्दबाज़ी में कोई कदम न उठाएँ",
      ],
      remember: "अगर पक्का न हो, तो क्लिक न करें। पहले जाँचें, फिर काम करें।",
    },
    mock: {
      type: "whatsapp",
      en: [
        {
          who: "them",
          t: "State Bank: Your KYC will EXPIRE today. Update now: bit.ly/sbi-kyc-upd8",
        },
      ],
      hi: [
        {
          who: "them",
          t: "State Bank: आपकी KYC आज EXPIRE होगी। अभी अपडेट करें: bit.ly/sbi-kyc-upd8",
        },
      ],
    },
  },

  {
    icon: "💸",
    en: {
      title: "Fake Loan Apps",
      sub: "Instant loans, hidden strings attached",
      watch:
        "Scam loan apps are rarely RBI-registered. During install they ask for permissions no real lender needs — full contacts, photo gallery, SMS. Some demand a fee before releasing the loan, or hide very high interest in confusing terms.",
      warnings: [
        "Apps not listed as RBI-registered lenders",
        "Requests for full access to contacts or photos",
        "Demands to pay a fee before you get the loan",
        "Very high interest with unclear terms",
      ],
      doList: [
        "Borrow only from RBI-registered banks or NBFCs",
        "Read app permissions before installing",
        "Check reviews and registration details",
      ],
      dontList: [
        "Give contact or gallery access to loan apps",
        'Pay an upfront fee for a "guaranteed" loan',
        "Share Aadhaar or PAN with unverified apps",
      ],
      remember:
        "A loan app that skips all paperwork is also skipping all accountability.",
    },
    hi: {
      title: "फ़र्ज़ी लोन ऐप",
      sub: "तुरंत लोन, पर छिपी शर्तों के साथ",
      watch:
        "फ़र्ज़ी लोन ऐप अक्सर RBI में पंजीकृत नहीं होते। इंस्टॉल करते समय ऐसी परमिशन माँगते हैं जिनकी असली लेंडर को ज़रूरत नहीं होती — पूरा कॉन्टैक्ट, गैलरी, SMS। कुछ ऐप लोन से पहले फ़ीस माँगते हैं, या उलझी शर्तों में बहुत ज़्यादा ब्याज छुपाते हैं।",
      warnings: [
        "RBI-पंजीकृत न होने वाले ऐप",
        "कॉन्टैक्ट या फ़ोटो का पूरा एक्सेस माँगना",
        "लोन मिलने से पहले फ़ीस माँगना",
        "बहुत ज़्यादा ब्याज और अस्पष्ट शर्तें",
      ],
      doList: [
        "सिर्फ़ RBI-पंजीकृत बैंक या NBFC से लोन लें",
        "इंस्टॉल करने से पहले परमिशन पढ़ें",
        "रिव्यू और पंजीकरण जाँचें",
      ],
      dontList: [
        "कॉन्टैक्ट या गैलरी एक्सेस न दें",
        '"गारंटीड" लोन के लिए पहले पैसे न दें',
        "अनजान ऐप को आधार या पैन न दें",
      ],
      remember:
        "जो लोन ऐप कोई कागज़ी काम नहीं माँगता, वह जवाबदेही से भी बचता है।",
    },
    mock: {
      type: "sms",
      en: [
        {
          t: "QuickCash: Loan of ₹50,000 APPROVED! Pay ₹999 processing fee to receive amount instantly. Reply YES.",
        },
      ],
      hi: [
        {
          t: "QuickCash: ₹50,000 का लोन मंज़ूर! तुरंत पाने के लिए ₹999 प्रोसेसिंग फ़ीस भरें। YES लिखें।",
        },
      ],
    },
  },

  {
    icon: "🎮",
    en: {
      title: "Online Gaming Frauds",
      sub: "Free diamonds that cost everything",
      watch:
        'Gaming scams promise something for nothing — free diamonds, rare skins, unbeatable rankings — through links outside the game. Strangers may offer rare items for advance payment, or push a "hack" download that\'s actually malware.',
      warnings: [
        '"Free diamonds/coins" links outside the official store',
        "Strangers offering rare items for advance payment",
        "Game apps asking for unusual permissions",
        "Betting apps disguised as skill games",
      ],
      doList: [
        "Buy in-game items only from the official store",
        "Use parental controls where needed",
        "Report players who behave badly",
      ],
      dontList: [
        'Share your game password with "boosters"',
        "Enter card details on unofficial gaming sites",
        'Download game "hacks" from random links',
      ],
      remember: "If it's not in the official app store, it isn't really free.",
    },
    hi: {
      title: "ऑनलाइन गेमिंग धोखाधड़ी",
      sub: "मुफ़्त डायमंड जिसकी कीमत सब कुछ",
      watch:
        'गेमिंग धोखाधड़ी बिना कीमत कुछ देने का वादा करती है — फ़्री डायमंड, दुर्लभ स्किन, अजेय रैंकिंग — गेम के बाहर भेजे लिंक से। अजनबी पहले पैसे लेकर आइटम देने का वादा करते हैं, या हानिकारक "हैक" डाउनलोड कराते हैं।',
      warnings: [
        'ऑफ़िशियल स्टोर के बाहर "फ़्री डायमंड" के लिंक',
        "पहले पैसे लेकर दुर्लभ आइटम का वादा",
        "असामान्य परमिशन माँगने वाले गेम ऐप",
        "स्किल गेम के नाम पर बेटिंग ऐप",
      ],
      doList: [
        "गेम आइटम सिर्फ़ ऑफ़िशियल स्टोर से खरीदें",
        "ज़रूरत हो तो पेरेंटल कंट्रोल इस्तेमाल करें",
        "गलत व्यवहार करने वालों की रिपोर्ट करें",
      ],
      dontList: [
        'गेम पासवर्ड किसी "बूस्टर" को न दें',
        "गैर-ऑफ़िशियल साइट पर कार्ड डिटेल न डालें",
        'अनजान लिंक से "हैक" डाउनलोड न करें',
      ],
      remember: "जो ऑफ़िशियल स्टोर में नहीं है, वह असल में मुफ़्त नहीं है।",
    },
    mock: {
      type: "sms",
      en: [
        {
          t: "FreeFire OFFICIAL: Get 5000 Diamonds FREE! Login with your game ID + password here: freefire-diamond-claim.xyz",
        },
      ],
      hi: [
        {
          t: "FreeFire OFFICIAL: 5000 डायमंड फ़्री पाएँ! अपनी गेम ID + पासवर्ड यहाँ डालें: freefire-diamond-claim.xyz",
        },
      ],
    },
  },

  {
    icon: "💼",
    en: {
      title: "Fake Jobs Scam",
      sub: "Pay to get hired? Never real.",
      watch:
        'A fake job skips the steps a real hiring process always has — no proper interview, offer arrives out of nowhere, often on WhatsApp. The clearest giveaway: you\'re asked to pay a "registration" or "training" fee before starting.',
      warnings: [
        "A job offer with no interview at all",
        'Requests for a "registration" or "training" fee',
        "A very high salary for very little work",
        "Offers that come only through WhatsApp or SMS",
      ],
      doList: [
        "Check the company's official website & contact details",
        "Apply only through trusted job portals",
        "Ask for the offer letter in writing",
      ],
      dontList: [
        'Pay money to "secure" a job',
        "Share OTPs or documents before checking the employer",
        "Trust job offers that only come by chat",
      ],
      remember: "A real employer never asks you to pay to get hired.",
    },
    hi: {
      title: "फ़र्ज़ी नौकरी घोटाला",
      sub: "नौकरी के लिए पैसे? कभी असली नहीं।",
      watch:
        'फ़र्ज़ी नौकरी में असली भर्ती के चरण नहीं होते — ठीक से इंटरव्यू नहीं, ऑफ़र अचानक, अक्सर WhatsApp पर। सबसे साफ़ संकेत: शुरू होने से पहले "पंजीकरण" या "ट्रेनिंग" फ़ीस माँगी जाती है।',
      warnings: [
        "बिना किसी इंटरव्यू के नौकरी का ऑफ़र",
        '"पंजीकरण" या "ट्रेनिंग" फ़ीस माँगना',
        "बहुत कम काम के लिए बहुत ज़्यादा सैलरी",
        "सिर्फ़ WhatsApp या SMS से आया ऑफ़र",
      ],
      doList: [
        "कंपनी की ऑफ़िशियल वेबसाइट व जानकारी जाँचें",
        "सिर्फ़ भरोसेमंद जॉब पोर्टल से अप्लाई करें",
        "ऑफ़र लेटर लिखित में माँगें",
      ],
      dontList: [
        'नौकरी "पक्की" करने के लिए पैसे न दें',
        "एम्प्लॉयर जाँचे बिना OTP या दस्तावेज़ न दें",
        "सिर्फ़ चैट से आए ऑफ़र पर भरोसा न करें",
      ],
      remember: "असली एम्प्लॉयर नौकरी देने के लिए कभी पैसे नहीं माँगता।",
    },
    mock: {
      type: "whatsapp",
      en: [
        {
          who: "them",
          t: "HR Team: You're SELECTED for Data Entry, Work from Home ₹35,000/month! Pay ₹1500 registration to confirm your slot today.",
        },
      ],
      hi: [
        {
          who: "them",
          t: "HR टीम: आप डेटा एंट्री, वर्क फ़्रॉम होम के लिए चुने गए हैं! ₹35,000/माह। आज ₹1500 पंजीकरण फ़ीस भरकर स्लॉट पक्का करें।",
        },
      ],
    },
  },

  {
    icon: "🌐",
    en: {
      title: "Safe Internet Usage",
      sub: "Not every site is what it claims",
      watch:
        "Pop-ups announcing a surprise prize, sites missing the padlock symbol, and free downloads of paid content are common ways malware reaches a device. Public Wi-Fi for banking adds another layer of risk.",
      warnings: [
        'Pop-ups saying "you\'ve won a prize"',
        "Using public Wi-Fi for banking or logins",
        "Websites without https or a padlock sign",
        "Pirated content sites hiding malware",
      ],
      doList: [
        "Use trusted, secure websites (look for https)",
        "Keep antivirus and apps updated",
        "Use school or home Wi-Fi for sensitive work",
      ],
      dontList: [
        "Download apps or software from unknown sources",
        "Ignore browser security warnings",
        "Use public Wi-Fi for banking",
      ],
      remember: "One safe click today prevents a big problem tomorrow.",
    },
    hi: {
      title: "इंटरनेट का सुरक्षित उपयोग",
      sub: "हर साइट वैसी नहीं जैसी दिखती",
      watch:
        "अचानक इनाम बताने वाले पॉप-अप, पैडलॉक चिन्ह न होना, पेड कंटेंट के मुफ़्त डाउनलोड — ये सब हानिकारक सॉफ़्टवेयर आने के आम तरीके हैं। बैंकिंग के लिए पब्लिक वाई-फ़ाई खतरा और बढ़ाता है।",
      warnings: [
        '"इनाम जीता" जैसे पॉप-अप',
        "बैंकिंग या लॉगिन के लिए पब्लिक वाई-फ़ाई",
        "https या पैडलॉक चिन्ह न होना",
        "पायरेटेड कंटेंट में छिपा मैलवेयर",
      ],
      doList: [
        "भरोसेमंद, सुरक्षित (https) वेबसाइट इस्तेमाल करें",
        "एंटीवायरस और ऐप अपडेट रखें",
        "ज़रूरी काम के लिए स्कूल/घर का वाई-फ़ाई इस्तेमाल करें",
      ],
      dontList: [
        "अनजान जगह से ऐप/सॉफ़्टवेयर डाउनलोड न करें",
        "सुरक्षा चेतावनी नज़रअंदाज़ न करें",
        "बैंकिंग के लिए पब्लिक वाई-फ़ाई न इस्तेमाल करें",
      ],
      remember: "आज का एक सुरक्षित क्लिक कल की बड़ी परेशानी से बचाता है।",
    },
    mock: {
      type: "email",
      en: {
        from: "rakshitkamboj2@gmail.com",
        subj: "🎁 YOU'VE WON! Claim your free iPhone 15",
        body: "Congratulations! Click below within 24 hours to claim your prize. Enter your card details to pay ₹49 delivery fee.",
      },
      hi: {
        from: "rohitrk.singh1920@gmail.com",
        subj: "🎁 आपने जीता! मुफ़्त iPhone 15 पाएँ",
        body: "बधाई हो! 24 घंटे में नीचे क्लिक करें। डिलीवरी फ़ीस ₹49 के लिए कार्ड डिटेल डालें।",
      },
    },
  },

  {
    icon: "📱",
    en: {
      title: "Social Media Safety",
      sub: "Not everyone online is who they claim",
      watch:
        "Be cautious of friend requests from strangers, especially if they quickly ask for photos, location, or personal details. It's a warning sign if someone asks you to keep the conversation secret from parents or teachers.",
      warnings: [
        "Friend requests from unknown profiles",
        "Requests for your photos or live location",
        "Messages asking you to keep secrets from adults",
        "Fake accounts copying friends or family",
      ],
      doList: [
        "Keep your profile private",
        "Think before you post — it stays online forever",
        "Tell a trusted adult about uncomfortable messages",
      ],
      dontList: [
        "Share your location, school, or home address publicly",
        "Accept friend requests from strangers",
        "Post personal information carelessly",
      ],
      remember: "Privacy settings are your first line of defence — use them.",
    },
    hi: {
      title: "सोशल मीडिया सुरक्षा",
      sub: "हर कोई प्रोफ़ाइल जैसा नहीं होता",
      watch:
        "अनजान लोगों की फ़्रेंड रिक्वेस्ट से सावधान रहें, खासकर अगर वे जल्दी फ़ोटो, लोकेशन या निजी जानकारी माँगें। बड़ों से बात छिपाने को कहना भी एक चेतावनी संकेत है।",
      warnings: [
        "अनजान प्रोफ़ाइल से फ़्रेंड रिक्वेस्ट",
        "फ़ोटो या लाइव लोकेशन माँगना",
        "बड़ों से बात छिपाने को कहना",
        "दोस्त/परिवार की नकली प्रोफ़ाइल",
      ],
      doList: [
        "प्रोफ़ाइल प्राइवेट रखें",
        "पोस्ट से पहले सोचें — यह हमेशा रहता है",
        "असहज मैसेज पर भरोसेमंद बड़े को बताएँ",
      ],
      dontList: [
        "लोकेशन/स्कूल/पता सार्वजनिक न करें",
        "अजनबियों की रिक्वेस्ट स्वीकार न करें",
        "बिना सोचे निजी जानकारी पोस्ट न करें",
      ],
      remember: "प्राइवेसी सेटिंग आपकी पहली सुरक्षा है — इसका इस्तेमाल करें।",
    },
    mock: {
      type: "whatsapp",
      en: [
        {
          who: "them",
          t: "Hey! I saw your profile, you're so pretty 😍 Can you send me your location? And maybe a few more pics just for me? Let's keep this between us.",
        },
      ],
      hi: [
        {
          who: "them",
          t: "हे! तुम्हारी प्रोफ़ाइल देखी, बहुत प्यारी हो 😍 अपनी लोकेशन भेजोगी? और कुछ और फ़ोटो सिर्फ़ मेरे लिए? यह हमारे बीच ही रहे।",
        },
      ],
    },
  },

  {
    icon: "🔑",
    en: {
      title: "Password Security",
      sub: "Your first and easiest defence",
      watch:
        'Most password theft doesn\'t involve clever hacking — it comes from a password being guessed, reused, or given away. Be alert to messages asking you to "confirm" your password or to turn off two-factor authentication.',
      warnings: [
        "Anyone asking you to switch off two-factor authentication",
        'Messages asking you to "confirm" your password',
        "Using the same password for many accounts",
      ],
      doList: [
        "Use a long password with letters, numbers & symbols",
        "Turn on two-factor authentication (2FA)",
        "Use a different password for every account",
      ],
      dontList: [
        "Share your password with anyone, even friends",
        "Use your birthday or name as a password",
        "Save passwords on shared or public devices",
      ],
      remember: "Your password is like your house key — never hand out a copy.",
    },
    hi: {
      title: "पासवर्ड सुरक्षा",
      sub: "आपकी पहली और सबसे आसान सुरक्षा",
      watch:
        'ज़्यादातर पासवर्ड चोरी चालाक हैकिंग से नहीं, अंदाज़े, दोहराव या बताने से होती है। पासवर्ड "कन्फ़र्म" करने या 2FA बंद करने को कहने वाले संदेशों से सतर्क रहें।',
      warnings: [
        "टू-फ़ैक्टर ऑथेंटिकेशन बंद करने को कहना",
        'पासवर्ड "कन्फ़र्म" करने को कहने वाले संदेश',
        "एक ही पासवर्ड कई अकाउंट में इस्तेमाल करना",
      ],
      doList: [
        "अक्षर, अंक और चिन्हों वाला लंबा पासवर्ड बनाएँ",
        "2FA चालू करें",
        "हर अकाउंट के लिए अलग पासवर्ड रखें",
      ],
      dontList: [
        "पासवर्ड किसी को न बताएँ, दोस्तों को भी नहीं",
        "जन्मदिन/नाम को पासवर्ड न बनाएँ",
        "साझा या पब्लिक डिवाइस पर पासवर्ड सेव न करें",
      ],
      remember: "आपका पासवर्ड घर की चाबी जैसा है — इसकी कॉपी किसी को न दें।",
    },
    mock: {
      type: "email",
      en: {
        from: "security@instagrarn-support.com",
        subj: "Confirm your password to avoid account suspension",
        body: "We detected unusual login activity. Please confirm your current password within 12 hours or your account will be permanently disabled.",
      },
      hi: {
        from: "security@instagrarn-support.com",
        subj: "अकाउंट सस्पेंड होने से बचने के लिए पासवर्ड कन्फ़र्म करें",
        body: "असामान्य लॉगिन गतिविधि मिली है। 12 घंटे में अपना पासवर्ड कन्फ़र्म करें वरना अकाउंट हमेशा के लिए बंद हो जाएगा।",
      },
    },
  },

  {
    icon: "💳",
    en: {
      title: "UPI & Digital Payment Safety",
      sub: "You only need a PIN to send, never to receive",
      watch:
        'The most common UPI scam relies on convincing you that you must enter your PIN to receive money — a PIN is only ever needed to send it. Watch for "collect requests" dressed as refunds and callers asking for screen-sharing.',
      warnings: [
        'A "collect request" disguised as a refund',
        "Unknown QR codes at shops or for deliveries",
        'Calls claiming to be your "bank" asking for your UPI PIN',
        'Requests to install a screen-sharing app during a "support" call',
      ],
      doList: [
        "Check every UPI request before you approve it",
        "Check the payee name before confirming",
        "Use only your bank's official app",
      ],
      dontList: [
        "Share your UPI PIN, OTP, or CVV with anyone",
        'Scan random QR codes to "receive" money',
        "Install screen-sharing apps for strangers",
      ],
      remember:
        "You never need your UPI PIN to receive money — only to send it.",
    },
    hi: {
      title: "UPI व डिजिटल भुगतान सुरक्षा",
      sub: "पिन सिर्फ़ भेजने के लिए, पाने के लिए कभी नहीं",
      watch:
        'सबसे आम UPI धोखाधड़ी यह यकीन दिलाती है कि पैसे पाने के लिए पिन डालना ज़रूरी है, जबकि पिन सिर्फ़ भेजने के लिए चाहिए। रिफ़ंड के नाम पर "कलेक्ट रिक्वेस्ट" और स्क्रीन-शेयरिंग माँगने वाली कॉल से सावधान रहें।',
      warnings: [
        'रिफ़ंड बताकर "कलेक्ट रिक्वेस्ट"',
        "दुकान या डिलीवरी पर अनजान QR कोड",
        '"बैंक" बताकर UPI पिन माँगने वाली कॉल',
        '"सपोर्ट" कॉल में स्क्रीन-शेयरिंग ऐप माँगना',
      ],
      doList: [
        "हर UPI रिक्वेस्ट स्वीकार करने से पहले जाँचें",
        "कन्फ़र्म करने से पहले पाने वाले का नाम देखें",
        "सिर्फ़ बैंक का ऑफ़िशियल ऐप इस्तेमाल करें",
      ],
      dontList: [
        "UPI पिन, OTP या CVV किसी को न बताएँ",
        'पैसे "पाने" के लिए अनजान QR कोड न स्कैन करें',
        "अजनबियों के लिए स्क्रीन-शेयरिंग ऐप न इंस्टॉल करें",
      ],
      remember:
        "पैसे पाने के लिए UPI पिन की ज़रूरत कभी नहीं होती — सिर्फ़ भेजने के लिए होती है।",
    },
    mock: {
      type: "sms",
      en: [
        {
          t: "PhonePe: You have a Collect Request of ₹1 from 'Cashback Refund Team'. Enter UPI PIN to RECEIVE ₹4,999 cashback.",
        },
      ],
      hi: [
        {
          t: "PhonePe: 'Cashback Refund Team' से ₹1 का कलेक्ट रिक्वेस्ट है। ₹4,999 कैशबैक पाने के लिए UPI पिन डालें।",
        },
      ],
    },
  },

  {
    icon: "🪪",
    en: {
      title: "Identity Theft",
      sub: "Your ID is as valuable as your money",
      watch:
        'Your Aadhaar, PAN and bank details can be used to pretend to be you. Be cautious of unsolicited requests for ID copies, transactions you don\'t recognise, and emails urging you to "verify" identity via a link.',
      warnings: [
        "Unwanted requests for your Aadhaar or PAN copy",
        "Transactions or accounts you don't recognise",
        'Emails asking you to "verify" your identity documents',
      ],
      doList: [
        "Share ID documents only when truly necessary",
        "Check your bank statements regularly",
        "Use masked Aadhaar where possible",
      ],
      dontList: [
        "Post photos of your ID card on social media",
        "Share OTPs linked to KYC updates",
        "Leave printed documents unattended",
      ],
      remember:
        "Your ID documents are as valuable as your money — protect them the same way.",
    },
    hi: {
      title: "पहचान की चोरी",
      sub: "आपकी ID पैसे जितनी ही कीमती है",
      watch:
        'आधार, पैन और बैंक डिटेल से कोई आपके नाम पर बन सकता है। बिना वजह ID कॉपी माँगने, न पहचाने जाने वाले लेन-देन, और लिंक से पहचान "वेरिफ़ाई" करने को कहने वाले ईमेल से सावधान रहें।',
      warnings: [
        "बिना वजह आधार/पैन कॉपी माँगना",
        "न पहचाने जाने वाले लेन-देन या अकाउंट",
        'पहचान "वेरिफ़ाई" करने को कहने वाले ईमेल',
      ],
      doList: [
        "ज़रूरी होने पर ही ID दस्तावेज़ शेयर करें",
        "बैंक स्टेटमेंट नियमित जाँचें",
        "मास्क्ड आधार का इस्तेमाल करें",
      ],
      dontList: [
        "सोशल मीडिया पर ID फ़ोटो न डालें",
        "KYC से जुड़ा OTP किसी को न बताएँ",
        "प्रिंट दस्तावेज़ इधर-उधर न छोड़ें",
      ],
      remember:
        "आपके पहचान दस्तावेज़ पैसे जितने ही कीमती हैं — इन्हें उसी तरह सुरक्षित रखें।",
    },
    mock: {
      type: "email",
      en: {
        from: "kyc-verify@uidai-portal.info",
        subj: "URGENT: Verify your Aadhaar to avoid deactivation",
        body: "Your Aadhaar linked services will be suspended. Click the link and upload a photo of your Aadhaar & PAN card to continue.",
      },
      hi: {
        from: "kyc-verify@uidai-portal.info",
        subj: "ज़रूरी: डीएक्टिवेशन से बचने के लिए आधार वेरिफ़ाई करें",
        body: "आपकी आधार से जुड़ी सेवाएँ बंद हो जाएँगी। लिंक पर क्लिक कर आधार और पैन कार्ड की फ़ोटो अपलोड करें।",
      },
    },
  },

  {
    icon: "👮",
    en: {
      title: "Digital Arrest Awareness",
      sub: "No police force arrests anyone over video call",
      watch:
        'A fraudster poses as a police or government officer on a video call, claims you\'re under investigation, and pressures you to stay on the call, avoid contacting anyone, and pay money immediately to avoid a fake "arrest."',
      warnings: [
        "A video call from someone in police/official uniform demanding money",
        "Threats of arrest if you don't pay right away",
        "Instructions to stay on camera and not contact anyone",
        "Pressure to keep the call secret from family",
      ],
      doList: [
        "Hang up and check directly with your local police station",
        "Tell a parent, teacher, or trusted adult right away",
        "Report it on 1930 or <a href=&quot;https://cybercrime.gov.in/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>cybercrime.gov.in</a>",
      ],
      dontList: [
        'Transfer money to "avoid arrest"',
        "Stay isolated on the call as instructed",
        "Believe that police or courts arrest people over video call",
      ],
      remember:
        "Real police never demand money over a video call. This is always a scam.",
    },
    hi: {
      title: '"डिजिटल अरेस्ट" जागरूकता',
      sub: "कोई पुलिस वीडियो कॉल पर गिरफ़्तार नहीं करती",
      watch:
        'धोखेबाज़ पुलिस/सरकारी अफ़सर बनकर वीडियो कॉल करता है, कहता है आप जाँच में हैं, और दबाव डालता है कि कॉल पर बने रहें, किसी से संपर्क न करें, और नकली "गिरफ़्तारी" से बचने के लिए तुरंत पैसे दें।',
      warnings: [
        "वर्दी में वीडियो कॉल करके पैसे माँगना",
        "तुरंत भुगतान न करने पर गिरफ़्तारी की धमकी",
        "कैमरे पर रहने और संपर्क न करने का निर्देश",
        "परिवार से कॉल छिपाने का दबाव",
      ],
      doList: [
        "कॉल काटें और सीधे थाने से जाँच करें",
        "तुरंत भरोसेमंद बड़े को बताएँ",
        "1930 या <a href=&quot;https://cybercrime.gov.in/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>cybercrime.gov.in</a> पर रिपोर्ट करें",
      ],
      dontList: [
        '"गिरफ़्तारी से बचने" पैसे न भेजें',
        "निर्देश अनुसार अकेले कॉल पर न रहें",
        "यह न मानें कि पुलिस वीडियो कॉल पर गिरफ़्तार करती है",
      ],
      remember:
        "असली पुलिस वीडियो कॉल पर कभी पैसे नहीं माँगती। यह हमेशा एक घोटाला है।",
    },
    mock: {
      type: "call",
      caller: { en: "CBI Officer Rakesh Sharma", hi: "CBI अफ़सर राकेश शर्मा" },
    },
  },

  {
    icon: "🔒",
    en: {
      title: "Data Privacy",
      sub: "If it's free, you're often the product",
      watch:
        "Apps rarely ask for exactly what they need — a flashlight app asking for contacts, or a quiz app asking for your camera, are signs the app is collecting more than it should.",
      warnings: [
        "Apps asking for permissions they don't need",
        'Long "terms & conditions" nobody reads',
        "Free apps that seem to profit only from your data",
      ],
      doList: [
        "Check app permissions before installing",
        "Review privacy settings on every new app",
        "Limit what you share with unfamiliar platforms",
      ],
      dontList: [
        "Accept every permission request by default",
        'Give personal data for "free" quizzes or surveys',
        "Ignore privacy policy warning signs",
      ],
      remember:
        "If a service is free, ask yourself what it's really collecting in return.",
    },
    hi: {
      title: "डेटा प्राइवेसी",
      sub: 'अगर मुफ़्त है, तो अक्सर आप ही "प्रोडक्ट" हैं',
      watch:
        "ऐप शायद ही उतनी परमिशन माँगते हैं जितनी ज़रूरत हो — टॉर्च ऐप का कॉन्टैक्ट माँगना, या क्विज़ ऐप का कैमरा माँगना, संकेत हैं कि ऐप ज़रूरत से ज़्यादा जानकारी इकट्ठा कर रहा है।",
      warnings: [
        "ज़रूरत से ज़्यादा परमिशन माँगने वाले ऐप",
        'लंबी "नियम व शर्तें" जो कोई नहीं पढ़ता',
        "सिर्फ़ डेटा से कमाने वाले मुफ़्त ऐप",
      ],
      doList: [
        "इंस्टॉल से पहले परमिशन जाँचें",
        "हर नए ऐप की प्राइवेसी सेटिंग देखें",
        "अनजान प्लेटफ़ॉर्म पर कम जानकारी शेयर करें",
      ],
      dontList: [
        "हर परमिशन बिना सोचे स्वीकार न करें",
        '"फ़्री" क्विज़/सर्वे में निजी जानकारी न दें',
        "प्राइवेसी चेतावनी नज़रअंदाज़ न करें",
      ],
      remember:
        "अगर कोई सेवा मुफ़्त है, तो सोचें कि वह बदले में क्या ले रही है।",
    },
    mock: {
      type: "sms",
      en: [
        {
          t: "App Permission: 'Simple Torch Light' is requesting access to Contacts, SMS, Camera, Microphone and Location. [Allow All]",
        },
      ],
      hi: [
        {
          t: "ऐप परमिशन: 'सिंपल टॉर्च लाइट' कॉन्टैक्ट, SMS, कैमरा, माइक और लोकेशन का एक्सेस माँग रहा है। [सभी को अनुमति दें]",
        },
      ],
    },
  },

  {
    icon: "🤝",
    en: {
      title: "Responsible Digital Behaviour",
      sub: "Kindness and honesty, online too",
      watch:
        "Being responsible online means noticing the pressure to act without thinking — messages urging you to forward something immediately, or anonymous accounts used to say things people wouldn't say to your face.",
      warnings: [
        "Pressure to share or forward unverified messages",
        "Group chats where teasing or bullying feels normal",
        "Anonymous accounts used to say hurtful things",
      ],
      doList: [
        "Think before you post or forward",
        "Respect others' privacy and opinions online",
        "Speak up safely against cyberbullying",
      ],
      dontList: [
        "Forward messages or news you haven't checked",
        "Say things online you wouldn't say in person",
        "Use fake accounts to tease or harass others",
      ],
      remember: "Kindness and honesty matter everywhere — online included.",
    },
    hi: {
      title: "ज़िम्मेदार डिजिटल व्यवहार",
      sub: "दयालुता और ईमानदारी, ऑनलाइन भी",
      watch:
        "ऑनलाइन ज़िम्मेदार होने का मतलब है बिना सोचे काम करने के दबाव को पहचानना — तुरंत फ़ॉरवर्ड करने पर ज़ोर, या गुमनाम अकाउंट से ऐसी बातें कहना जो आमने-सामने न कही जाएँ।",
      warnings: [
        "बिना जाँचे मैसेज आगे भेजने का दबाव",
        "मज़ाक उड़ाना जिस ग्रुप चैट में सामान्य लगे",
        "गुमनाम अकाउंट से बुरी बातें कहना",
      ],
      doList: [
        "पोस्ट/फ़ॉरवर्ड करने से पहले सोचें",
        "दूसरों की प्राइवेसी और राय का सम्मान करें",
        "साइबरबुलिंग के खिलाफ़ सुरक्षित तरीके से आवाज़ उठाएँ",
      ],
      dontList: [
        "बिना जाँचे मैसेज/खबर आगे न भेजें",
        "आमने-सामने न कही जाने वाली बात ऑनलाइन न कहें",
        "किसी को तंग करने नकली अकाउंट न बनाएँ",
      ],
      remember: "दयालुता और ईमानदारी हर जगह मायने रखती है — ऑनलाइन भी।",
    },
    mock: {
      type: "whatsapp",
      en: [
        {
          who: "them",
          t: "🚨 FORWARD THIS TO 10 GROUPS NOW or WhatsApp will delete your account tonight! Also — did you see what she posted lol, send it to everyone 😂",
        },
      ],
      hi: [
        {
          who: "them",
          t: "🚨 अभी 10 ग्रुप में फ़ॉरवर्ड करो वरना आज रात WhatsApp अकाउंट डिलीट कर देगा! और — उसने जो पोस्ट किया देखा? सबको भेजो 😂",
        },
      ],
    },
  },

  {
    icon: "📞",
    en: {
      title: "Reporting Cyber Crime",
      sub: "Act fast — speed matters most",
      watch:
        "If a cyber crime happens to you or someone you know, act fast. Reporting early — within the first few hours whenever possible — gives the best chance of getting money back and stopping more harm.",
      warnings: [
        "Delaying a report reduces the chance of recovering money",
        "Deleting evidence like screenshots or SMS before reporting",
        "Not noting the transaction ID / UTR number",
      ],
      doList: [
        "Call 1930 or file at <a href=&quot;https://cybercrime.gov.in/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>cybercrime.gov.in</a> immediately",
        "Save screenshots, transaction IDs, and phone numbers used",
        "Tell your bank to flag the transaction too",
      ],
      dontList: [
        'Wait to see if the money "comes back on its own"',
        "Delete the scam messages before reporting",
        "Feel embarrassed to report — it happens to careful people too",
      ],
      remember:
        "Report within the first few hours whenever possible — for financial fraud, speed matters most.",
    },
    hi: {
      title: "साइबर अपराध की रिपोर्ट",
      sub: "तुरंत कार्रवाई करें — तेज़ी सबसे ज़रूरी",
      watch:
        "अगर आपके या किसी जानने वाले के साथ साइबर अपराध हो, तो तुरंत कार्रवाई करें। जल्दी रिपोर्ट करने से — जब भी हो सके कुछ घंटों में — पैसा वापस मिलने और नुकसान रुकने की संभावना सबसे ज़्यादा होती है।",
      warnings: [
        "देरी से रिपोर्ट करने पर पैसा वापस मिलने की संभावना घटती है",
        "रिपोर्ट से पहले स्क्रीनशॉट/SMS मिटाना",
        "ट्रांज़ैक्शन ID / UTR नंबर नोट न करना",
      ],
      doList: [
        "तुरंत 1930 पर कॉल करें या <a href=&quot;https://cybercrime.gov.in/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>cybercrime.gov.in</a> पर दर्ज करें",
        "स्क्रीनशॉट, ट्रांज़ैक्शन ID और नंबर सुरक्षित रखें",
        "बैंक को भी लेन-देन फ़्लैग कराएँ",
      ],
      dontList: [
        'पैसा "खुद वापस आ जाए" इसका इंतज़ार न करें',
        "रिपोर्ट से पहले मैसेज न मिटाएँ",
        "रिपोर्ट करने में शर्म महसूस न करें",
      ],
      remember:
        "जब भी हो सके, कुछ घंटों के भीतर रिपोर्ट करें — वित्तीय धोखाधड़ी में तेज़ी सबसे ज़रूरी है।",
    },
    mock: {
      type: "sms",
      en: [
        {
          t: "Reminder: Screenshot this message. If you're ever scammed — call 1930 within the first hour, or report at <a href=&quot;https://cybercrime.gov.in/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>cybercrime.gov.in</a> with your UTR number.",
        },
      ],
      hi: [
        {
          t: "याद रखें: इस मैसेज का स्क्रीनशॉट लें। अगर कभी धोखा हो — पहले घंटे में 1930 पर कॉल करें, या UTR नंबर के साथ <a href=&quot;https://cybercrime.gov.in/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>cybercrime.gov.in</a> पर रिपोर्ट करें।",
        },
      ],
    },
  },
];

/* ============ REAL-LIFE FRAUD PATTERNS (new content, beyond booklet) ============ */
const REALCASES = [
  {
    id: "courier",
    badge: { en: "COURIER / CUSTOMS SCAM", hi: "कूरियर / कस्टम्स घोटाला" },
    title: {
      en: '"Your parcel has illegal items" call',
      hi: '"आपके पार्सल में गैरकानूनी सामान है" कॉल',
    },
    desc: {
      en: 'An automated or live caller claims to be FedEx/customs and says a parcel in your name contains drugs or fake passports — then transfers you to a fake "police officer" who moves the call to video and demands money to "clear your name." This is the same family of scam as Digital Arrest.',
      hi: 'एक ऑटोमेटेड या असली कॉलर खुद को FedEx/कस्टम्स बताकर कहता है कि आपके नाम के पार्सल में ड्रग्स या नकली पासपोर्ट हैं — फिर कॉल एक फ़र्ज़ी "पुलिस अफ़सर" को ट्रांसफ़र करता है जो वीडियो पर आकर "नाम साफ़ करने" के लिए पैसे माँगता है। यह डिजिटल अरेस्ट जैसा ही घोटाला है।',
    },
    signs: {
      en: [
        "Automated voice claiming to be a courier company",
        'Mentions of "your Aadhaar-linked parcel"',
        "Call transferred to someone claiming to be police",
        "Pressure to stay on the line and pay instantly",
      ],
      hi: [
        "कूरियर कंपनी होने का दावा करने वाली ऑटोमेटेड आवाज़",
        '"आपके आधार से जुड़ा पार्सल" जैसा दावा',
        "कॉल पुलिस बताने वाले को ट्रांसफ़र होना",
        "लाइन पर रहने और तुरंत भुगतान का दबाव",
      ],
    },
    mock: {
      type: "call",
      caller: {
        en: 'FedEx Automated / "Inspector" Verma',
        hi: 'FedEx ऑटोमेटेड / "इंस्पेक्टर" वर्मा',
      },
    },
    audio: {
      en: "This is an automated call from FedEx courier services. A parcel booked under your Aadhaar number contains five kilograms of illegal substances and fake passports, and has been seized by customs at Mumbai airport. Press 1 to speak to an officer, or your Aadhaar will be blocked within twenty four hours.",
      hi: "यह FedEx कूरियर सर्विसेज़ की एक ऑटोमेटेड कॉल है। आपके आधार नंबर पर बुक किया गया एक पार्सल मुंबई एयरपोर्ट पर कस्टम्स ने ज़ब्त किया है, जिसमें पाँच किलो गैरकानूनी पदार्थ और नकली पासपोर्ट मिले हैं। अफ़सर से बात करने के लिए 1 दबाएँ, वरना 24 घंटे में आपका आधार ब्लॉक हो जाएगा।",
    },
    foot: {
      en: "No courier company or customs department ever calls to demand payment — real seizures are handled entirely through written, verifiable government notices.",
      hi: "कोई भी कूरियर कंपनी या कस्टम्स विभाग कभी भुगतान माँगने के लिए कॉल नहीं करता — असली ज़ब्ती हमेशा लिखित, सत्यापन योग्य सरकारी नोटिस से होती है।",
    },
  },

  {
    id: "simswap",
    badge: { en: "SIM SWAP / KYC CALL", hi: "SIM स्वैप / KYC कॉल" },
    title: {
      en: '"Your SIM will be blocked" pressure call',
      hi: '"आपका SIM बंद हो जाएगा" दबाव वाली कॉल',
    },
    desc: {
      en: 'A caller poses as your telecom operator, warns your SIM will be deactivated for pending KYC, and asks you to share an OTP to "re-verify." That OTP is actually authorising a SIM swap — once done, the scammer receives your bank OTPs instead of you.',
      hi: 'कॉलर आपकी टेलीकॉम कंपनी बनकर कहता है कि पेंडिंग KYC के कारण SIM बंद हो जाएगा, और "फिर से वेरिफ़ाई" करने के लिए OTP माँगता है। असल में वह OTP SIM स्वैप को मंज़ूरी देता है — इसके बाद आपके बैंक OTP आपकी जगह धोखेबाज़ को मिलते हैं।',
    },
    signs: {
      en: [
        "Claims your SIM will be blocked within hours",
        'Asks you to read out an OTP to "complete KYC"',
        "Asks you to dial a code like 401# on your phone",
        "Your phone suddenly loses network for no reason",
      ],
      hi: [
        "SIM कुछ घंटों में बंद होने का दावा",
        "KYC पूरा करने के लिए OTP पढ़ने को कहना",
        "फ़ोन से 401# जैसा कोड डायल करने को कहना",
        "बिना वजह अचानक नेटवर्क चला जाना",
      ],
    },
    mock: {
      type: "call",
      caller: {
        en: '"Jio/Airtel Customer Care"',
        hi: '"Jio/Airtel कस्टमर केयर"',
      },
    },
    audio: {
      en: "Sir, this is your telecom operator's verification department. Your SIM card's KYC has expired and it will be permanently blocked in two hours. To keep your number active, please read out the six digit OTP you just received on your phone.",
      hi: "सर, यह आपकी टेलीकॉम कंपनी का वेरिफ़िकेशन विभाग है। आपके SIM कार्ड की KYC खत्म हो गई है और दो घंटे में यह हमेशा के लिए बंद हो जाएगा। नंबर चालू रखने के लिए, कृपया अभी आए छह अंकों का OTP पढ़कर बताएँ।",
    },
    foot: {
      en: "Telecom operators never call to ask you to read out an OTP — genuine KYC re-verification happens at a store with your ID, not over a phone call.",
      hi: "टेलीकॉम कंपनियाँ OTP पढ़ने के लिए कभी कॉल नहीं करतीं — असली KYC वेरिफ़िकेशन स्टोर पर आपकी ID के साथ होता है, फ़ोन कॉल पर नहीं।",
    },
  },

  {
    id: "deepfake",
    badge: { en: "AI VOICE CLONE SCAM", hi: "AI आवाज़ क्लोन घोटाला" },
    title: {
      en: "A relative's cloned voice, asking for money",
      hi: "किसी रिश्तेदार की क्लोन आवाज़, पैसे माँगते हुए",
    },
    desc: {
      en: "Scammers now use short public voice clips (from Reels, YouTube, or a single earlier call) to clone a family member's voice with AI, then call in panic pretending to be that person in an accident or emergency abroad, asking for urgent money transfer.",
      hi: "धोखेबाज़ अब किसी छोटे पब्लिक वीडियो (Reels, YouTube या पुरानी कॉल) से AI द्वारा परिवार के सदस्य की आवाज़ क्लोन करते हैं, फिर घबराई आवाज़ में कॉल कर विदेश में हादसे या इमरजेंसी का बहाना बनाकर तुरंत पैसे माँगते हैं।",
    },
    signs: {
      en: [
        "Caller sounds like a relative but the line is oddly clear/robotic",
        "Urgent request for money to an unfamiliar account",
        "Caller discourages you from calling them back or verifying",
        "Background noise designed to sound like a hospital or police station",
      ],
      hi: [
        "आवाज़ रिश्तेदार जैसी पर लाइन अजीब तरह साफ़/रोबोटिक",
        "अनजान अकाउंट में तुरंत पैसे भेजने का दबाव",
        "वापस कॉल कर जाँचने से रोकना",
        "हॉस्पिटल या थाने जैसी पृष्ठभूमि की आवाज़ें",
      ],
    },
    mock: {
      type: "call",
      caller: {
        en: '"Your son/daughter" (cloned voice)',
        hi: '"आपका बेटा/बेटी" (क्लोन आवाज़)',
      },
    },
    audio: {
      en: "Mom, please don't panic, I'm okay but I've been in an accident and the police won't release me until the hospital bill is paid. Please transfer twenty thousand rupees right now to this account, I'll explain everything later, please don't call anyone else.",
      hi: "मम्मी, घबराना मत, मैं ठीक हूँ पर एक एक्सीडेंट हो गया है और जब तक हॉस्पिटल का बिल नहीं भरा जाता पुलिस मुझे नहीं छोड़ेगी। कृपया अभी बीस हज़ार रुपये इस अकाउंट में भेज दो, बाद में सब बताऊँगा, अभी किसी और को कॉल मत करना।",
    },
    foot: {
      en: "Hang up and call the family member back on their known number, or video call them, before sending anything — a scammer who insists you must not verify is the biggest tell.",
      hi: "कुछ भेजने से पहले कॉल काटकर परिवार के सदस्य को उनके जाने-पहचाने नंबर पर कॉल करें, या वीडियो कॉल करें — जाँचने से रोकने की ज़िद ही सबसे बड़ा संकेत है।",
    },
  },

  {
    id: "customercare",
    badge: { en: "FAKE CUSTOMER CARE", hi: "फ़र्ज़ी कस्टमर केयर" },
    title: {
      en: 'The Google-searched "helpline" number',
      hi: 'गूगल पर मिला "हेल्पलाइन" नंबर',
    },
    desc: {
      en: 'Scammers plant fake customer care numbers for banks, airlines, and food-delivery apps in Google search results and reviews. A person searching for real help calls the fake number, and the "agent" asks them to install a screen-sharing app "to fix the issue" — then drains their account.',
      hi: 'धोखेबाज़ बैंक, एयरलाइन और फ़ूड-डिलीवरी ऐप के फ़र्ज़ी हेल्पलाइन नंबर गूगल सर्च और रिव्यू में डाल देते हैं। असली मदद खोजने वाला व्यक्ति फ़र्ज़ी नंबर पर कॉल करता है, और "एजेंट" समस्या "ठीक करने" के लिए स्क्रीन-शेयरिंग ऐप इंस्टॉल करवाकर अकाउंट खाली कर देता है।',
    },
    signs: {
      en: [
        "Number found via search, not the official app or card",
        "Agent asks you to install AnyDesk / TeamViewer / QuickSupport",
        'Asked to open your banking app "just to check" while sharing screen',
        'Refund request needs your UPI PIN to "process"',
      ],
      hi: [
        "नंबर सर्च से मिला, ऑफ़िशियल ऐप/कार्ड से नहीं",
        "AnyDesk / TeamViewer इंस्टॉल करने को कहना",
        "स्क्रीन शेयर करते हुए बैंकिंग ऐप खोलने को कहना",
        "रिफ़ंड के लिए UPI पिन माँगना",
      ],
    },
    mock: {
      type: "call",
      caller: { en: '"Bank Customer Support"', hi: '"बैंक कस्टमर सपोर्ट"' },
    },
    audio: {
      en: "Thank you for calling customer support. I understand your refund is stuck, I can fix this right now. Please download the AnyDesk app from the play store and share the nine digit code with me so I can process your refund instantly.",
      hi: "कस्टमर सपोर्ट पर कॉल करने के लिए धन्यवाद। समझ गया आपका रिफ़ंड अटका है, मैं अभी ठीक कर देता हूँ। कृपया Play Store से AnyDesk ऐप डाउनलोड करें और नौ अंकों का कोड मुझे बताएँ ताकि मैं तुरंत रिफ़ंड कर सकूँ।",
    },
    foot: {
      en: "Always get support numbers from the official app or the back of your card — never from a search engine — and never install remote-access apps for someone who called you.",
      hi: "सपोर्ट नंबर हमेशा ऑफ़िशियल ऐप या कार्ड के पीछे से लें — सर्च इंजन से कभी नहीं — और कॉल करने वाले के लिए रिमोट-एक्सेस ऐप कभी इंस्टॉल न करें।",
    },
  },

  {
    id: "investment",
    badge: { en: "TASK / TRADING SCAM", hi: "टास्क / ट्रेडिंग घोटाला" },
    title: {
      en: 'The Telegram "task-based income" group',
      hi: 'Telegram का "टास्क-आधारित कमाई" ग्रुप',
    },
    desc: {
      en: "You're added to a Telegram/WhatsApp group promising ₹500–2000/day for simple tasks like liking videos. Early small payouts build trust, then you're asked to deposit increasing amounts into a \"trading app\" to unlock bigger tasks — the app shows fake profits that can never be withdrawn.",
      hi: 'आपको एक Telegram/WhatsApp ग्रुप में जोड़ा जाता है जो वीडियो लाइक करने जैसे आसान टास्क के लिए ₹500–2000/दिन का वादा करता है। शुरुआती छोटे भुगतान भरोसा बनाते हैं, फिर बड़े टास्क खोलने के लिए एक "ट्रेडिंग ऐप" में बढ़ती रकम जमा करने को कहा जाता है — ऐप नकली मुनाफ़ा दिखाता है जो कभी निकाला नहीं जा सकता।',
    },
    signs: {
      en: [
        'Unsolicited invite to a "part-time income" group',
        "Small real payouts at first, to build trust",
        'Pressure to deposit more to "unlock" bigger returns',
        'Withdrawals always blocked by a new "fee" or "tax"',
      ],
      hi: [
        'बिना माँगे "पार्ट-टाइम कमाई" ग्रुप का इनवाइट',
        "भरोसा बनाने के लिए पहले छोटे असली भुगतान",
        'बड़ा रिटर्न "अनलॉक" करने के लिए ज़्यादा जमा का दबाव',
        'निकासी हमेशा नई "फ़ीस" या "टैक्स" से रुकना',
      ],
    },
    mock: {
      type: "whatsapp",
      en: [
        {
          who: "them",
          t: "Task 47 completed! You earned ₹850. To unlock the ₹5,000 VIP task set, deposit ₹3,000 to activate your account. Full amount + profit returns same day.",
        },
      ],
      hi: [
        {
          who: "them",
          t: "टास्क 47 पूरा हुआ! आपने ₹850 कमाए। ₹5,000 वाला VIP टास्क सेट अनलॉक करने के लिए, अकाउंट सक्रिय करने को ₹3,000 जमा करें। पूरी राशि + मुनाफ़ा उसी दिन वापस।",
        },
      ],
    },
    audio: {
      en: "Congratulations, your task group ranking has moved up! Members who deposit today get double task rewards for 24 hours only. Your upline mentor has already vouched for you, don't miss this slot.",
      hi: "बधाई हो, आपकी टास्क ग्रुप रैंकिंग बढ़ गई है! जो आज जमा करेंगे उन्हें 24 घंटे के लिए डबल टास्क इनाम मिलेगा। आपके अपलाइन मेंटर ने पहले ही आपकी गारंटी ली है, यह मौका न चूकें।",
    },
    foot: {
      en: "If withdrawing your own money requires paying another fee first, it isn't real profit — it's a deposit trap.",
      hi: "अगर अपना ही पैसा निकालने के लिए पहले फ़ीस देनी पड़े, तो वह असली मुनाफ़ा नहीं — यह एक जमा जाल है।",
    },
  },

  {
    id: "romance",
    badge: {
      en: "ROMANCE / MATRIMONIAL SCAM",
      hi: "रोमांस / मैट्रिमोनियल घोटाला",
    },
    title: {
      en: "The overseas match who needs urgent funds",
      hi: "विदेश में मिला जोड़ीदार जिसे तुरंत पैसे चाहिए",
    },
    desc: {
      en: 'A charming profile on a matrimonial or dating app — often claiming to work abroad — builds an emotional connection over weeks, then a sudden crisis appears (stuck at customs, medical emergency, a gift parcel needing "customs duty") that only money can solve.',
      hi: 'मैट्रिमोनियल या डेटिंग ऐप पर एक आकर्षक प्रोफ़ाइल — अक्सर विदेश में काम करने का दावा — हफ़्तों तक भावनात्मक जुड़ाव बनाती है, फिर अचानक एक संकट आता है (कस्टम्स में फँसना, मेडिकल इमरजेंसी, गिफ़्ट पार्सल के लिए "कस्टम ड्यूटी") जिसे सिर्फ़ पैसे से हल किया जा सकता है।',
    },
    signs: {
      en: [
        "Professes strong feelings very quickly",
        "Always has a reason to avoid a video call",
        "Claims to be stuck abroad, in the military, or on an oil rig",
        "A crisis appears that needs money urgently",
      ],
      hi: [
        "बहुत जल्दी गहरी भावनाएँ जताना",
        "वीडियो कॉल से बचने का हमेशा कोई बहाना",
        "विदेश, सेना या तेल रिग में फँसे होने का दावा",
        "अचानक पैसे की ज़रूरत वाला संकट आना",
      ],
    },
    mock: {
      type: "whatsapp",
      en: [
        {
          who: "them",
          t: "My love, I sent you a gift parcel with jewellery from Dubai but customs is holding it — I need you to pay the ₹18,500 clearance fee today or they'll destroy it. I would ask my family but I don't want them to worry.",
        },
      ],
      hi: [
        {
          who: "them",
          t: "मेरी जान, मैंने दुबई से गहनों का एक गिफ़्ट पार्सल भेजा था पर कस्टम्स ने रोक लिया है — आज ₹18,500 क्लियरेंस फ़ीस भरनी होगी वरना वे उसे नष्ट कर देंगे। परिवार से नहीं कहना चाहता, वे परेशान होंगे।",
        },
      ],
    },
    audio: {
      en: "My darling, I think about you every single day and I cannot wait to finally meet you in person once this contract abroad finishes. I feel so lucky to have found you. Please help me with the customs fee, I have no one else here I can trust with this.",
      hi: "मेरी जान, मैं हर दिन तुम्हारे बारे में सोचता/सोचती हूँ और विदेश का यह कॉन्ट्रैक्ट खत्म होते ही तुमसे मिलने का इंतज़ार है। तुम्हें पाकर बहुत खुश-नसीब महसूस करता/करती हूँ। कृपया कस्टम फ़ीस में मदद करो, यहाँ मेरे पास भरोसे लायक और कोई नहीं है।",
    },
    foot: {
      en: "Never send money to someone you haven't met in person, especially if they resist video calls — a genuine relationship can wait for verification.",
      hi: "जिससे कभी आमने-सामने न मिले हों, खासकर अगर वे वीडियो कॉल से बचें, उसे कभी पैसे न भेजें — असली रिश्ता जाँच का इंतज़ार कर सकता है।",
    },
  },

  {
    id: "electricity",
    badge: { en: "UTILITY BILL SCAM", hi: "बिजली बिल घोटाला" },
    title: {
      en: '"Your electricity will be cut tonight" SMS',
      hi: '"आज रात बिजली कट जाएगी" वाला SMS',
    },
    desc: {
      en: "A mass SMS claims your electricity connection will be disconnected tonight for a pending bill, urging you to call a number or tap a link to pay instantly. The link installs malware or leads to a fake payment page; the number connects to an agent who asks for a screen-sharing app.",
      hi: "एक मास SMS दावा करता है कि बकाया बिल के कारण आज रात बिजली कट जाएगी, और तुरंत भुगतान के लिए नंबर पर कॉल करने या लिंक दबाने को कहता है। लिंक मैलवेयर इंस्टॉल करता है या फ़र्ज़ी भुगतान पेज खोलता है; नंबर पर कॉल करने पर एजेंट स्क्रीन-शेयरिंग ऐप माँगता है।",
    },
    signs: {
      en: [
        'Message sent to a generic "Dear Customer", no account number',
        'Extreme urgency — disconnection "tonight" or "within 2 hours"',
        "A personal mobile number instead of the official complaint number",
        "Link doesn't go to your state electricity board's real domain",
      ],
      hi: [
        '"प्रिय ग्राहक" जैसा सामान्य संबोधन, कोई अकाउंट नंबर नहीं',
        'बहुत ज़्यादा जल्दी — "आज रात" या "2 घंटे में" कटौती',
        "ऑफ़िशियल शिकायत नंबर की बजाय निजी मोबाइल नंबर",
        "लिंक असली बिजली बोर्ड की वेबसाइट का नहीं",
      ],
    },
    mock: {
      type: "sms",
      en: [
        {
          t: "Dear Customer, your electricity service will be disconnected tonight at 9:30 PM due to last bill not updated. Please contact our officer immediately: +91 7XXXXXXXXX",
        },
      ],
      hi: [
        {
          t: "प्रिय ग्राहक, बकाया बिल अपडेट न होने के कारण आज रात 9:30 बजे आपकी बिजली सेवा काट दी जाएगी। तुरंत हमारे अधिकारी से संपर्क करें: +91 7XXXXXXXXX",
        },
      ],
    },
    audio: {
      en: "Sir this is your final notice, your electricity meter will be disconnected within two hours because your last payment failed to reflect. To avoid disconnection charges, please install the payment support app I'm sending you and complete the payment while I guide you on call.",
      hi: "सर यह आखिरी सूचना है, पिछला भुगतान अपडेट न होने के कारण दो घंटे में आपका मीटर काट दिया जाएगा। डिस्कनेक्शन चार्ज से बचने के लिए, मैं जो पेमेंट सपोर्ट ऐप भेज रहा हूँ उसे इंस्टॉल करें और कॉल पर मेरे बताए अनुसार भुगतान पूरा करें।",
    },
    foot: {
      en: "Check your bill and pay only through your state electricity board's official app or website — genuine boards don't threaten same-night disconnection by SMS.",
      hi: "अपना बिल जाँचें और सिर्फ़ राज्य बिजली बोर्ड के ऑफ़िशियल ऐप या वेबसाइट से भुगतान करें — असली बोर्ड SMS से उसी रात कटौती की धमकी नहीं देते।",
    },
  },

  {
    id: "olx",
    badge: { en: "ONLINE MARKETPLACE SCAM", hi: "ऑनलाइन मार्केटप्लेस घोटाला" },
    title: {
      en: "The too-good-to-be-true OLX/Marketplace deal",
      hi: "OLX/मार्केटप्लेस पर मिला बहुत सस्ता सौदा",
    },
    desc: {
      en: 'As a buyer, you find a heavily discounted phone or bike and the "seller" (often posing as army/defence personnel who "must sell urgently") asks for advance payment or a QR scan for a token amount — which is actually a request to send money, not receive it. As a seller, a "buyer" sends a fake payment screenshot and asks you to ship before checking your account.',
      hi: 'खरीदार के तौर पर, आपको बहुत सस्ता फ़ोन या बाइक मिलता है और "विक्रेता" (अक्सर सेना/डिफ़ेंस कर्मी बताकर जो "तुरंत बेचना" चाहता है) एडवांस भुगतान या टोकन राशि के लिए QR स्कैन माँगता है — जो असल में पैसे भेजने का अनुरोध है, पाने का नहीं। विक्रेता के तौर पर, "खरीदार" फ़र्ज़ी भुगतान स्क्रीनशॉट भेजकर अकाउंट जाँचे बिना डिलीवरी को कहता है।',
    },
    signs: {
      en: [
        "Price is far below the market rate",
        "Seller claims to be army/defence and can't meet in person",
        'Asks you to scan a QR code to "receive" a token payment',
        "Buyer sends a payment screenshot instead of a real bank credit",
      ],
      hi: [
        "कीमत बाज़ार भाव से बहुत कम",
        "विक्रेता खुद को सेना/डिफ़ेंस बताकर मिलने से बचे",
        'टोकन राशि "पाने" के लिए QR स्कैन कराना',
        "असली क्रेडिट की बजाय भुगतान का स्क्रीनशॉट भेजना",
      ],
    },
    mock: {
      type: "whatsapp",
      en: [
        {
          who: "them",
          t: "I'm an Army officer posted at the border, selling my bike urgently, only ₹15,000 (worth ₹80,000). Scan this QR and pay ₹500 token to confirm, I'll courier it via Army transport.",
        },
      ],
      hi: [
        {
          who: "them",
          t: "मैं बॉर्डर पर तैनात आर्मी अफ़सर हूँ, अपनी बाइक तुरंत बेच रहा हूँ, सिर्फ़ ₹15,000 (कीमत ₹80,000)। यह QR स्कैन कर ₹500 टोकन भरें, आर्मी ट्रांसपोर्ट से भेज दूँगा।",
        },
      ],
    },
    audio: {
      en: "Brother I trust you, I'm posted at a remote army base so I can't meet, but I need to sell today. Just scan the QR code I'm sending and enter your UPI pin to receive the five hundred rupee token, then I'll dispatch the bike through army courier tomorrow.",
      hi: "भाई मुझे तुम पर भरोसा है, मैं दूर आर्मी बेस पर तैनात हूँ इसलिए मिल नहीं सकता, पर आज ही बेचना है। मैं जो QR भेज रहा हूँ उसे स्कैन कर पाँच सौ रुपये टोकन पाने के लिए UPI पिन डालो, कल आर्मी कूरियर से बाइक भेज दूँगा।",
    },
    foot: {
      en: "You never scan a QR or enter a PIN to receive money — only to send it. Meet in a public place and inspect the item before any payment.",
      hi: "पैसे पाने के लिए कभी QR स्कैन या पिन नहीं डालना पड़ता — सिर्फ़ भेजने के लिए। किसी भी भुगतान से पहले सार्वजनिक जगह पर मिलें और सामान जाँचें।",
    },
  },

  {
    id: "newnumber",
    badge: { en: '"NEW NUMBER" SCAM', hi: '"नया नंबर" घोटाला' },
    title: {
      en: '"Hi Mom/Dad, this is my new number"',
      hi: '"मम्मी/पापा, यह मेरा नया नंबर है"',
    },
    desc: {
      en: 'An unknown number messages claiming to be your child or close relative on a "new number" after losing their phone, then within the same conversation asks you to urgently pay a bill or send money since they "can\'t access their bank app yet."',
      hi: 'एक अनजान नंबर से मैसेज आता है जो आपके बच्चे या करीबी रिश्तेदार का "नया नंबर" बताकर फ़ोन खो जाने की बात कहता है, फिर उसी बातचीत में तुरंत बिल भरने या पैसे भेजने को कहता है क्योंकि वह "अभी बैंक ऐप एक्सेस नहीं कर पा रहा।"',
    },
    signs: {
      en: [
        'Message starts with "I lost my phone, this is my new number"',
        "Avoids voice or video call, insists on chatting only",
        "Urgent request to pay a bill or transfer money on their behalf",
        "Slightly different tone or spelling than the real person",
      ],
      hi: [
        '"फ़ोन खो गया, यह नया नंबर है" से शुरुआत',
        "कॉल या वीडियो कॉल से बचकर सिर्फ़ चैट पर ज़ोर",
        "उनकी तरफ़ से बिल भरने/पैसे भेजने का तुरंत अनुरोध",
        "असली व्यक्ति से थोड़ा अलग लहजा या स्पेलिंग",
      ],
    },
    mock: {
      type: "whatsapp",
      en: [
        {
          who: "them",
          t: "Hi Mom, I lost my phone so this is my new number, save it. Also I need to pay a bill urgently but my banking app isn't working on this new phone yet — can you transfer ₹12,000 to this account, I'll pay you back tonight?",
        },
      ],
      hi: [
        {
          who: "them",
          t: "मम्मी, फ़ोन खो गया इसलिए यह नया नंबर है, सेव कर लो। और मुझे अभी एक बिल भरना है पर नए फ़ोन में बैंकिंग ऐप काम नहीं कर रहा — क्या इस अकाउंट में ₹12,000 भेज दोगी, आज रात लौटा दूँगा?",
        },
      ],
    },
    foot: {
      en: "Call the old, saved number of your relative to confirm before sending anything — a real family member won't mind you double-checking.",
      hi: "कुछ भेजने से पहले रिश्तेदार के पुराने, सेव किए नंबर पर कॉल कर पुष्टि करें — असली परिवार वाले को दोबारा जाँचने से कोई एतराज़ नहीं होगा।",
    },
  },

  {
    id: "sextortion",
    badge: { en: "BLACKMAIL / EXTORTION", hi: "ब्लैकमेल / जबरन वसूली" },
    title: {
      en: '"Pay or I\'ll share this" — video call blackmail',
      hi: '"पैसे दो वरना यह भेज दूँगा" — वीडियो कॉल ब्लैकमेल',
    },
    desc: {
      en: "A stranger on social media moves the chat to a video call, records or fakes an compromising screen capture, and then threatens to send it to your contacts or family unless you pay immediately. This targets people of every age and gender. Paying does not make it stop — it almost always leads to repeated demands.",
      hi: "सोशल मीडिया पर मिला अजनबी बातचीत को वीडियो कॉल पर ले जाता है, एक आपत्तिजनक स्क्रीन रिकॉर्ड करता है या नकली बना लेता है, फिर धमकी देता है कि पैसे न दिए तो आपके कॉन्टैक्ट व परिवार को भेज देगा। यह हर उम्र और लिंग के लोगों को निशाना बनाता है। पैसे देने से यह नहीं रुकता — लगभग हमेशा बार-बार माँग होती रहती है।",
    },
    signs: {
      en: [
        "A new online contact quickly pushes for a private video call",
        "The call is recorded or screenshotted without your knowledge",
        "Sudden threats and a demand for money within minutes",
        "Pressure to pay instantly using UPI or gift cards to stay silent",
      ],
      hi: [
        "नया ऑनलाइन संपर्क जल्दी ही निजी वीडियो कॉल पर ज़ोर दे",
        "आपकी जानकारी के बिना कॉल रिकॉर्ड या स्क्रीनशॉट होना",
        "कुछ ही मिनटों में धमकी और पैसे की माँग",
        "चुप रहने के लिए UPI या गिफ़्ट कार्ड से तुरंत भुगतान का दबाव",
      ],
    },
    mock: {
      type: "whatsapp",
      en: [
        {
          who: "them",
          t: "I recorded our call. Pay ₹20,000 in the next 30 minutes or this goes to everyone in your contact list and your family. Don't try to block me, I already have everything I need.",
        },
      ],
      hi: [
        {
          who: "them",
          t: "मैंने हमारी कॉल रिकॉर्ड कर ली है। अगले 30 मिनट में ₹20,000 भेजो वरना यह तुम्हारे सभी कॉन्टैक्ट और परिवार को भेज दूँगा। मुझे ब्लॉक करने की कोशिश मत करना, मेरे पास जो चाहिए वह पहले ही है।",
        },
      ],
    },
    audio: {
      en: "Listen carefully, I have the recording saved in three different places, so don't think deleting your account will help. Send the money now to this UPI ID and I'll delete everything. If you tell your family or the police, I'll send it immediately.",
      hi: "ध्यान से सुनो, मैंने रिकॉर्डिंग तीन अलग जगह सेव कर रखी है, तो अकाउंट डिलीट करने से कुछ नहीं होगा। अभी इस UPI ID पर पैसे भेजो, मैं सब डिलीट कर दूँगा। अगर परिवार या पुलिस को बताया, तो तुरंत भेज दूँगा।",
    },
    foot: {
      en: "Do not pay and do not panic — stop responding, block and report the account on the platform, save evidence (don't delete the chat), and report immediately at <a href=&quot;https://cybercrime.gov.in/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>cybercrime.gov.in</a> or call 1930. This is a crime committed against you; you will not get in trouble for reporting it.",
      hi: "भुगतान न करें और घबराएँ नहीं — जवाब देना बंद करें, अकाउंट को ब्लॉक व रिपोर्ट करें, सबूत सुरक्षित रखें (चैट डिलीट न करें), और तुरंत <a href=&quot;https://cybercrime.gov.in/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>cybercrime.gov.in</a> पर या 1930 पर रिपोर्ट करें। यह आपके खिलाफ़ हुआ अपराध है; रिपोर्ट करने से आपको कोई परेशानी नहीं होगी।",
    },
  },
];

/* ============ MYTH VS FACT ============ */
const MYTHS = [
  {
    myth: {
      en: "Only careless people fall for scams.",
      hi: "सिर्फ़ लापरवाह लोग ही धोखे में आते हैं।",
    },
    fact: {
      en: "Scammers use clever pressure tactics — anyone can be targeted, no matter how careful they usually are.",
      hi: "धोखेबाज़ बहुत चालाकी से दबाव बनाते हैं — कोई भी इसका शिकार बन सकता है, चाहे वह कितना भी सतर्क क्यों न हो।",
    },
  },
  {
    myth: {
      en: "Police can arrest you over a video call.",
      hi: "पुलिस वीडियो कॉल पर गिरफ़्तार कर सकती है।",
    },
    fact: {
      en: 'No Indian police force arrests anyone over a video call. "Digital arrest" is always a scam.',
      hi: 'भारत में कोई भी पुलिस वीडियो कॉल पर गिरफ़्तार नहीं करती। "डिजिटल अरेस्ट" हमेशा एक घोटाला है।',
    },
  },
  {
    myth: {
      en: "You need your UPI PIN to receive money.",
      hi: "पैसे पाने के लिए UPI पिन की ज़रूरत होती है।",
    },
    fact: {
      en: "You only ever need your UPI PIN to send money — never to receive it.",
      hi: "UPI पिन सिर्फ़ पैसे भेजने के लिए चाहिए होता है — पाने के लिए कभी नहीं।",
    },
  },
  {
    myth: {
      en: "A private social media account is completely safe.",
      hi: "प्राइवेट सोशल मीडिया अकाउंट पूरी तरह सुरक्षित होता है।",
    },
    fact: {
      en: "Private accounts reduce risk but don't remove it — screenshots and weak passwords can still expose your data.",
      hi: "प्राइवेट अकाउंट खतरा कम करता है पर पूरी तरह खत्म नहीं करता — स्क्रीनशॉट और कमज़ोर पासवर्ड से जानकारी लीक हो सकती है।",
    },
  },
  {
    myth: {
      en: "Free apps don't cost you anything.",
      hi: "मुफ़्त ऐप से कोई नुकसान नहीं होता।",
    },
    fact: {
      en: 'Many free apps earn money by collecting and selling your data — "free" often means you are the product.',
      hi: 'कई मुफ़्त ऐप आपका डेटा इकट्ठा करके और बेचकर कमाते हैं — "मुफ़्त" का मतलब अक्सर यह होता है कि आप ही "प्रोडक्ट" हैं।',
    },
  },
  {
    myth: {
      en: "AI voice clone scams are too advanced to be common yet.",
      hi: "AI आवाज़ क्लोन घोटाला अभी इतना आम नहीं होगा।",
    },
    fact: {
      en: "Voice cloning tools are cheap and easy to access today — always verify an urgent money request by calling back on a known number.",
      hi: "आवाज़ क्लोन करने के टूल आज सस्ते और आसानी से उपलब्ध हैं — पैसे की तुरंत ज़रूरत वाली किसी भी बात को जाने-पहचाने नंबर पर वापस कॉल करके ही सच मानें।",
    },
  },
];

/* ============ QUIZ ============ */
const QUIZ = [
  {
    q: {
      en: 'A caller says they\'re from your bank and asks for your UPI PIN to "reverse a wrong transaction." What do you do?',
      hi: 'एक कॉलर खुद को आपका बैंक बताकर "गलत लेन-देन वापस करने" के लिए UPI पिन माँगता है। आप क्या करेंगे?',
    },
    opts: [
      {
        en: "Share the PIN quickly so the transaction reverses",
        hi: "जल्दी पिन बता दें ताकि लेन-देन वापस हो जाए",
      },
      {
        en: "Refuse and hang up — banks never ask for your PIN on a call",
        hi: "मना करें और कॉल काटें — बैंक कभी कॉल पर पिन नहीं माँगता",
      },
      {
        en: "Give a fake PIN to test them",
        hi: "उन्हें परखने के लिए नकली पिन दें",
      },
    ],
    correct: 1,
    fb: {
      en: 'Correct — you only ever need your PIN to send money, never to receive or "reverse" it.',
      hi: 'सही — पिन सिर्फ़ पैसे भेजने के लिए चाहिए, पाने या "वापस" करने के लिए कभी नहीं।',
    },
  },
  {
    q: {
      en: "Someone in a police uniform video-calls you and says you'll be arrested unless you pay a fine now. Is this real?",
      hi: "पुलिस की वर्दी में कोई वीडियो कॉल करके कहता है कि अभी जुर्माना न भरा तो गिरफ़्तार कर लिया जाएगा। क्या यह सच है?",
    },
    opts: [
      {
        en: "Yes, better to pay to be safe",
        hi: "हाँ, सुरक्षित रहने के लिए भुगतान कर देना चाहिए",
      },
      {
        en: 'No — this is a "digital arrest" scam',
        hi: 'नहीं — यह "डिजिटल अरेस्ट" घोटाला है',
      },
    ],
    correct: 1,
    fb: {
      en: "Correct — no Indian police force ever arrests anyone over a video call.",
      hi: "सही — भारत में कोई भी पुलिस वीडियो कॉल पर गिरफ़्तार नहीं करती।",
    },
  },
  {
    q: {
      en: 'A gaming website offers "free diamonds" if you enter your game password there. Should you do it?',
      hi: 'एक गेमिंग वेबसाइट कहती है पासवर्ड डालने पर "फ़्री डायमंड" मिलेंगे। क्या करना चाहिए?',
    },
    opts: [
      {
        en: "No — never enter your game password outside the official app",
        hi: "नहीं — गेम पासवर्ड सिर्फ़ ऑफ़िशियल ऐप में डालें",
      },
      {
        en: "Yes, if the site looks professional",
        hi: "हाँ, अगर साइट प्रोफ़ेशनल दिखे",
      },
    ],
    correct: 0,
    fb: {
      en: "Correct — genuine in-game purchases only happen inside the official app or store.",
      hi: "सही — असली गेम खरीदारी हमेशा ऑफ़िशियल ऐप या स्टोर के अंदर ही होती है।",
    },
  },
  {
    q: {
      en: "Where should you report a cyber crime in India?",
      hi: "भारत में साइबर अपराध की रिपोर्ट कहाँ करें?",
    },
    opts: [
      {
        en: "Call 1930 or report at <a href=&quot;https://cybercrime.gov.in/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>cybercrime.gov.in</a>",
        hi: "1930 पर कॉल करें या <a href=&quot;https://cybercrime.gov.in/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>cybercrime.gov.in</a> पर रिपोर्ट करें",
      },
      { en: "Post about it on social media", hi: "सोशल मीडिया पर पोस्ट करें" },
      {
        en: "Wait a few weeks and see what happens",
        hi: "कुछ हफ़्ते इंतज़ार करें",
      },
    ],
    correct: 0,
    fb: {
      en: "Correct — and reporting fast, within the first hours, gives the best chance of freezing the money.",
      hi: "सही — और पहले कुछ घंटों में रिपोर्ट करने से पैसा रोकने की संभावना सबसे ज़्यादा होती है।",
    },
  },
  {
    q: {
      en: 'A job offer asks for a fee to "secure your position" before you start. Warning sign?',
      hi: 'नौकरी शुरू होने से पहले "पद पक्का" करने के लिए फ़ीस माँगी जाती है। यह चेतावनी संकेत है?',
    },
    opts: [
      {
        en: "True — a real employer never charges candidates to hire them",
        hi: "सही — असली एम्प्लॉयर नौकरी देने के लिए कभी पैसे नहीं माँगता",
      },
      {
        en: "False — this is normal for good jobs",
        hi: "गलत — अच्छी नौकरी में यह सामान्य है",
      },
    ],
    correct: 0,
    fb: {
      en: "Correct — a real employer pays you, you never pay them.",
      hi: "सही — असली एम्प्लॉयर आपको भुगतान करता है, आप उसे कभी नहीं।",
    },
  },
];

/* ============ PLEDGE ITEMS ============ */
const PLEDGE = [
  {
    en: "I will never share my passwords, OTPs, or UPI PIN with anyone.",
    hi: "मैं अपना पासवर्ड, OTP या UPI पिन किसी को नहीं बताऊँगा/बताऊँगी।",
  },
  {
    en: "I will think before I post, share, or forward anything online.",
    hi: "मैं ऑनलाइन कुछ भी पोस्ट, शेयर या फ़ॉरवर्ड करने से पहले सोचूँगा/सोचूँगी।",
  },
  {
    en: "I will check before I trust — links, callers, and offers included.",
    hi: "मैं भरोसा करने से पहले जाँचूँगा/जाँचूँगी — लिंक, कॉलर और ऑफ़र भी।",
  },
  {
    en: "I will tell a trusted adult if something online makes me uncomfortable.",
    hi: "अगर ऑनलाइन कुछ असहज लगे, तो मैं किसी भरोसेमंद बड़े को बताऊँगा/बताऊँगी।",
  },
  {
    en: "I will treat others online with the same respect I show in person.",
    hi: "मैं ऑनलाइन भी दूसरों के साथ वैसा ही सम्मान दिखाऊँगा/दिखाऊँगी जैसा आमने-सामने दिखाता/दिखाती हूँ।",
  },
  {
    en: "I will report cyber crime — to 1930 or <a href=&quot;https://cybercrime.gov.in/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>cybercrime.gov.in</a> — without hesitation.",
    hi: "मैं बिना झिझक साइबर अपराध की रिपोर्ट करूँगा/करूँगी — 1930 या <a href=&quot;https://cybercrime.gov.in/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>cybercrime.gov.in</a> पर।",
  },
];

/* ============ 13 RULES ============ */
const RULES = [
  {
    en: "If you are not sure, don't click. Check first, act later.",
    hi: "अगर पक्का न हो, तो क्लिक न करें। पहले जाँचें, फिर काम करें।",
  },
  {
    en: "A loan app that skips paperwork also skips accountability.",
    hi: "जो लोन ऐप कागज़ी काम नहीं माँगता, वह जवाबदेही से भी बचता है।",
  },
  {
    en: "If it's not in the official app store, it isn't really free.",
    hi: "जो ऑफ़िशियल स्टोर में नहीं है, वह असल में मुफ़्त नहीं है।",
  },
  {
    en: "A real employer never asks you to pay to get hired.",
    hi: "असली एम्प्लॉयर नौकरी देने के लिए कभी पैसे नहीं माँगता।",
  },
  {
    en: "One safe click today prevents a big problem tomorrow.",
    hi: "आज का एक सुरक्षित क्लिक कल की बड़ी परेशानी से बचाता है।",
  },
  {
    en: "Privacy settings are your first line of defence — use them.",
    hi: "प्राइवेसी सेटिंग आपकी पहली सुरक्षा है — इसका इस्तेमाल करें।",
  },
  {
    en: "Your password is like your house key — never hand out a copy.",
    hi: "आपका पासवर्ड घर की चाबी जैसा है — इसकी कॉपी किसी को न दें।",
  },
  {
    en: "You never need your UPI PIN to receive money — only to send it.",
    hi: "पैसे पाने के लिए UPI पिन की ज़रूरत कभी नहीं — सिर्फ़ भेजने के लिए होती है।",
  },
  {
    en: "Your ID documents are as valuable as your money — protect them the same way.",
    hi: "आपके पहचान दस्तावेज़ पैसे जितने ही कीमती हैं — इन्हें उसी तरह सुरक्षित रखें।",
  },
  {
    en: "Real police never demand money over a video call. Always a scam.",
    hi: "असली पुलिस वीडियो कॉल पर कभी पैसे नहीं माँगती। यह हमेशा एक घोटाला है।",
  },
  {
    en: "If a service is free, ask what it's really collecting in return.",
    hi: "अगर कोई सेवा मुफ़्त है, तो सोचें कि वह बदले में क्या ले रही है।",
  },
  {
    en: "Kindness and honesty matter everywhere — online included.",
    hi: "दयालुता और ईमानदारी हर जगह मायने रखती है — ऑनलाइन भी।",
  },
  {
    en: "Report within the first few hours. For financial fraud, speed matters most.",
    hi: "पहले कुछ घंटों में रिपोर्ट करें। वित्तीय धोखाधड़ी में तेज़ी सबसे ज़रूरी है।",
  },
];

/* ============ CHECKLIST & CONTACTS ============ */
const CHECKLIST = [
  {
    en: "Screenshots of messages, calls, or transactions",
    hi: "मैसेज, कॉल या लेन-देन के स्क्रीनशॉट",
  },
  {
    en: "Transaction ID / UTR number, if money was involved",
    hi: "अगर पैसा शामिल है, तो ट्रांज़ैक्शन ID / UTR नंबर",
  },
  {
    en: "The phone number, app, or website used by the scammer",
    hi: "धोखेबाज़ का फ़ोन नंबर, ऐप या वेबसाइट",
  },
  { en: "Date and time of the incident", hi: "घटना की तारीख़ और समय" },
];
const CONTACTS = [
  {
    label: {
      en: "National Cyber Crime Helpline",
      hi: "राष्ट्रीय साइबर क्राइम हेल्पलाइन",
    },
    val: "1930",
  },
  {
    label: {
      en: "Cyber Crime Reporting Portal",
      hi: "साइबर क्राइम रिपोर्टिंग पोर्टल",
    },
    val: "cybercrime.gov.in",
  },
  { label: { en: "Women's Helpline", hi: "महिला हेल्पलाइन" }, val: "1091" },
  { label: { en: "Child Helpline", hi: "चाइल्ड हेल्पलाइन" }, val: "1098" },
  { label: { en: "Police Emergency", hi: "पुलिस आपातकालीन" }, val: "112" },
];

/* ============ RENDER HELPERS ============ */
function bi(obj, prop) {
  // returns span pair for bilingual object with .en/.hi keys directly, or {en:{...}}
  return `<span class="en">${obj.en}</span><span class="hi">${obj.hi}</span>`;
}
function renderMock(mock) {
  if (!mock) return "";
  if (mock.type === "whatsapp") {
    const rowsEn = mock.en
      .map(
        (m) =>
          `<div class="bubble ${m.who === "them" ? "them" : "me"}">${m.who === "them" ? '<b class="mono" style="font-size:10px;display:block;margin-bottom:3px;">+91 9xxxx-xxxxx</b>' : ""}${m.t}</div>`,
      )
      .join("");
    const rowsHi = mock.hi
      .map(
        (m) =>
          `<div class="bubble ${m.who === "them" ? "them" : "me"}">${m.who === "them" ? '<b class="mono" style="font-size:10px;display:block;margin-bottom:3px;">+91 9xxxx-xxxxx</b>' : ""}${m.t}</div>`,
      )
      .join("");
    return `<div class="mockframe">
      <div class="stamp"><span class="en">SIMULATED</span><span class="hi">काल्पनिक</span></div>
      <div class="phone-mock whatsapp-mock">
        <div class="bar"><span>WhatsApp</span><span>9:41</span></div>
        <div class="chat"><span class="en block">${rowsEn}</span><span class="hi block">${rowsHi}</span></div>
      </div></div>`;
  }
  if (mock.type === "sms") {
    return `<div class="mockframe">
      <div class="stamp"><span class="en">SIMULATED</span><span class="hi">काल्पनिक</span></div>
      <div class="sms-mock">
        <div class="sbar"><span>+91 XXXXX-XXXXX</span><span class="mono">SMS</span></div>
        <div class="body"><span class="en block">${mock.en[0].t}</span><span class="hi block">${mock.hi[0].t}</span></div>
      </div></div>`;
  }
  if (mock.type === "email") {
    return `<div class="mockframe">
      <div class="stamp"><span class="en">SIMULATED</span><span class="hi">काल्पनिक</span></div>
      <div class="email-mock">
        <div class="ebar"><b>From:</b> <span class="mono">${mock.en.from}</span><br><b>Subj:</b> <span class="en">${mock.en.subj}</span><span class="hi">${mock.hi.subj}</span></div>
        <div class="ebody"><span class="en block">${mock.en.body}</span><span class="hi block">${mock.hi.body}</span></div>
      </div></div>`;
  }
  if (mock.type === "call") {
    const caller = mock.caller
      ? mock.caller
      : { en: "Unknown Caller", hi: "अनजान कॉलर" };
    return `<div class="mockframe">
      <div class="stamp"><span class="en">SIMULATED</span><span class="hi">काल्पनिक</span></div>
      <div class="sms-mock">
        <div class="sbar" ><span>📞 <span class="en">${caller.en || caller}</span><span class="hi">${caller.hi || caller}</span></span><span class="mono">00:14</span></div>
        <div class="body" style="text-align:center;color:#666;font-size:12.5px;">
          <span class="en">Incoming video call…</span><span class="hi">वीडियो कॉल आ रही है…</span>
        </div>
      </div></div>`;
  }
  return "";
}

function renderGlossary() {
  document.getElementById("glossary-grid").innerHTML = GLOSSARY.map(
    (g) => `
    <div class="gloss-card">
      <h4><span class="en">${g.en.t}</span><span class="hi">${g.hi.t}</span></h4>
      <p><span class="en">${g.en.d}</span><span class="hi">${g.hi.d}</span></p>
    </div>`,
  ).join("");
}

function renderTopics() {
  const list = document.getElementById("topics-list");
  list.innerHTML = TOPICS.map(
    (t, i) => `
    <div class="exhibit" id="exhibit-${i}">
      <div class="exhibit-tab"><span class="en">EXHIBIT ${String(i + 1).padStart(2, "0")} / 13</span><span class="hi">एग्ज़िबिट ${String(i + 1).padStart(2, "0")} / 13</span></div>
      <div class="exhibit-head" onclick="toggleExhibit(${i})">
        <div class="exhibit-icon">${t.icon}</div>
        <div>
          <h3><span class="en">${t.en.title}</span><span class="hi">${t.hi.title}</span></h3>
          <div class="sub"><span class="en">${t.en.sub}</span><span class="hi">${t.hi.sub}</span></div>
        </div>
        <div class="exhibit-toggle">+</div>
      </div>
      <div class="exhibit-body">
        <div class="exhibit-body-inner">
          <div class="watch-box">
            <b class="mono" style="font-size:11px;display:block;margin-bottom:6px;color:var(--ink-soft);"><span class="en">WATCH OUT FOR</span><span class="hi">सावधान रहें</span></b>
            <span class="en">${t.en.watch}</span><span class="hi">${t.hi.watch}</span>
          </div>
          <ul class="warn-list">
            ${t.en.warnings.map((w, wi) => `<li><span class="en">${w}</span><span class="hi">${t.hi.warnings[wi]}</span></li>`).join("")}
          </ul>
          <div class="exhibit-visual-label"><span class="en">What it might look like</span><span class="hi">यह ऐसा दिख सकता है</span></div>
          ${renderMock(t.mock)}
          <div class="doDont">
            <div class="col do">
              <h5><span class="en">Do</span><span class="hi">करें</span></h5>
              <ul>${t.en.doList.map((d, di) => `<li><span class="en">${d}</span><span class="hi">${t.hi.doList[di]}</span></li>`).join("")}</ul>
            </div>
            <div class="col dont">
              <h5><span class="en">Don't</span><span class="hi">न करें</span></h5>
              <ul>${t.en.dontList.map((d, di) => `<li><span class="en">${d}</span><span class="hi">${t.hi.dontList[di]}</span></li>`).join("")}</ul>
            </div>
          </div>
          <div class="remember">
            <b><span class="en">REMEMBER</span><span class="hi">याद रखें</span></b>
            <span class="en">${t.en.remember}</span><span class="hi">${t.hi.remember}</span>
          </div>
        </div>
      </div>
    </div>`,
  ).join("");
}
function toggleExhibit(i) {
  document.getElementById("exhibit-" + i).classList.toggle("open");
}

function renderRealcases() {
  document.getElementById("realcases-grid").innerHTML = REALCASES.map(
    (c, i) => {
      const audio = c.audio || { en: c.desc.en, hi: c.desc.hi };
      return `
    <div class="rl-card">
      <div class="rl-top">
        <span class="rl-badge"><span class="en">${c.badge.en}</span><span class="hi">${c.badge.hi}</span></span>
        <h4><span class="en">${c.title.en}</span><span class="hi">${c.title.hi}</span></h4>
      </div>
      <p class="desc"><span class="en">${c.desc.en}</span><span class="hi">${c.desc.hi}</span></p>
      ${c.mock.type === "whatsapp" ? `<div style="margin:0 20px 14px;">${renderMock(c.mock)}</div>` : c.mock.type === "call" ? `<div style="margin:0 20px 14px;max-width:280px;">${renderMock(c.mock)}</div>` : c.mock.type === "sms" ? `<div style="margin:0 20px 14px;max-width:280px;">${renderMock(c.mock)}</div>` : ""}
      <ul class="rl-signs">${c.signs.en.map((s, si) => `<li><span class="en">${s}</span><span class="hi">${c.signs.hi[si]}</span></li>`).join("")}</ul>
      <div class="rl-audio">
        <div class="rl-audio-head">
          <button class="play-btn" id="play-${c.id}" onclick="playScam('${c.id}')">▶</button>
          <div>
            <div class="rl-audio-title"><span class="en">Hear what this ${c.mock.type === "call" ? "call" : "message"} sounds like</span><span class="hi">यह ${c.mock.type === "call" ? "कॉल" : "मैसेज"} कैसा सुनाई देता है</span></div>
            <div class="rl-audio-sub"><span class="en">Synthetic voice · dramatised transcript, not a real recording</span><span class="hi">सिंथेटिक आवाज़ · नाटकीय स्क्रिप्ट, असली रिकॉर्डिंग नहीं</span></div>
          </div>
        </div>
        <div class="transcript" id="transcript-${c.id}">
          <span class="en">"${audio.en}"</span><span class="hi">"${audio.hi}"</span>
        </div>
      </div>
      <div class="rl-foot"><span class="en">${c.foot.en}</span><span class="hi">${c.foot.hi}</span></div>
    </div>`;
    },
  ).join("");
}
function renderMockInline(mock) {
  const rowsEn = mock.en
    .map(
      (m) =>
        `<div class="bubble them"><b class="mono" style="font-size:10px;display:block;margin-bottom:3px;">+91 9xxxx-xxxxx</b>${m.t}</div>`,
    )
    .join("");
  const rowsHi = mock.hi
    .map(
      (m) =>
        `<div class="bubble them"><b class="mono" style="font-size:10px;display:block;margin-bottom:3px;">+91 9xxxx-xxxxx</b>${m.t}</div>`,
    )
    .join("");
  return `<div style="margin:0 20px 14px;position:relative;">
    <div class="stamp" style="position:absolute;top:6px;right:2px;">SIM</div>
    <div class="phone-mock whatsapp-mock" style="max-width:260px;">
      <div class="bar"><span>WhatsApp</span><span>9:41</span></div>
      <div class="chat"><span class="en block">${rowsEn}</span><span class="hi block">${rowsHi}</span></div>
    </div></div>`;
}

let currentAudio = null;
function playScam(id) {
  const c = REALCASES.find((x) => x.id === id);
  const btn = document.getElementById("play-" + id);
  const tr = document.getElementById("transcript-" + id);
  if (!("speechSynthesis" in window)) {
    tr.classList.add("show");
    return;
  }
  if (currentAudio === id && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    btn.classList.remove("playing");
    btn.textContent = "▶";
    currentAudio = null;
    return;
  }
  window.speechSynthesis.cancel();
  document.querySelectorAll(".play-btn").forEach((b) => {
    b.classList.remove("playing");
    b.textContent = "▶";
  });
  document
    .querySelectorAll(".transcript")
    .forEach((t) => t.classList.remove("show"));
  const lang = currentLang();
  const audio = c.audio || { en: c.desc.en, hi: c.desc.hi };
  const text = lang === "hi" ? audio.hi : audio.en;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang === "hi" ? "hi-IN" : "en-IN";
  utter.rate = 0.95;
  utter.onend = () => {
    btn.classList.remove("playing");
    btn.textContent = "▶";
    currentAudio = null;
  };
  utter.onerror = () => {
    btn.classList.remove("playing");
    btn.textContent = "▶";
    currentAudio = null;
  };
  window.speechSynthesis.speak(utter);
  btn.classList.add("playing");
  btn.textContent = "❚❚";
  tr.classList.add("show");
  currentAudio = id;
}

function renderMyths() {
  document.getElementById("myth-grid").innerHTML = MYTHS.map(
    (m) => `
    <div class="mf-card">
      <div class="mf-myth"><span class="mf-label"><span class="en">MYTH</span><span class="hi">भ्रम</span></span><p><span class="en">${m.myth.en}</span><span class="hi">${m.myth.hi}</span></p></div>
      <div class="mf-fact"><span class="mf-label"><span class="en">FACT</span><span class="hi">सच्चाई</span></span><p><span class="en">${m.fact.en}</span><span class="hi">${m.fact.hi}</span></p></div>
    </div>`,
  ).join("");
}

function renderRules() {
  document.getElementById("rules-grid").innerHTML = RULES.map(
    (r, i) => `
    <div class="rule-card">
      <div class="n mono">${String(i + 1).padStart(2, "0")}</div>
      <p><span class="en">${r.en}</span><span class="hi">${r.hi}</span></p>
    </div>`,
  ).join("");
}

function renderChecklist() {
  document.getElementById("checklist-items").innerHTML = CHECKLIST.map(
    (c) =>
      `<li><span class="en">${c.en}</span><span class="hi">${c.hi}</span></li>`,
  ).join("");
}
function renderContacts() {
  document.getElementById("contact-table").innerHTML = CONTACTS.map(
    (c) => `
    <tr><td><span class="en">${c.label.en}</span><span class="hi">${c.label.hi}</span></td><td class="num">${
      c.val === "cybercrime.gov.in"
        ? '<a class="contact-portal-link" href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">cybercrime.gov.in ↗</a>'
        : `<a class="copyable" href="tel:${c.val}" data-copy="${c.val}" title="Tap to call · click to copy">${c.val}</a>`
    }</td></tr>`,
  ).join("");
}
function renderPledgeItems() {
  const pledgeItems = document.getElementById("pledge-items");
  if (!pledgeItems) return;
  pledgeItems.innerHTML = PLEDGE.map(
    (p, i) => `
    <li><input type="checkbox" id="pl-${i}"><label for="pl-${i}"><span class="en">${p.en}</span><span class="hi">${p.hi}</span></label></li>`,
  ).join("");
}

/* ============ QUIZ LOGIC ============ */
let qIndex = 0,
  qScore = 0,
  qAnswered = false;
function renderQuiz() {
  const q = QUIZ[qIndex];
  const qb = document.getElementById("quiz-qbar");
  if (qb)
    qb.innerHTML = QUIZ.map(
      (_, k) =>
        `<i class="${k < qIndex ? "done" : k === qIndex ? "now" : ""}"></i>`,
    ).join("");
  document.getElementById("quiz-progress").innerHTML =
    `<span class="en">Question ${qIndex + 1} of ${QUIZ.length}</span><span class="hi">प्रश्न ${qIndex + 1} / ${QUIZ.length}</span>`;
  document.getElementById("quiz-q").innerHTML =
    `<span class="en">${q.q.en}</span><span class="hi">${q.q.hi}</span>`;
  document.getElementById("quiz-opts").innerHTML = q.opts
    .map(
      (o, i) => `
    <button class="quiz-opt" id="opt-${i}" onclick="answerQuiz(${i})"><span class="en">${o.en}</span><span class="hi">${o.hi}</span></button>`,
    )
    .join("");
  document.getElementById("quiz-feedback").className = "quiz-feedback";
  document.getElementById("quiz-feedback").innerHTML = "";
  document.getElementById("quiz-next").disabled = true;
  document.getElementById("quiz-score-live").innerHTML =
    `<span class="en">Score: ${qScore}</span><span class="hi">स्कोर: ${qScore}</span>`;
  qAnswered = false;
}
function answerQuiz(i) {
  if (qAnswered) return;
  qAnswered = true;
  const q = QUIZ[qIndex];
  document.querySelectorAll(".quiz-opt").forEach((b, bi) => {
    if (bi === q.correct) b.classList.add("correct");
    else if (bi === i) b.classList.add("wrong");
  });
  if (i === q.correct) qScore++;
  const fb = document.getElementById("quiz-feedback");
  fb.innerHTML = `<span class="en">${q.fb.en}</span><span class="hi">${q.fb.hi}</span>`;
  fb.classList.add("show");
  document.getElementById("quiz-next").disabled = false;
  document.getElementById("quiz-score-live").innerHTML =
    `<span class="en">Score: ${qScore}</span><span class="hi">स्कोर: ${qScore}</span>`;
}
function quizNext() {
  qIndex++;
  if (qIndex >= QUIZ.length) {
    document.getElementById("quiz-active").style.display = "none";
    document.getElementById("quiz-result").classList.add("show");
    document.getElementById("quiz-final-score").textContent =
      `${qScore}/${QUIZ.length}`;
    if (window.cmQuizDone) window.cmQuizDone(qScore, QUIZ.length);
    const msgEl = document.getElementById("quiz-result-msg");
    const good = qScore >= 4;
    msgEl.innerHTML = good
      ? `<span class="en">Sharp eyes — you're hard to trick. Share this with someone who needs it.</span><span class="hi">पैनी नज़र — आपको ठगना मुश्किल है। जिसे ज़रूरत हो उसे यह ज़रूर भेजें।</span>`
      : `<span class="en">Worth another look at the case files above — every topic has clear warning signs to remember.</span><span class="hi">ऊपर की केस फ़ाइलें दोबारा देखें — हर विषय में याद रखने लायक साफ़ चेतावनी संकेत हैं।</span>`;
    return;
  }
  renderQuiz();
}
function quizRestart() {
  qIndex = 0;
  qScore = 0;
  document.getElementById("quiz-active").style.display = "block";
  document.getElementById("quiz-result").classList.remove("show");
  renderQuiz();
}

/* ============ PLEDGE ============ */
function submitPledge() {
  const name = document.getElementById("pledge-name").value.trim();
  const checked = PLEDGE.every(
    (_, i) => document.getElementById("pl-" + i).checked,
  );
  const res = document.getElementById("pledge-result");
  const txt = document.getElementById("pledge-result-text");
  if (!checked) {
    txt.innerHTML = `<span class="en">Please tick every line above to sign the pledge.</span><span class="hi">शपथ पर हस्ताक्षर के लिए ऊपर हर पंक्ति टिक करें।</span>`;
    res.classList.add("show");
    res.style.background = "var(--danger-2)";
    return;
  }
  res.style.background = "var(--safe-2)";
  const displayName = name || (currentLang() === "hi" ? "आप" : "You");
  txt.innerHTML = `<span class="en">Thank you, ${displayName}. Keep the Emergency Contacts section handy, and share this site with someone who'd benefit.</span><span class="hi">धन्यवाद, ${displayName}। आपातकालीन संपर्क सेक्शन हाथ में रखें, और इसे उस व्यक्ति के साथ भी शेयर करें जिसे ज़रूरत हो।</span>`;
  res.classList.add("show");
}

/* ============ FILTER CHIPS (topics) ============ */
function renderFilters() {
  const cats = [{ key: "all", en: "All", hi: "सभी" }];
  document.getElementById("topic-filters").innerHTML =
    `<button class="chip active" onclick="scrollToTopics()"><span class="en">Browse all 13 →</span><span class="hi">सभी 13 देखें →</span></button>`;
}
function scrollToTopics() {
  document
    .getElementById("topics-list")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============ INIT ============ */
(function init() {
  let saved = "en";
  try {
    saved = localStorage.getItem("cybermitra-lang") || "en";
  } catch (e) {}
  setLang(saved);
  renderGlossary();
  renderTopics();
  renderRealcases();
  renderMyths();
  renderQuiz();
  renderPledgeItems();
  renderRules();
  renderChecklist();
  renderContacts();
  renderFilters();
})();
