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

  return (
    <li className="flex items-center gap-2 bg-white/10 p-2 rounded overflow-hidden">
      <img src={sprite.def.thumbnail} className="w-8 h-8 rounded" />
      <span className="flex-1 text-sm">{sprite.def.name}</span>
      <div className="flex-1 flex flex-col gap-1">
        {sprite.clips.map((clip, idx) => (
          <ClipPlayer key={clip.id} spriteId={sprite.id} clip={clip} label={`#${idx+1}`} />
        ))}
      </div>

      {isSelected && (
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex gap-1">
            <button onClick={()=>move(0,-20)} className="px-1 bg-white/20 rounded">⬆️</button>
          </div>
          <div className="flex gap-1">
            <button onClick={()=>move(-20,0)} className="px-1 bg-white/20 rounded">⬅️</button>
            <button onClick={()=>move(20,0)} className="px-1 bg-white/20 rounded">➡️</button>
          </div>
          <div className="flex gap-1">
            <button onClick={()=>move(0,20)} className="px-1 bg-white/20 rounded">⬇️</button>
          </div>
          <div className="flex gap-1 mt-1">
            <button onClick={()=>scale(1.1)} className="px-1 bg-white/20 rounded">＋</button>
            <button onClick={()=>scale(0.9)} className="px-1 bg-white/20 rounded">－</button>
          </div>
        </div>
      )}
      <button
        onClick={recording ? stop : start}
        className={`px-2 py-1 text-xs rounded ${recording ? 'bg-red-600' : 'bg-white/20'}`}
      >
        {recording ? 'Stop' : 'Mic'}
      </button>
    </li>
  );
};

export default SpriteLine; 