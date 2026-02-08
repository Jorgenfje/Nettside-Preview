import { BedriftsInfo, Template } from '@/types';

export function createWebsitePrompt(info: BedriftsInfo, template: Template): string {
  return `Du er en ekspert webutvikler som lager profesjonelle, moderne nettsider.

VIKTIG: Returner KUN ren HTML-kode. Ingen forklaringer, ingen JSON-wrapper, ingen markdown-backticks. Start direkte med <!DOCTYPE html>.

VIKTIG SPRÅKREGLER:
- Hvis input er på norsk → generer HELE nettsiden på norsk
- Hvis input er på engelsk → generer HELE nettsiden på engelsk
- Match språket i bedriftsnavn, bransje og beskrivelse
- ALL tekst (overskrifter, knapper, navigasjon, innhold) må være på samme språk som input

OPPGAVE: Lag en komplett, responsiv one-page nettside for følgende bedrift:

BEDRIFTSINFORMASJON:
- Navn: ${info.bedriftsnavn}
- Bransje: ${info.bransje}
- Beskrivelse: ${info.beskrivelse}

DESIGN TEMPLATE: ${template.navn}
FARGEPALETT:
- Primary: ${template.fargepalett.primary}
- Secondary: ${template.fargepalett.secondary}
- Accent: ${template.fargepalett.accent}
- Background: ${template.fargepalett.background}
- Text: ${template.fargepalett.text}

KRAV:
1. Komplett HTML-dokument med inline CSS (ingen eksterne filer)
2. Responsiv design som fungerer perfekt på mobil og desktop
3. Moderne, profesjonelt design som passer bransjen
4. Inkluder seksjoner: Hero, Om oss, Tjenester, Kontakt
5. Bruk fargepaletten konsekvent
6. Legg til subtile animasjoner og hover-effekter
7. Sørg for god lesbarhet og whitespace
8. Inkluder en Call-to-Action knapp
9. Mobil-first approach med media queries
10. Kontakt-seksjonen MÅ inkludere: placeholder e-post, telefon og adresse

VIKTIG:
- Returner BARE HTML-koden, ingen forklaringer
- All CSS skal være inline i <style> tag
- Bruk semantisk HTML5
- Sørg for god kontrast og tilgjengelighet
- Placeholder-bilder kan bruke https://placehold.co med relevante dimensjoner

Generer nettsiden NÅ:`;
}

export function createPersonligPrompt(info: BedriftsInfo, template: Template): string {
  return `Du er en ekspert webutvikler som lager personlige portfolio-nettsider.

OPPGAVE: Lag en modern, kreativ portfolio-nettside for:

PERSONINFO:
- Navn: ${info.bedriftsnavn}
- Felt: ${info.bransje}
- Om meg: ${info.beskrivelse}

DESIGN:
Bruk ${template.navn} template med disse fargene:
- Primary: ${template.fargepalett.primary}
- Secondary: ${template.fargepalett.secondary}
- Accent: ${template.fargepalett.accent}

KRAV:
1. Komplett HTML med inline CSS
2. Seksjoner: Hero (med bilde placeholder), Om meg, Ferdigheter, Prosjekter, Kontakt
3. Responsiv og moderne
4. Visuelt imponerende
5. Subtile animasjoner
6. Clean, minimalistisk stil

Returner BARE HTML-koden:`;
}
