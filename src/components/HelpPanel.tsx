import React, { useState } from 'react';

const HelpPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'getting-started' | 'features' | 'tips'>('getting-started');

  const tabs = [
    { id: 'getting-started', label: 'Erste Schritte', icon: '🚀' },
    { id: 'features', label: 'Features', icon: '✨' },
    { id: 'tips', label: 'Tipps', icon: '💡' },
  ];

  const content = {
    'getting-started': (
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-1 text-xs">1. Charakter hinzufügen</h4>
          <p className="text-xs text-white/80">Wähle einen Charakter aus der linken Sidebar und klicke darauf.</p>
        </div>
        <div>
          <h4 className="font-medium mb-1 text-xs">2. Audio aufnehmen</h4>
          <p className="text-xs text-white/80">Klicke auf den Mikrofon-Button bei einem Charakter und sprich.</p>
        </div>
        <div>
          <h4 className="font-medium mb-1 text-xs">3. Charakter bewegen</h4>
          <p className="text-xs text-white/80">Ziehe Charaktere mit der Maus oder nutze die Pfeiltasten in der Eigenschaften-Sidebar.</p>
        </div>
        <div>
          <h4 className="font-medium mb-1 text-xs">4. Animation abspielen</h4>
          <p className="text-xs text-white/80">Klicke auf "Play All" um alle Audio-Clips abzuspielen.</p>
        </div>
      </div>
    ),
    'features': (
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">🎭 Animierte Charaktere</h4>
          <p className="text-sm text-white/80">Charaktere bewegen sich automatisch basierend auf deiner Stimme.</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">🎤 Live-Aufnahme</h4>
          <p className="text-sm text-white/80">Nimm Audio direkt auf und sieh die Animationen in Echtzeit.</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">📹 Video-Export</h4>
          <p className="text-sm text-white/80">Exportiere deine Animationen als WebM, MP4 oder GIF.</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">🎨 Eigenschaften-Editor</h4>
          <p className="text-sm text-white/80">Passe Position, Größe und andere Eigenschaften an.</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">⏱️ Timeline</h4>
          <p className="text-sm text-white/80">Verwalte alle Audio-Clips in einer übersichtlichen Timeline.</p>
        </div>
      </div>
    ),
    'tips': (
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">🎯 Beste Ergebnisse</h4>
          <ul className="text-sm text-white/80 space-y-1">
            <li>• Sprich klar und deutlich für bessere Animationen</li>
            <li>• Nutze verschiedene Charaktere für Dialoge</li>
            <li>• Experimentiere mit verschiedenen Hintergründen</li>
            <li>• Verwende die Timeline für komplexe Szenen</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">⚡ Performance-Tipps</h4>
          <ul className="text-sm text-white/80 space-y-1">
            <li>• Begrenze die Anzahl der Charaktere auf 5-6</li>
            <li>• Verwende kürzere Audio-Clips für bessere Performance</li>
            <li>• Schließe andere Browser-Tabs während der Aufnahme</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">🎬 YouTube-Tipps</h4>
          <ul className="text-sm text-white/80 space-y-1">
            <li>• Erstelle Thumbnails mit deinen animierten Charakteren</li>
            <li>• Nutze verschiedene Hintergründe für verschiedene Videos</li>
            <li>• Experimentiere mit verschiedenen Charakter-Kombinationen</li>
          </ul>
        </div>
      </div>
    ),
  };

  return (
    <div className="bg-white/10 backdrop-blur text-white p-3 h-full overflow-y-auto">
      <h3 className="text-md font-semibold mb-3">Hilfe & Tipps</h3>
      
      {/* Tabs */}
      <div className="flex gap-1 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-2 py-1 rounded text-xs transition-colors ${
              activeTab === tab.id ? 'bg-blue-600' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {content[activeTab]}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <h4 className="font-medium mb-2">Schnell-Aktionen</h4>
        <div className="flex gap-2">
          <button className="px-2 py-1 bg-white/20 rounded text-xs hover:bg-white/30">
            🎬 Tutorial anzeigen
          </button>
          <button className="px-2 py-1 bg-white/20 rounded text-xs hover:bg-white/30">
            📧 Feedback senden
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpPanel;