#!/bin/bash
set -e

REPO=/var/www/wedify/repo

echo "==> Pulling latest..."
cd "$REPO"
git pull

# Load server-side environment — never commit this file
ENV_FILE=/var/www/wedify/.env
if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: $ENV_FILE not found. Create it from .env.example before deploying." >&2
  exit 1
fi
cp "$ENV_FILE" "$REPO/.env"

echo "==> Building containers..."
docker compose build

echo "==> Starting services (rolling restart)..."
docker compose up -d

echo "==> Waiting for health checks..."
sleep 15

echo "==> Smoke test..."
curl -sf -o /dev/null http://localhost/ && echo "Frontend OK" || echo "Frontend FAIL"
curl -sf -o /dev/null http://localhost/api/v1/health && echo "Backend OK" || echo "Backend FAIL"

echo "==> Deploy complete."
