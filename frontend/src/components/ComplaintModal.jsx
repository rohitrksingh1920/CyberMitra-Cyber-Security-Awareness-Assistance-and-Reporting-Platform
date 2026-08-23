import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ComplaintModal({ open, categoryLabel, phase, refNumber, onClose, onSubmit, onGoSos }) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [desc, setDesc] = useState('');

  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = () => {
    onSubmit({ name, mobile, desc });
    setName(''); setMobile(''); setDesc('');
  };

  return (
    <div className="overlay show" onClick={handleOverlayClick}>
      <div className="modal">
        {phase === 'form' ? (
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--blue)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 6 }}>
              {categoryLabel}
            </div>
            <h3 style={{ marginBottom: 16 }}>{t.complaintTitle}</h3>
            <div className="field"><label>{t.nameLabel}</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div className="field"><label>{t.mobileLabel}</label><input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} /></div>
            <div className="field"><label>{t.descLabel}</label><textarea placeholder={t.descPlaceholder} value={desc} onChange={(e) => setDesc(e.target.value)} /></div>
            <button className="btn-block" onClick={handleSubmit}>{t.submitReportBtn}</button>
            <p style={{ fontSize: 11.5, color: 'var(--text-faint)', marginTop: 10, textAlign: 'center' }}>{t.demoOnlyNote}</p>
          </div>
        ) : (
          <>
            <div className="check-icon">✓</div>
            <h3>{t.ackTitle}</h3>
            <p>{t.ackDesc}</p>
            <div className="ref-box">{refNumber}</div>
            <p>{t.ackNote}</p>
            <div className="modal-actions">
              <button className="primary" onClick={onGoSos}>{t.goSosBtn}</button>
              <button className="secondary" onClick={onClose}>{t.closeBtn}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
