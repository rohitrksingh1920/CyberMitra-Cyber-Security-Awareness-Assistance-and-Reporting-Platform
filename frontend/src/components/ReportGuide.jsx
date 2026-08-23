import React from "react";

const steps=[
 ["01","Open the official portal","Go to cybercrime.gov.in and choose Financial Fraud or Other Cyber Crime."],
 ["02","Register your mobile number","Enter your details, request the OTP and complete verification."],
 ["03","Choose the category","Select the category and sub-category that best matches the incident."],
 ["04","Enter incident details","Add the date/time, what happened, location and other required information."],
 ["05","Attach evidence","Keep screenshots, transaction IDs/UTR, phone numbers, URLs and other evidence ready."],
 ["06","Submit & save the reference","Review the complaint, submit it and save the complaint/reference number."]
];

export default function ReportGuide({lang}) {
 return (
  <section className="report-section" id="report">
    <div className="section-intro">
      <div><span className="kicker">WHEN THINGS GO WRONG</span><h2>Report it. Don't wait.</h2></div>
      <p>For financial cyber fraud, call <b>1930</b> immediately and also file the online complaint. Preserve your evidence.</p>
    </div>
    <div className="report-layout">
      <div className="portal-card">
        <span className="portal-label">OFFICIAL PORTAL</span>
        <div className="portal-icon">↗</div>
        <h3>cybercrime.gov.in</h3>
        <p>File a cyber crime complaint with your evidence and keep the reference number safe.</p>
        <a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer">Open official portal</a>
        <div className="hotline"><span>CYBER CRIME HELPLINE</span><b>1930</b></div>
      </div>
      <div className="steps">
        {steps.map(([n,t,d])=><div className="step" key={n}><span>{n}</span><div><h4>{t}</h4><p>{d}</p></div></div>)}
      </div>
    </div>
  </section>
 );
}
