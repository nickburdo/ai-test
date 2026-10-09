# Scaffold plan (React + Express)

Status: **approved** (2026-10-09)

## Stack

- Client: React + Vite, CSS Modules
- Server: Express 5, run with tsx
- TypeScript, npm, single package (no workspaces)
- Lint/format: `@antfu/eslint-config` (no Prettier)
- Unit tests: Vitest, `node` environment

## Steps

### 1. Branch and working directory

- `git switch main` → `git switch -c react-express-dev`
- Remove untracked Next.js artifacts (`node_modules/`, `.next/`, `next-env.d.ts`, `tsconfig.tsbuildinfo`)
- Add the assignment file to `.git/info/exclude` (kept out of the repo)

### 2. Dependencies (latest stable)

- Runtime: `react`, `react-dom`, `express`
- Dev: `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `@types/express`, `@types/node@^24`, `tsx`, `concurrently`, `cross-env`, `vitest`, `eslint`, `@antfu/eslint-config` + React plugins it requires

### 3. Structure

```
index.html            # Vite entry
src/client/           # main.tsx, App.tsx, App.module.css, index.css
src/server/index.ts   # Express: GET /api/health; in production also serves dist/client
src/shared/           # types and pure logic (filled during the task)
```

- `"type": "module"`, single `tsconfig.json` (DOM + node types), alias `@/*` → `src/*`
- Verify via docs how the alias resolves in Vite / Vitest / tsx

### 4. Client ↔ server wiring

- `vite.config.ts`: React plugin, `server.proxy` `/api` → `http://localhost:3001`
- Express listens on `PORT` (default 3001); only with `NODE_ENV=production` serves `dist/client` + SPA fallback
- `App.tsx`: placeholder showing `/api/health` response

### 5. Scripts

- `dev`: `concurrently` Vite + `node --watch --import tsx src/server/index.ts` (revised, see decision log)
- `build`: `vite build`
- `start`: `npm run build` → `cross-env NODE_ENV=production tsx src/server/index.ts`
- `lint`, `lint:fix`, `test`, `test:watch`, `typecheck` (`tsc --noEmit`)

### 6. ESLint

- Same antfu config (`react: true`, no `nextjs`), `commaDangle` via `stylistic.overrides`

### 7. Vitest

- `node` environment, `src/**/*.test.ts`, `passWithNoTests: true`
- Temporary smoke test in `src/shared` importing via alias; removed after verification

### 8. Docs

- `README.md`: stack and commands
- `docs/plans/scaffold.md`: this plan + decision log

### 9. Verification

- lint, typecheck, test, build
- `npm run dev`: `curl` `/api/health` through the Vite proxy (5173)
- `npm start`: static + `/api/health` on 3001

### 10. Git

- Commit `chore: scaffold React + Express project` to `react-express-dev`
- Add a row to the README table on `main` (separate commit)
- Push both branches

## Decision log

- Framework: React + Express over Next.js — the dashboard component is client-heavy (type-ahead search, shift+click sort, page size, export); explicit backend/frontend split; no Next.js caching/prerendering rules during a 1-hour task
- Single package with `src/client`, `src/server`, `src/shared` (no npm workspaces)
- Styling: CSS Modules
- `passWithNoTests: true` so `npm test` passes before tests exist
- Push right after commit
- Assignment `.docx` stays outside the repo
- Implementation notes (within the plan's "verify via docs" item):
  - Alias in Vite/Vitest via native `resolve.tsconfigPaths: true` (Vite 8), no `vite-tsconfig-paths`; tsx reads tsconfig `paths` natively
  - `index.html` at the repo root with default Vite root, so Vitest reuses `vite.config.ts` (no separate `vitest.config`)
  - SPA fallback in Express 5 via a regex route excluding `/api/`
- Revision (step 5/9): server dev watcher `tsx watch` → `node --watch --import tsx`. Under `concurrently` on Windows, `tsx watch` spawns the server process but it hangs before `listen` (no output, no error); plain `tsx` and `node --watch --import tsx` work. Both watch the entry point and imported modules; files read via `fs` (e.g. a JSON dataset) are not watched by either. `tsx watch`'s Enter-to-rerun is lost, but `concurrently` doesn't forward stdin anyway
