import { useMemo, useState } from 'react';
import { askAi } from '../lib/ai';

export function Dashboard() {
  const kpis = useMemo(() => ([
    { label: 'Leads', value: 128 },
    { label: 'Opportunities', value: 46 },
    { label: 'Won', value: 18 },
    { label: 'Revenue', value: '$82,400' }
  ]), []);

  return (
    <div className="stack gap-lg">
      <div className="grid kpi">
        {kpis.map(k => (
          <div key={k.label} className="card">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Recent Activity</h2>
        <ul className="list">
          <li>New lead added: Acme Corp</li>
          <li>Proposal sent to Beta LLC</li>
          <li>Won deal with Delta Inc.</li>
        </ul>
      </div>

      <div className="card">
        <h2>AI Assistant</h2>
        <AiWidget />
      </div>
    </div>
  );
}

function AiWidget() {
  const [prompt, setPrompt] = useState('Write a follow-up email for Acme Corp');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function onAsk() {
    setLoading(true);
    try {
      const res = await askAi(prompt);
      setAnswer(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack gap-sm">
      <textarea rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <div className="row gap-sm">
        <button onClick={onAsk} disabled={loading}>{loading ? 'Asking…' : 'Ask AI'}</button>
      </div>
      {answer && (
        <div className="card" style={{ background: '#0e1117' }}>
          {answer}
        </div>
      )}
    </div>
  );
}

