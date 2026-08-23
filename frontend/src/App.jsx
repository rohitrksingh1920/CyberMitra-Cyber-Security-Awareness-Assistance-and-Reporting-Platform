import { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import Navbar from './components/Navbar';
import NoticeBar from './components/NoticeBar';
import Hero from './components/Hero';
import SOSSection from './components/SOSSection';
import ComplaintTracker from './components/ComplaintTracker';
import SuspectChecker from './components/SuspectChecker';
import Volunteers from './components/Volunteers';
import SafetyTips from './components/SafetyTips';
import Advisories from './components/Advisories';
import FAQ from './components/FAQ';
import Contacts from './components/Contacts';
import ComplaintModal from './components/ComplaintModal';
import Footer from './components/Footer';

function AppShell() {
  const { t, tiles } = useLanguage();

  // Complaints filed during this session, keyed by demo reference number.
  const [complaints, setComplaints] = useState({});

  // Modal state: which category, which phase ('form' | 'ack'), and the generated reference.
  const [modal, setModal] = useState({ open: false, category: 'other', phase: 'form', ref: '' });

  const openComplaint = (category) => {
    setModal({ open: true, category, phase: 'form', ref: '' });
  };

  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const submitComplaint = () => {
    const category = modal.category;
    const ref = 'CS' + category.slice(0, 3).toUpperCase() + '-' + Math.floor(100000 + Math.random() * 899999);
    setComplaints((prev) => ({
      ...prev,
      [ref]: {
        category,
        categoryLabel: tiles[category].title,
        time: new Date().toLocaleTimeString(),
        stage: 1
      }
    }));
    setModal((m) => ({ ...m, phase: 'ack', ref }));
  };

  const goToSos = () => {
    closeModal();
    document.getElementById('sos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <Navbar />
      <NoticeBar />

      <main>
        <Hero onOpenComplaint={openComplaint} />
        <SOSSection onFileComplaint={openComplaint} />
        <ComplaintTracker complaints={complaints} />
        <SuspectChecker />
        <Volunteers />
        <SafetyTips />
        <Advisories />
        <FAQ />
        <Contacts />
      </main>

      <a href="#sos" className="fab">{t.fab}</a>

      <ComplaintModal
        open={modal.open}
        categoryLabel={tiles[modal.category]?.title}
        phase={modal.phase}
        refNumber={modal.ref}
        onClose={closeModal}
        onSubmit={submitComplaint}
        onGoSos={goToSos}
      />

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}
