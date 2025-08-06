import React from 'react';
import { defaultCharacters } from '../data/characters';
import { useStore } from '../store';

const Sidebar: React.FC = () => {
  const addCharacter = useStore((s) => s.addCharacter);
  const setEnv = useStore((s)=>s.setEnvironment);

  return (
    <aside className="w-60 bg-white/10 backdrop-blur text-white p-4 space-y-4 h-full overflow-y-auto">
      <h2 className="text-xl font-semibold">Characters</h2>
      <div className="grid grid-cols-2 gap-4">
        {defaultCharacters.map((char) => (
          <button
            key={char.name}
            onClick={() => addCharacter(char.url, char.name)}
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

      <h2 className="text-xl font-semibold mt-6">Background</h2>
      <div className="flex flex-col gap-2">
        {['sunset','city','dawn','night','forest'].map((preset)=>(
          <button
            key={preset}
            onClick={()=>setEnv(preset)}
            className="px-2 py-1 bg-white/20 rounded hover:bg-white/30 text-left capitalize"
          >
            {preset}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar; 