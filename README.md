# CyberMitra — Full-Stack Deployment Guide

This project has three parts:

```
cybermitra/
├── backend/     FastAPI API (complaints, suspect checker, contact, quiz, pledge)
├── frontend/    Your existing React/Vite site, now wired to the backend
├── nginx/       Edge reverse proxy config (TLS termination, routing)
├── deploy/      Let's Encrypt bootstrap script
├── docker-compose.yml       Production stack (db + backend + frontend + proxy + certbot)
└── docker-compose.dev.yml   Local dev stack (db + backend only; run frontend with `npm run dev`)
```

## What was added to the backend

| Endpoint | Purpose |
|---|---|
| `POST /api/complaints` | Submit an FIR/complaint draft → returns a reference code (e.g. `CM-20260822-AB12CD`) |
| `GET /api/complaints/{ref}` | Citizen-facing: track a complaint by reference code |
| `GET /api/complaints` | Admin-only (`X-Admin-Key` header): list all complaints |
| `PATCH /api/complaints/{ref}` | Admin-only: update status/notes |
| `POST /api/suspects/check` | Check if a phone/UPI/URL was reported before |
| `POST /api/suspects/report` | Report a suspicious phone/UPI/URL |
| `POST /api/contact` | Contact form submissions |
| `POST /api/quiz/results`, `GET /api/quiz/stats` | Quiz score logging |
| `POST /api/pledge`, `GET /api/pledge/count` | Pledge signatures |
| `GET /api/health` | Health check |

Interactive API docs are available at `/api/docs` (Swagger) once running.

**Important:** these complaint drafts are stored by CyberMitra only — they are **not** an official FIR. The UI always tells users to also file at cybercrime.gov.in or call 1930, exactly as your original site did.

## What changed in the frontend

Your site's "Report Cyber Crime" popup now has two new tabs alongside "Official Portal" and "FIR Format":

- **Track Complaint** — enter a reference code, see status
- **Check a Number/Link** — check/report a suspicious phone number, UPI ID, or URL

The FIR Format tab also gained a **"Submit to CyberMitra & Get Reference No."** button that posts the form to the backend and displays the reference code. All of this is bilingual (EN/HI), matching your existing pattern.

No other part of your design/content was touched — same CSS, same layout, same copy.

---

## Part 1 — Get a server

If you don't have one yet: buy a small VPS (DigitalOcean, Hetzner, Linode, AWS Lightsail — any works). Cheapest tier is enough for this app (1 vCPU / 1–2GB RAM). Choose **Ubuntu 22.04 or 24.04**.

You'll get an IP address, e.g. `203.0.113.10`.

## Part 2 — Point your domain at the server

In your domain registrar's DNS settings, add:

| Type | Name | Value |
|---|---|---|
| A | `@` | `203.0.113.10` |
| A | `www` | `203.0.113.10` |

DNS can take a few minutes to a few hours to propagate. Check with:
```bash
dig +short yourdomain.com
```
It should return your server's IP.

## Part 3 — Install Docker on the server

SSH into the server, then:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

Also open the firewall for web traffic (skip if your provider handles this):
```bash
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## Part 4 — Upload the project

From your own machine:
```bash
scp -r cybermitra your-user@203.0.113.10:~/cybermitra
```
Or `git clone` it if you push this to a repo.

## Part 5 — Configure secrets

On the server:
```bash
cd ~/cybermitra
cp .env.example .env
nano .env
```
Set a strong `POSTGRES_PASSWORD`, a random `ADMIN_API_KEY` (this protects the admin endpoints — treat it like a password), and your real domain in `CORS_ORIGINS`.

Generate a random key quickly with:
```bash
openssl rand -hex 32
```

## Part 6 — Get HTTPS certificates and launch

```bash
chmod +x deploy/init-letsencrypt.sh
DOMAIN=yourdomain.com EMAIL=you@example.com ./deploy/init-letsencrypt.sh
```

This script:
1. Writes your domain into the nginx config
2. Starts nginx with a temporary certificate so it can boot
3. Requests a real certificate from Let's Encrypt
4. Reloads nginx with the real certificate
5. Brings up the full stack (`db`, `backend`, `frontend`, `proxy`, `certbot`)

Visit `https://yourdomain.com` — your site should be live, and the FIR form, complaint tracker, and number checker should all work end-to-end.

> Tip: the very first time, test with `STAGING=1 DOMAIN=... EMAIL=... ./deploy/init-letsencrypt.sh` to get a fake (browser-untrusted) certificate first — this avoids hitting Let's Encrypt's rate limits if something's misconfigured. Once it works, rerun without `STAGING=1`.

Certificates auto-renew every 12 hours via the `certbot` service (Let's Encrypt certs are valid 90 days; certbot renews when there's <30 days left).

## Everyday operations

```bash
# View logs
docker compose logs -f backend
docker compose logs -f proxy

# Redeploy after code changes
docker compose up -d --build

# Stop everything
docker compose down

# Stop and wipe the database (careful!)
docker compose down -v
```

## Using the admin endpoints

To see submitted complaints:
```bash
curl -H "X-Admin-Key: <your ADMIN_API_KEY>" https://yourdomain.com/api/complaints
```

To update a complaint's status:
```bash
curl -X PATCH https://yourdomain.com/api/complaints/CM-20260822-AB12CD \
  -H "X-Admin-Key: <your ADMIN_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"status": "under_review", "admin_notes": "Called back, gathering more info"}'
```

Consider building a small internal dashboard later if you're triaging complaints often — the API already supports everything a dashboard would need (list, filter via pagination, update status).

## Local development

Run backend + Postgres in Docker, and the frontend natively (with hot reload):
```bash
docker compose -f docker-compose.dev.yml up --build -d
cd frontend
npm install
npm run dev
```
Visit `http://localhost:5173`. Vite proxies `/api` to `http://localhost:8000` automatically — no CORS issues in dev.

## Database migrations

Tables are auto-created on backend startup (`SQLModel.metadata.create_all`), which is fine for getting started. If you later need schema migrations without data loss (e.g. adding a column in production), switch to Alembic:
```bash
cd backend
pip install -r requirements.txt --break-system-packages
alembic init alembic
# then configure alembic.ini / env.py to point at app.database.engine and app.models
```

## Security notes

- Change `ADMIN_API_KEY` and `POSTGRES_PASSWORD` before going live — the defaults in `.env.example` are placeholders only.
- The backend already rate-limits complaint/contact/suspect-report submissions to reduce spam/abuse.
- Postgres and the backend are never exposed directly to the internet — only `proxy` (80/443) is published; everything else talks over Docker's internal network.
- Consider adding a simple CAPTCHA (e.g. Cloudflare Turnstile) to the FIR form if you see spam submissions in production.
