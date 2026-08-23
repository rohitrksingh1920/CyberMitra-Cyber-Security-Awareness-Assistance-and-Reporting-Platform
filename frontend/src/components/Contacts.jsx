import React from "react";
import { contacts } from "../data";

export default function Contacts({ lang }) {
  return (
    <section className="contacts" id="help">
      <div className="contacts-head"><span className="kicker">KEEP THIS HANDY</span><h2>Emergency contacts</h2><p>Save these numbers before you need them.</p></div>
      <div className="contact-grid">
        {contacts.map(([name, val]) => (
          <div className="contact-card" key={name}>
            <span>{name}</span>
            <b>{val}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
