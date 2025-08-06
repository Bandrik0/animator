import React from 'react';
import { SpriteInstance } from '../store2d';
import { useSpriteRecorder } from '../hooks/useSpriteRecorder';
import ClipPlayer from './ClipPlayer';
import { useSpriteStore } from '../store2d';

const SpriteLine: React.FC<{ sprite: SpriteInstance }> = ({ sprite }) => {
  const { recording, start, stop } = useSpriteRecorder(sprite.id);
  const selectedId = useSpriteStore((s)=>s.selectedId);
  const updateSprite = useSpriteStore((s)=>s.updateSprite);
  const isSelected = selectedId === sprite.id;

  const move = (dx:number, dy:number)=>{
    updateSprite(sprite.id,{x: sprite.x + dx, y: sprite.y + dy});
  };
  const scale = (factor:number)=>{
    updateSprite(sprite.id,{scale: Math.max(0.1, sprite.scale * factor)});
  };

  // Bestimme die Farbe basierend auf dem Charakter-Typ
  const getCharacterColor = () => {
    switch (sprite.def.type) {
      case 'robot':
        return {
          primary: '#607D8B',
          secondary: '#455A64',
          accent: '#90A4AE'
        };
      case 'animated':
        if (sprite.def.characterType === 'lisa') {
          return {
            primary: '#E91E63',
            secondary: '#C2185B',
            accent: '#F8BBD9'
          };
        } else if (sprite.def.characterType === 'mike') {
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
  };

  // Bestimme das Icon basierend auf dem Charakter-Typ
  const getCharacterIcon = () => {
    if (sprite.def.type === 'robot') return '🤖';
    if (sprite.def.type === 'animated' && sprite.def.characterType === 'mike') return '👨';
    if (sprite.def.type === 'animated' && sprite.def.characterType === 'lisa') return '👩';
    return '👤';
  };

  const selectSprite = useSpriteStore((s) => s.select);
  const colors = getCharacterColor();

  return (
    <div
      id={`sprite-${sprite.id}`}
      data-testid="sprite-line"
      className={`p-3 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer border ${
        isSelected
          ? 'bg-gradient-to-r from-white/20 to-white/10 ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-800 shadow-lg'
          : 'bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border-white/20 hover:border-white/30'
      }`}
      onClick={() => selectSprite(sprite.id)}
    >
      <div className="flex items-center gap-3">
        {/* Charakter-Icon */}
        <div 
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl shadow-lg transition-all duration-200 ${
            isSelected ? 'scale-110' : 'group-hover:scale-105'
          }`}
          style={{ 
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            boxShadow: isSelected ? `0 4px 12px ${colors.primary}40` : ''
          }}
        >
          {getCharacterIcon()}
        </div>
        
        {/* Charakter-Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-white/90 truncate">{sprite.def.name}</span>
            <span className="text-xs text-white/60 bg-white/10 px-2 py-0.5 rounded-full">
              {sprite.def.type}
            </span>
            {sprite.clips.length > 0 && (
              <span className="text-xs text-white/60 bg-white/10 px-2 py-0.5 rounded-full">
                {sprite.clips.length} clips
              </span>
            )}
          </div>
          
          {/* Audio-Clips */}
          {sprite.clips.length > 0 && (
            <div className="space-y-1">
              {sprite.clips.map((clip, idx) => (
                <ClipPlayer key={clip.id} spriteId={sprite.id} clip={clip} label={`#${idx+1}`} />
              ))}
            </div>
          )}
        </div>

        {/* Aufnahme-Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            recording ? stop() : start();
          }}
          className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
            recording 
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg animate-pulse' 
              : 'bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 border border-white/20 hover:border-white/30'
          } hover:scale-105`}
        >
          {recording ? '⏹ Stop' : '🎤 Mic'}
        </button>
      </div>

      {/* Steuerung für ausgewählten Charakter */}
      {isSelected && (
        <div className="mt-3 p-3 bg-white/10 rounded-lg border border-white/20">
          <div className="text-xs font-medium text-white/90 mb-2">🎮 Steuerung</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <div className="text-xs text-white/70 mb-1">Position</div>
              <div className="grid grid-cols-3 gap-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); move(0,-20); }} 
                  className="p-2 bg-white/20 rounded hover:bg-white/30 transition-all hover:scale-105 text-xs"
                >
                  ⬆️
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); move(-20,0); }} 
                  className="p-2 bg-white/20 rounded hover:bg-white/30 transition-all hover:scale-105 text-xs"
                >
                  ⬅️
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); move(20,0); }} 
                  className="p-2 bg-white/20 rounded hover:bg-white/30 transition-all hover:scale-105 text-xs"
                >
                  ➡️
                </button>
                <div></div>
                <button 
                  onClick={(e) => { e.stopPropagation(); move(0,20); }} 
                  className="p-2 bg-white/20 rounded hover:bg-white/30 transition-all hover:scale-105 text-xs"
                >
                  ⬇️
                </button>
                <div></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-white/70 mb-1">Größe</div>
              <div className="flex gap-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); scale(1.1); }} 
                  className="flex-1 p-2 bg-white/20 rounded hover:bg-white/30 transition-all hover:scale-105 text-xs"
                >
                  ＋
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); scale(0.9); }} 
                  className="flex-1 p-2 bg-white/20 rounded hover:bg-white/30 transition-all hover:scale-105 text-xs"
                >
                  －
                </button>
              </div>
              <div className="text-xs text-white/60 mt-1">
                Scale: {sprite.scale.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpriteLine; 