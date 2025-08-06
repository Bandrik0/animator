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
    if (sprite.def.type === 'robot') return '#607D8B';
    if (sprite.def.type === 'animated' && sprite.def.characterType === 'lisa') return '#E91E63';
    return '#4A90E2';
  };

  // Bestimme das Icon basierend auf dem Charakter-Typ
  const getCharacterIcon = () => {
    if (sprite.def.type === 'robot') return '🤖';
    if (sprite.def.type === 'animated' && sprite.def.characterType === 'bob') return '👨';
    if (sprite.def.type === 'animated' && sprite.def.characterType === 'lisa') return '👩';
    return '👤';
  };

  const selectSprite = useSpriteStore((s) => s.select);

  return (
    <li 
      className={`flex items-center gap-2 p-2 rounded overflow-hidden transition-all cursor-pointer ${
        isSelected ? 'bg-white/20 ring-2 ring-yellow-400' : 'bg-white/10 hover:bg-white/15'
      }`}
      onClick={() => selectSprite(sprite.id)}
    >
      {/* Charakter-Icon */}
      <div 
        className="w-8 h-8 rounded flex items-center justify-center text-white text-lg"
        style={{ backgroundColor: getCharacterColor() }}
      >
        {getCharacterIcon()}
      </div>
      
      {/* Charakter-Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate">{sprite.def.name}</span>
          <span className="text-xs text-white/70">({sprite.def.type})</span>
        </div>
        
        {/* Audio-Clips */}
        <div className="flex flex-col gap-1 mt-1">
          {sprite.clips.map((clip, idx) => (
            <ClipPlayer key={clip.id} spriteId={sprite.id} clip={clip} label={`#${idx+1}`} />
          ))}
        </div>
      </div>

      {/* Steuerung für ausgewählten Charakter */}
      {isSelected && (
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex gap-1">
            <button onClick={()=>move(0,-20)} className="px-1 bg-white/20 rounded hover:bg-white/30">⬆️</button>
          </div>
          <div className="flex gap-1">
            <button onClick={()=>move(-20,0)} className="px-1 bg-white/20 rounded hover:bg-white/30">⬅️</button>
            <button onClick={()=>move(20,0)} className="px-1 bg-white/20 rounded hover:bg-white/30">➡️</button>
          </div>
          <div className="flex gap-1">
            <button onClick={()=>move(0,20)} className="px-1 bg-white/20 rounded hover:bg-white/30">⬇️</button>
          </div>
          <div className="flex gap-1 mt-1">
            <button onClick={()=>scale(1.1)} className="px-1 bg-white/20 rounded hover:bg-white/30">＋</button>
            <button onClick={()=>scale(0.9)} className="px-1 bg-white/20 rounded hover:bg-white/30">－</button>
          </div>
        </div>
      )}
      
      {/* Aufnahme-Button */}
      <button
        onClick={recording ? stop : start}
        className={`px-2 py-1 text-xs rounded transition-colors ${
          recording ? 'bg-red-600 hover:bg-red-700' : 'bg-white/20 hover:bg-white/30'
        }`}
      >
        {recording ? '⏹ Stop' : '🎤 Mic'}
      </button>
    </li>
  );
};

export default SpriteLine; 