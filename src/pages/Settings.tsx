import { useState } from 'react';

export function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [netlifySiteId, setNetlifySiteId] = useState('');

  return (
    <div className="stack gap-lg">
      <div className="card">
        <h2>AI Settings</h2>
        <label>
          API Key
          <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} type="password" placeholder="sk-..." />
        </label>
        <p className="muted">Stored in memory for demo only.</p>
      </div>

      <div className="card">
        <h2>Netlify</h2>
        <label>
          Site ID
          <input value={netlifySiteId} onChange={(e) => setNetlifySiteId(e.target.value)} placeholder="your-site-id" />
        </label>
        <p className="muted">Use `netlify.toml` for production settings.</p>
      </div>
    </div>
  );
}

