# 🎬 Video Animator Pro - Adobe Express Alternative

Eine moderne Web-App zum Erstellen von animierten Videos mit beweglichen Charakteren, ähnlich wie Adobe Express Video Animator. Perfekt für YouTube-Kanäle und Content Creator!

## ✨ Neue Features (v2.0)

### 🎭 Animierte Charaktere
- **Bewegliche Arme und Beine**: Charaktere bewegen sich automatisch basierend auf deiner Stimme
- **Mund-Animationen**: Realistische Mundbewegungen synchronisiert mit Audio
- **Körper-Animationen**: Natürliche Bewegungen wie Wippen und Schwingen
- **3 Charakter-Typen**: 
  - 👨 **Animated Bob**: Männlicher Charakter mit blauem Outfit
  - 👩 **Animated Lisa**: Weiblicher Charakter mit lila Kleid
  - 🤖 **Robot Max**: Mechanischer Roboter mit LED-Augen

### 🎨 Verbesserte UI/UX
- **Eigenschaften-Panel**: Detaillierte Charakter-Anpassungen
- **Timeline-Interface**: Übersichtliche Audio-Clip-Verwaltung
- **Export-Panel**: Verschiedene Export-Formate (WebM, MP4, GIF)
- **Hilfe-Sektion**: Interaktive Tipps und Anleitungen
- **Kategorisierte Sidebar**: Charaktere nach Typ sortiert

### 🎯 Einfache Bedienung
- **Drag & Drop**: Charaktere einfach mit der Maus bewegen
- **Pfeiltasten-Steuerung**: Präzise Positionierung
- **Live-Vorschau**: Animationen in Echtzeit
- **Intuitive Bedienung**: Alle Features leicht zugänglich

## 🚀 Installation & Start

1. **Dependencies installieren:**
   ```bash
   npm install
   ```

2. **Entwicklungsserver starten:**
   ```bash
   npm run dev
   ```

3. **App öffnen:**
   - Gehe zu `http://localhost:5173`
   - Die App öffnet sich automatisch im Browser

## 🎯 Verwendung

### Charaktere hinzufügen
1. Wähle eine Kategorie in der linken Sidebar (Avatare, Animiert, Roboter)
2. Klicke auf einen Charakter
3. Der Charakter erscheint auf dem Canvas

### Audio aufnehmen
1. Klicke auf den "🎤 Mic"-Button bei einem Charakter
2. Sprich in dein Mikrofon
3. Klicke auf "⏹ Stop" zum Beenden
4. Das Audio wird automatisch dem Charakter zugeordnet

### Charaktere bearbeiten
1. Klicke auf einen Charakter im Canvas
2. Nutze die Eigenschaften-Sidebar rechts:
   - **Position**: Pfeiltasten für präzise Bewegung
   - **Größe**: Kleiner/Größer Buttons
   - **Audio-Clips**: Alle Aufnahmen anzeigen und abspielen
   - **Löschen**: Charakter entfernen

### Animation abspielen
1. Klicke auf "▶️ Play All" in der Timeline
2. Alle Audio-Clips werden sequenziell abgespielt
3. Charaktere animieren sich automatisch

### Video aufnehmen
1. Klicke auf "⏺ Record" in der oberen Leiste
2. Führe deine Animation aus
3. Klicke auf "⏹ Stop Recording"
4. Das Video wird automatisch heruntergeladen

### Export
1. Wähle das gewünschte Format (WebM, MP4, GIF)
2. Wähle die Qualität (Niedrig, Mittel, Hoch)
3. Klicke auf "📤 Export starten"

## 🛠️ Technologie-Stack

- **React 18** - Moderne UI-Bibliothek
- **TypeScript** - Typsicherheit
- **Vite** - Schneller Build-Tool
- **PIXI.js** - 2D-Grafik-Rendering
- **Zustand** - State Management
- **Tailwind CSS** - Styling
- **MediaRecorder API** - Video-Aufnahme
- **Web Audio API** - Audio-Verarbeitung

## 🎨 Charakter-System

### Avatar-Charaktere
- **Alex & Maria**: Klassische Avatare mit verschiedenen Mund-Positionen
- **Einfache Animation**: Nur Mund-Bewegungen

### Animierte Charaktere
- **Animated Bob**: Männlicher Charakter mit beweglichen Armen/Beinen
- **Animated Lisa**: Weiblicher Charakter mit Haaren und Kleid
- **Vollständige Animation**: Arme, Beine, Körper, Mund

### Roboter-Charaktere
- **Robot Max**: Mechanischer Roboter mit LED-Augen
- **Antennen-Animation**: Bewegliche Antenne
- **Energie-Anzeige**: Visueller Audio-Level-Indikator

## 📱 Features im Detail

### Timeline
- **Übersicht**: Alle Audio-Clips auf einen Blick
- **Charakter-Tracks**: Separate Spuren pro Charakter
- **Play-All**: Alle Clips sequenziell abspielen
- **Clip-Verwaltung**: Einzelne Clips abspielen und löschen

### Eigenschaften-Panel
- **Charakter-Info**: Name, Typ, Position, Skalierung
- **Position-Steuerung**: 6-Richtungs-Navigation
- **Größen-Anpassung**: Kleiner/Größer mit Reset
- **Audio-Clip-Liste**: Alle Aufnahmen des Charakters

### Export-System
- **Format-Auswahl**: WebM, MP4, GIF
- **Qualitäts-Einstellungen**: Niedrig, Mittel, Hoch
- **Größen-Schätzung**: Ungefähre Dateigröße
- **Progress-Anzeige**: Export-Fortschritt

## 🎥 YouTube-Kanal Tipps

### Video-Ideen
1. **Tutorials**: Zeige wie man die App nutzt
2. **Animationen**: Erstelle lustige Charakter-Animationen
3. **Challenges**: "Erstelle eine Geschichte in 60 Sekunden"
4. **Reviews**: Vergleiche mit anderen Tools
5. **Charakter-Showcase**: Präsentiere verschiedene Charaktere

### Content-Strategie
- Regelmäßige Uploads (2-3x pro Woche)
- Thumbnails mit deinen Animationen
- Beschreibungen mit App-Link
- Community-Engagement

## 🔧 Entwicklung

### Projekt-Struktur
```
src/
├── components/           # React-Komponenten
│   ├── AnimatedCharacter.tsx    # Animierter männlicher Charakter
│   ├── AnimatedCharacter2.tsx   # Animierter weiblicher Charakter
│   ├── RobotCharacter.tsx       # Roboter-Charakter
│   ├── PropertiesPanel.tsx      # Eigenschaften-Sidebar
│   ├── Timeline.tsx             # Timeline-Interface
│   ├── ExportPanel.tsx          # Export-Funktionen
│   └── HelpPanel.tsx            # Hilfe-Sektion
├── data/                # Daten-Definitionen
│   └── characters2d.ts  # Charakter-Definitionen
├── hooks/               # Custom Hooks
├── store2d.ts           # Zustand-Management
└── App.tsx              # Haupt-Komponente
```

### Scripts
- `npm run dev` - Entwicklungsserver
- `npm run build` - Production Build
- `npm run preview` - Build Preview

## 🐛 Bekannte Probleme

- Video-Aufnahme funktioniert nur in modernen Browsern
- Mobile Performance kann bei vielen Charakteren langsamer sein
- Safari benötigt HTTPS für MediaRecorder
- SVG-Animationen können bei sehr hohen Audio-Levels ruckeln

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature Branch
3. Committe deine Änderungen
4. Push zum Branch
5. Erstelle einen Pull Request

## 📄 Lizenz

MIT License - Frei verwendbar für kommerzielle und private Projekte.

## 🙏 Credits

- Inspiriert von Adobe Express Video Animator
- SVG-Animationen mit PIXI.js
- Glassmorphism-Design inspiriert von modernen UI-Trends
- Charakter-Designs erstellt mit SVG

---

**Viel Spaß beim Erstellen deiner animierten YouTube-Videos! 🎬✨** 