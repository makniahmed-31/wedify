#!/bin/bash
set -e

REPO=/var/www/wedify/repo
PROD_FRONTEND=/var/www/wedify/frontend
PROD_BACKEND=/var/www/wedify/backend
ROOT_BINS=$REPO/node_modules/.bin

echo "==> Pulling latest from git..."
cd $REPO
git pull

echo "==> Installing dependencies..."
npm install

echo "==> Building frontend..."
$ROOT_BINS/next build --cwd $REPO/frontend

echo "==> Staging frontend..."
STANDALONE=$REPO/frontend/.next/standalone
mkdir -p $STANDALONE/frontend/.next
cp -r $REPO/frontend/.next/static $STANDALONE/frontend/.next/static
cp -r $REPO/frontend/public $STANDALONE/frontend/public

rm -rf $PROD_FRONTEND/.next/standalone
cp -r $STANDALONE $PROD_FRONTEND/.next/standalone

echo "==> Building backend..."
cd $REPO/backend
$ROOT_BINS/nest build

echo "==> Staging backend..."
cp -r $REPO/backend/dist $PROD_BACKEND/dist.new
rm -rf $PROD_BACKEND/dist
mv $PROD_BACKEND/dist.new $PROD_BACKEND/dist

echo "==> Restarting services..."
PORT=4000 pm2 restart wedify-frontend --update-env
pm2 restart wedify-backend

echo "==> Smoke test..."
sleep 4
curl -sf -o /dev/null http://187.124.39.154/ && echo "Frontend OK" || echo "Frontend FAIL"
curl -sf -o /dev/null http://187.124.39.154/api/v1/health && echo "Backend OK" || echo "Backend FAIL"

pm2 save
echo "==> Deploy complete."
