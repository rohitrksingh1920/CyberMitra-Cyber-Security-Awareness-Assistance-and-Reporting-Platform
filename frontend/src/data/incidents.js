// Each incident has an icon plus fully separate English/Hindi content:
// label, sub, triage questions, prioritized steps (RED/ORANGE/GREEN), and precautions.
// `when` on a step refers to a question id — the step only shows if that question was answered "yes".

export const INCIDENTS = {
  phishing: {
    icon: "🎣",
    en: {
      label: "Clicked a phishing link", sub: "Suspicious link or attachment",
      questions: [
        { id: "pw", text: "Did you enter a password after clicking the link?" },
        { id: "bank", text: "Did you enter bank, card, or UPI information?" }
      ],
      steps: [
        { tag: "RED", title: "Stop interacting with the link", desc: "Close the tab. Don't enter more info or download anything from it." },
        { tag: "RED", title: "Change the exposed password now", desc: "Use a trusted device — not the one that may be compromised.", when: "pw" },
        { tag: "RED", title: "Call your bank or UPI provider", desc: "Ask them to watch or freeze the account if financial details were entered.", when: "bank" },
        { tag: "ORANGE", title: "Enable two-factor authentication", desc: "Add 2FA on the affected account and anywhere you reused the password." },
        { tag: "ORANGE", title: "Check recent account activity", desc: "Look for logins, messages, or purchases you don't recognize." },
        { tag: "GREEN", title: "Report the incident", desc: "File at cybercrime.gov.in and save the phishing URL as evidence." }
      ],
      precautions: [
        "Hover over links before clicking to preview the real URL",
        "Never enter a password after arriving via an SMS/email link",
        "Bookmark banking sites instead of searching for them each time",
        "Enable login alerts on your key accounts"
      ]
    },
    hi: {
      label: "फ़िशिंग लिंक पर क्लिक किया", sub: "संदिग्ध लिंक या अटैचमेंट",
      questions: [
        { id: "pw", text: "क्या आपने लिंक पर क्लिक करने के बाद पासवर्ड डाला?" },
        { id: "bank", text: "क्या आपने बैंक, कार्ड या UPI जानकारी डाली?" }
      ],
      steps: [
        { tag: "RED", title: "लिंक से तुरंत दूर हो जाएं", desc: "टैब बंद करें। इसमें और जानकारी न डालें और कुछ भी डाउनलोड न करें।" },
        { tag: "RED", title: "तुरंत पासवर्ड बदलें", desc: "किसी भरोसेमंद डिवाइस का उपयोग करें, उस डिवाइस का नहीं जो प्रभावित हो सकता है।", when: "pw" },
        { tag: "RED", title: "अपने बैंक या UPI प्रोवाइडर को कॉल करें", desc: "अगर वित्तीय जानकारी दी गई है तो खाते को फ्रीज़ करने के लिए कहें।", when: "bank" },
        { tag: "ORANGE", title: "टू-फैक्टर ऑथेंटिकेशन चालू करें", desc: "प्रभावित खाते और जहां भी पासवर्ड दोहराया गया हो वहां 2FA जोड़ें।" },
        { tag: "ORANGE", title: "हाल की गतिविधि जांचें", desc: "अनजान लॉगिन, संदेश या खरीदारी देखें।" },
        { tag: "GREEN", title: "घटना की रिपोर्ट करें", desc: "cybercrime.gov.in पर रिपोर्ट करें और फ़िशिंग URL को सबूत के रूप में सेव करें।" }
      ],
      precautions: [
        "क्लिक करने से पहले लिंक का असली URL देखें",
        "SMS/ईमेल लिंक से आने के बाद कभी पासवर्ड न डालें",
        "बैंकिंग साइट को हर बार खोजने के बजाय बुकमार्क करें",
        "अपने मुख्य खातों पर लॉगिन अलर्ट चालू रखें"
      ]
    }
  },
  whatsapp: {
    icon: "💬",
    en: {
      label: "WhatsApp was hacked", sub: "Lost access or strange activity",
      questions: [
        { id: "otp", text: "Did you share the 6-digit verification code with anyone?" },
        { id: "locked", text: "Are you currently locked out of your account?" }
      ],
      steps: [
        { tag: "RED", title: "Re-verify your number immediately", desc: "Reinstall WhatsApp and verify with your number to boot out the attacker's session." },
        { tag: "RED", title: "Never share the OTP again", desc: "WhatsApp support will never ask for it.", when: "otp" },
        { tag: "ORANGE", title: "Enable two-step verification", desc: "Settings → Account → Two-step verification, set a PIN only you know." },
        { tag: "ORANGE", title: "Warn your contacts", desc: "Post a status noting the compromise in case scam messages went out." },
        { tag: "GREEN", title: "Report to WhatsApp", desc: "Use in-app Report or email support@whatsapp.com." }
      ],
      precautions: [
        "Never share a verification code, even with someone claiming to be support",
        "Turn on two-step verification today, not after an incident",
        "Be wary of messages from known contacts asking for money — verify by call"
      ]
    },
    hi: {
      label: "व्हाट्सएप हैक हो गया", sub: "एक्सेस खोना या अजीब गतिविधि",
      questions: [
        { id: "otp", text: "क्या आपने 6-अंकों का वेरिफिकेशन कोड किसी के साथ साझा किया?" },
        { id: "locked", text: "क्या आप अभी अपने खाते से लॉक आउट हैं?" }
      ],
      steps: [
        { tag: "RED", title: "तुरंत अपना नंबर फिर से वेरीफाई करें", desc: "व्हाट्सएप फिर से इंस्टॉल करें और अपने नंबर से वेरीफाई करें ताकि हमलावर का सत्र समाप्त हो जाए।" },
        { tag: "RED", title: "OTP फिर कभी साझा न करें", desc: "व्हाट्सएप सपोर्ट कभी इसकी मांग नहीं करता।", when: "otp" },
        { tag: "ORANGE", title: "टू-स्टेप वेरिफिकेशन चालू करें", desc: "Settings → Account → Two-step verification में जाकर एक PIN सेट करें जो केवल आप जानते हों।" },
        { tag: "ORANGE", title: "अपने संपर्कों को सूचित करें", desc: "स्टेटस पर बताएं कि खाता प्रभावित हुआ है, अगर कोई धोखाधड़ी वाला संदेश भेजा गया हो।" },
        { tag: "GREEN", title: "व्हाट्सएप को रिपोर्ट करें", desc: "ऐप के अंदर Report का उपयोग करें या support@whatsapp.com पर ईमेल करें।" }
      ],
      precautions: [
        "वेरिफिकेशन कोड कभी साझा न करें, भले ही कोई सपोर्ट होने का दावा करे",
        "आज ही टू-स्टेप वेरिफिकेशन चालू करें",
        "पैसे मांगने वाले संदेशों को कॉल करके सत्यापित करें"
      ]
    }
  },
  instagram: {
    icon: "📸",
    en: {
      label: "Instagram compromised", sub: "Account taken over",
      questions: [
        { id: "email", text: "Was the linked email or phone number also changed?" },
        { id: "posts", text: "Are unfamiliar posts, DMs, or follows appearing?" }
      ],
      steps: [
        { tag: "RED", title: "Try to reset your password now", desc: "Use 'Forgot password' before the attacker changes your recovery details." },
        { tag: "RED", title: "Use Instagram's hacked-account flow", desc: "If email/phone was changed, use help.instagram.com/hacked.", when: "email" },
        { tag: "ORANGE", title: "Revoke active sessions", desc: "Settings → Security → Login activity, log out everywhere." },
        { tag: "ORANGE", title: "Review recent DMs and posts", desc: "Delete anything sent by the attacker and note what it said.", when: "posts" },
        { tag: "GREEN", title: "Report the account", desc: "File through Instagram's Help Centre and cybercrime.gov.in if impersonation followed." }
      ],
      precautions: [
        "Use an authenticator app for 2FA instead of SMS",
        "Don't reuse your Instagram password anywhere else",
        "Review connected third-party apps periodically"
      ]
    },
    hi: {
      label: "इंस्टाग्राम प्रभावित हुआ", sub: "खाते पर कब्ज़ा हो गया",
      questions: [
        { id: "email", text: "क्या जुड़ा हुआ ईमेल या फ़ोन नंबर भी बदल दिया गया?" },
        { id: "posts", text: "क्या अनजान पोस्ट, DM या फॉलो दिख रहे हैं?" }
      ],
      steps: [
        { tag: "RED", title: "तुरंत पासवर्ड रीसेट करने की कोशिश करें", desc: "हमलावर के रिकवरी विवरण बदलने से पहले 'Forgot password' का उपयोग करें।" },
        { tag: "RED", title: "इंस्टाग्राम का हैक्ड-अकाउंट फ्लो इस्तेमाल करें", desc: "अगर ईमेल/फ़ोन बदला गया है तो help.instagram.com/hacked का उपयोग करें।", when: "email" },
        { tag: "ORANGE", title: "सक्रिय सत्र हटाएं", desc: "Settings → Security → Login activity में जाकर हर जगह से लॉगआउट करें।" },
        { tag: "ORANGE", title: "हाल के DM और पोस्ट जांचें", desc: "हमलावर द्वारा भेजी गई चीज़ें हटाएं और नोट करें कि क्या कहा गया।", when: "posts" },
        { tag: "GREEN", title: "खाते की रिपोर्ट करें", desc: "इंस्टाग्राम हेल्प सेंटर और नकल होने पर cybercrime.gov.in पर रिपोर्ट करें।" }
      ],
      precautions: [
        "SMS की जगह ऑथेंटिकेटर ऐप से 2FA उपयोग करें",
        "इंस्टाग्राम पासवर्ड कहीं और दोबारा उपयोग न करें",
        "जुड़े हुए थर्ड-पार्टी ऐप्स को समय-समय पर जांचें"
      ]
    }
  },
  otp: {
    icon: "🔢",
    en: {
      label: "Someone knows my OTP", sub: "Code shared or intercepted",
      questions: [
        { id: "used", text: "Did a transaction or login already go through?" },
        { id: "which", text: "Was the OTP linked to a bank, UPI, or wallet app?" }
      ],
      steps: [
        { tag: "RED", title: "Call your bank's fraud line now", desc: "Ask them to block the card/UPI ID immediately.", when: "which" },
        { tag: "RED", title: "Dispute any transaction that went through", desc: "Report within the bank's fraud window (usually 24–72 hours).", when: "used" },
        { tag: "RED", title: "Change the account password", desc: "From a clean, trusted device." },
        { tag: "ORANGE", title: "Check statements for the last 48 hours", desc: "Look for small test transactions that often precede a larger one." },
        { tag: "GREEN", title: "Call 1930", desc: "India's cyber fraud helpline can help freeze funds still in transit." }
      ],
      precautions: [
        "No bank or company will ever call and ask for your OTP",
        "Set a low default UPI transaction limit",
        "Enable SMS/app transaction alerts on every account"
      ]
    },
    hi: {
      label: "किसी को मेरा OTP पता है", sub: "कोड साझा या इंटरसेप्ट हुआ",
      questions: [
        { id: "used", text: "क्या कोई लेनदेन या लॉगिन पहले ही हो चुका है?" },
        { id: "which", text: "क्या OTP बैंक, UPI या वॉलेट ऐप से जुड़ा था?" }
      ],
      steps: [
        { tag: "RED", title: "अपने बैंक की फ्रॉड लाइन पर तुरंत कॉल करें", desc: "कार्ड/UPI ID को तुरंत ब्लॉक करने के लिए कहें।", when: "which" },
        { tag: "RED", title: "हुए लेनदेन पर विवाद दर्ज करें", desc: "बैंक की फ्रॉड विंडो (आमतौर पर 24–72 घंटे) के भीतर रिपोर्ट करें।", when: "used" },
        { tag: "RED", title: "खाते का पासवर्ड बदलें", desc: "किसी साफ, भरोसेमंद डिवाइस से।" },
        { tag: "ORANGE", title: "पिछले 48 घंटों के स्टेटमेंट जांचें", desc: "छोटे टेस्ट लेनदेन देखें जो अक्सर बड़े लेनदेन से पहले होते हैं।" },
        { tag: "GREEN", title: "1930 पर कॉल करें", desc: "भारत की साइबर फ्रॉड हेल्पलाइन ट्रांज़िट में मौजूद पैसे को फ्रीज़ करने में मदद कर सकती है।" }
      ],
      precautions: [
        "कोई भी बैंक या कंपनी कभी OTP मांगने के लिए कॉल नहीं करती",
        "UPI लेनदेन की एक कम डिफ़ॉल्ट सीमा सेट करें",
        "हर खाते पर SMS/ऐप लेनदेन अलर्ट चालू रखें"
      ]
    }
  },
  scammed: {
    icon: "💸",
    en: {
      label: "I may have been scammed", sub: "Payment or investment scam",
      questions: [
        { id: "paid", text: "Did you already send money or share payment details?" },
        { id: "ongoing", text: "Is the scammer still contacting you?" }
      ],
      steps: [
        { tag: "RED", title: "Call 1930 right now", desc: "Funds are often recoverable only within the first few hours.", when: "paid" },
        { tag: "RED", title: "Screenshot everything before blocking", desc: "Save chats, numbers, and payment IDs.", when: "ongoing" },
        { tag: "RED", title: "Stop all further payments", desc: "A second 'processing fee' request is a major red flag." },
        { tag: "ORANGE", title: "Block the contact", desc: "Once evidence is saved, block the number, account, or email." },
        { tag: "GREEN", title: "File at cybercrime.gov.in", desc: "Use the Financial Fraud category and attach your evidence." }
      ],
      precautions: [
        "Legitimate investments never guarantee fixed high returns",
        "Verify a company's registration before paying anything",
        "Never pay a fee to 'release' winnings or a refund"
      ]
    },
    hi: {
      label: "मेरे साथ धोखाधड़ी हुई हो सकती है", sub: "भुगतान या निवेश घोटाला",
      questions: [
        { id: "paid", text: "क्या आपने पहले ही पैसे भेजे या भुगतान विवरण साझा किए?" },
        { id: "ongoing", text: "क्या धोखेबाज़ अभी भी आपसे संपर्क कर रहा है?" }
      ],
      steps: [
        { tag: "RED", title: "अभी 1930 पर कॉल करें", desc: "पैसा अक्सर केवल पहले कुछ घंटों में ही वापस मिल सकता है।", when: "paid" },
        { tag: "RED", title: "ब्लॉक करने से पहले सब कुछ स्क्रीनशॉट लें", desc: "चैट, नंबर और भुगतान ID सेव करें।", when: "ongoing" },
        { tag: "RED", title: "आगे किसी भी भुगतान को रोकें", desc: "दूसरी बार 'प्रोसेसिंग फीस' मांगना एक बड़ी चेतावनी है।" },
        { tag: "ORANGE", title: "संपर्क को ब्लॉक करें", desc: "सबूत सेव करने के बाद नंबर, खाता या ईमेल ब्लॉक करें।" },
        { tag: "GREEN", title: "cybercrime.gov.in पर रिपोर्ट करें", desc: "Financial Fraud श्रेणी का उपयोग करें और अपने सबूत जोड़ें।" }
      ],
      precautions: [
        "असली निवेश कभी निश्चित उच्च रिटर्न की गारंटी नहीं देते",
        "भुगतान करने से पहले कंपनी का पंजीकरण जांचें",
        "इनाम या रिफंड 'रिलीज़' करने के लिए कभी फीस न दें"
      ]
    }
  },
  email: {
    icon: "✉️",
    en: {
      label: "Email was hacked", sub: "Inbox access lost or misused",
      questions: [
        { id: "recovery", text: "Were recovery options (phone/backup email) changed?" },
        { id: "linked", text: "Is this email linked to your bank or key accounts?" }
      ],
      steps: [
        { tag: "RED", title: "Reset the password immediately", desc: "Act before the attacker changes it again." },
        { tag: "RED", title: "Use the provider's account-recovery form", desc: "Fastest way back in if recovery info was changed.", when: "recovery" },
        { tag: "RED", title: "Secure linked accounts next", desc: "Bank, shopping, and social logins tied to this email are now at risk.", when: "linked" },
        { tag: "ORANGE", title: "Check mail forwarding rules", desc: "Remove any silent forwarding rule you didn't create." },
        { tag: "GREEN", title: "Report and document", desc: "File at cybercrime.gov.in and note when access was lost." }
      ],
      precautions: [
        "Use a unique, strong password for your primary email",
        "Set a recovery phone/email you actually check",
        "Review forwarding and filter rules every few months"
      ]
    },
    hi: {
      label: "ईमेल हैक हो गया", sub: "इनबॉक्स एक्सेस खोना या दुरुपयोग",
      questions: [
        { id: "recovery", text: "क्या रिकवरी विकल्प (फ़ोन/बैकअप ईमेल) बदले गए?" },
        { id: "linked", text: "क्या यह ईमेल आपके बैंक या मुख्य खातों से जुड़ा है?" }
      ],
      steps: [
        { tag: "RED", title: "तुरंत पासवर्ड रीसेट करें", desc: "हमलावर के इसे फिर बदलने से पहले कार्रवाई करें।" },
        { tag: "RED", title: "प्रोवाइडर का अकाउंट-रिकवरी फॉर्म उपयोग करें", desc: "अगर रिकवरी जानकारी बदली गई हो तो यह सबसे तेज़ तरीका है।", when: "recovery" },
        { tag: "RED", title: "जुड़े हुए खातों को सुरक्षित करें", desc: "इस ईमेल से जुड़े बैंक, शॉपिंग और सोशल लॉगिन अब खतरे में हैं।", when: "linked" },
        { tag: "ORANGE", title: "मेल फॉरवर्डिंग नियम जांचें", desc: "कोई भी छिपा हुआ फॉरवर्डिंग नियम हटाएं जो आपने नहीं बनाया।" },
        { tag: "GREEN", title: "रिपोर्ट करें और दस्तावेज़ बनाएं", desc: "cybercrime.gov.in पर रिपोर्ट करें और नोट करें कि एक्सेस कब खोया।" }
      ],
      precautions: [
        "अपने मुख्य ईमेल के लिए एक अनूठा, मज़बूत पासवर्ड उपयोग करें",
        "एक रिकवरी फ़ोन/ईमेल सेट करें जिसे आप वाकई जांचते हों",
        "हर कुछ महीनों में फॉरवर्डिंग और फ़िल्टर नियम जांचें"
      ]
    }
  },
  malware: {
    icon: "🛑",
    en: {
      label: "Installed a suspicious app", sub: "Unknown app or file installed",
      questions: [
        { id: "perms", text: "Did the app request SMS, contacts, or accessibility permissions?" },
        { id: "banking", text: "Do you use banking apps on this device?" }
      ],
      steps: [
        { tag: "RED", title: "Disconnect from the internet", desc: "Airplane mode stops data leaving the device." },
        { tag: "RED", title: "Uninstall the suspicious app", desc: "Use Safe Mode if it resists removal." },
        { tag: "RED", title: "Change banking passwords from another device", desc: "Assume anything typed here may have been captured.", when: "banking" },
        { tag: "ORANGE", title: "Run a security scan", desc: "Use a reputable mobile security app." },
        { tag: "GREEN", title: "Report the app", desc: "Flag it on the app store and at cybercrime.gov.in if money was lost." }
      ],
      precautions: [
        "Only install apps from official stores",
        "Read permission requests — an SMS or accessibility ask is a red flag",
        "Keep your OS and apps updated"
      ]
    },
    hi: {
      label: "संदिग्ध ऐप इंस्टॉल किया", sub: "अनजान ऐप या फ़ाइल इंस्टॉल हुई",
      questions: [
        { id: "perms", text: "क्या ऐप ने SMS, संपर्क या एक्सेसिबिलिटी अनुमति मांगी?" },
        { id: "banking", text: "क्या आप इस डिवाइस पर बैंकिंग ऐप इस्तेमाल करते हैं?" }
      ],
      steps: [
        { tag: "RED", title: "इंटरनेट से डिस्कनेक्ट करें", desc: "एयरप्लेन मोड डेटा को डिवाइस से बाहर जाने से रोकता है।" },
        { tag: "RED", title: "संदिग्ध ऐप को अनइंस्टॉल करें", desc: "अगर यह हटने से मना करे तो Safe Mode का उपयोग करें।" },
        { tag: "RED", title: "दूसरे डिवाइस से बैंकिंग पासवर्ड बदलें", desc: "मान लें कि यहां टाइप की गई कोई भी चीज़ कैप्चर हो चुकी हो सकती है।", when: "banking" },
        { tag: "ORANGE", title: "सुरक्षा स्कैन चलाएं", desc: "किसी भरोसेमंद मोबाइल सिक्योरिटी ऐप का उपयोग करें।" },
        { tag: "GREEN", title: "ऐप की रिपोर्ट करें", desc: "ऐप स्टोर पर फ्लैग करें और पैसा गंवाने पर cybercrime.gov.in पर रिपोर्ट करें।" }
      ],
      precautions: [
        "केवल आधिकारिक स्टोर से ऐप इंस्टॉल करें",
        "अनुमति अनुरोध पढ़ें — SMS या एक्सेसिबिलिटी मांगना एक चेतावनी है",
        "अपना OS और ऐप अपडेट रखें"
      ]
    }
  },
  impersonation: {
    icon: "🎭",
    en: {
      label: "Someone is impersonating me", sub: "Fake profile using your identity",
      questions: [
        { id: "scamming", text: "Is the fake account contacting people you know for money?" },
        { id: "docs", text: "Do you have ID proof ready to submit?" }
      ],
      steps: [
        { tag: "RED", title: "Warn close contacts now", desc: "Stop the impersonator from scamming people close to you.", when: "scamming" },
        { tag: "RED", title: "Report impersonation to the platform", desc: "Use the 'pretending to be me' report flow." },
        { tag: "ORANGE", title: "Screenshot the fake profile", desc: "Capture the handle, photos used, and any messages sent." },
        { tag: "GREEN", title: "File at cybercrime.gov.in", desc: "Impersonation used for fraud or harassment is reportable." }
      ],
      precautions: [
        "Limit public photos an impersonator could reuse",
        "Set your friends/follower list to private where possible",
        "Google your name periodically to catch clones early"
      ]
    },
    hi: {
      label: "कोई मेरी नकल कर रहा है", sub: "आपकी पहचान का उपयोग कर नकली प्रोफ़ाइल",
      questions: [
        { id: "scamming", text: "क्या नकली खाता आपके परिचितों से पैसे के लिए संपर्क कर रहा है?" },
        { id: "docs", text: "क्या आपके पास सबमिट करने के लिए ID प्रूफ तैयार है?" }
      ],
      steps: [
        { tag: "RED", title: "अपने करीबी संपर्कों को तुरंत सूचित करें", desc: "नकलची को आपके करीबी लोगों को धोखा देने से रोकें।", when: "scamming" },
        { tag: "RED", title: "प्लेटफ़ॉर्म पर नकल की रिपोर्ट करें", desc: "'pretending to be me' रिपोर्ट विकल्प का उपयोग करें।" },
        { tag: "ORANGE", title: "नकली प्रोफ़ाइल का स्क्रीनशॉट लें", desc: "हैंडल, इस्तेमाल की गई तस्वीरें और भेजे गए संदेश कैप्चर करें।" },
        { tag: "GREEN", title: "cybercrime.gov.in पर रिपोर्ट करें", desc: "धोखाधड़ी या उत्पीड़न के लिए नकल की जाना रिपोर्ट करने योग्य है।" }
      ],
      precautions: [
        "सार्वजनिक तस्वीरें सीमित रखें जिन्हें नकलची दोबारा उपयोग कर सके",
        "जहां संभव हो, अपनी फ्रेंड/फॉलोअर लिस्ट प्राइवेट रखें",
        "क्लोन जल्दी पकड़ने के लिए समय-समय पर अपना नाम गूगल करें"
      ]
    }
  }
};

// Maps each incident key to the complaint category it would fall under (fraud / other)
export const CATEGORY_MAP = {
  fraud: ["scammed", "otp", "phishing"],
  other: ["phishing", "whatsapp", "instagram", "email", "malware", "impersonation"]
};
