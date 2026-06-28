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
# NODE_ENV=production skips devDependencies; force include them for build tools.
# Also install in each workspace locally — Turbopack can't resolve packages
# hoisted to the root node_modules (native bindings, peer deps).
NODE_ENV=development npm install --silent
cd "$REPO/backend" && NODE_ENV=development npm install --silent
cd "$REPO/frontend" && NODE_ENV=development npm install --silent
cd "$REPO"

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

# Copy static assets into standalone before staging
mkdir -p "$STANDALONE/.next"
cp -r "$REPO/frontend/.next/static" "$STANDALONE/.next/static" 2>/dev/null || true
cp -r "$REPO/frontend/public" "$STANDALONE/public" 2>/dev/null || true

rm -rf "$PROD_FRONTEND/.next/standalone"
cp -r "$STANDALONE" "$PROD_FRONTEND/.next/standalone"

echo "==> Syncing static files to nginx path..."
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
