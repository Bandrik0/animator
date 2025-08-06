import React from 'react';
import { useSpriteStore } from '../store2d';

const PropertiesPanel: React.FC = () => {
  const selectedId = useSpriteStore((s) => s.selectedId);
  const sprites = useSpriteStore((s) => s.sprites);
  const updateSprite = useSpriteStore((s) => s.updateSprite);
  const deleteSprite = useSpriteStore((s) => s.deleteSprite);

  const selectedSprite = sprites.find((s) => s.id === selectedId);

  if (!selectedSprite) {
    return (
      <aside className="w-full bg-white/10 backdrop-blur text-white p-4">
        <h2 className="text-xl font-semibold mb-4">Eigenschaften</h2>
        <p className="text-sm text-white/70">Wähle einen Charakter aus, um ihn zu bearbeiten</p>
      </aside>
    );
  }

  const handleScaleChange = (factor: number) => {
    const newScale = Math.max(0.1, Math.min(3, selectedSprite.scale * factor));
    updateSprite(selectedId!, { scale: newScale });
  };

  const handleMove = (dx: number, dy: number) => {
    updateSprite(selectedId!, {
      x: selectedSprite.x + dx,
      y: selectedSprite.y + dy,
    });
  };

  const handleDelete = () => {
    if (confirm('Möchtest du diesen Charakter wirklich löschen?')) {
      deleteSprite(selectedId!);
    }
  };

  return (
    <aside className="w-full bg-white/10 backdrop-blur text-white p-4 space-y-4">
      <h2 className="text-xl font-semibold">Eigenschaften</h2>
      
      {/* Charakter-Info */}
      <div className="bg-white/5 p-3 rounded">
        <h3 className="font-medium mb-2">{selectedSprite.def.name}</h3>
        <p className="text-sm text-white/70">Typ: {selectedSprite.def.type}</p>
        <p className="text-sm text-white/70">Position: {Math.round(selectedSprite.x)}, {Math.round(selectedSprite.y)}</p>
        <p className="text-sm text-white/70">Skalierung: {(selectedSprite.scale * 100).toFixed(0)}%</p>
      </div>

      {/* Position */}
      <div className="space-y-2">
        <h4 className="font-medium">Position</h4>
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => handleMove(0, -20)}
            className="p-2 bg-white/20 rounded hover:bg-white/30 text-center transition-colors"
            title="Nach oben"
          >
            ⬆️
          </button>
          <button
            onClick={() => handleMove(-20, 0)}
            className="p-2 bg-white/20 rounded hover:bg-white/30 text-center transition-colors"
            title="Nach links"
          >
            ⬅️
          </button>
          <button
            onClick={() => handleMove(20, 0)}
            className="p-2 bg-white/20 rounded hover:bg-white/30 text-center transition-colors"
            title="Nach rechts"
          >
            ➡️
          </button>
          <button
            onClick={() => handleMove(0, 20)}
            className="p-2 bg-white/20 rounded hover:bg-white/30 text-center transition-colors"
            title="Nach unten"
          >
            ⬇️
          </button>
          <button
            onClick={() => handleMove(-20, 20)}
            className="p-2 bg-white/20 rounded hover:bg-white/30 text-center transition-colors"
            title="Links unten"
          >
            ↙️
          </button>
          <button
            onClick={() => handleMove(20, 20)}
            className="p-2 bg-white/20 rounded hover:bg-white/30 text-center transition-colors"
            title="Rechts unten"
          >
            ↘️
          </button>
        </div>
        <p className="text-xs text-white/70">Tipp: Du kannst den Charakter auch mit der Maus ziehen!</p>
      </div>

      {/* Skalierung */}
      <div className="space-y-2">
        <h4 className="font-medium">Größe</h4>
        <div className="flex gap-2">
          <button
            onClick={() => handleScaleChange(0.9)}
            className="flex-1 p-2 bg-white/20 rounded hover:bg-white/30"
          >
            Kleiner
          </button>
          <button
            onClick={() => handleScaleChange(1.1)}
            className="flex-1 p-2 bg-white/20 rounded hover:bg-white/30"
          >
            Größer
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => updateSprite(selectedId!, { scale: 1 })}
            className="flex-1 p-2 bg-white/20 rounded hover:bg-white/30 text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Audio-Clips */}
      <div className="space-y-2">
        <h4 className="font-medium">Audio-Clips ({selectedSprite.clips.length})</h4>
        {selectedSprite.clips.length === 0 ? (
          <p className="text-sm text-white/70">Keine Audio-Clips vorhanden</p>
        ) : (
          <div className="space-y-1">
            {selectedSprite.clips.map((clip, index) => (
              <div key={clip.id} className="flex items-center gap-2 bg-white/5 p-2 rounded">
                <span className="text-xs">#{index + 1}</span>
                <audio
                  src={clip.url}
                  controls
                  className="flex-1 h-6"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Aktionen */}
      <div className="space-y-2">
        <h4 className="font-medium">Aktionen</h4>
        <button
          onClick={handleDelete}
          className="w-full p-2 bg-red-600 rounded hover:bg-red-700"
        >
          🗑️ Charakter löschen
        </button>
      </div>
    </aside>
  );
};

export default PropertiesPanel;