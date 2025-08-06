import React, { useState, useEffect } from 'react';
import { useRecordStore } from '../recordStore';
import { useSpriteStore } from '../store2d';

const ExportPanel: React.FC = () => {
  const [exportFormat, setExportFormat] = useState<'webm' | 'mp4' | 'gif'>('webm');
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('medium');
  const [exportDuration, setExportDuration] = useState<number>(10); // Sekunden
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [exportStatus, setExportStatus] = useState<string>('');
  const { recording, url, start, stop } = useRecordStore();
  const sprites = useSpriteStore((s) => s.sprites);

  // Berechne die tatsächliche Animationsdauer basierend auf den Clips
  const calculateAnimationDuration = () => {
    const allClips = sprites.flatMap(sprite => sprite.clips);
    if (allClips.length === 0) return 10;
    
    // Jeder Clip dauert 3 Sekunden, plus Pausen
    const totalClips = allClips.length;
    return Math.max(totalClips * 3, 10);
  };

  const maxDuration = calculateAnimationDuration();

  useEffect(() => {
    setExportDuration(Math.min(exportDuration, maxDuration));
  }, [maxDuration]);

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportStatus('Bereite Aufnahme vor...');
    
    try {
      // Wenn bereits aufgenommen wird, stoppe die Aufnahme
      if (recording) {
        stop();
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Starte eine neue Aufnahme
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      if (!canvas) {
        alert('Kein Canvas gefunden! Bitte stelle sicher, dass eine Animation läuft.');
        setIsExporting(false);
        return;
      }

      setExportStatus('Starte Aufnahme...');
      await start(canvas, exportFormat, quality);

      // Progress-Tracking während der Aufnahme
      const startTime = Date.now();
      const durationMs = exportDuration * 1000;
      
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / durationMs) * 100, 100);
        setExportProgress(progress);
        
        if (progress >= 100) {
          clearInterval(progressInterval);
        }
      }, 100);

      setExportStatus(`Nimmt auf... (${exportDuration}s)`);

      // Aufnahme für die gewählte Dauer durchführen
      await new Promise(resolve => setTimeout(resolve, durationMs));

      clearInterval(progressInterval);
      setExportStatus('Stoppe Aufnahme...');

      // Stoppe die Aufnahme
      stop();

      // Warte auf die URL
      setExportStatus('Erstelle Video...');
      let attempts = 0;
      while (!url && attempts < 100) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (url) {
        setExportStatus('Starte Download...');
        
        // Erstelle einen Download-Link
        const link = document.createElement('a');
        link.href = url;
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        link.download = `animation-${timestamp}.${exportFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup URL nach Download
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 2000);

        setExportStatus('Export erfolgreich!');
        setTimeout(() => {
          setExportStatus('');
        }, 2000);
      } else {
        setExportStatus('Fehler: Video konnte nicht erstellt werden');
        setTimeout(() => {
          setExportStatus('');
        }, 3000);
      }
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus('Fehler beim Export: ' + error);
      setTimeout(() => {
        setExportStatus('');
      }, 3000);
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const getQualityInfo = () => {
    switch (quality) {
      case 'high':
        return { size: '8-15 MB', bitrate: '8000 kbps' };
      case 'medium':
        return { size: '4-8 MB', bitrate: '4000 kbps' };
      case 'low':
        return { size: '2-4 MB', bitrate: '2000 kbps' };
      default:
        return { size: '4-8 MB', bitrate: '4000 kbps' };
    }
  };

  const qualityInfo = getQualityInfo();

  return (
    <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur text-white p-4 rounded-lg border border-white/10 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🎬 Video Export</h3>
        <div className="text-xs bg-white/10 px-2 py-1 rounded">
          {sprites.length} Charaktere
        </div>
      </div>
      
      {/* Format-Auswahl */}
      <div className="space-y-2 mb-4">
        <label className="block text-sm font-medium">📁 Format</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setExportFormat('webm')}
            className={`px-3 py-2 rounded text-sm transition-all ${
              exportFormat === 'webm' 
                ? 'bg-blue-600 shadow-lg scale-105' 
                : 'bg-white/20 hover:bg-white/30 hover:scale-105'
            }`}
          >
            <div className="font-medium">WebM</div>
            <div className="text-xs opacity-70">Best Support</div>
          </button>
          <button
            onClick={() => setExportFormat('mp4')}
            className={`px-3 py-2 rounded text-sm transition-all ${
              exportFormat === 'mp4' 
                ? 'bg-blue-600 shadow-lg scale-105' 
                : 'bg-white/20 hover:bg-white/30 hover:scale-105'
            }`}
          >
            <div className="font-medium">MP4</div>
            <div className="text-xs opacity-70">Universal</div>
          </button>
          <button
            onClick={() => setExportFormat('gif')}
            className={`px-3 py-2 rounded text-sm transition-all ${
              exportFormat === 'gif' 
                ? 'bg-blue-600 shadow-lg scale-105' 
                : 'bg-white/20 hover:bg-white/30 hover:scale-105'
            }`}
          >
            <div className="font-medium">GIF</div>
            <div className="text-xs opacity-70">Animated</div>
          </button>
        </div>
      </div>

      {/* Qualitäts-Auswahl */}
      <div className="space-y-2 mb-4">
        <label className="block text-sm font-medium">⚡ Qualität</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setQuality('low')}
            className={`px-3 py-2 rounded text-sm transition-all ${
              quality === 'low' 
                ? 'bg-green-600 shadow-lg scale-105' 
                : 'bg-white/20 hover:bg-white/30 hover:scale-105'
            }`}
          >
            <div className="font-medium">Niedrig</div>
            <div className="text-xs opacity-70">Schnell</div>
          </button>
          <button
            onClick={() => setQuality('medium')}
            className={`px-3 py-2 rounded text-sm transition-all ${
              quality === 'medium' 
                ? 'bg-green-600 shadow-lg scale-105' 
                : 'bg-white/20 hover:bg-white/30 hover:scale-105'
            }`}
          >
            <div className="font-medium">Mittel</div>
            <div className="text-xs opacity-70">Balanced</div>
          </button>
          <button
            onClick={() => setQuality('high')}
            className={`px-3 py-2 rounded text-sm transition-all ${
              quality === 'high' 
                ? 'bg-green-600 shadow-lg scale-105' 
                : 'bg-white/20 hover:bg-white/30 hover:scale-105'
            }`}
          >
            <div className="font-medium">Hoch</div>
            <div className="text-xs opacity-70">Premium</div>
          </button>
        </div>
      </div>

      {/* Dauer-Auswahl */}
      <div className="space-y-2 mb-4">
        <label className="block text-sm font-medium">⏱️ Dauer</label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="5"
              max={maxDuration}
              value={exportDuration}
              onChange={(e) => setExportDuration(Number(e.target.value))}
              className="flex-1"
              disabled={isExporting}
            />
            <span className="text-sm font-medium w-12">{exportDuration}s</span>
          </div>
          <div className="text-xs text-white/70">
            Max: {maxDuration}s (basierend auf {sprites.flatMap(s => s.clips).length} Clips)
          </div>
        </div>
      </div>

      {/* Export-Button */}
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`w-full py-3 rounded-lg font-medium transition-all ${
          isExporting 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 shadow-lg'
        }`}
      >
        {isExporting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Exportiere... ({exportProgress.toFixed(0)}%)
          </div>
        ) : (
          '📤 Export starten'
        )}
      </button>

      {/* Progress Bar */}
      {isExporting && (
        <div className="mt-3">
          <div className="bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 transition-all duration-300"
              style={{ width: `${exportProgress}%` }}
            />
          </div>
          {exportStatus && (
            <div className="text-xs text-center mt-1 text-white/80">
              {exportStatus}
            </div>
          )}
        </div>
      )}

      {/* Export-Info */}
      <div className="mt-4 space-y-2 text-xs text-white/70">
        <div className="bg-white/5 rounded p-2">
          <div className="flex justify-between">
            <span>Format:</span>
            <span className="font-medium">{exportFormat.toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span>Qualität:</span>
            <span className="font-medium">{quality}</span>
          </div>
          <div className="flex justify-between">
            <span>Dauer:</span>
            <span className="font-medium">{exportDuration}s</span>
          </div>
          <div className="flex justify-between">
            <span>Bitrate:</span>
            <span className="font-medium">{qualityInfo.bitrate}</span>
          </div>
          <div className="flex justify-between">
            <span>Größe:</span>
            <span className="font-medium">{qualityInfo.size}</span>
          </div>
        </div>
        
        <div className="text-center text-xs">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Animation läuft</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Audio wird aufgenommen</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;