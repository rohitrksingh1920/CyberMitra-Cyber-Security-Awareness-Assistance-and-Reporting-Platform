import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FAQS } from '../data/faqs';

export default function FAQ() {
  const { lang, t } = useLanguage();
  const faqs = FAQS[lang];
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="faq">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">{t.faqKicker}</div>
          <h2>{t.faqH2}</h2>
        </div>
        <div className="card-panel">
          {faqs.map((f, i) => (
            <div className={`faq-item ${openIndex === i ? 'open' : ''}`} key={i}>
              <div className="faq-q" onClick={() => toggle(i)}>
                <span>{f.q}</span>
                <span className="plus">+</span>
              </div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
