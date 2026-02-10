'use client';

import { useState } from 'react';
import { BedriftsInfo } from '@/types';

interface InputFormProps {
  onSubmit: (data: BedriftsInfo) => void;
  loading: boolean;
}

const bransjeAlternativer = [
  'Håndverker (elektriker, tømrer, rørlegger)',
  'Restaurant / Kafé / Bar',
  'Konsulent / Profesjonelle tjenester',
  'Butikk / Retail / E-handel',
  'Personlig portfolio / CV',
  'Frisør / Skjønnhetssalong',
  'Trening / Yoga / Wellness',
  'Fotograf / Kreativt',
  'Eiendomsmegler / Bolig',
  'Advokat / Jus',
  'Regnskap / Økonomi',
  'Helserelatert / Medisin',
  'Bygg / Anlegg',
  'IT / Teknologi',
  'Annet'
];

export default function InputForm({ onSubmit, loading }: InputFormProps) {
  const [formData, setFormData] = useState<BedriftsInfo>({
    bedriftsnavn: '',
    bransje: '',
    beskrivelse: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Valider
    const newErrors: Record<string, string> = {};
    
    if (!formData.bedriftsnavn.trim()) {
      newErrors.bedriftsnavn = 'Navn er påkrevd';
    }
    
    if (!formData.bransje) {
      newErrors.bransje = 'Velg en bransje';
    }
    
    if (!formData.beskrivelse.trim()) {
      newErrors.beskrivelse = 'Beskrivelse er påkrevd';
    } else if (formData.beskrivelse.length < 10) {
      newErrors.beskrivelse = 'Beskrivelse må være minst 10 tegn';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onSubmit(formData);
  };

  const handleChange = (field: keyof BedriftsInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Fjern error når bruker begynner å skrive
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Navn */}
      <div>
        <label 
          htmlFor="bedriftsnavn" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Bedriftsnavn / Ditt navn
        </label>
        <input
          type="text"
          id="bedriftsnavn"
          value={formData.bedriftsnavn}
          onChange={(e) => handleChange('bedriftsnavn', e.target.value)}
          placeholder="F.eks. 'Elektriker Andersen' eller 'Konkurskameratene AS'"
          disabled={loading}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
            errors.bedriftsnavn ? 'border-red-500' : 'border-gray-300'
          } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        {errors.bedriftsnavn && (
          <p className="mt-1 text-sm text-red-600">{errors.bedriftsnavn}</p>
        )}
      </div>

      {/* Bransje */}
      <div>
        <label 
          htmlFor="bransje" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Bransje / Type nettside
        </label>
        <select
          id="bransje"
          value={formData.bransje}
          onChange={(e) => handleChange('bransje', e.target.value)}
          disabled={loading}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
            errors.bransje ? 'border-red-500' : 'border-gray-300'
          } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        >
          <option value="">Velg bransje...</option>
          {bransjeAlternativer.map((bransje) => (
            <option key={bransje} value={bransje}>
              {bransje}
            </option>
          ))}
        </select>
        {errors.bransje && (
          <p className="mt-1 text-sm text-red-600">{errors.bransje}</p>
        )}
      </div>

      {/* Beskrivelse */}
      <div>
        <label 
          htmlFor="beskrivelse" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Kort beskrivelse
        </label>
        <textarea
          id="beskrivelse"
          value={formData.beskrivelse}
          onChange={(e) => handleChange('beskrivelse', e.target.value)}
          placeholder="Beskriv kort hva du/bedriften gjør, hvilke tjenester du tilbyr, eller hva som gjør deg unik..."
          rows={4}
          disabled={loading}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none ${
            errors.beskrivelse ? 'border-red-500' : 'border-gray-300'
          } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.beskrivelse ? (
            <p className="text-sm text-red-600">{errors.beskrivelse}</p>
          ) : (
            <p className="text-sm text-gray-500">Minst 10 tegn</p>
          )}
          <p className="text-sm text-gray-400">
            {formData.beskrivelse.length} tegn
          </p>
        </div>
      </div>

      {/* Submit */}
<button
  type="submit"
  disabled={loading}
  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all transform ${
    loading
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'
  }`}
>
  {loading ? (
    <div className="space-y-3">
      <span className="flex items-center justify-center gap-2">
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Genererer nettside...
      </span>
      <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
        <div className="bg-white h-2 rounded-full animate-pulse loading-bar"></div>
      </div>
      <p className="text-xs opacity-80">Dette tar vanligvis 20-40 sekunder</p>
    </div>
  ) : (
    'Generer forhåndsvisning'
  )}
</button>
    </form>
  );
}
