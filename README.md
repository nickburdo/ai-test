# AI Test

## Stack

- Client: [React](https://react.dev) + [Vite](https://vite.dev), CSS Modules
- Server: [Express](https://expressjs.com) 5, run with [tsx](https://tsx.is) (no separate compile step)
- TypeScript, path alias `@/*` → `src/*`
- ESLint with [`@antfu/eslint-config`](https://github.com/antfu/eslint-config) (also handles formatting, no Prettier)
- [Vitest](https://vitest.dev) for unit tests (`src/**/*.test.ts`, `node` environment)

## Structure

```
index.html     # Vite entry
src/client/    # React app
src/server/    # Express API (/api/*)
src/shared/    # types and pure logic shared by client and server
```

## Commands

```bash
npm install         # install dependencies
npm run dev         # Vite on http://localhost:5173 (proxies /api) + Express on :3001
npm start           # build client, then serve client + API on http://localhost:3001
npm run build       # build client into dist/client
npm run typecheck   # type-check
npm run lint        # lint
npm run lint:fix    # lint and auto-fix
npm test            # run unit tests once
npm run test:watch  # run unit tests in watch mode
```

API port can be changed with the `PORT` env variable.
