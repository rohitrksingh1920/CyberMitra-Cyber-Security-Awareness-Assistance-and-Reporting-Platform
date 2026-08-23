export default function IncidentCard({ icon, label, sub, active, onClick }) {
  return (
    <button className={`incident-card ${active ? 'active' : ''}`} onClick={onClick}>
      <span className="ic">{icon}</span>
      <h4>{label}</h4>
      <p>{sub}</p>
    </button>
  );
}
