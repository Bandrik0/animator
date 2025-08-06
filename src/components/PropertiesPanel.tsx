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
      <div className="w-full bg-gradient-to-br from-white/15 to-white/5 backdrop-blur text-white p-4 border-l border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">⚙️ Eigenschaften</h2>
          <div className="text-xs bg-white/10 px-2 py-1 rounded">
            Keine Auswahl
          </div>
        </div>
        <div className="text-center py-12 text-white/60">
          <div className="text-6xl mb-4">🎭</div>
          <p className="text-lg font-medium mb-2">Kein Charakter ausgewählt</p>
          <p className="text-sm">Wähle einen Charakter aus der Sidebar aus, um seine Eigenschaften zu bearbeiten</p>
        </div>
      </div>
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

  const getCharacterColor = () => {
    switch (selectedSprite.def.type) {
      case 'robot':
        return {
          primary: '#607D8B',
          secondary: '#455A64',
          accent: '#90A4AE'
        };
      case 'animated':
        if (selectedSprite.def.characterType === 'lisa') {
          return {
            primary: '#E91E63',
            secondary: '#C2185B',
            accent: '#F8BBD9'
          };
        } else if (selectedSprite.def.characterType === 'mike') {
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

  const getCharacterIcon = () => {
    if (selectedSprite.def.type === 'robot') return '🤖';
    if (selectedSprite.def.type === 'animated' && selectedSprite.def.characterType === 'mike') return '👨';
    if (selectedSprite.def.type === 'animated' && selectedSprite.def.characterType === 'lisa') return '👩';
    return '👤';
  };

  const colors = getCharacterColor();

  return (
    <div className="w-full bg-gradient-to-br from-white/15 to-white/5 backdrop-blur text-white p-4 space-y-4 border-l border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">⚙️ Eigenschaften</h2>
        <div className="text-xs bg-white/10 px-2 py-1 rounded">
          Ausgewählt
        </div>
      </div>
      
      {/* Charakter-Info */}
      <div className="bg-gradient-to-r from-white/10 to-white/5 p-4 rounded-lg border border-white/20">
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              boxShadow: `0 4px 12px ${colors.primary}40`
            }}
          >
            {getCharacterIcon()}
          </div>
          <div>
            <h3 className="font-medium text-lg text-white/90">{selectedSprite.def.name}</h3>
            <p className="text-sm text-white/70 capitalize">{selectedSprite.def.type}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/10 p-2 rounded">
            <div className="text-white/60 text-xs">Position</div>
            <div className="font-medium">
              {Math.round(selectedSprite.x)}, {Math.round(selectedSprite.y)}
            </div>
          </div>
          <div className="bg-white/10 p-2 rounded">
            <div className="text-white/60 text-xs">Skalierung</div>
            <div className="font-medium">
              {(selectedSprite.scale * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>

      {/* Position */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/20">
        <h4 className="font-medium text-white/90 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Position
        </h4>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleMove(0, -20)}
            className="p-3 bg-white/20 rounded-lg hover:bg-white/30 text-center transition-all duration-200 hover:scale-105 shadow-lg"
            title="Nach oben"
          >
            ⬆️
          </button>
          <button
            onClick={() => handleMove(-20, 0)}
            className="p-3 bg-white/20 rounded-lg hover:bg-white/30 text-center transition-all duration-200 hover:scale-105 shadow-lg"
            title="Nach links"
          >
            ⬅️
          </button>
          <button
            onClick={() => handleMove(20, 0)}
            className="p-3 bg-white/20 rounded-lg hover:bg-white/30 text-center transition-all duration-200 hover:scale-105 shadow-lg"
            title="Nach rechts"
          >
            ➡️
          </button>
          <button
            onClick={() => handleMove(0, 20)}
            className="p-3 bg-white/20 rounded-lg hover:bg-white/30 text-center transition-all duration-200 hover:scale-105 shadow-lg"
            title="Nach unten"
          >
            ⬇️
          </button>
          <button
            onClick={() => handleMove(-20, 20)}
            className="p-3 bg-white/20 rounded-lg hover:bg-white/30 text-center transition-all duration-200 hover:scale-105 shadow-lg"
            title="Links unten"
          >
            ↙️
          </button>
          <button
            onClick={() => handleMove(20, 20)}
            className="p-3 bg-white/20 rounded-lg hover:bg-white/30 text-center transition-all duration-200 hover:scale-105 shadow-lg"
            title="Rechts unten"
          >
            ↘️
          </button>
        </div>
        <p className="text-xs text-white/60 mt-2">💡 Tipp: Du kannst den Charakter auch mit der Maus ziehen!</p>
      </div>

      {/* Skalierung */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/20">
        <h4 className="font-medium text-white/90 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Größe
        </h4>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button
            onClick={() => handleScaleChange(0.9)}
            className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <div className="font-medium">Kleiner</div>
            <div className="text-xs text-white/60">-10%</div>
          </button>
          <button
            onClick={() => handleScaleChange(1.1)}
            className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <div className="font-medium">Größer</div>
            <div className="text-xs text-white/60">+10%</div>
          </button>
        </div>
        <button
          onClick={() => updateSprite(selectedId!, { scale: 1 })}
          className="w-full p-2 bg-white/20 rounded-lg hover:bg-white/30 text-sm transition-all duration-200 hover:scale-105"
        >
          🔄 Reset auf 100%
        </button>
      </div>

      {/* Audio-Clips */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/20">
        <h4 className="font-medium text-white/90 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          Audio-Clips ({selectedSprite.clips.length})
        </h4>
        {selectedSprite.clips.length === 0 ? (
          <div className="text-center py-6 text-white/60">
            <div className="text-3xl mb-2">🎵</div>
            <p className="text-sm">Keine Audio-Clips vorhanden</p>
            <p className="text-xs mt-1">Nehme Audio mit dem Mic-Button auf</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
            {selectedSprite.clips.map((clip, index) => (
              <div key={clip.id} className="flex items-center gap-3 bg-white/10 p-3 rounded-lg border border-white/20">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
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
            ))}
          </div>
        )}
      </div>

      {/* Aktionen */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/20">
        <h4 className="font-medium text-white/90 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          Aktionen
        </h4>
        <button
          onClick={handleDelete}
          className="w-full p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:scale-105 shadow-lg font-medium"
        >
          🗑️ Charakter löschen
        </button>
      </div>

      {/* Quick Stats */}
      <div className="bg-white/5 rounded-lg p-3 border border-white/20">
        <div className="grid grid-cols-2 gap-4 text-xs text-white/70">
          <div>
            <div className="font-medium text-white/90 mb-1">📊 Statistiken</div>
            <div>Clips: {selectedSprite.clips.length}</div>
            <div>Scale: {selectedSprite.scale.toFixed(2)}</div>
          </div>
          <div>
            <div className="font-medium text-white/90 mb-1">🎯 Status</div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Aktiv
            </div>
            <div>Typ: {selectedSprite.def.type}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;