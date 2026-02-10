import { NextRequest, NextResponse } from 'next/server';
import { genererNettside } from '@/lib/claude';
import { saveGeneratedWebsite } from '@/lib/database';
import { BedriftsInfo } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // DEBUG: Log alle env vars (masker verdier)
    console.log('=== ENV VARS DEBUG ===');
    console.log('ANTHROPIC_API_KEY exists:', !!process.env.ANTHROPIC_API_KEY);
    console.log('ANTHROPIC_API_KEY length:', process.env.ANTHROPIC_API_KEY?.length || 0);
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('All env keys:', Object.keys(process.env).filter(k => k.includes('ANTHROPIC') || k.includes('DATABASE')));
    console.log('======================');

    // Valider at API-nøkkel er satt (kun server-side sjekk)
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY mangler i environment variables');
      return NextResponse.json(
        { 
          error: 'Server konfigurasjonsfeil. Kontakt administrator.',
          debug: {
            hasKey: false,
            nodeEnv: process.env.NODE_ENV,
            availableKeys: Object.keys(process.env).filter(k => k.includes('ANTHROPIC') || k.includes('DATABASE'))
          }
        },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { bedriftsnavn, bransje, beskrivelse }: BedriftsInfo = body;

    // Valider input
    if (!bedriftsnavn || !bransje || !beskrivelse) {
      return NextResponse.json(
        { error: 'Alle felt må fylles ut' },
        { status: 400 }
      );
    }

    if (bedriftsnavn.length < 2) {
      return NextResponse.json(
        { error: 'Navn må være minst 2 tegn' },
        { status: 400 }
      );
    }

    if (beskrivelse.length < 10) {
      return NextResponse.json(
        { error: 'Beskrivelse må være minst 10 tegn' },
        { status: 400 }
      );
    }

    // Generer nettside
    console.log('Genererer nettside for:', bedriftsnavn);
    const html = await genererNettside({ bedriftsnavn, bransje, beskrivelse });

    // Lagre i database
    const { id, shortId } = await saveGeneratedWebsite(
      bedriftsnavn,
      bransje,
      beskrivelse,
      html
    );

    return NextResponse.json({
      success: true,
      id,
      shortId,
      html,
      bedriftsnavn
    });

  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Noe gikk galt. Prøv igjen.' 
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    apiKeyConfigured: !!process.env.ANTHROPIC_API_KEY,
    debug: {
      hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      nodeEnv: process.env.NODE_ENV
    }
  });
}