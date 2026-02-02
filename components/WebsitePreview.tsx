'use client';

import { useState } from 'react';

interface WebsitePreviewProps {
  html: string;
  bedriftsnavn: string;
  onReset: () => void;
}

type ViewMode = 'desktop' | 'mobile';

export default function WebsitePreview({ html, bedriftsnavn, onReset }: WebsitePreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Forhåndsvisning for {bedriftsnavn}
          </h2>
          <p className="text-gray-600 mt-1">
            Slik kan nettsiden din se ut
          </p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          ← Lag ny
        </button>
      </div>

      {/* View toggle */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setViewMode('desktop')}
          className={`px-4 py-2 rounded-md font-medium transition ${
            viewMode === 'desktop'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2"/>
              <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2"/>
              <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2"/>
            </svg>
            Desktop
          </span>
        </button>
        <button
          onClick={() => setViewMode('mobile')}
          className={`px-4 py-2 rounded-md font-medium transition ${
            viewMode === 'mobile'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="2"/>
              <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2"/>
            </svg>
            Mobil
          </span>
        </button>
      </div>


      {/* Disclaimer */}
<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
  <div className="flex items-start gap-3">
    <span className="text-2xl">⚠️</span>
    <div>
      <h3 className="font-semibold text-yellow-900 mb-1">
        Dette er kun et automatisk generert utkast
      </h3>
      <p className="text-sm text-yellow-800">
        Feil og mangler kan forekomme. Den ferdige nettsiden tilpasses dine ønsker, 
        behov og merkevareprofil. Hoveddesignet kan gjenskapes med dine endringer og forslag.
      </p>
    </div>
  </div>
</div>

      {/* Preview iframe */}
      <div className="bg-gray-100 p-8 rounded-lg">
        <div 
          className={`mx-auto bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
            viewMode === 'desktop' ? 'w-full' : 'w-[375px]'
          }`}
          style={{
            height: viewMode === 'desktop' ? '800px' : '667px'
          }}
        >
          <iframe
            srcDoc={html}
            className="w-full h-full border-0"
            title="Nettside forhåndsvisning"
            sandbox="allow-same-origin allow-scripts"
            onLoad={(e) => {
              const iframe = e.target as HTMLIFrameElement;
              if (iframe.contentWindow) {
                iframe.contentWindow.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                if (target.tagName === 'A') {
                  event.preventDefault();
                }
              });
            }
          }}
        />

        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            // Åpne i ny fane
            const newWindow = window.open();
            if (newWindow) {
              newWindow.document.write(html);
              newWindow.document.close();
            }
          }}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          🔗 Åpne i ny fane
        </button>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Vil du ha denne nettsiden?
        </h3>
        <p className="text-gray-600 mb-4">
          Jeg kan sette opp nettsiden din med eget domene, e-post og hosting.
        </p>
        <a
          href="mailto:post@fjellstadteknologi.no?subject=Interessert i nettside&body=Hei! Jeg genererte en forhåndsvisning og vil gjerne ha hjelp til å få dette live."
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          📧 Ta kontakt
        </a>
      </div>
    </div>
  );
}
