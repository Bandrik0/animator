import React from 'react';
import { spriteCharacters } from '../data/characters2d';
import { backgrounds } from '../data/backgrounds';
import { useSpriteStore } from '../store2d';
import SpriteLine from './SpriteLine';

const Sidebar2D: React.FC = () => {
  const addSprite = useSpriteStore((s) => s.addSprite);

  const avatarCharacters = spriteCharacters.filter(char => char.type === 'avatar');
  const animatedCharacters = spriteCharacters.filter(char => char.type === 'animated');
  const robotCharacters = spriteCharacters.filter(char => char.type === 'robot');

  return (
    <aside className="w-60 bg-white/10 backdrop-blur text-white p-4 space-y-4 h-full overflow-y-auto">
      <h2 className="text-xl font-semibold">Charaktere</h2>
      
      {/* Avatar Charaktere */}
      <div>
        <h3 className="text-sm font-medium text-white/80 mb-2">Avatare</h3>
        <div className="grid grid-cols-2 gap-2">
          {avatarCharacters.map((char) => (
            <button
              key={char.name}
              onClick={() => addSprite(char)}
              className="flex flex-col items-center gap-1 hover:bg-white/20 p-2 rounded transition-colors"
            >
              <img
                src={char.thumbnail}
                alt={char.name}
                className="w-16 h-16 object-cover rounded"
              />
              <span className="text-xs text-center">{char.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Animierte Charaktere */}
      <div>
        <h3 className="text-sm font-medium text-white/80 mb-2">Animiert</h3>
        <div className="grid grid-cols-2 gap-2">
          {animatedCharacters.map((char) => (
            <button
              key={char.name}
              onClick={() => addSprite(char)}
              className="flex flex-col items-center gap-1 hover:bg-white/20 p-2 rounded transition-colors"
            >
              <div className="w-16 h-16 rounded bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-2xl">
                  {char.characterType === 'bob' ? '👨' : '👩'}
                </span>
              </div>
              <span className="text-xs text-center">{char.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Roboter Charaktere */}
      <div>
        <h3 className="text-sm font-medium text-white/80 mb-2">Roboter</h3>
        <div className="grid grid-cols-2 gap-2">
          {robotCharacters.map((char) => (
            <button
              key={char.name}
              onClick={() => addSprite(char)}
              className="flex flex-col items-center gap-1 hover:bg-white/20 p-2 rounded transition-colors"
            >
              <div className="w-16 h-16 rounded bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <span className="text-xs text-center">{char.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hintergründe */}
      <div>
        <h3 className="text-sm font-medium text-white/80 mb-2">Hintergründe</h3>
        <div className="flex flex-col gap-1">
          {backgrounds.map((bg) => (
            <button
              key={bg.name}
              onClick={() => useSpriteStore.getState().setBackground(bg.url)}
              className="px-2 py-1 bg-white/20 rounded hover:bg-white/30 text-left capitalize text-sm transition-colors"
            >
              {bg.name}
            </button>
          ))}
        </div>
      </div>

      {/* Aktuelle Charaktere */}
      <div>
        <h3 className="text-sm font-medium text-white/80 mb-2">Aufgenommene Charaktere</h3>
        <ul className="space-y-2">
          {useSpriteStore((s) => s.sprites).map((sp) => (
            <SpriteLine key={sp.id} sprite={sp} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar2D; 