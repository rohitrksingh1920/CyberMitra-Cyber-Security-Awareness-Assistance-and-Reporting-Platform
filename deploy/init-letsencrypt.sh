#!/usr/bin/env bash
# One-time script to bootstrap HTTPS certificates for CyberMitra using
# Let's Encrypt / Certbot. Run this ONCE, after DNS for your domain is
# already pointing at this server's IP address.
#
# Usage:
#   DOMAIN=example.com EMAIL=admin@example.com ./deploy/init-letsencrypt.sh
#
# What it does:
#   1. Writes your real domain into nginx/conf.d/app.conf
#   2. Creates a temporary self-signed cert so nginx can start at all
#      (nginx refuses to start if the ssl_certificate file is missing)
#   3. Starts the proxy container with that temporary cert
#   4. Requests a real certificate from Let's Encrypt via the HTTP-01 challenge
#   5. Reloads nginx to use the real certificate
#   6. Brings up the full stack
#
# Re-running is safe: if a real certificate already exists it will be
# reused (pass --force to re-issue anyway).

set -euo pipefail
cd "$(dirname "$0")/.."

DOMAIN="${DOMAIN:-yourdomain.com}"
WWW_DOMAIN="www.${DOMAIN}"
EMAIL="${EMAIL:-you@example.com}"
STAGING="${STAGING:-0}"   # set STAGING=1 first to test without hitting Let's Encrypt rate limits
FORCE_RENEW=0
[[ "${1:-}" == "--force" ]] && FORCE_RENEW=1

if [[ "$DOMAIN" == "yourdomain.com" ]]; then
  echo "!! Set DOMAIN (and EMAIL) before running, e.g.:"
  echo "   DOMAIN=example.com EMAIL=admin@example.com ./deploy/init-letsencrypt.sh"
  exit 1
fi

echo ">> Domain: $DOMAIN (+ $WWW_DOMAIN)   Contact email: $EMAIL"

echo ">> Writing real domain into nginx/conf.d/app.conf"
sed -i.bak "s/yourdomain.com/${DOMAIN}/g" nginx/conf.d/app.conf
rm -f nginx/conf.d/app.conf.bak

CERTBOT_CONF="./deploy/certbot-data/conf"
CERTBOT_WWW="./deploy/certbot-data/www"
LIVE_DIR="$CERTBOT_CONF/live/$DOMAIN"

mkdir -p "$CERTBOT_CONF" "$CERTBOT_WWW"

if [[ -e "$LIVE_DIR/fullchain.pem" && $FORCE_RENEW -eq 0 ]]; then
  echo ">> Existing certificate found for $DOMAIN — skipping issuance (use --force to redo)."
  docker compose up -d
  exit 0
fi

echo ">> Creating a temporary self-signed certificate so nginx can boot..."
mkdir -p "$LIVE_DIR"
docker run --rm \
  -v "$(pwd)/$CERTBOT_CONF:/etc/letsencrypt" \
  --entrypoint openssl \
  certbot/certbot req -x509 -nodes -newkey rsa:2048 -days 1 \
  -keyout "/etc/letsencrypt/live/$DOMAIN/privkey.pem" \
  -out "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" \
  -subj "/CN=localhost"

echo ">> Starting the proxy with the temporary certificate..."
docker compose up -d proxy

echo ">> Removing temporary certificate and requesting the real one..."
rm -rf "$LIVE_DIR"

STAGING_ARG=""
[[ "$STAGING" == "1" ]] && STAGING_ARG="--staging"

docker compose run --rm --entrypoint certbot certbot certonly \
  --webroot -w /var/www/certbot \
  -d "$DOMAIN" -d "$WWW_DOMAIN" \
  --email "$EMAIL" --agree-tos --no-eff-email --non-interactive $STAGING_ARG

echo ">> Reloading nginx with the real certificate..."
docker compose exec proxy nginx -s reload

echo ">> Bringing up the full stack..."
docker compose up -d

echo ""
echo "Done. Visit: https://$DOMAIN"
echo "Certificates auto-renew via the 'certbot' service (checks every 12h)."
