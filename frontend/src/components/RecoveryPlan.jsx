import { useLanguage } from '../context/LanguageContext';

const CIRCUMFERENCE = 213.6; // 2 * PI * r(34), matches the SVG ring below

export default function RecoveryPlan({ risk, steps, checklist, onToggleStep, precautions, onFileComplaint }) {
  const { t } = useLanguage();

  const total = Object.keys(checklist).length || 1;
  const done = Object.values(checklist).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);
  const offset = CIRCUMFERENCE - (CIRCUMFERENCE * pct) / 100;

  return (
    <div id="result-zone" className="show">
      <div className="risk-banner-wrap">
        <div className={`risk-banner ${risk}`}>
          <div className="risk-dot"></div>
          <div>
            <div className="rlabel">{t.riskLabelPrefix}</div>
            <div className="rtext">{t.riskLabels[risk]} — {t.riskCopy[risk]}</div>
          </div>
        </div>
      </div>

      <h3 style={{ color: '#fff', fontSize: 19, marginBottom: 14 }}>{t.planHeading}</h3>

      <div className="guide-cols">
        {steps.map((s, i) => {
          const id = `step-${i}`;
          const isDone = !!checklist[id];
          return (
            <div className={`step-card ${s.tag}`} key={id}>
              <div className={`step-check ${isDone ? 'checked' : ''}`} onClick={() => onToggleStep(id)}></div>
              <div className={`step-body ${isDone ? 'done' : ''}`}>
                <span className={`step-tag ${s.tag}`}>{s.tag}</span>
                <div className="step-title">{s.title}</div>
                <p className="desc">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="recovery-bar-wrap" id="checklist">
        <div className="score-ring">
          <svg viewBox="0 0 80 80">
            <circle className="track" cx="40" cy="40" r="34" />
            <circle
              className="fill"
              cx="40" cy="40" r="34"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="pct">{pct}%</div>
        </div>
        <div className="recovery-text">
          <div className="rt-title">{t.recoveryTitle}</div>
          <p>{t.recoveryDesc}</p>
        </div>
      </div>

      <div className="precaution-band">
        <h4>{t.precautionHeading}</h4>
        <ul className="precaution-list">
          {precautions.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>

      <div className="sos-actions">
        <a href="#" className="primary" onClick={(e) => { e.preventDefault(); onFileComplaint(); }}>
          {t.fileComplaintBtn}
        </a>
        <a href="#contacts" className="secondary">{t.viewContactsBtn}</a>
      </div>
    </div>
  );
}

export { CIRCUMFERENCE };
