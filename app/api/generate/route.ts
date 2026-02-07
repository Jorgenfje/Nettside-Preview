import { NextRequest, NextResponse } from 'next/server';
import { genererNettside, validerAPInokkel } from '@/lib/claude';
import { saveGeneratedWebsite } from '@/lib/database';
import { BedriftsInfo } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Valider at API-nøkkel er satt
    if (!validerAPInokkel()) {
      return NextResponse.json(
        { error: 'API-nøkkel mangler. Sjekk .env.local' },
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
    apiKeyConfigured: validerAPInokkel()
  });
}