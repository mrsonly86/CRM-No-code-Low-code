exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { prompt = '', leads = [] } = JSON.parse(event.body || '{}');

    const total = Array.isArray(leads) ? leads.length : 0;
    const byStatus = (Array.isArray(leads) ? leads : []).reduce((acc, lead) => {
      const status = (lead && lead.status) || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    const bySource = (Array.isArray(leads) ? leads : []).reduce((acc, lead) => {
      const source = (lead && lead.source) || 'unknown';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});

    let answer = '';
    const p = String(prompt).toLowerCase();
    if (p.includes('how many') || p.includes('count') || p.includes('total')) {
      answer = `You currently have ${total} leads.`;
    } else if (p.includes('status')) {
      const parts = Object.entries(byStatus)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      answer = `Leads by status — ${parts || 'no data'}.`;
    } else if (p.includes('source')) {
      const parts = Object.entries(bySource)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      answer = `Leads by source — ${parts || 'no data'}.`;
    } else {
      answer = 'I can help summarize your leads. Ask about counts, status breakdown, or sources.';
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer, total, byStatus, bySource }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request', detail: String(err && err.message || err) }),
    };
  }
};

