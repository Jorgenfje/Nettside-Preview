export interface BedriftsInfo {
  bedriftsnavn: string;
  bransje: string;
  beskrivelse: string;
  kontaktinfo?: {
    epost?: string;
    telefon?: string;
    adresse?: string;
  };
}

export interface GenerertNettside {
  id: string;
  html: string;
  bedriftsInfo: BedriftsInfo;
  template: string;
  opprettet: string;
}

export type Bransje = 
  | 'håndverker'
  | 'restaurant'
  | 'profesjonell'
  | 'retail'
  | 'personlig';

export interface Template {
  id: string;
  navn: string;
  beskrivelse: string;
  fargepalett: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}
