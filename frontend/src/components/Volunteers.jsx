import { useLanguage } from '../context/LanguageContext';

export default function Volunteers() {
  const { t, volunteers } = useLanguage();

  return (
    <section id="volunteers">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">{t.volKicker}</div>
          <h2>{t.volH2}</h2>
          <p>{t.volLead}</p>
        </div>
        <div className="learn-grid">
          {volunteers.map((v, i) => (
            <div className="learn-card" key={i}>
              <span className="lc-icon">{v.icon}</span>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
