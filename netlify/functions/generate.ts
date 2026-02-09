import { Handler } from '@netlify/functions';

// Import med full relative path fra functions-mappen
import Anthropic from '@anthropic-ai/sdk';
import { neon } from '@neondatabase/serverless';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const sql = neon(process.env.DATABASE_URL!);

function generateShortId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'np-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { bedriftsnavn, bransje, beskrivelse } = JSON.parse(event.body || '');

    // Generer HTML med Claude (ingen timeout!)
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [{
        role: 'user',
        content: `Du er en ekspert webutvikler. Lag en komplett, responsiv nettside for: ${bedriftsnavn} (${bransje}). ${beskrivelse}. Returner KUN ren HTML, start med <!DOCTYPE html>.`
      }]
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Uventet responstype');
    }

    let html = content.text;

    // Rens HTML
    if (html.indexOf('<!DOCTYPE') > 0) {
      html = html.substring(html.indexOf('<!DOCTYPE'));
    } else if (html.indexOf('<html') > 0) {
      html = html.substring(html.indexOf('<html'));
    }

    // Lagre i database
    const shortId = generateShortId();
    await sql`
      INSERT INTO generated_websites (bedriftsnavn, bransje, beskrivelse, html, short_id)
      VALUES (${bedriftsnavn}, ${bransje}, ${beskrivelse}, ${html}, ${shortId})
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        shortId, 
        html, 
        bedriftsnavn 
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: (error as Error).message 
      })
    };
  }
};