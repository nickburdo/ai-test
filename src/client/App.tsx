import { useEffect, useState } from 'react';
import styles from './App.module.css';

export function App() {
  const [apiStatus, setApiStatus] = useState('checking...');

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/health', { signal: controller.signal })
      .then(res => res.json() as Promise<{ status: string }>)
      .then(data => setApiStatus(data.status))
      .catch(() => {
        if (!controller.signal.aborted)
          setApiStatus('unavailable');
      });
    return () => controller.abort();
  }, []);

  return (
    <main className={styles.main}>
      <h1>AI Test</h1>
      <p>
        API:
        {' '}
        {apiStatus}
      </p>
    </main>
  );
}
