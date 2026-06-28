# Wedify — Improvement Roadmap

## Audit Summary

| Area | Status | Verdict |
|------|--------|---------|
| Local dev | Mostly good | Minor fixes needed |
| Standalone (Next.js) | Correct choice | Keep, clean up deploy.sh |
| Monorepo (npm workspaces) | Adequate | Missing shared package, dual ORM problem |
| Deployment | Multiple red flags | Security + process overhaul needed |
| PostgreSQL | Excellent choice | Keep it — do not switch to MongoDB |

---

## Priority 1 — Security ✅ Done

- [x] **Remove `backend/.env` from git** — already gitignored via `backend/.env*` in root `.gitignore`. Verify no secrets are tracked: `git ls-files backend/.env` returns nothing. Still rotate Google OAuth + JWT secrets if they were ever committed.
- [x] **Create non-root deploy user on server** — `scripts/server-setup.sh` created. Run it once on the server as root, then copy your SSH key and disable root login per the printed instructions.
- [x] **Remove hardcoded secrets from `deploy.sh`** — `wedify_admin_2026_secret` and other inline env vars removed. `deploy.sh` now sources `/var/www/wedify/.env` on the server at deploy time.
- [x] **Set TypeORM `synchronize: false` in production** — `backend/src/app.module.ts` now uses `synchronize: process.env.NODE_ENV !== "production"`. Auto-sync only runs in dev.

---

## Priority 2 — Architecture (Fix This Sprint)

- [x] **Chose PM2 over Docker Compose for this shared server** — server runs casadimoda + rentigo + wedify behind system nginx; Docker nginx would conflict on port 80/443. Docker removed from server (freed 377 MB). `deploy.sh` cleaned up: sources secrets from `/var/www/wedify/.env` (created on server, chmod 600), single standalone layout (workspace-nested path always). `docker-compose.yml` kept in repo for future dedicated-server migration. Real ports: backend=4001, frontend=4000 — matched in deploy.sh smoke test
- [x] **Fix the dual ORM problem** — TypeORM removed from backend. Prisma v7 is now the single ORM. All services (users, vendors, blog, bookings, reviews, admin, analytics, marketplace) refactored to use `PrismaService`. `@nestjs/typeorm` and `typeorm` deps removed. Prisma deps removed from frontend.
- [x] **Move Prisma schema to `backend/prisma/`** — schema now lives at `backend/prisma/schema.prisma`. CLI config at `backend/prisma.config.ts`. Root `db:migrate` and `db:studio` scripts updated to point to backend.
- [ ] **Create `packages/shared/`** — TypeScript types, enums (`UserRole`, `BookingStatus`, etc.), and Zod schemas are duplicated between frontend and backend. A shared package enforces a contract and prevents drift
- [ ] **Fix port inconsistencies** — backend port is `4001` in `backend/.env` (local dev), `3001` in `docker-compose.yml` (Docker/prod). Document: 3001 = Docker/prod, 4001 = local dev only

---

## Priority 3 — Developer Experience (Next 2 Weeks)

- [ ] **Add GitHub Actions CI/CD pipeline** — currently all deployments are manual via `deploy.sh`. Workflow: lint → typecheck → test → build → deploy on push to `main`
- [ ] **Add `docker-compose.dev.yml`** — override for local development with volume mounts for hot reload inside containers. Currently dev runs bare Node, not Docker
- [ ] **Enable TypeScript strict mode in backend** — `backend/tsconfig.json` disables `strictNullChecks` and `noImplicitAny`. Frontend has strict mode. Align them to catch bugs earlier
- [ ] **Separate `.env.local` from `.env.production`** — document which env vars are needed for each environment in `.env.example`
- [x] **Fix `deploy.sh` dual-path standalone logic** — removed entirely. Docker Compose builds the standalone image internally; no manual file staging needed

---

## Priority 4 — Reliability (Next Month)

- [ ] **Zero-downtime deploys** — `docker compose up -d` restarts containers briefly. Fix: add `deploy.update_config: order: start-first` in docker-compose.yml for rolling updates
- [ ] **Add staging environment** — deploy to a staging URL before production. Reuse Docker Compose with different env vars
- [ ] **Add rollback script** — git-tag each release, keep last 2 `dist/` snapshots on server. Script to revert to previous tag
- [ ] **Add E2E tests with Playwright** — critical paths: vendor signup → profile creation → booking flow → payment. Unit tests exist but no integration tests
- [ ] **Move secrets to a vault** — use Doppler, HashiCorp Vault, or GitHub Actions secrets + SSH deploy keys. No secrets in scripts or git
- [ ] **Database backup cron job** — daily `pg_dump` to S3/R2, test restores monthly
- [ ] **Error monitoring** — add Sentry to both frontend and backend. Currently no visibility into production errors

---

## Architecture Notes

### Why PostgreSQL over MongoDB

Wedify has 25+ tables with deep relational chains (User → Vendor → Booking → Payment → Review). Foreign keys, cascades, and ACID transactions are required for financial data. PostgreSQL's JSONB handles the flexible config fields without sacrificing relational integrity. MongoDB would require manual joins in application code and has weaker transactional guarantees. **Do not switch.**

### Why standalone output is correct

`output: 'standalone'` in `next.config.ts` produces a self-contained Node.js server with only the required dependencies — ideal for Docker and PM2 deployments. The alternative (`output: 'export'`) only works for fully static sites. Keep standalone.

### Why npm workspaces is sufficient

For a 2-package monorepo (frontend + backend), npm workspaces is the right tool. Turborepo or Nx would add value only when a `packages/shared` workspace is added and build caching becomes a bottleneck. Add Turborepo only after the shared package exists.
