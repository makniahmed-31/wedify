#!/bin/bash
set -e

REPO=/var/www/wedify/repo
PROD_FRONTEND=/var/www/wedify/frontend
PROD_BACKEND=/var/www/wedify/backend
ROOT_BINS=$REPO/node_modules/.bin
FRONTEND_BINS=$REPO/frontend/node_modules/.bin

echo "==> Pulling latest from git..."
cd $REPO
git pull

echo "==> Installing dependencies..."
npm install

echo "==> Building frontend..."
cd $REPO/frontend
$FRONTEND_BINS/next build
cd $REPO

echo "==> Staging frontend..."
STANDALONE=$REPO/frontend/.next/standalone

# Workspace build puts server.js in standalone/frontend/ — handle both layouts
if [ -f "$STANDALONE/frontend/server.js" ]; then
  SERVER_DIR=$STANDALONE/frontend
  mkdir -p $SERVER_DIR/.next
  cp -r $REPO/frontend/.next/static $SERVER_DIR/.next/static 2>/dev/null || true
  cp -r $REPO/frontend/public $SERVER_DIR/public 2>/dev/null || true
  rm -rf $PROD_FRONTEND/.next/standalone
  cp -r $STANDALONE $PROD_FRONTEND/.next/standalone
  # Update PM2 to use nested path
  pm2 delete wedify-frontend 2>/dev/null || true
  PORT=4000 BACKEND_INTERNAL_URL=http://localhost:4001 ADMIN_SECRET=wedify_admin_2026_secret \
    pm2 start $PROD_FRONTEND/.next/standalone/frontend/server.js \
    --name wedify-frontend \
    --cwd $PROD_FRONTEND/.next/standalone
else
  mkdir -p $STANDALONE/.next
  cp -r $REPO/frontend/.next/static $STANDALONE/.next/static 2>/dev/null || true
  cp -r $REPO/frontend/public $STANDALONE/public 2>/dev/null || true
  rm -rf $PROD_FRONTEND/.next/standalone
  cp -r $STANDALONE $PROD_FRONTEND/.next/standalone
  PORT=4000 BACKEND_INTERNAL_URL=http://localhost:4001 ADMIN_SECRET=wedify_admin_2026_secret \
    pm2 restart wedify-frontend --update-env 2>/dev/null || \
    PORT=4000 BACKEND_INTERNAL_URL=http://localhost:4001 ADMIN_SECRET=wedify_admin_2026_secret \
    pm2 start $PROD_FRONTEND/.next/standalone/server.js \
      --name wedify-frontend \
      --cwd $PROD_FRONTEND/.next/standalone
fi

echo "==> Building backend..."
cd $REPO/backend
$ROOT_BINS/nest build
cd $REPO

echo "==> Staging backend..."
rm -rf $PROD_BACKEND/dist.bak
mv $PROD_BACKEND/dist $PROD_BACKEND/dist.bak 2>/dev/null || true
cp -r $REPO/backend/dist $PROD_BACKEND/dist
pm2 restart wedify-backend

echo "==> Smoke test..."
sleep 5
curl -sf -o /dev/null http://187.124.39.154/ && echo "Frontend OK" || echo "Frontend FAIL"
curl -sf -o /dev/null http://187.124.39.154/api/v1/health && echo "Backend OK" || echo "Backend FAIL"

pm2 save
echo "==> Deploy complete."
