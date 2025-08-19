import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { prompt } = JSON.parse(event.body || '{}');
    if (!prompt) {
      return { statusCode: 400, body: 'Missing prompt' };
    }
    // Demo echo response. Replace with actual AI provider call.
    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: `AI suggestion for: ${prompt}` })
    };
  } catch (error) {
    return { statusCode: 500, body: 'Server Error' };
  }
};

