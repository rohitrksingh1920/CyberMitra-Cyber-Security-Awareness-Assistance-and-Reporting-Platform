import { useLanguage } from '../context/LanguageContext';

export default function TriagePanel({ icon, data, answers, onAnswer, onSubmit }) {
  const { t } = useLanguage();
  const allAnswered = data.questions.every((q) => answers[q.id]);

  return (
    <div className="triage-panel">
      <div className="sel-label">{t.selectedIncident}</div>
      <h3>{icon} {data.label}</h3>

      {data.questions.map((q) => (
        <div className="q-block" key={q.id}>
          <p>{q.text}</p>
          <div className="q-opts">
            <button
              className={`q-opt ${answers[q.id] === 'yes' ? 'picked-yes' : ''}`}
              onClick={() => onAnswer(q.id, 'yes')}
            >{t.yes}</button>
            <button
              className={`q-opt ${answers[q.id] === 'no' ? 'picked-no' : ''}`}
              onClick={() => onAnswer(q.id, 'no')}
            >{t.no}</button>
          </div>
        </div>
      ))}

      <button className="triage-cta" disabled={!allAnswered} onClick={onSubmit}>
        {t.showPlan}
      </button>
    </div>
  );
}
