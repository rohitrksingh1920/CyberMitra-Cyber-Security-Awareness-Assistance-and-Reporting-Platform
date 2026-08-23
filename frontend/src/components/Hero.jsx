import React from "react";

export default function Hero({lang,scrollY}) {
  const rotate = Math.min(scrollY * .08, 360);
  const threats = [
    ["PHISHING","Fake KYC link"],
    ["UPI","Collect request"],
    ["OTP","Code theft"],
    ["FAKE JOB","Registration fee"]
  ];

  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><i/> DIGITAL SAFETY COMMAND CENTER</div>
          <h1>{lang==="hi" ? "साइबर खतरे को पहचानें। सही कदम उठाएँ।" : "See the threat. Stop the scam. Stay safe."}</h1>
          <p>
            {lang==="hi"
              ? "भारत में आम साइबर धोखाधड़ी को इंटरैक्टिव उदाहरणों के साथ समझें और घटना होने पर तुरंत कार्रवाई करें।"
              : "Understand common cyber scams in India through interactive examples — and know exactly what to do when something goes wrong."}
          </p>
          <div className="hero-buttons">
            <a href="#cases" className="primary">Explore 13 cases <span>↓</span></a>
            <a href="#report" className="secondary">How to report <span>↗</span></a>
          </div>
          <div className="hero-metrics">
            <div><strong>13</strong><span>case files</span></div>
            <div><strong>1930</strong><span>cyber helpline</span></div>
            <div><strong>24/7</strong><span>awareness</span></div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="scan-ring ring-a"/>
          <div className="scan-ring ring-b"/>
          <div className="shield-wrap" style={{transform:`rotateY(${rotate}deg) rotateZ(${Math.sin(scrollY/240)*4}deg)`}}>
            <div className="shield">
              <div className="shield-glow"/>
              <div className="shield-top"/>
              <div className="shield-body">
                <div className="lock">✓</div>
                <small>PROTECTED</small>
              </div>
            </div>
          </div>
          <div className="threats">
            {threats.map((t,i)=>(
              <div
                key={t[0]}
                className={`threat threat-${i}`}
                style={{
                  transform:`translate(${Math.sin(scrollY/100+i)*8}px,${Math.cos(scrollY/140+i)*10}px)`,
                  opacity:.72 + Math.min(scrollY/1400,.25)
                }}
              >
                <span>!</span><b>{t[0]}</b><small>{t[1]}</small>
              </div>
            ))}
          </div>
          <div className="hero-caption"><span/> SCROLL TO ACTIVATE DEFENCE SYSTEM</div>
        </div>
      </div>
    </section>
  );
}
