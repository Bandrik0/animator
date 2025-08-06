import React, { useState } from 'react';
import { useSpriteStore } from '../store2d';
import { SpriteInstance } from '../store2d';

const Timeline: React.FC = () => {
  const sprites = useSpriteStore((s) => s.sprites);
  const selectedId = useSpriteStore((s) => s.selectedId);
  const select = useSpriteStore((s) => s.select);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Sammle alle Audio-Clips von allen Charakteren
  const allClips = sprites.flatMap((sprite) =>
    sprite.clips.map((clip) => ({
      ...clip,
      spriteId: sprite.id,
      spriteName: sprite.def.name,
      spriteColor: sprite.def.type === 'robot' ? '#607D8B' : 
                   sprite.def.type === 'animated' && sprite.def.characterType === 'lisa' ? '#E91E63' : '#4A90E2'
    }))
  );

  const totalDuration = allClips.length > 0 ? Math.max(...allClips.map((_, index) => (index + 1) * 3)) : 10;

  const handlePlayAll = () => {
    setPlaying(true);
    setCurrentTime(0);
    
    // Spiele alle Clips sequenziell ab
    allClips.forEach((clip, index) => {
      setTimeout(() => {
        const audio = new Audio(clip.url);
        audio.play();
      }, index * 3000); // 3 Sekunden zwischen den Clips
    });

    // Stoppe nach der Gesamtdauer
    setTimeout(() => {
      setPlaying(false);
      setCurrentTime(0);
    }, totalDuration * 1000);
  };

  const handleStop = () => {
    setPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="bg-white/10 backdrop-blur text-white p-3 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-md font-semibold">Timeline</h3>
        <div className="flex gap-2">
          <button
            onClick={playing ? handleStop : handlePlayAll}
            className={`px-2 py-1 rounded text-xs ${
              playing ? 'bg-red-600' : 'bg-green-600'
            }`}
          >
            {playing ? '⏹ Stop' : '▶️ Play All'}
          </button>
        </div>
      </div>

      {/* Timeline-Bereich */}
      <div className="relative bg-white/5 rounded p-2 mb-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-white/70">Zeit: {currentTime.toFixed(1)}s</span>
          <div className="flex-1 bg-white/10 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-100"
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
            />
          </div>
          <span className="text-xs text-white/70">{totalDuration.toFixed(1)}s</span>
        </div>

        {/* Charakter-Tracks */}
        <div className="space-y-2">
          {sprites.map((sprite) => (
            <div key={sprite.id} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded cursor-pointer ${
                  selectedId === sprite.id ? 'ring-2 ring-yellow-400' : ''
                }`}
                style={{ backgroundColor: sprite.def.type === 'robot' ? '#607D8B' : 
                         sprite.def.type === 'animated' && sprite.def.characterType === 'lisa' ? '#E91E63' : '#4A90E2' }}
                onClick={() => select(sprite.id)}
              />
              <span className="text-sm w-20 truncate">{sprite.def.name}</span>
              <div className="flex-1 bg-white/5 rounded h-6 relative">
                {sprite.clips.map((clip, index) => (
                  <div
                    key={clip.id}
                    className="absolute h-4 bg-blue-500 rounded cursor-pointer hover:bg-blue-400 transition-colors"
                    style={{
                      left: `${(index * 3 / totalDuration) * 100}%`,
                      width: `${(3 / totalDuration) * 100}%`,
                      top: '4px'
                    }}
                    title={`Clip ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clip-Liste */}
      <div className="space-y-2">
        <h4 className="font-medium">Alle Audio-Clips ({allClips.length})</h4>
        {allClips.length === 0 ? (
          <p className="text-sm text-white/70">Keine Audio-Clips vorhanden</p>
        ) : (
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {allClips.map((clip, index) => (
              <div
                key={clip.id}
                className="flex items-center gap-1 bg-white/5 p-1 rounded text-xs"
              >
                <div
                  className="w-2 h-2 rounded"
                  style={{ backgroundColor: clip.spriteColor }}
                />
                <span className="text-xs truncate w-16">{clip.spriteName}</span>
                <span className="text-xs text-white/70">#{index + 1}</span>
                <audio
                  src={clip.url}
                  controls
                  className="flex-1 h-5"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;