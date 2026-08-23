export const cases = [
  {
    icon:"🕵️", title:"Cyber Crime Awareness", tag:"EVERYDAY SCAMS", type:"whatsapp",
    sub:"The basics that apply to every scam",
    message:"State Bank: Your KYC will EXPIRE today. Update now: bit.ly/sbi-kyc-upd8",
    risk:"Urgency + fake authority + a suspicious link",
    remember:"If you are not sure, don't click. Check first, act later.",
    do:["Verify through the official bank app","Pause when a message creates urgency","Keep apps and phone updated"],
    dont:["Share OTP or passwords","Click unknown links","React in a hurry"]
  },
  {
    icon:"💸", title:"Fake Loan Apps", tag:"FINANCE", type:"sms",
    sub:"Instant loans with hidden strings attached",
    message:"QuickCash: Loan of ₹50,000 APPROVED! Pay ₹999 processing fee to receive amount instantly.",
    risk:"Upfront fee + unnecessary permissions + pressure",
    remember:"A loan app that skips paperwork also skips accountability.",
    do:["Use RBI-registered lenders","Read app permissions","Check registration and reviews"],
    dont:["Give contacts/gallery access","Pay a 'guaranteed' fee","Share Aadhaar/PAN with unverified apps"]
  },
  {
    icon:"🎮", title:"Online Gaming Frauds", tag:"GAMING", type:"sms",
    sub:"Free diamonds that cost everything",
    message:"FreeFire OFFICIAL: Get 5000 Diamonds FREE! Login with your game ID + password here.",
    risk:"Fake rewards + credential harvesting",
    remember:"If it isn't in the official app store, it isn't really free.",
    do:["Buy items only from official stores","Use parental controls when needed","Report suspicious players"],
    dont:["Share game passwords","Enter card details on unofficial sites","Download random game hacks"]
  },
  {
    icon:"💼", title:"Fake Jobs Scam", tag:"CAREER", type:"whatsapp",
    sub:"Pay to get hired? Never real.",
    message:"HR Team: You're SELECTED for Data Entry, Work from Home ₹35,000/month! Pay ₹1500 registration today.",
    risk:"No interview + unrealistic salary + registration fee",
    remember:"A real employer never asks you to pay to get hired.",
    do:["Check the company website","Use trusted job portals","Request a written offer"],
    dont:["Pay to secure a job","Share OTPs before verification","Trust chat-only offers"]
  },
  {
    icon:"🌐", title:"Safe Internet Usage", tag:"BROWSING", type:"email",
    sub:"Not every site is what it claims",
    message:"YOU'VE WON! Claim your free iPhone 15. Click within 24 hours and pay ₹49 delivery.",
    risk:"Prize bait + malicious link + card harvesting",
    remember:"One safe click today prevents a big problem tomorrow.",
    do:["Look for HTTPS","Keep browser and antivirus updated","Use trusted networks for banking"],
    dont:["Download unknown software","Ignore browser warnings","Bank on unsafe public Wi-Fi"]
  },
  {
    icon:"📱", title:"Social Media Safety", tag:"SOCIAL", type:"whatsapp",
    sub:"Not everyone online is who they claim",
    message:"Hey! Send me your location and a few more pics. Let's keep this between us.",
    risk:"Stranger contact + secrecy + location request",
    remember:"Privacy settings are your first line of defence.",
    do:["Keep profiles private","Think before posting","Tell someone about uncomfortable messages"],
    dont:["Share live location publicly","Accept random requests","Post sensitive information"]
  },
  {
    icon:"🔑", title:"Password Security", tag:"ACCOUNTS", type:"email",
    sub:"Your first and easiest defence",
    message:"Confirm your password within 12 hours or your account will be permanently disabled.",
    risk:"Fake security alert + credential theft",
    remember:"Your password is like your house key — never hand out a copy.",
    do:["Use long unique passwords","Enable 2FA","Use a password manager"],
    dont:["Reuse passwords","Use birthdays as passwords","Save passwords on public devices"]
  },
  {
    icon:"💳", title:"UPI & Digital Payment Safety", tag:"PAYMENTS", type:"upi",
    sub:"A PIN sends money — it does not receive it",
    message:"Cashback Refund Team: Enter UPI PIN to RECEIVE ₹4,999 cashback.",
    risk:"Fake collect request + PIN theft",
    remember:"You never need your UPI PIN to receive money.",
    do:["Check every collect request","Verify the payee name","Use the official banking app"],
    dont:["Share UPI PIN/OTP/CVV","Scan random QR codes to receive money","Install screen-sharing apps for strangers"]
  },
  {
    icon:"🪪", title:"Identity Theft", tag:"IDENTITY", type:"email",
    sub:"Your ID is as valuable as your money",
    message:"URGENT: Verify Aadhaar to avoid deactivation. Upload Aadhaar & PAN using this link.",
    risk:"Fake KYC + document harvesting",
    remember:"Protect identity documents the same way you protect money.",
    do:["Share ID only when necessary","Check bank statements","Use masked Aadhaar where possible"],
    dont:["Post ID photos online","Share KYC OTPs","Leave printed documents unattended"]
  },
  {
    icon:"👮", title:"Digital Arrest Awareness", tag:"IMPERSONATION", type:"call",
    sub:"Police do not arrest people over video calls",
    message:"CBI Officer: Stay on camera. Transfer money now or a warrant will be issued.",
    risk:"Official impersonation + isolation + payment pressure",
    remember:"Real police never demand money over a video call.",
    do:["Hang up and verify independently","Tell a trusted person","Report quickly"],
    dont:["Transfer money to avoid arrest","Stay isolated on the call","Believe threats without verification"]
  },
  {
    icon:"🔒", title:"Data Privacy", tag:"PRIVACY", type:"permission",
    sub:"Free apps can collect more than you expect",
    message:"Simple Torch Light requests Contacts, SMS, Camera, Microphone and Location.",
    risk:"Excessive permissions + data collection",
    remember:"If a service is free, ask what it is collecting in return.",
    do:["Review permissions","Use privacy settings","Limit data shared"],
    dont:["Accept every permission","Give data to random quizzes","Ignore privacy warnings"]
  },
  {
    icon:"🤝", title:"Responsible Digital Behaviour", tag:"COMMUNITY", type:"whatsapp",
    sub:"Kindness and honesty, online too",
    message:"FORWARD THIS TO 10 GROUPS NOW or WhatsApp will delete your account tonight!",
    risk:"False information + forwarding pressure",
    remember:"Kindness and honesty matter everywhere — online included.",
    do:["Verify before forwarding","Respect privacy","Speak up safely against cyberbullying"],
    dont:["Forward unverified news","Harass people online","Use fake accounts to target others"]
  },
  {
    icon:"📞", title:"Reporting Cyber Crime", tag:"RESPONSE", type:"alert",
    sub:"Act fast — speed matters most",
    message:"If you're ever scammed, call 1930 and report at cybercrime.gov.in. Save your UTR and screenshots.",
    risk:"Delay can make financial recovery harder",
    remember:"For financial fraud, speed matters most.",
    do:["Call 1930 immediately","Save screenshots and transaction IDs","Inform your bank"],
    dont:["Wait for money to return","Delete evidence","Feel embarrassed to report"]
  }
];

export const rules = [
  "If you are not sure, don't click. Check first, act later.",
  "A loan app that skips paperwork also skips accountability.",
  "If it isn't in the official app store, it isn't really free.",
  "A real employer never asks you to pay to get hired.",
  "One safe click today prevents a big problem tomorrow.",
  "Privacy settings are your first line of defence.",
  "Your password is your digital house key.",
  "You never need a UPI PIN to receive money.",
  "Treat identity documents like cash.",
  "Real police do not demand money over video calls.",
  "Review app permissions before installing.",
  "Verify before you forward.",
  "Report cyber crime quickly — 1930 or cybercrime.gov.in."
];

export const contacts = [
  ["National Cyber Crime Helpline","1930"],
  ["Emergency Police","112"],
  ["Women Helpline","181"],
  ["Child Helpline","1098"],
  ["Cyber Crime Portal","cybercrime.gov.in"]
];
