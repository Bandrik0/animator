import React from 'react';
import { spriteCharacters } from '../data/characters2d';
import { backgrounds } from '../data/backgrounds';
import { useSpriteStore } from '../store2d';
import SpriteLine from './SpriteLine';

const Sidebar2D: React.FC = () => {
  const addSprite = useSpriteStore((s) => s.addSprite);

  return (
    <aside className="w-60 bg-white/10 backdrop-blur text-white p-4 space-y-4 h-full overflow-y-auto">
      <h2 className="text-xl font-semibold">2D Characters</h2>
      <div className="grid grid-cols-2 gap-4">
        {spriteCharacters.map((char) => (
          <button
            key={char.name}
            onClick={() => addSprite(char)}
            className="flex flex-col items-center gap-2 hover:bg-white/20 p-2 rounded"
          >
            <img
              src={char.thumbnail}
              alt={char.name}
              className="w-20 h-20 object-cover rounded"
            />
            <span className="text-sm">{char.name}</span>
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6">Backgrounds</h2>
      <div className="flex flex-col gap-2">
        {backgrounds.map((bg)=> (
          <button
            key={bg.name}
            onClick={()=> useSpriteStore.getState().setBackground(bg.url)}
            className="px-2 py-1 bg-white/20 rounded hover:bg-white/30 text-left capitalize"
          >
            {bg.name}
          </button>
        ))}
      </div>

      {/* Current sprites */}
      <h2 className="text-xl font-semibold mt-6">Recorded Lines</h2>
      <ul className="space-y-2">
        {useSpriteStore((s)=>s.sprites).map((sp)=>(
          <SpriteLine key={sp.id} sprite={sp} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar2D; 