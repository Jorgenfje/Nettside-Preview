import { Template } from '@/types';

export const templates: Record<string, Template> = {
  håndverker: {
    id: 'håndverker',
    navn: 'Håndverker Pro',
    beskrivelse: 'Robust og pålitelig design for håndverkere og byggfirma',
    fargepalett: {
      primary: '#1e3a8a', // Dyp blå
      secondary: '#fbbf24', // Gul/oransje
      accent: '#dc2626', // Rød
      background: '#f8fafc',
      text: '#1e293b'
    }
  },
  restaurant: {
    id: 'restaurant',
    navn: 'Restaurant Elegant',
    beskrivelse: 'Innbydende og elegant design for restauranter og kafeer',
    fargepalett: {
      primary: '#7c2d12', // Varm brun
      secondary: '#f59e0b', // Gull
      accent: '#16a34a', // Grønn
      background: '#fffbeb',
      text: '#292524'
    }
  },
  profesjonell: {
    id: 'profesjonell',
    navn: 'Profesjonell Ren',
    beskrivelse: 'Minimalistisk og profesjonelt for konsulenter og tjenester',
    fargepalett: {
      primary: '#0f172a', // Mørk navy
      secondary: '#3b82f6', // Blå
      accent: '#06b6d4', // Cyan
      background: '#ffffff',
      text: '#334155'
    }
  },
  retail: {
    id: 'retail',
    navn: 'Retail Moderne',
    beskrivelse: 'Fargerik og engasjerende for butikker og e-handel',
    fargepalett: {
      primary: '#db2777', // Pink
      secondary: '#8b5cf6', // Lilla
      accent: '#f97316', // Oransje
      background: '#fef3f2',
      text: '#18181b'
    }
  },
  personlig: {
    id: 'personlig',
    navn: 'Personlig Portfolio',
    beskrivelse: 'Kreativ og unik for personlige nettsider og portfolioer',
    fargepalett: {
      primary: '#0891b2', // Teal
      secondary: '#6366f1', // Indigo
      accent: '#ec4899', // Rosa
      background: '#f0fdfa',
      text: '#0f172a'
    }
  }
};

export function getTemplateForBransje(bransje: string): Template {
  const normalized = bransje.toLowerCase();
  
  // Fuzzy matching
  if (normalized.includes('håndverk') || normalized.includes('bygg') || 
      normalized.includes('elektriker') || normalized.includes('rørlegger')) {
    return templates.håndverker;
  }
  
  if (normalized.includes('restaurant') || normalized.includes('kafé') || 
      normalized.includes('mat') || normalized.includes('café')) {
    return templates.restaurant;
  }
  
  if (normalized.includes('konsulent') || normalized.includes('advokat') || 
      normalized.includes('revisjon') || normalized.includes('regnskap')) {
    return templates.profesjonell;
  }
  
  if (normalized.includes('butikk') || normalized.includes('handel') || 
      normalized.includes('shop') || normalized.includes('retail')) {
    return templates.retail;
  }
  
  // Default til profesjonell hvis usikker
  return templates.profesjonell;
}
