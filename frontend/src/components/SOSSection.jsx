import { useMemo, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { INCIDENTS, CATEGORY_MAP } from '../data/incidents';
import IncidentCard from './IncidentCard';
import TriagePanel from './TriagePanel';
import RecoveryPlan from './RecoveryPlan';

const PULSE_SPIKY = "M0,50 L40,50 L55,18 L70,86 L85,50 L120,50 L135,28 L150,74 L165,50 L400,50";
const PULSE_MID = "M0,50 L60,50 L75,32 L90,70 L105,50 L400,50";
const PULSE_CALM = "M0,50 L150,50 L165,42 L180,60 L195,50 L400,50";

export default function SOSSection({ onFileComplaint }) {
  const { lang, t } = useLanguage();
  const [selectedKey, setSelectedKey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null); // { risk, steps, precautions }
  const [checklist, setChecklist] = useState({});
  const triageRef = useRef(null);
  const resultRef = useRef(null);

  const selectIncident = (key) => {
    setSelectedKey(key);
    setAnswers({});
    setResult(null);
    setChecklist({});
    setTimeout(() => triageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  const answerQuestion = (qid, val) => {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
  };

  const submitTriage = () => {
    const data = INCIDENTS[selectedKey][lang];
    const yesCount = Object.values(answers).filter((v) => v === 'yes').length;
    const risk = yesCount >= 2 ? 'HIGH' : yesCount === 1 ? 'MEDIUM' : 'LOW';
    const relevantSteps = data.steps.filter((s) => !s.when || answers[s.when] === 'yes');
    const initialChecklist = {};
    relevantSteps.forEach((_, i) => { initialChecklist[`step-${i}`] = false; });
    setChecklist(initialChecklist);
    setResult({ risk, steps: relevantSteps, precautions: data.precautions });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  const toggleStep = (id) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const total = Object.keys(checklist).length || 1;
  const done = Object.values(checklist).filter(Boolean).length;
  const pct = result ? Math.round((done / total) * 100) : 0;

  const vitals = useMemo(() => {
    if (pct >= 100) return { path: PULSE_CALM, stroke: '#7DE3AA', label: t.vitalsStable, cls: 'stable' };
    if (pct >= 40) return { path: PULSE_MID, stroke: '#FFC170', label: t.vitalsRecovering, cls: '' };
    return { path: PULSE_SPIKY, stroke: '#FF8895', label: t.vitalsUnresolved, cls: '' };
  }, [pct, t]);

  const handleFileComplaint = () => {
    const map = {};
    Object.entries(CATEGORY_MAP).forEach(([cat, list]) => { if (list.includes(selectedKey)) map[cat] = true; });
    const category = map.fraud ? 'fraud' : 'other';
    onFileComplaint(category);
  };

  return (
    <section id="sos">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">{t.sosKicker}</div>
          <h2>{t.sosH2}</h2>
          <p>{t.sosLead}</p>
        </div>

        <div className="sos-lead-row">
          <div className="vitals">
            <div className="vitals-head">
              <span className="vitals-title">{t.vitalsTitle}</span>
              <span className={`vitals-state ${vitals.cls}`}>{vitals.label}</span>
            </div>
            <svg viewBox="0 0 400 100" preserveAspectRatio="none">
              <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
              <path d={vitals.path} fill="none" stroke={vitals.stroke} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <div className="vitals-foot">
              <span>{t.vitalsSignal}</span>
              <span>{(lang === 'hi' ? 'रिकवरी ' : 'RECOVERY ') + pct + '%'}</span>
            </div>
          </div>
        </div>

        <div className="incident-grid">
          {Object.entries(INCIDENTS).map(([key, inc]) => (
            <IncidentCard
              key={key}
              icon={inc.icon}
              label={inc[lang].label}
              sub={inc[lang].sub}
              active={key === selectedKey}
              onClick={() => selectIncident(key)}
            />
          ))}
        </div>

        {selectedKey && (
          <div className="triage-zone show" ref={triageRef}>
            <TriagePanel
              icon={INCIDENTS[selectedKey].icon}
              data={INCIDENTS[selectedKey][lang]}
              answers={answers}
              onAnswer={answerQuestion}
              onSubmit={submitTriage}
            />

            {result && (
              <div ref={resultRef}>
                <RecoveryPlan
                  risk={result.risk}
                  steps={result.steps}
                  checklist={checklist}
                  onToggleStep={toggleStep}
                  precautions={result.precautions}
                  onFileComplaint={handleFileComplaint}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
