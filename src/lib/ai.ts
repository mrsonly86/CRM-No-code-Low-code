export async function askAi(prompt: string): Promise<string> {
  const res = await fetch('/.netlify/functions/ai', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  if (!res.ok) {
    throw new Error('AI request failed');
  }
  const data = await res.json();
  return data.message as string;
}

