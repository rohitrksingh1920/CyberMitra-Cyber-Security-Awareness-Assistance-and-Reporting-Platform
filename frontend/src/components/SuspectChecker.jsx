import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Purely illustrative demo dataset — not a real threat-intel feed.
const DEMO_FLAGGED = [
  "+9198xxxxxx11",
  "fraud-support@bank-verify-secure.com",
  "bit.ly/prize-claim-2024",
  "instantloan-approve.in",
  "+9170xxxxxx45"
];

export default function SuspectChecker() {
  const { t } = useLanguage();
  const [tab, setTab] = useState('check');

  const [checkInput, setCheckInput] = useState('');
  const [checkResult, setCheckResult] = useState(null); // 'flagged' | 'clean' | null

  const [repType, setRepType] = useState(t.repTypeOptions[0]);
  const [repValue, setRepValue] = useState('');
  const [repReason, setRepReason] = useState('');
  const [repAck, setRepAck] = useState(null); // { type, value, id } | null

  const checkSuspect = () => {
    const val = checkInput.trim().toLowerCase();
    if (!val) return;
    const flagged = DEMO_FLAGGED.some((f) => {
      const stripped = f.toLowerCase().replace(/x+/g, '');
      return val.includes(stripped) || f.toLowerCase() === val;
    });
    setCheckResult(flagged ? 'flagged' : 'clean');
  };

  const submitReport = () => {
    if (!repValue.trim()) return;
    const id = 'RPT-' + Math.floor(10000 + Math.random() * 89999);
    setRepAck({ type: repType, value: repValue, id });
  };

  const switchTab = (name) => {
    setTab(name);
    if (name === 'report') { setRepAck(null); }
  };

  return (
    <section id="suspect">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">{t.suspectKicker}</div>
          <h2>{t.suspectH2}</h2>
          <p>{t.suspectLead}</p>
        </div>

        <div className="tabs">
          <button className={`tab-btn ${tab === 'check' ? 'active' : ''}`} onClick={() => switchTab('check')}>{t.tabCheck}</button>
          <button className={`tab-btn ${tab === 'report' ? 'active' : ''}`} onClick={() => switchTab('report')}>{t.tabReport}</button>
        </div>

        <div className="card-panel">
          {tab === 'check' ? (
            <div className="tab-panel active">
              <div className="check-row">
                <input
                  type="text"
                  placeholder={t.checkPlaceholder}
                  value={checkInput}
                  onChange={(e) => setCheckInput(e.target.value)}
                />
                <button onClick={checkSuspect}>{t.searchBtn}</button>
              </div>
              {checkResult && (
                <div className={`check-result show ${checkResult}`}>
                  {checkResult === 'flagged' ? t.flaggedMsg : t.cleanMsg}
                </div>
              )}
              <p className="suspect-note">{t.suspectNote}</p>
            </div>
          ) : (
            <div className="tab-panel active">
              {repAck ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div className="check-icon" style={{ margin: '0 auto 14px' }}>✓</div>
                  <h3 style={{ marginBottom: 8 }}>{t.repAckTitle}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: 13.5, marginBottom: 14 }}>
                    {t.repAckDesc(repAck.type, repAck.value, repAck.id)}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--text-faint)' }}>{t.repAckNote}</p>
                </div>
              ) : (
                <>
                  <div className="field">
                    <label>{t.identifierType}</label>
                    <select value={repType} onChange={(e) => setRepType(e.target.value)}>
                      {t.repTypeOptions.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>{t.repValueLabel}</label>
                    <input type="text" placeholder={t.repValuePlaceholder} value={repValue} onChange={(e) => setRepValue(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>{t.repReasonLabel}</label>
                    <textarea placeholder={t.repReasonPlaceholder} value={repReason} onChange={(e) => setRepReason(e.target.value)} />
                  </div>
                  <button className="btn-block" onClick={submitReport}>{t.repSubmitBtn}</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
