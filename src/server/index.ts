import path from 'node:path';
import process from 'node:process';
import express from 'express';

const PORT = Number(process.env.PORT ?? 3001);
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

if (isProduction) {
  const clientDir = path.resolve(import.meta.dirname, '../../dist/client');
  app.use(express.static(clientDir));
  // SPA fallback: any non-API route returns the client entry
  app.get(/^(?!\/api\/).*/, (_req, res) => {
    res.sendFile(path.join(clientDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});
