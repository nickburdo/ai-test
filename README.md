# AI Test

## Stack

- [Next.js](https://nextjs.org) (App Router, `src/`), TypeScript
- CSS Modules
- ESLint with [`@antfu/eslint-config`](https://github.com/antfu/eslint-config) (also handles formatting, no Prettier)
- [Vitest](https://vitest.dev) for unit tests (`src/**/*.test.ts`, `node` environment)

## Commands

```bash
npm install         # install dependencies
npm run dev         # start dev server at http://localhost:3000
npm run build       # production build
npm start           # run production build
npm run lint        # lint
npm run lint:fix    # lint and auto-fix
npm test            # run unit tests once
npm run test:watch  # run unit tests in watch mode
```
