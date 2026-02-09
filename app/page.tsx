'use client';

import { useState } from 'react';
import InputForm from '@/components/InputForm';
import WebsitePreview from '@/components/WebsitePreview';
import { BedriftsInfo } from '@/types';

interface GeneratedResult {
  html: string;
  bedriftsnavn: string;
  shortId?: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: BedriftsInfo) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Noe gikk galt');
      }

      setResult({
        html: result.html,
        bedriftsnavn: result.bedriftsnavn,
        shortId: result.shortId
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Noe gikk galt. Prøv igjen.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!result ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16 space-y-6">
              <div className="inline-block">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                  ✨ Gratis forhåndsvisning
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Din nettside –{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  klar på 30 sekunder
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Se hvordan din bedrifts eller personlige nettside kan se ut.
                <br className="hidden sm:block" />
                <span className="font-semibold text-gray-700">Profesjonelt design, ingen teknisk kunnskap nødvendig.</span>
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Lynraskt</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  AI genererer en komplett nettside på under 30 sekunder
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Profesjonelt</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Moderne design tilpasset din bransje og målgruppe
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Responsivt</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Fungerer perfekt på mobil, nettbrett og desktop
                </p>
              </div>
            </div>

            {/* Main Form */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-200">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Kom i gang
                  </h2>
                  <p className="text-gray-600">
                    Fyll ut informasjonen under for å se din personlige forhåndsvisning
                  </p>
                </div>
                
                <InputForm onSubmit={handleSubmit} loading={loading} />
              </div>

              {/* Error message */}
              {error && (
                <div className="mt-6 bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <h3 className="font-semibold text-red-900">Noe gikk galt</h3>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* How it works */}
            <div className="mt-20 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Hvordan fungerer det?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      1
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-lg">Fortell om deg</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Fyll ut navn, bransje og en kort beskrivelse av hva du gjør
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      2
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-lg">AI genererer</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Avansert AI lager en profesjonell nettside basert på din informasjon
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-lg">Se resultatet</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Utforsk hvordan nettsiden din kan se ut på alle enheter
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      4
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-lg">Få den live</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Kontakt meg for å få nettsiden live med domene og hosting
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 shadow-sm">
                <span className="text-green-600 font-semibold">✓</span>
                <span className="text-sm text-gray-700">100% gratis forhåndsvisning</span>
                <span className="text-gray-300">•</span>
                <span className="text-green-600 font-semibold">✓</span>
                <span className="text-sm text-gray-700">Ingen forpliktelser</span>
              </div>
            </div>

          </>
        ) : (
          <WebsitePreview 
            html={result.html}
            bedriftsnavn={result.bedriftsnavn}
            shortId={result.shortId}
            onReset={handleReset}
          />
        )}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            Utviklet av{' '}
            <a 
              href="https://fjellstadteknologi.no" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition"
            >
              Fjellstad Teknologi
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
