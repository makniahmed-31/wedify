#!/bin/bash
set -e

REPO=/var/www/wedify/repo
PROD_FRONTEND=/var/www/wedify/frontend
PROD_BACKEND=/var/www/wedify/backend
FRONTEND_BINS=$REPO/frontend/node_modules/.bin

# Load server-side environment — never commit this file to git
ENV_FILE=/var/www/wedify/.env
if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: $ENV_FILE not found. Create it from .env.example before deploying." >&2
  exit 1
fi
set -a
# shellcheck source=/dev/null
source "$ENV_FILE"
set +a

echo "==> Pulling latest..."
cd "$REPO"
git pull

echo "==> Installing dependencies..."
npm install --silent

# ─── Backend ─────────────────────────────────────────────────────────────────

echo "==> Building backend..."
cd "$REPO/backend"
"$REPO/node_modules/.bin/nest" build
cd "$REPO"

echo "==> Staging backend..."
rm -rf "$PROD_BACKEND/dist.bak"
mv "$PROD_BACKEND/dist" "$PROD_BACKEND/dist.bak" 2>/dev/null || true
cp -r "$REPO/backend/dist" "$PROD_BACKEND/dist"

echo "==> Restarting backend..."
pm2 restart wedify-backend --update-env

# ─── Frontend ────────────────────────────────────────────────────────────────

echo "==> Building frontend..."
cd "$REPO/frontend"
"$FRONTEND_BINS/next" build
cd "$REPO"

echo "==> Staging frontend..."
STANDALONE="$REPO/frontend/.next/standalone"

# Production uses workspace-nested layout: standalone/frontend/server.js
mkdir -p "$STANDALONE/frontend/.next"
cp -r "$REPO/frontend/.next/static" "$STANDALONE/frontend/.next/static" 2>/dev/null || true
cp -r "$REPO/frontend/public" "$STANDALONE/frontend/public" 2>/dev/null || true
rm -rf "$PROD_FRONTEND/.next/standalone"
cp -r "$STANDALONE" "$PROD_FRONTEND/.next/standalone"

echo "==> Syncing static files..."
rm -rf "$PROD_FRONTEND/.next/static"
cp -r "$REPO/frontend/.next/static" "$PROD_FRONTEND/.next/static"

echo "==> Restarting frontend..."
pm2 restart wedify-frontend --update-env

pm2 save

# ─── Smoke test ──────────────────────────────────────────────────────────────

echo "==> Smoke test..."
sleep 5
curl -sf -o /dev/null "http://localhost:${FRONTEND_PORT:-4000}/" && echo "Frontend OK" || echo "Frontend FAIL"
curl -sf "http://localhost:${PORT:-4001}/api/v1/health" && echo " — Backend OK" || echo "Backend FAIL"

echo "==> Deploy complete."
