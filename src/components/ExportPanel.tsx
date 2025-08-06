import React, { useState } from 'react';
import { useRecordStore } from '../recordStore';

const ExportPanel: React.FC = () => {
  const [exportFormat, setExportFormat] = useState<'webm' | 'mp4' | 'gif'>('webm');
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('medium');
  const [isExporting, setIsExporting] = useState(false);
  const { recording, url, start, stop } = useRecordStore();

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Wenn bereits aufgenommen wird, stoppe die Aufnahme
      if (recording) {
        stop();
      }

      // Warte kurz, damit die Aufnahme gestoppt werden kann
      await new Promise(resolve => setTimeout(resolve, 100));

      // Starte eine neue Aufnahme
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      if (!canvas) {
        alert('Kein Canvas gefunden! Bitte stelle sicher, dass eine Animation läuft.');
        setIsExporting(false);
        return;
      }

      await start(canvas, exportFormat, quality);

      // Aufnahme für 5 Sekunden durchführen
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Stoppe die Aufnahme
      stop();

      // Warte auf die URL
      let attempts = 0;
      while (!url && attempts < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (url) {
        // Erstelle einen Download-Link
        const link = document.createElement('a');
        link.href = url;
        link.download = `animation-export.${exportFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup URL nach Download
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1000);

        alert(`Export als ${exportFormat.toUpperCase()} mit ${quality} Qualität abgeschlossen!`);
      } else {
        alert('Fehler beim Export: Video konnte nicht erstellt werden.');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Fehler beim Export: ' + error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur text-white p-4 rounded-lg m-2">
      <h3 className="text-lg font-semibold mb-4">Export</h3>
      
      {/* Format-Auswahl */}
      <div className="space-y-2 mb-4">
        <label className="block text-sm font-medium">Format</label>
        <div className="flex gap-2">
          <button
            onClick={() => setExportFormat('webm')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              exportFormat === 'webm' ? 'bg-blue-600' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            WebM
          </button>
          <button
            onClick={() => setExportFormat('mp4')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              exportFormat === 'mp4' ? 'bg-blue-600' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            MP4
          </button>
          <button
            onClick={() => setExportFormat('gif')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              exportFormat === 'gif' ? 'bg-blue-600' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            GIF
          </button>
        </div>
      </div>

      {/* Qualitäts-Auswahl */}
      <div className="space-y-2 mb-4">
        <label className="block text-sm font-medium">Qualität</label>
        <div className="flex gap-2">
          <button
            onClick={() => setQuality('low')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              quality === 'low' ? 'bg-green-600' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            Niedrig
          </button>
          <button
            onClick={() => setQuality('medium')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              quality === 'medium' ? 'bg-green-600' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            Mittel
          </button>
          <button
            onClick={() => setQuality('high')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              quality === 'high' ? 'bg-green-600' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            Hoch
          </button>
        </div>
      </div>

      {/* Export-Button */}
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`w-full py-2 rounded font-medium transition-colors ${
          isExporting 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
        }`}
      >
        {isExporting ? '🔄 Exportiere...' : '📤 Export starten'}
      </button>

      {/* Export-Info */}
      <div className="mt-4 text-xs text-white/70">
        <p>Format: {exportFormat.toUpperCase()}</p>
        <p>Qualität: {quality}</p>
        <p>Geschätzte Größe: {quality === 'high' ? '5-10 MB' : quality === 'medium' ? '2-5 MB' : '1-2 MB'}</p>
        <p className="mt-2 text-yellow-300">⚠️ Export dauert 5 Sekunden</p>
      </div>
    </div>
  );
};

export default ExportPanel;