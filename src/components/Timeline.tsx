import React, { useState, useEffect } from 'react';
import { useSpriteStore } from '../store2d';
import { SpriteInstance } from '../store2d';

const Timeline: React.FC = () => {
  const sprites = useSpriteStore((s) => s.sprites);
  const selectedId = useSpriteStore((s) => s.selectedId);
  const select = useSpriteStore((s) => s.select);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Sammle alle Audio-Clips von allen Charakteren
  const allClips = sprites.flatMap((sprite) =>
    sprite.clips.map((clip) => ({
      ...clip,
      spriteId: sprite.id,
      spriteName: sprite.def.name,
      spriteColor: getSpriteColor(sprite.def.type, sprite.def.characterType),
      spriteType: sprite.def.type
    }))
  );

  const totalDuration = allClips.length > 0 ? Math.max(...allClips.map((_, index) => (index + 1) * 3)) : 10;

  // Farb-Funktion für verschiedene Charakter-Typen
  function getSpriteColor(type: string, characterType?: string) {
    switch (type) {
      case 'robot':
        return {
          primary: '#607D8B',
          secondary: '#455A64',
          accent: '#90A4AE'
        };
      case 'animated':
        if (characterType === 'lisa') {
          return {
            primary: '#E91E63',
            secondary: '#C2185B',
            accent: '#F8BBD9'
          };
        } else if (characterType === 'mike') {
          return {
            primary: '#4CAF50',
            secondary: '#388E3C',
            accent: '#A5D6A7'
          };
        } else {
          return {
            primary: '#2196F3',
            secondary: '#1976D2',
            accent: '#90CAF9'
          };
        }
      default:
        return {
          primary: '#9C27B0',
          secondary: '#7B1FA2',
          accent: '#CE93D8'
        };
    }
  }

  const handlePlayAll = () => {
    setPlaying(true);
    setCurrentTime(0);
    
    // Spiele alle Clips sequenziell ab
    allClips.forEach((clip, index) => {
      setTimeout(() => {
        const audio = new Audio(clip.url);
        audio.playbackRate = playbackSpeed;
        audio.play();
      }, (index * 3000) / playbackSpeed);
    });

    // Stoppe nach der Gesamtdauer
    setTimeout(() => {
      setPlaying(false);
      setCurrentTime(0);
    }, (totalDuration * 1000) / playbackSpeed);
  };

  const handleStop = () => {
    setPlaying(false);
    setCurrentTime(0);
  };

  // Progress-Animation während der Wiedergabe
  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + (0.1 * playbackSpeed);
          if (newTime >= totalDuration) {
            setPlaying(false);
            return 0;
          }
          return newTime;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [playing, totalDuration, playbackSpeed]);

  return (
    <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur text-white p-4 rounded-lg border border-white/10 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🎵 Timeline</h3>
        <div className="flex items-center gap-2">
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="bg-white/10 text-white text-xs rounded px-2 py-1 border border-white/20"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
          <button
            onClick={playing ? handleStop : handlePlayAll}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              playing 
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg' 
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg'
            } hover:scale-105`}
          >
            {playing ? '⏹ Stop' : '▶️ Play All'}
          </button>
        </div>
      </div>

      {/* Timeline-Bereich */}
      <div className="relative bg-gradient-to-r from-white/10 to-white/5 rounded-lg p-4 mb-4 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-white/90">
            {currentTime.toFixed(1)}s
          </span>
          <div className="flex-1 bg-white/20 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-100 shadow-lg"
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-white/90">
            {totalDuration.toFixed(1)}s
          </span>
        </div>

        {/* Charakter-Tracks */}
        <div className="space-y-3">
          {sprites.map((sprite) => {
            const colors = getSpriteColor(sprite.def.type, sprite.def.characterType);
            return (
              <div key={sprite.id} className="flex items-center gap-3 group">
                <div
                  className={`w-5 h-5 rounded-full cursor-pointer transition-all duration-200 shadow-lg ${
                    selectedId === sprite.id ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-800' : ''
                  } hover:scale-110`}
                  style={{ 
                    backgroundColor: colors.primary,
                    boxShadow: selectedId === sprite.id ? '0 0 0 2px #FCD34D, 0 4px 6px -1px rgba(0, 0, 0, 0.1)' : ''
                  }}
                  onClick={() => select(sprite.id)}
                />
                <span className="text-sm font-medium w-24 truncate text-white/90">
                  {sprite.def.name}
                </span>
                <div className="flex-1 bg-white/10 rounded-lg h-8 relative overflow-hidden border border-white/20">
                  {sprite.clips.map((clip, index) => (
                    <div
                      key={clip.id}
                      className="absolute h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md cursor-pointer hover:from-blue-400 hover:to-purple-400 transition-all duration-200 shadow-lg hover:scale-105"
                      style={{
                        left: `${(index * 3 / totalDuration) * 100}%`,
                        width: `${(3 / totalDuration) * 100}%`,
                        top: '4px',
                        backgroundColor: colors.primary,
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                      }}
                      title={`${sprite.def.name} - Clip ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="text-xs text-white/60 w-12 text-right">
                  {sprite.clips.length} clips
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clip-Liste */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-white/90">🎵 Audio-Clips ({allClips.length})</h4>
          <div className="text-xs text-white/60">
            {sprites.length} Charaktere
          </div>
        </div>
        {allClips.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            <div className="text-4xl mb-2">🎵</div>
            <p className="text-sm">Keine Audio-Clips vorhanden</p>
            <p className="text-xs mt-1">Füge Charaktere hinzu und nehme Audio auf</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
            {allClips.map((clip, index) => {
              const colors = getSpriteColor(clip.spriteType, clip.spriteType === 'animated' ? clip.spriteName.toLowerCase() : undefined);
              return (
                <div
                  key={clip.id}
                  className="flex items-center gap-3 bg-gradient-to-r from-white/10 to-white/5 p-3 rounded-lg border border-white/20 hover:from-white/15 hover:to-white/10 transition-all duration-200 group"
                >
                  <div
                    className="w-4 h-4 rounded-full shadow-lg"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white/90 truncate">
                        {clip.spriteName}
                      </span>
                      <span className="text-xs text-white/60 bg-white/10 px-2 py-0.5 rounded">
                        #{index + 1}
                      </span>
                    </div>
                    <audio
                      src={clip.url}
                      controls
                      className="w-full h-8"
                      style={{
                        filter: 'invert(1) hue-rotate(180deg)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Timeline-Info */}
      <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="grid grid-cols-2 gap-4 text-xs text-white/70">
          <div>
            <div className="font-medium text-white/90 mb-1">📊 Statistiken</div>
            <div>Gesamtdauer: {totalDuration}s</div>
            <div>Clips: {allClips.length}</div>
          </div>
          <div>
            <div className="font-medium text-white/90 mb-1">🎯 Status</div>
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${playing ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></span>
              {playing ? 'Spielt ab' : 'Gestoppt'}
            </div>
            <div>Geschwindigkeit: {playbackSpeed}x</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;