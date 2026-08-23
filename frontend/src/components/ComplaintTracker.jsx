import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ComplaintTracker({ complaints }) {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null); // { rec, ref } | { notFound: ref }

  const trackComplaint = () => {
    const ref = input.trim().toUpperCase();
    const rec = complaints[ref];
    setResult(rec ? { rec, ref } : { notFound: ref });
  };

  return (
    <section id="track">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">{t.trackKicker}</div>
          <h2>{t.trackH2}</h2>
          <p>{t.trackLead}</p>
        </div>
        <div className="card-panel">
          <div className="track-box">
            <input
              type="text"
              placeholder={t.trackPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={trackComplaint}>{t.trackBtn}</button>
          </div>

          {result && (
            <div className="status-track show">
              <div className="status-steps">
                {t.stages.map((label, i) => {
                  const currentStage = result.rec ? result.rec.stage : -1;
                  let cls = '';
                  if (result.rec) cls = i < currentStage ? 'done' : i === currentStage ? 'current' : '';
                  return (
                    <div className={`status-step ${cls}`} key={i}>
                      <div className="dot">{i < currentStage ? '✓' : i + 1}</div>
                      <p>{label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="status-detail">
                {result.rec ? t.trackFound(result.ref, result.rec) : t.trackNotFound(result.notFound)}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
