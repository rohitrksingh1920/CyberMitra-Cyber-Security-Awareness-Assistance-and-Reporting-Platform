# CyberMitra — UI v2 (design system + interactive features)

This document explains what changed in the front end, how the look is built, how the
dark/light mode works, and how to extend any of it. Nothing in `backend/`, `docker-compose.yml`
or the nginx setup had to change — rebuild the `frontend` image and you're live.

```
docker compose up -d --build frontend
```

---

## 1. The idea: the logo *is* the design system

The logo is a heavy black wordmark cut with **horizontal scan-lines**, a thick rule, and a
**burnt-copper** subtitle. The whole UI is built from just those three things:

| Logo element | Where it shows up in the UI |
|---|---|
| Scan-line stripes | hero headline word, big numerals (01–13, scores), the shield, section dividers, progress bars, link underlines, the faint hero background |
| Heavy black rule | 3 px border under the top bar, hero bottom edge, card outlines |
| Copper | buttons, kickers, active states, the shield's check-mark |
| Warm paper / warm black | page backgrounds (light / dark) — never pure white or pure black |

"Humanised" touches (deliberately imperfect, hand-made): masking-tape strips on the three quick
cards, slightly rotated cards that straighten on hover, hand-written margin notes
(*"free. no login. promise."*), hard offset shadows like a printed sticker, paper grain,
stamps, and plain-spoken microcopy.

The logo itself is **one PNG split into two alpha masks** (`public/logo-ink-mask.png`,
`public/logo-copper-mask.png`) painted with CSS variables, so it recolours itself for dark mode
and animates (scan-in on load, shiver on hover). The original PNGs are untouched.

## 2. Light / dark mode

* `html[data-theme="light" | "dark"]` drives everything; all colours are tokens in
  `src/styles/tokens.css`. **Never hard-code a colour in a component** — use a token.
* First visit follows the OS setting (`prefers-color-scheme`); after the visitor presses the
  sun/moon button the choice is stored in `localStorage` (`cybermitra-theme`).
* A tiny inline script in `index.html` sets the theme **before first paint** — no flash of the wrong theme.
* The switch is a circular reveal from the button (View Transitions API) with a plain cross-fade fallback;
  both are skipped when the visitor prefers reduced motion.
* The hero shield (canvas) and the simulated phone screens (WhatsApp/SMS) re-paint for the theme too.
* Console: `cmSetTheme('dark')` / `cmToggleTheme()` for quick testing.

## 3. New interactive features

| Feature | Where | Notes |
|---|---|---|
| **"What happened?" helper** | `#help`, right under the hero | 3 taps → a tick-off checklist for: money lost, shared OTP/PIN, clicked link/app, hacked account, blackmail, ID misuse. Shows an urgent **1930** button when money was lost in the last day. "Start my complaint draft" opens the FIR form **pre-filled** (type, date, description). Nothing is sent anywhere. |
| **Red-flag hunt** | `#hunt` | Tap the suspicious parts of 3 realistic messages (SMS / WhatsApp / UPI), check yourself, see what you caught, what you missed, and false alarms. EN + HI. |
| **Search / command palette** | `Ctrl/⌘ + K` or `/` | Searches case files (including their body text), real fraud patterns, rules, glossary, helplines, and actions (SOS, draft FIR, toggle theme, switch language, copy 1930). English and Hindi text are searched together. |
| **Dark / light toggle** | top bar | see §2 |
| **Scroll-spy nav + mobile menu** | top bar | the section you're in is underlined with a scan-line; hamburger menu on phones |
| **Click-to-copy helplines** | contacts table, SOS popup, hero | copies on desktop, dials on phones; toast confirmation |
| **Quiz upgrades** | `#quiz` | segment progress bar, keyboard (`1–4` / `A–D`, `Enter`), score posted anonymously to `POST /api/quiz/results`, then shows *"Across N attempts the average is X/5"* from `GET /api/quiz/stats` (silently skipped if the API is down) |
| **Case-file accordion** | `#learn` | folder-tab cards, smooth open/close, keyboard accessible (`Enter`/`Space`), `aria-expanded` |
| **Evidence checklist** | `#report` | tap items to tick them off while you gather evidence |
| **Count-up stats, scroll reveals, scan-line progress bar** | page-wide | all disabled under `prefers-reduced-motion` |

Keyboard cheat-sheet: `Ctrl/⌘+K` or `/` search · `Esc` closes any popup · `1–4`/`A–D` + `Enter` in the quiz.

## 4. Accessibility & performance

* Skip link, visible focus rings (copper), `role="dialog"`/`aria-modal` on all popups with **focus trap + focus return**,
  backdrop-click and `Esc` to close, `aria-live` toasts, keyboard-operable accordions and checklists.
* Body font is **Atkinson Hyperlegible Next** (designed for legibility — a good fit for first-time internet users);
  Hindi uses **Noto Sans Devanagari**; headings use **Unbounded** (wide, like the logo); notes use **Kalam**.
* Fonts are **self-hosted** via `@fontsource` (latin + latin-ext for ₹ + devanagari only, ≈ 0.6 MB total, loaded on demand
  by `unicode-range`). No Google Fonts request → faster, works offline, nothing leaks to a third party.
* The hero canvas pauses when off-screen / tab hidden. The 1.4 MB sticker logo is served as a 230 KB copy in the footer.
* Fixed an old bug: simulated WhatsApp chats showed English text in Hindi mode (inline `display` styles).
* Replaced the one remaining `alert()` (copy FIR draft) with a toast.

## 5. File map

```
frontend/
├─ index.html                  no-flash theme script, meta tags, favicon
├─ public/
│  ├─ logo-ink-mask.png        } the logo as two theme-able masks
│  ├─ logo-copper-mask.png     }
│  ├─ favicon.svg              striped shield
│  └─ cybermitra-sticker-logo-sm.png   footer sticker (original kept for social previews)
├─ src/
│  ├─ main.jsx                 fonts + styles + page markup + script order
│  ├─ styles/
│  │  ├─ tokens.css            ★ colours (light + dark), fonts, radii — start here
│  │  ├─ base.css              reset, type, language switch, buttons, scan-line utilities
│  │  ├─ layout.css            top bar, logo, hero, sections, footer, floating SOS
│  │  ├─ components.css        case files, phone mocks, real cases, quiz, rules, report, contacts, about
│  │  ├─ modals.css            first-visit chooser, SOS, report/FIR/track/check popup
│  │  └─ features.css          toasts, search palette, help checklist, red-flag hunt
│  └─ legacy/
│     ├─ body.html             the page markup (EN + HI side by side: <span class="en">…</span><span class="hi">…</span>)
│     ├─ script_0.js           content data (topics, rules, quiz…), renderers, language switch, SOS
│     ├─ script_1.js           report / FIR popup          script_7.js  backend calls (complaints, tracking, checker)
│     ├─ script_5.js           hero shield canvas (theme-aware)
│     ├─ features_core.js      theme, nav, toasts, copy, ARIA/focus, quiz stats
│     └─ features_help.js      help checklist, red-flag hunt, search palette
└─ tools/ui-smoke-test.py      18-check browser test (see §7)
```

## 6. How to change things

* **Brand colours**: edit `tokens.css` only (light block + `html[data-theme="dark"]` block).
* **Page text / a new section**: `legacy/body.html`. Always write both languages. Add `class="sv-reveal"` for scroll-in.
* **Case files, rules, quiz questions, helplines, glossary**: the arrays at the top of `legacy/script_0.js`.
* **Help-checklist scenarios / steps**: `SCEN`, `STEP`, `PLAN` at the top of `legacy/features_help.js`.
* **Red-flag messages**: the `HUNT` array in the same file (`f:1` marks a red flag and carries its explanation; `s:1` = plain text).
* **Language-aware JS**: use `cmT('English', 'हिन्दी')`. **Toast**: `cmToast('Saved')`. **Copy**: `cmCopy('1930')`.
* Components that sit on an inverted (dark-block) section automatically flip: inside `.section-dark` the tokens
  `--ink`, `--surface`, … are re-mapped, so just keep using tokens.

## 7. Testing

```bash
cd frontend
npm run build
pip install playwright && playwright install chromium
python tools/ui-smoke-test.py          # 18 checks: theme, search, help checklist, hunt, accordion, quiz, copy, Hindi…
```

Verified in headless Chromium at 1440×900 and 390×844 (phone), light and dark, English and Hindi.

## 8. Not included (ideas for later)

* A "pledge wall" (the old pledge markup was removed from the page; `POST /api/pledge` + `GET /api/pledge/count` still exist in the backend).
* A real Hindi/English **voice** for the "Hear what this call sounds like" player is still the browser's built-in speech synthesis.
* An admin screen to triage complaints (the API already supports it).
