import { useLanguage } from '../context/LanguageContext';
import { TIPS } from '../data/tips';

export default function SafetyTips() {
  const { lang, t } = useLanguage();
  const tips = TIPS[lang];

  return (
    <section id="tips">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">{t.tipsKicker}</div>
          <h2>{t.tipsH2}</h2>
          <p>{t.tipsLead}</p>
        </div>
        <div className="tips-grid">
          {tips.map((x, i) => (
            <div className="tip-card" key={i}>
              <div>🛡️</div>
              <div><b>{x.t}</b>{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
