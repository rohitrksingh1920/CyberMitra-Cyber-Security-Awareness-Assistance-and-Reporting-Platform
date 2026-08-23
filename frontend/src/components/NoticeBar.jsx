import { useLanguage } from '../context/LanguageContext';
import { NOTICES } from '../data/notices';

export default function NoticeBar() {
  const { lang, t } = useLanguage();
  const items = NOTICES[lang];
  const doubled = [...items, ...items]; // duplicated for a seamless scroll loop

  return (
    <div className="notice-strip">
      <div className="notice-inner">
        <span className="notice-label">{t.noticeLabel}</span>
        <div className="notice-track-outer">
          <div className="notice-track">
            {doubled.map((n, i) => <span key={i}>{n}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
