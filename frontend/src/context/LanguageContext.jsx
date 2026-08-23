import { createContext, useContext, useState } from 'react';

// Static UI strings for every section, in English and Hindi.
const T = {
  en: {
    brandSub: "Cyber Crime Reporting & Emergency Response — modeled on India's NCRP",
    sosBtn: "🚨 SOS — Immediate Help",
    navHome: "Home", navComplaint: "Report a Complaint ▾", navTrack: "Track your Complaint",
    navSuspect: "Report & Check Suspect ▾", navSuspectCheck: "Check Suspect (mobile / email / URL)", navSuspectReport: "Report Suspect to Portal",
    navVol: "Cyber Volunteers", navLearn: "Learning Corner ▾", navTips: "Cyber Safety Tips", navFaq: "FAQ", navAdv: "Advisories",
    navContact: "Contact Us", navSos: "🚨 SOS", noticeLabel: "WHAT'S NEW",
    heroKicker: "Register a complaint", heroH1: "What kind of cyber crime are you reporting?",
    heroLead: "Choose a category to start a report. If you're in the middle of an active attack — accounts locked, money moving, OTP shared — use SOS instead for immediate steps.",
    sosKicker: "Emergency response", sosH2: "SOS — tell us what happened, right now",
    sosLead: "This is the fastest path on the portal. No forms first — get the immediate actions and precautions you need, then file your complaint once you're secure.",
    vitalsTitle: "Response Status", vitalsSignal: "SIGNAL: LIVE TRIAGE",
    vitalsUnresolved: "Unresolved", vitalsRecovering: "Recovering", vitalsStable: "Stable",
    planHeading: "Your prioritized action plan", recoveryTitle: "Recovery Score",
    recoveryDesc: "Check off each action as you complete it — your vitals monitor stabilizes as your score climbs.",
    precautionHeading: "Precautions to prevent this happening again",
    fileComplaintBtn: "File this as a complaint →", viewContactsBtn: "View emergency contacts",
    selectedIncident: "Selected incident", yes: "YES", no: "NO", showPlan: "Show my response plan →",
    trackKicker: "Track your complaint", trackH2: "Check the status of a report you filed",
    trackLead: "Enter the reference number you received after filing. (Demo data — only complaints filed in this session are trackable.)",
    trackBtn: "Track status", trackPlaceholder: "CSDEMO-284915",
    stages: ["Filed", "Under Review", "Assigned", "Action Taken"],
    trackFound: (ref, rec) => `Reference ${ref} — category: ${rec.categoryLabel}. Filed at ${rec.time} (this session, demo data).`,
    trackNotFound: (ref) => `No demo record found for "${ref}". File a report above first, or this may be a reference from a previous session (demo data isn't saved after reload).`,
    suspectKicker: "Report & check suspect", suspectH2: "Search or report a suspicious identifier",
    suspectLead: "Check a mobile number, email, or link against a demo flagged-identifier list, or report one for others.",
    tabCheck: "Check Suspect", tabReport: "Report Suspect",
    checkPlaceholder: "Enter a phone number, email, or URL", searchBtn: "Search",
    suspectNote: "Demo dataset only, for illustration. For real verification, use I4C's Suspect Repository at cybercrime.gov.in.",
    flaggedMsg: "⚠ Flagged in demo dataset. This identifier matches a pattern reported by others. Do not share OTPs, payments, or personal info with it.",
    cleanMsg: "No match in this demo dataset. That doesn't guarantee it's safe — the real Suspect Repository covers far more reports.",
    repTypeOptions: ["Phone number", "Email address", "Website / URL", "WhatsApp / Telegram handle", "Social media profile"],
    identifierType: "Identifier type",
    repValueLabel: "Identifier value", repValuePlaceholder: "e.g. +91XXXXXXXXXX or suspicious-site.com",
    repReasonLabel: "Why is it suspicious?", repReasonPlaceholder: "Describe what happened",
    repSubmitBtn: "Submit report",
    repAckTitle: "Suspect report submitted (demo)",
    repAckDesc: (type, value, id) => <>{type}: <b>{value}</b> logged for this session under reference <b>{id}</b>.</>,
    repAckNote: "For a real report, use I4C's Report Suspect facility at cybercrime.gov.in.",
    volKicker: "Cyber volunteers", volH2: "Be part of a cyber-safe community", volLead: "Volunteers help flag unlawful content and support awareness efforts in their region.",
    tipsKicker: "Learning corner", tipsH2: "Cyber safety tips", tipsLead: "Small habits that close most of the doors attackers rely on.",
    advKicker: "Advisories", advH2: "Recent-style advisories (demo)", advLead: "Format modeled on the portal's Daily Digest — illustrative content for this project.",
    faqKicker: "FAQ", faqH2: "Common questions",
    contKicker: "Emergency contacts", contH2: "Real, official reporting resources", contLead: "These are genuine India-wide channels — use them for anything this project can't actually process.",
    fab: "🚨 SOS",
    footDesc: "A personal cybersecurity project — a reporting-and-response experience modeled on India's National Cyber Crime Reporting Portal, built with an emergency SOS guide at its core.",
    footCol1: "Report", footL2: "Financial Fraud", footL3: "Other Cyber Crime",
    footCol2: "Resources", footL4: "Safety Tips", footL5: "FAQ", footL6: "Track Complaint",
    footCol3: "Get Help", footL7: "SOS Emergency Guide", footL8: "Official Contacts", footL9: "Cyber Volunteers",
    footBottom: "Personal project, not affiliated with the Government of India · For real complaints visit cybercrime.gov.in or call 1930",
    riskLabels: { HIGH: "HIGH", MEDIUM: "MEDIUM", LOW: "LOW" },
    riskCopy: {
      HIGH: "Your credentials or funds may be directly exposed. Work the RED items first, right now.",
      MEDIUM: "Some exposure — close it out before it escalates. Start at the top.",
      LOW: "Limited exposure so far. Still worth locking down the basics below."
    },
    riskLabelPrefix: "Risk level",
    complaintTitle: "File a report (demo)", nameLabel: "Full name", mobileLabel: "Mobile number",
    descLabel: "What happened?", descPlaceholder: "Brief description of the incident",
    submitReportBtn: "Submit report", demoOnlyNote: "Demo only — nothing here is sent to any authority.",
    ackTitle: "Report received (demo)", ackDesc: "This is a simulated acknowledgment for demonstration. Your reference number for this session:",
    ackNote: "For a real incident, act on immediate steps now and file with the actual authorities.",
    goSosBtn: "Go to SOS steps", closeBtn: "Close"
  },
  hi: {
    brandSub: "साइबर अपराध रिपोर्टिंग और आपातकालीन सहायता — NCRP से प्रेरित",
    sosBtn: "🚨 SOS — तुरंत सहायता",
    navHome: "होम", navComplaint: "शिकायत दर्ज करें ▾", navTrack: "अपनी शिकायत ट्रैक करें",
    navSuspect: "संदिग्ध की जांच / रिपोर्ट ▾", navSuspectCheck: "संदिग्ध जांचें (मोबाइल / ईमेल / URL)", navSuspectReport: "पोर्टल पर संदिग्ध रिपोर्ट करें",
    navVol: "साइबर वालंटियर", navLearn: "जानकारी केंद्र ▾", navTips: "साइबर सुरक्षा सुझाव", navFaq: "सामान्य प्रश्न", navAdv: "सलाह",
    navContact: "संपर्क करें", navSos: "🚨 SOS", noticeLabel: "नया क्या है",
    heroKicker: "शिकायत दर्ज करें", heroH1: "आप किस तरह के साइबर अपराध की रिपोर्ट कर रहे हैं?",
    heroLead: "शुरू करने के लिए एक श्रेणी चुनें। अगर आप अभी हमले का सामना कर रहे हैं — खाता लॉक, पैसे ट्रांसफर हो रहे हैं, OTP साझा हुआ है — तो तुरंत कार्रवाई के लिए SOS का उपयोग करें।",
    sosKicker: "आपातकालीन सहायता", sosH2: "SOS — अभी बताएं क्या हुआ",
    sosLead: "यह पोर्टल पर सबसे तेज़ रास्ता है। पहले कोई फ़ॉर्म नहीं — ज़रूरी तुरंत कदम और सावधानियां पाएं, फिर सुरक्षित होने के बाद शिकायत दर्ज करें।",
    vitalsTitle: "स्थिति", vitalsSignal: "संकेत: लाइव जांच",
    vitalsUnresolved: "अनसुलझा", vitalsRecovering: "सुधार हो रहा है", vitalsStable: "स्थिर",
    planHeading: "आपकी प्राथमिकता वाली कार्य योजना", recoveryTitle: "रिकवरी स्कोर",
    recoveryDesc: "हर कदम पूरा करने पर उसे चेक करें — जैसे-जैसे स्कोर बढ़ेगा, मॉनिटर स्थिर होता जाएगा।",
    precautionHeading: "दोबारा ऐसा न हो, इसके लिए सावधानियां",
    fileComplaintBtn: "इसे शिकायत के रूप में दर्ज करें →", viewContactsBtn: "आपातकालीन संपर्क देखें",
    selectedIncident: "चुनी गई घटना", yes: "हाँ", no: "नहीं", showPlan: "मेरी कार्य योजना दिखाएं →",
    trackKicker: "अपनी शिकायत ट्रैक करें", trackH2: "दर्ज की गई रिपोर्ट की स्थिति जांचें",
    trackLead: "दर्ज करने के बाद मिला रेफरेंस नंबर डालें। (डेमो डेटा — केवल इसी सत्र में दर्ज शिकायतें ट्रैक हो सकती हैं।)",
    trackBtn: "स्थिति ट्रैक करें", trackPlaceholder: "CSDEMO-284915",
    stages: ["दर्ज हुई", "समीक्षा में", "सौंपी गई", "कार्रवाई हुई"],
    trackFound: (ref, rec) => `रेफरेंस ${ref} — श्रेणी: ${rec.categoryLabel}। ${rec.time} पर दर्ज (यह सत्र, डेमो डेटा)।`,
    trackNotFound: (ref) => `"${ref}" के लिए कोई डेमो रिकॉर्ड नहीं मिला। पहले ऊपर एक रिपोर्ट दर्ज करें, या यह पिछले सत्र का रेफरेंस हो सकता है (डेमो डेटा रीलोड के बाद सेव नहीं रहता)।`,
    suspectKicker: "संदिग्ध की जांच / रिपोर्ट", suspectH2: "संदिग्ध पहचान खोजें या रिपोर्ट करें",
    suspectLead: "मोबाइल नंबर, ईमेल या लिंक को डेमो फ़्लैग की गई सूची से जांचें, या दूसरों के लिए रिपोर्ट करें।",
    tabCheck: "संदिग्ध जांचें", tabReport: "संदिग्ध रिपोर्ट करें",
    checkPlaceholder: "फ़ोन नंबर, ईमेल या URL डालें", searchBtn: "खोजें",
    suspectNote: "केवल उदाहरण के लिए डेमो डेटासेट। असली सत्यापन के लिए, cybercrime.gov.in पर I4C की Suspect Repository का उपयोग करें।",
    flaggedMsg: "⚠ डेमो डेटासेट में फ़्लैग किया गया। यह पहचान दूसरों द्वारा रिपोर्ट किए गए पैटर्न से मेल खाती है। इसके साथ OTP, भुगतान या निजी जानकारी साझा न करें।",
    cleanMsg: "इस डेमो डेटासेट में कोई मेल नहीं मिला। इसका मतलब यह नहीं कि यह सुरक्षित है — असली Suspect Repository कहीं अधिक रिपोर्ट कवर करती है।",
    repTypeOptions: ["फ़ोन नंबर", "ईमेल पता", "वेबसाइट / URL", "व्हाट्सएप / टेलीग्राम हैंडल", "सोशल मीडिया प्रोफ़ाइल"],
    identifierType: "पहचान का प्रकार",
    repValueLabel: "पहचान का विवरण", repValuePlaceholder: "जैसे +91XXXXXXXXXX या suspicious-site.com",
    repReasonLabel: "यह संदिग्ध क्यों है?", repReasonPlaceholder: "बताएं क्या हुआ",
    repSubmitBtn: "रिपोर्ट जमा करें",
    repAckTitle: "संदिग्ध रिपोर्ट जमा हुई (डेमो)",
    repAckDesc: (type, value, id) => <>{type}: <b>{value}</b> इस सत्र के लिए रेफरेंस <b>{id}</b> के तहत दर्ज किया गया।</>,
    repAckNote: "असली रिपोर्ट के लिए, cybercrime.gov.in पर I4C की Report Suspect सुविधा का उपयोग करें।",
    volKicker: "साइबर वालंटियर", volH2: "साइबर-सुरक्षित समुदाय का हिस्सा बनें", volLead: "वालंटियर अवैध सामग्री को फ़्लैग करने और अपने क्षेत्र में जागरूकता प्रयासों में मदद करते हैं।",
    tipsKicker: "जानकारी केंद्र", tipsH2: "साइबर सुरक्षा सुझाव", tipsLead: "छोटी आदतें जो धोखेबाज़ों के अधिकतर रास्ते बंद कर देती हैं।",
    advKicker: "सलाह", advH2: "हाल की शैली की सलाह (डेमो)", advLead: "पोर्टल के Daily Digest पर आधारित फ़ॉर्मेट — इस प्रोजेक्ट के लिए उदाहरणात्मक सामग्री।",
    faqKicker: "सामान्य प्रश्न", faqH2: "आम सवाल",
    contKicker: "आपातकालीन संपर्क", contH2: "असली, आधिकारिक रिपोर्टिंग संसाधन", contLead: "ये भारत भर के असली माध्यम हैं — इनका उपयोग उस हर चीज़ के लिए करें जिसे यह प्रोजेक्ट वास्तव में संभाल नहीं सकता।",
    fab: "🚨 SOS",
    footDesc: "एक व्यक्तिगत साइबर सुरक्षा प्रोजेक्ट — भारत के राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल पर आधारित एक रिपोर्टिंग-और-प्रतिक्रिया अनुभव, जिसके केंद्र में एक आपातकालीन SOS गाइड है।",
    footCol1: "रिपोर्ट करें", footL2: "वित्तीय धोखाधड़ी", footL3: "अन्य साइबर अपराध",
    footCol2: "संसाधन", footL4: "सुरक्षा सुझाव", footL5: "सामान्य प्रश्न", footL6: "शिकायत ट्रैक करें",
    footCol3: "सहायता पाएं", footL7: "SOS आपातकालीन गाइड", footL8: "आधिकारिक संपर्क", footL9: "साइबर वालंटियर",
    footBottom: "व्यक्तिगत प्रोजेक्ट, भारत सरकार से संबद्ध नहीं · असली शिकायत के लिए cybercrime.gov.in पर जाएं या 1930 पर कॉल करें",
    riskLabels: { HIGH: "उच्च", MEDIUM: "मध्यम", LOW: "कम" },
    riskCopy: {
      HIGH: "आपकी जानकारी या पैसा सीधे खतरे में हो सकता है। अभी सबसे पहले RED वाले कदम पूरे करें।",
      MEDIUM: "कुछ खतरा है — बढ़ने से पहले इसे बंद करें। सबसे ऊपर से शुरू करें।",
      LOW: "अभी तक सीमित खतरा है। फिर भी नीचे दी गई बुनियादी बातें सुरक्षित करना उचित है।"
    },
    riskLabelPrefix: "जोखिम स्तर",
    complaintTitle: "रिपोर्ट दर्ज करें (डेमो)", nameLabel: "पूरा नाम", mobileLabel: "मोबाइल नंबर",
    descLabel: "क्या हुआ?", descPlaceholder: "घटना का संक्षिप्त विवरण",
    submitReportBtn: "रिपोर्ट जमा करें", demoOnlyNote: "केवल डेमो — यहां से कुछ भी किसी अधिकारी को नहीं भेजा जाता।",
    ackTitle: "रिपोर्ट प्राप्त हुई (डेमो)", ackDesc: "यह प्रदर्शन के लिए एक नकली पावती है। इस सत्र के लिए आपका रेफरेंस नंबर:",
    ackNote: "असली घटना के लिए, अभी तुरंत कदम उठाएं और असली अधिकारियों के पास रिपोर्ट दर्ज करें।",
    goSosBtn: "SOS कदमों पर जाएं", closeBtn: "बंद करें"
  }
};

// Homepage category tiles
const TILES = {
  en: {
    fraud: { icon: "💳", title: "Financial Fraud", desc: "UPI, card, banking, investment, or job-offer fraud involving money.", cta: "Report and get immediate action steps →" },
    other: { icon: "🖥️", title: "Other Cyber Crime", desc: "Hacking, malware, impersonation, phishing, or any incident not listed above.", cta: "Report this incident →" }
  },
  hi: {
    fraud: { icon: "💳", title: "वित्तीय धोखाधड़ी", desc: "पैसे से जुड़ी UPI, कार्ड, बैंकिंग, निवेश या नौकरी-प्रस्ताव धोखाधड़ी।", cta: "रिपोर्ट करें और तुरंत कदम पाएं →" },
    other: { icon: "🖥️", title: "अन्य साइबर अपराध", desc: "हैकिंग, मैलवेयर, नकल, फ़िशिंग या ऊपर सूचीबद्ध न कोई अन्य घटना।", cta: "इस घटना की रिपोर्ट करें →" }
  }
};

const VOLUNTEERS = {
  en: [
    { icon: "🛡️", title: "Unlawful Content Flagging", desc: "Trained volunteers help identify and report harmful content for review." },
    { icon: "📢", title: "Awareness Promotion", desc: "Run local sessions on OTP safety, phishing, and safe banking habits." },
    { icon: "🎓", title: "Training Provided", desc: "Volunteers complete a short onboarding module before taking on tasks." },
    { icon: "🤝", title: "Community Support", desc: "Help first-time victims understand this portal's reporting flow." }
  ],
  hi: [
    { icon: "🛡️", title: "अवैध सामग्री की पहचान", desc: "प्रशिक्षित वालंटियर हानिकारक सामग्री की पहचान और रिपोर्ट करने में मदद करते हैं।" },
    { icon: "📢", title: "जागरूकता प्रचार", desc: "OTP सुरक्षा, फ़िशिंग और सुरक्षित बैंकिंग आदतों पर स्थानीय सत्र चलाएं।" },
    { icon: "🎓", title: "प्रशिक्षण उपलब्ध", desc: "कार्य शुरू करने से पहले वालंटियर एक छोटा ऑनबोर्डिंग मॉड्यूल पूरा करते हैं।" },
    { icon: "🤝", title: "सामुदायिक सहायता", desc: "पहली बार पीड़ित हुए लोगों को इस पोर्टल की रिपोर्टिंग प्रक्रिया समझने में मदद करें।" }
  ]
};

const ADVISORIES = {
  en: [
    { icon: "📨", title: "Fake \"KYC update\" SMS wave", desc: "Messages urging an immediate KYC link click are almost always phishing — banks don't ask this way." },
    { icon: "📱", title: "Screen-share support scams", desc: "Callers posing as \"bank support\" ask victims to install remote-access apps — never share your screen with an unsolicited caller." },
    { icon: "💼", title: "Fake work-from-home offers", desc: "\"Task-based\" job offers asking for an upfront deposit are a common fraud pattern." },
    { icon: "🔗", title: "Shortened-link lottery scams", desc: "\"You've won a prize\" links harvest credentials — legitimate prizes don't require login first." }
  ],
  hi: [
    { icon: "📨", title: "नकली \"KYC अपडेट\" SMS लहर", desc: "तुरंत KYC लिंक पर क्लिक कराने वाले संदेश लगभग हमेशा फ़िशिंग होते हैं — बैंक इस तरह नहीं मांगते।" },
    { icon: "📱", title: "स्क्रीन-शेयर सपोर्ट घोटाले", desc: "\"बैंक सपोर्ट\" बनकर कॉल करने वाले रिमोट-एक्सेस ऐप इंस्टॉल कराते हैं — किसी अनचाहे कॉलर के साथ स्क्रीन शेयर न करें।" },
    { icon: "💼", title: "नकली वर्क-फ्रॉम-होम प्रस्ताव", desc: "अग्रिम जमा राशि मांगने वाली \"टास्क-आधारित\" नौकरियां एक आम धोखाधड़ी पैटर्न हैं।" },
    { icon: "🔗", title: "शॉर्ट-लिंक लॉटरी घोटाले", desc: "\"आपने इनाम जीता\" लिंक क्रेडेंशियल चुराते हैं — असली इनाम पहले लॉगिन नहीं मांगते।" }
  ]
};

const CONTACTS = {
  en: [
    { cat: "Cybercrime — National", title: "National Cyber Crime Reporting Portal", desc: "File a real complaint online for any cyber incident.", num: "cybercrime.gov.in" },
    { cat: "Financial fraud", title: "Cyber Fraud Helpline", desc: "Report UPI, card, or bank fraud fast to help freeze funds in transit.", num: "Dial 1930" },
    { cat: "Emergency", title: "Police", desc: "For immediate danger or a cybercrime tied to a physical threat.", num: "Dial 112" },
    { cat: "Platform support", title: "WhatsApp account recovery", desc: "Reclaim a hijacked account and report it in-app.", num: "whatsapp.com/security" },
    { cat: "Platform support", title: "Instagram / Meta help", desc: "Report a compromised or impersonating account.", num: "help.instagram.com" },
    { cat: "Women & child safety", title: "National Cyber Crime Helpline", desc: "Dedicated line for crimes against women and children online.", num: "Dial 1930" }
  ],
  hi: [
    { cat: "साइबर अपराध — राष्ट्रीय", title: "राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल", desc: "किसी भी साइबर घटना के लिए असली शिकायत ऑनलाइन दर्ज करें।", num: "cybercrime.gov.in" },
    { cat: "वित्तीय धोखाधड़ी", title: "साइबर फ्रॉड हेल्पलाइन", desc: "पैसा ट्रांज़िट में फ्रीज़ कराने के लिए UPI, कार्ड या बैंक धोखाधड़ी की तुरंत रिपोर्ट करें।", num: "1930 डायल करें" },
    { cat: "आपातकाल", title: "पुलिस", desc: "तत्काल खतरे या शारीरिक धमकी से जुड़े साइबर अपराध के लिए।", num: "112 डायल करें" },
    { cat: "प्लेटफ़ॉर्म सपोर्ट", title: "व्हाट्सएप अकाउंट रिकवरी", desc: "हैक हुआ खाता वापस पाएं और ऐप में रिपोर्ट करें।", num: "whatsapp.com/security" },
    { cat: "प्लेटफ़ॉर्म सपोर्ट", title: "इंस्टाग्राम / मेटा सहायता", desc: "प्रभावित या नकली खाते की रिपोर्ट करें।", num: "help.instagram.com" },
    { cat: "महिला और बाल सुरक्षा", title: "राष्ट्रीय साइबर अपराध हेल्पलाइन", desc: "महिलाओं और बच्चों के खिलाफ ऑनलाइन अपराधों के लिए समर्पित लाइन।", num: "1930 डायल करें" }
  ]
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const value = {
    lang,
    setLang,
    t: T[lang],
    tiles: TILES[lang],
    volunteers: VOLUNTEERS[lang],
    advisories: ADVISORIES[lang],
    contacts: CONTACTS[lang]
  };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
