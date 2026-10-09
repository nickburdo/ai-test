# Scaffold plan

Status: **approved** (2026-10-09)

## Stack

- TypeScript, Next.js (latest stable, App Router, `src/`, alias `@/*`), npm
- Styling: CSS Modules (no Tailwind)
- Lint/format: `@antfu/eslint-config` (no Prettier)
- Unit tests: Vitest, `node` environment

## Steps

### 1. Generate project

- `create-next-app@latest` with TypeScript, App Router, `src/`, `@/*` alias, no Tailwind, no ESLint, npm
- If the generator refuses because of `.idea/`, generate in a temp dir and move files here

### 2. ESLint (`@antfu/eslint-config`)

- Install `eslint`, `@antfu/eslint-config` and the plugins it requires for `react` / `nextjs`
- `eslint.config.mjs`:
  ```js
  antfu({
    react: true,
    nextjs: true,
    typescript: true,
    stylistic: {
      quotes: 'single',
      semi: true,
      commaDangle: 'always-multiline',
    },
  });
  ```
- Verify via package types that `stylistic.commaDangle` is supported; if not, set it via rules and report
- Scripts: `lint`, `lint:fix`
- Run `lint:fix` over generated files

### 3. Clean up boilerplate

- `page.tsx` / `page.module.css`: minimal placeholder page
- Remove demo SVGs from `public/`
- Update `metadata` in `layout.tsx`

### 4. Misc

- `.gitignore`: default + `.idea/`
- Short `README.md`: stack and commands

### 4a. Test tooling

- devDependencies: `vitest`, `vite-tsconfig-paths`
- `vitest.config.mts`: `plugins: [tsconfigPaths()]`, `test: { environment: 'node', include: ['src/**/*.test.ts'] }`
- Scripts: `test` (`vitest run`), `test:watch` (`vitest`)
- Tests live next to code: `src/**/*.test.ts`
- Temporary smoke test `src/lib/sum.ts` + `src/lib/sum.test.ts` to verify runner, TS and alias; **removed after verification**
- No extra ESLint setup for tests (antfu config covers test files)

### 5. Verification

- `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` — all pass

### 6. Git

- `git init -b main`, `git remote add origin https://github.com/nickburdo/ai-test.git`
- Single commit `chore: scaffold Next.js + TypeScript project`, no push

## Decision log

- ESLint: `@antfu/eslint-config` (matches the `stylistic` options shape)
- Styling: CSS Modules
- Layout: App Router + `src/`
- Git: init + commit, no push
- Tests: Vitest, `node` env, logic only (no jsdom / Testing Library)
- `docs/`: only this plan for now
- `next.config.ts`: keep `cacheComponents: true` and `partialPrefetching: true` (create-next-app 16.4 defaults) — fits the planned server API + `searchParams`-driven list (runtime data access goes inside `<Suspense>`)
- Revision (during step 2/4a): bump `@types/node` from `^20` (create-next-app default) to `^24` — `vitest@5` requires `^22 || >=24`; local runtime is Node 24
