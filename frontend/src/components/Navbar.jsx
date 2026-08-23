import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { t, tiles } = useLanguage();

  const scrollToTile = (key) => {
    const el = document.getElementById(`tile-${key}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <nav className="megabar">
      <div className="wrap nav-inner">
        <div className="nav-item"><a href="#home">{t.navHome}</a></div>

        <div className="nav-item">
          <button>{t.navComplaint}</button>
          <div className="dropdown">
            <a href="#tile-fraud" onClick={() => scrollToTile('fraud')}>{tiles.fraud.title}</a>
            <a href="#tile-other" onClick={() => scrollToTile('other')}>{tiles.other.title}</a>
          </div>
        </div>

        <div className="nav-item"><a href="#track">{t.navTrack}</a></div>

        <div className="nav-item">
          <button>{t.navSuspect}</button>
          <div className="dropdown">
            <a href="#suspect">{t.navSuspectCheck}</a>
            <a href="#suspect">{t.navSuspectReport}</a>
          </div>
        </div>

        <div className="nav-item"><a href="#volunteers">{t.navVol}</a></div>

        <div className="nav-item">
          <button>{t.navLearn}</button>
          <div className="dropdown">
            <a href="#tips">{t.navTips}</a>
            <a href="#faq">{t.navFaq}</a>
            <a href="#advisories">{t.navAdv}</a>
          </div>
        </div>

        <div className="nav-item"><a href="#contacts">{t.navContact}</a></div>
        <div className="nav-item emergency"><a href="#sos">{t.navSos}</a></div>
      </div>
    </nav>
  );
}
