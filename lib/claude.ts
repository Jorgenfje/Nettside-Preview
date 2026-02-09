import Anthropic from '@anthropic-ai/sdk';
import { BedriftsInfo } from '@/types';
import { getTemplateForBransje } from './templates';
import { createWebsitePrompt, createPersonligPrompt } from './prompts';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function genererNettside(info: BedriftsInfo): Promise<string> {
  try {
    // Velg riktig template basert på bransje
    const template = getTemplateForBransje(info.bransje);
    
    // Velg riktig prompt basert på om det er personlig eller bedrift
    const erPersonlig = info.bransje.toLowerCase().includes('personlig') || 
                       info.bransje.toLowerCase().includes('portfolio');
    
    const prompt = erPersonlig 
      ? createPersonligPrompt(info, template)
      : createWebsitePrompt(info, template);

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Ekstraher HTML fra responsen
    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Uventet responstype fra Claude');
    }

    let html = content.text;

  // LEGG TIL LOGGING
  console.log('Claude raw response (first 200 chars):', html.substring(0, 200));

  // Fjern alt før <!DOCTYPE eller <html
  if (html.indexOf('<!DOCTYPE') > 0) {
    html = html.substring(html.indexOf('<!DOCTYPE'));
  } else if (html.indexOf('<html') > 0) {
    html = html.substring(html.indexOf('<html'));
  }

console.log('After markdown removal (first 200 chars):', html.substring(0, 200));

// Valider at vi faktisk fikk HTML
if (!html.includes('<!DOCTYPE') && !html.includes('<html')) {
  throw new Error('Generert innhold er ikke gyldig HTML');
}

return html.trim();

  } catch (error) {
    console.error('Feil ved generering av nettside:', error);
    
    if (error instanceof Anthropic.APIError) {
      throw new Error(`Claude API feil: ${error.message}`);
    }
    
    throw new Error('Kunne ikke generere nettside. Prøv igjen.');
  }
}

// Hjelpefunksjon for å validere API-nøkkel
export function validerAPInokkel(): boolean {
  return !!process.env.ANTHROPIC_API_KEY && 
         process.env.ANTHROPIC_API_KEY.length > 0;
}
