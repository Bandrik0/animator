import React, { useState } from 'react';
import { spriteCharacters } from '../data/characters2d';
import { backgrounds } from '../data/backgrounds';
import { useSpriteStore } from '../store2d';
import SpriteLine from './SpriteLine';

interface Sidebar2DProps {
  className?: string;
}

const Sidebar2D: React.FC<Sidebar2DProps> = ({ className = '' }) => {
  const addSprite = useSpriteStore((s) => s.addSprite);
  const sprites = useSpriteStore((s) => s.sprites);
  const select = useSpriteStore((s) => s.select);
  const [activeTab, setActiveTab] = useState<'characters' | 'backgrounds' | 'recorded'>('characters');

  const handleAddCharacter = (char: any) => {
    const newSpriteId = addSprite(char);
    // Auto-select the new character
    if (newSpriteId) {
      select(newSpriteId);
    }
    // Auto-scroll to recorded tab to see the new character
    setTimeout(() => {
      setActiveTab('recorded');
    }, 100);
  };

  const avatarCharacters = spriteCharacters.filter(char => char.type === 'avatar');
  const animatedCharacters = spriteCharacters.filter(char => char.type === 'animated');
  const robotCharacters = spriteCharacters.filter(char => char.type === 'robot');

  const getCharacterColor = (type: string, characterType?: string) => {
    switch (type) {
      case 'avatar':
        return 'from-purple-500 to-purple-700';
      case 'animated':
        if (characterType === 'lisa') {
          return 'from-pink-500 to-pink-700';
        } else if (characterType === 'mike') {
          return 'from-green-500 to-green-700';
        } else {
          return 'from-blue-500 to-blue-700';
        }
      case 'robot':
        return 'from-gray-500 to-gray-700';
      default:
        return 'from-indigo-500 to-indigo-700';
    }
  };

  const getCharacterIcon = (type: string, characterType?: string) => {
    switch (type) {
      case 'avatar':
        return '👤';
      case 'animated':
        if (characterType === 'lisa') {
          return '👩';
        } else if (characterType === 'mike') {
          return '👨';
        } else {
          return '👤';
        }
      case 'robot':
        return '🤖';
      default:
        return '👤';
    }
  };

  return (
    <div className={`w-full bg-gradient-to-br from-white/15 to-white/5 backdrop-blur text-white p-4 space-y-4 h-full overflow-y-auto border-r border-white/10 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">🎭 Charaktere</h2>
        <div className="text-xs bg-white/10 px-2 py-1 rounded">
          {sprites.length} aktiv
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('characters')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            activeTab === 'characters'
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-white/70 hover:text-white'
          }`}
        >
          🎭 Charaktere
        </button>
        <button
          onClick={() => setActiveTab('backgrounds')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            activeTab === 'backgrounds'
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-white/70 hover:text-white'
          }`}
        >
          🖼️ Hintergründe
        </button>
        <button
          onClick={() => setActiveTab('recorded')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            activeTab === 'recorded'
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-white/70 hover:text-white'
          }`}
        >
          🎵 Aufgenommen
        </button>
      </div>

      {/* Characters Tab */}
      {activeTab === 'characters' && (
        <div className="space-y-4">
          {/* Avatar Charaktere */}
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <h3 className="text-sm font-medium text-white/90 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Avatare
            </h3>
            <div className="space-y-2">
              {avatarCharacters.map((char) => (
                <button
                  key={char.name}
                  onClick={() => handleAddCharacter(char)}
                  data-testid="add-character"
                  className="w-full flex items-center gap-3 hover:bg-white/10 p-3 rounded-lg transition-all duration-200 hover:scale-105 group"
                  title={`${char.name} zur Szene hinzufügen`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCharacterColor(char.type)} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all`}>
                    <span className="text-white text-xl">
                      {getCharacterIcon(char.type, char.characterType)}
                    </span>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-medium text-white/90">{char.name}</div>
                    <div className="text-xs text-white/60">Avatar</div>
                  </div>
                  <div className="text-lg text-white/40 group-hover:text-white/60 transition-colors font-bold">
                    ➕
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Animierte Charaktere */}
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <h3 className="text-sm font-medium text-white/90 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Animiert
            </h3>
            <div className="space-y-2">
              {animatedCharacters.map((char) => (
                <button
                  key={char.name}
                  onClick={() => handleAddCharacter(char)}
                  data-testid="add-character"
                  className="w-full flex items-center gap-3 hover:bg-white/10 p-3 rounded-lg transition-all duration-200 hover:scale-105 group"
                  title={`${char.name} zur Szene hinzufügen`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCharacterColor(char.type, char.characterType)} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all`}>
                    <span className="text-white text-xl">
                      {getCharacterIcon(char.type, char.characterType)}
                    </span>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-medium text-white/90">{char.name}</div>
                    <div className="text-xs text-white/60">Animiert</div>
                  </div>
                  <div className="text-lg text-white/40 group-hover:text-white/60 transition-colors font-bold">
                    ➕
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Roboter Charaktere */}
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <h3 className="text-sm font-medium text-white/90 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              Roboter
            </h3>
            <div className="space-y-2">
              {robotCharacters.map((char) => (
                <button
                  key={char.name}
                  onClick={() => handleAddCharacter(char)}
                  data-testid="add-character"
                  className="w-full flex items-center gap-3 hover:bg-white/10 p-3 rounded-lg transition-all duration-200 hover:scale-105 group"
                  title={`${char.name} zur Szene hinzufügen`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCharacterColor(char.type)} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all`}>
                    <span className="text-white text-xl">
                      {getCharacterIcon(char.type)}
                    </span>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-medium text-white/90">{char.name}</div>
                    <div className="text-xs text-white/60">Roboter</div>
                  </div>
                  <div className="text-lg text-white/40 group-hover:text-white/60 transition-colors font-bold">
                    ➕
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backgrounds Tab */}
      {activeTab === 'backgrounds' && (
        <div className="space-y-3">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <h3 className="text-sm font-medium text-white/90 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Hintergründe
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {backgrounds.map((bg) => (
                <button
                  key={bg.name}
                  onClick={() => useSpriteStore.getState().setBackground(bg.url)}
                  className="p-3 bg-white/10 rounded-lg hover:bg-white/20 text-left capitalize text-sm transition-all duration-200 hover:scale-105 border border-white/20"
                >
                  <div className="font-medium text-white/90">{bg.name}</div>
                  <div className="text-xs text-white/60 mt-1">Hintergrund</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recorded Tab */}
      {activeTab === 'recorded' && (
        <div className="space-y-3">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <h3 className="text-sm font-medium text-white/90 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              Aufgenommene Charaktere ({sprites.length})
            </h3>
            {sprites.length === 0 ? (
              <div className="text-center py-8 text-white/60">
                <div className="text-4xl mb-2">🎭</div>
                <p className="text-sm">Keine Charaktere vorhanden</p>
                <p className="text-xs mt-1">Füge Charaktere aus dem Charaktere-Tab hinzu</p>
              </div>
            ) : (
              <div className="space-y-2">
                {sprites.map((sp) => (
                  <SpriteLine key={sp.id} sprite={sp} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
        <div className="grid grid-cols-2 gap-4 text-xs text-white/70">
          <div>
            <div className="font-medium text-white/90 mb-1">📊 Statistiken</div>
            <div>Charaktere: {sprites.length}</div>
            <div>Clips: {sprites.reduce((acc, sprite) => acc + sprite.clips.length, 0)}</div>
          </div>
          <div>
            <div className="font-medium text-white/90 mb-1">🎯 Status</div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Bereit
            </div>
            <div>Tab: {activeTab}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar2D; 