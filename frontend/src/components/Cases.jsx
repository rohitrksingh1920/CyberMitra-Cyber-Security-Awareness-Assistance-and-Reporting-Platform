import React from "react";
import MessageMock from "./MessageMock";

export default function Cases({lang,cases,activeCase,setActiveCase}) {
  const item = cases[activeCase];
  return (
    <section className="cases-section" id="cases">
      <div className="section-intro">
        <div>
          <span className="kicker">CASE FILES / 01—13</span>
          <h2>{lang==="hi"?"धोखाधड़ी को संदेशों में पहचानें":"Catch the scam before it catches you."}</h2>
        </div>
        <p>Swipe through the 13 case files. Open one to see the pattern, red flags and the safest response.</p>
      </div>

      <div className="case-strip">
        {cases.map((c,i)=>(
          <button key={c.title} className={`case-tab ${activeCase===i?"selected":""}`} onClick={()=>setActiveCase(i)}>
            <span>{c.icon}</span><small>{String(i+1).padStart(2,"0")}</small><b>{c.title}</b>
          </button>
        ))}
      </div>

      <div className="case-detail">
        <div className="case-info">
          <div className="case-number">{String(activeCase+1).padStart(2,"0")} / 13</div>
          <div className="case-icon">{item.icon}</div>
          <span className="case-tag">{item.tag}</span>
          <h3>{item.title}</h3>
          <p className="case-sub">{item.sub}</p>
          <div className="risk-line"><span>THREAT SIGNAL</span><b>{item.risk}</b></div>
          <div className="do-grid">
            <div><h4>DO</h4>{item.do.map(x=><p key={x}>✓ {x}</p>)}</div>
            <div><h4>DON'T</h4>{item.dont.map(x=><p key={x}>× {x}</p>)}</div>
          </div>
          <div className="remember"><span>REMEMBER</span>{item.remember}</div>
        </div>
        <div className="case-evidence">
          <div className="evidence-label"><span>EXHIBIT {String(activeCase+1).padStart(2,"0")}</span><b>SIMULATED</b></div>
          <MessageMock item={item}/>
          <div className="evidence-note"><span>WHY IT'S SUSPICIOUS</span><p>{item.risk}</p></div>
        </div>
      </div>
    </section>
  );
}
