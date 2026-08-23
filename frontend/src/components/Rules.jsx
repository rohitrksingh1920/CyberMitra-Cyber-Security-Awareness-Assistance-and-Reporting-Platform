import React from "react";
import {rules} from "../data";

export default function Rules({lang}) {
  return (
    <section className="rules-section" id="rules">
      <div className="section-intro light">
        <div><span className="kicker">THE DEFENCE CODE</span><h2>13 rules. 13 habits. One safer internet.</h2></div>
        <p>{lang==="hi"?"इन्हें याद रखें और रोज़मर्रा की डिजिटल आदत बनाएं।":"Simple rules you can actually remember when the pressure is on."}</p>
      </div>
      <div className="rules-grid">
        {rules.map((r,i)=><article key={r}><span>{String(i+1).padStart(2,"0")}</span><p>{r}</p></article>)}
      </div>
    </section>
  );
}
