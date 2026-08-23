import { useLanguage } from '../context/LanguageContext';

export default function Advisories() {
  const { t, advisories } = useLanguage();

  return (
    <section id="advisories">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">{t.advKicker}</div>
          <h2>{t.advH2}</h2>
          <p>{t.advLead}</p>
        </div>
        <div className="learn-grid">
          {advisories.map((a, i) => (
            <div className="learn-card" key={i}>
              <span className="lc-icon">{a.icon}</span>
              <h4>{a.title}</h4>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
