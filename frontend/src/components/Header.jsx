import React from "react";

export default function Header({lang,setLang}) {
  return (
    <header className="nav">
      <a className="brand" href="#top">
        <span className="brand-mark">CS</span>
        <span>Cyber<span>SOS</span></span>
      </a>
      <nav>
        <a href="#cases">Cases</a>
        <a href="#rules">Rules</a>
        <a href="#report">Report</a>
        <a href="#help">Help</a>
      </nav>
      <div className="nav-actions">
        <div className="lang">
          <button className={lang==="en"?"active":""} onClick={()=>setLang("en")}>EN</button>
          <button className={lang==="hi"?"active":""} onClick={()=>setLang("hi")}>हिं</button>
        </div>
        <a className="nav-sos" href="tel:1930">1930</a>
      </div>
    </header>
  );
}
