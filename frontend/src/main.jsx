import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

/* ---- fonts: self-hosted (no Google Fonts request, works offline, GDPR-friendly) ----
   Only the subsets this site needs: latin (+ latin-ext, which carries the ₹ sign) and devanagari for Hindi. */
import "@fontsource/unbounded/latin-600.css";
import "@fontsource/unbounded/latin-ext-600.css";
import "@fontsource/unbounded/latin-800.css";
import "@fontsource/unbounded/latin-ext-800.css";
import "@fontsource/atkinson-hyperlegible-next/latin-400.css";
import "@fontsource/atkinson-hyperlegible-next/latin-ext-400.css";
import "@fontsource/atkinson-hyperlegible-next/latin-600.css";
import "@fontsource/atkinson-hyperlegible-next/latin-700.css";
import "@fontsource/atkinson-hyperlegible-next/latin-ext-700.css";
import "@fontsource/atkinson-hyperlegible-next/latin-800.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-ext-400.css";
import "@fontsource/jetbrains-mono/latin-700.css";
import "@fontsource/kalam/latin-400.css";
import "@fontsource/kalam/devanagari-400.css";
import "@fontsource/noto-sans-devanagari/devanagari-400.css";
import "@fontsource/noto-sans-devanagari/devanagari-600.css";
import "@fontsource/noto-sans-devanagari/devanagari-700.css";

/* ---- design system (see README-DESIGN.md) ---- */
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/modals.css";
import "./styles/features.css";

/* ---- page markup + behaviour (extracted from the original single-file build) ---- */
import bodyHtml from "./legacy/body.html?raw";
import s0 from "./legacy/script_0.js?raw";      // content data + renderers + language + SOS
import s1 from "./legacy/script_1.js?raw";      // report / FIR popup
import s2 from "./legacy/script_2.js?raw";
import s3 from "./legacy/script_3.js?raw";      // landing chooser
import s4 from "./legacy/script_4.js?raw";      // scroll reveal + progress
import s5 from "./legacy/script_5.js?raw";      // hero shield canvas
import s6 from "./legacy/script_6.js?raw";
import s7 from "./legacy/script_7.js?raw";      // backend integration (complaints, tracking, suspect check)
import f1 from "./legacy/features_core.js?raw"; // theme, nav, toasts, copy, a11y, quiz stats
import f2 from "./legacy/features_help.js?raw"; // triage helper, red-flag hunt, search palette

if (typeof window !== "undefined") {
  window.CYBERMITRA_API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
}

// order matters: data/renderers first, features last (they read the globals above)
const SCRIPTS = [s0, s1, s2, s3, s4, s5, s6, s7, f1, f2];

function App() {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const injected = SCRIPTS.map((code) => {
      const el = document.createElement("script");
      el.type = "text/javascript";
      el.text = code;
      document.body.appendChild(el);
      return el;
    });
    document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true, cancelable: true }));
    return () => injected.forEach((el) => el.remove());
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}

createRoot(document.getElementById("root")).render(<App />);
