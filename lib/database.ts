import { neon } from '@neondatabase/serverless';

// Funksjon for å generere kort ID (f.eks. "np-abc123")
export function generateShortId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'np-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Lagre generert nettside
export async function saveGeneratedWebsite(
  bedriftsnavn: string,
  bransje: string,
  beskrivelse: string,
  html: string
) {
  const sql = neon(process.env.DATABASE_URL!); // ← FLYTT HIT
  const shortId = generateShortId();
  
  const result = await sql`
    INSERT INTO generated_websites (bedriftsnavn, bransje, beskrivelse, html, short_id)
    VALUES (${bedriftsnavn}, ${bransje}, ${beskrivelse}, ${html}, ${shortId})
    RETURNING id, short_id
  `;

  return { id: result[0].id, shortId: result[0].short_id };
}

// Hent nettside basert på short_id
export async function getWebsiteByShortId(shortId: string) {
  const sql = neon(process.env.DATABASE_URL!); // ← OG HIT
  
  const result = await sql`
    SELECT * FROM generated_websites WHERE short_id = ${shortId}
  `;
  
  return result[0] || null;
}