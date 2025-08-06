# 🎬 Video Animator - Adobe Express Alternative

Eine moderne Web-App zum Erstellen von animierten Videos, ähnlich wie Adobe Express Video Animator. Perfekt für YouTube-Kanäle und Content Creator!

## ✨ Features

- **Charakter-System**: Verschiedene Charaktere (Person, Tier, Robot, Monster) zum Hinzufügen
- **Hintergrund-Auswahl**: Verschiedene Hintergründe (Office, Nature, Space, City)
- **Live-Aufnahme**: Direkte Video-Aufnahme des Canvas
- **Animation**: Automatische Charakter-Animationen
- **Eigenschaften-Editor**: Skalierung und Rotation von Charakteren
- **Moderne UI**: Glassmorphism-Design mit schönen Animationen
- **Responsive**: Funktioniert auf Desktop und Mobile

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
   - Gehe zu `http://localhost:3000`
   - Die App öffnet sich automatisch im Browser

## 🎯 Verwendung

### Charaktere hinzufügen
1. Klicke auf einen Charakter in der linken Sidebar
2. Der Charakter erscheint auf dem Canvas
3. Klicke auf den Charakter, um ihn zu bearbeiten

### Hintergrund wählen
1. Wähle einen Hintergrund aus der linken Sidebar
2. Der Hintergrund wird sofort angewendet

### Charaktere bearbeiten
1. Klicke auf einen Charakter im Canvas
2. Nutze die Eigenschaften-Sidebar rechts:
   - **Skalierung**: Größe des Charakters ändern
   - **Rotation**: Charakter drehen
   - **Löschen**: Charakter entfernen

### Animation starten
1. Klicke auf "Play Animation"
2. Charaktere bewegen sich automatisch
3. Klicke auf "Stop Animation" zum Stoppen

### Video aufnehmen
1. Klicke auf "Start Recording"
2. Führe deine Animation aus
3. Klicke auf "Stop Recording"
4. Das Video wird automatisch heruntergeladen

## 🛠️ Technologie-Stack

- **React 18** - Moderne UI-Bibliothek
- **TypeScript** - Typsicherheit
- **Vite** - Schneller Build-Tool
- **Framer Motion** - Smooth Animationen
- **Lucide React** - Moderne Icons
- **Canvas API** - Video-Rendering
- **MediaRecorder API** - Video-Aufnahme

## 📱 Deployment auf Netlify

1. **Build erstellen:**
   ```bash
   npm run build
   ```

2. **Auf Netlify hochladen:**
   - Gehe zu [netlify.com](https://netlify.com)
   - Ziehe den `dist` Ordner hoch
   - Oder verbinde dein GitHub Repository

3. **Custom Domain (optional):**
   - Füge deine eigene Domain hinzu
   - SSL wird automatisch aktiviert

## 🎨 Customization

### Neue Charaktere hinzufügen
Bearbeite `availableCharacters` in `src/App.tsx`:
```typescript
const availableCharacters = [
  { id: 'char1', type: 'Person', src: 'path/to/image.png' },
  // Neue Charaktere hier hinzufügen
];
```

### Neue Hintergründe hinzufügen
Bearbeite `backgrounds` in `src/App.tsx`:
```typescript
const backgrounds = [
  { id: 'bg1', src: 'path/to/background.png', name: 'Custom BG' },
  // Neue Hintergründe hier hinzufügen
];
```

### Styling anpassen
Bearbeite `src/App.css` für eigene Farben und Designs.

## 🔧 Entwicklung

### Projekt-Struktur
```
src/
├── App.tsx          # Haupt-Komponente
├── App.css          # Styling
├── main.tsx         # Entry Point
└── index.css        # Globale Styles
```

### Scripts
- `npm run dev` - Entwicklungsserver
- `npm run build` - Production Build
- `npm run preview` - Build Preview
- `npm run lint` - Code Linting

## 🎥 YouTube-Kanal Tipps

### Video-Ideen
1. **Tutorials**: Zeige wie man die App nutzt
2. **Animationen**: Erstelle lustige Charakter-Animationen
3. **Challenges**: "Erstelle eine Geschichte in 60 Sekunden"
4. **Reviews**: Vergleiche mit anderen Tools

### Content-Strategie
- Regelmäßige Uploads (2-3x pro Woche)
- Thumbnails mit deinen Animationen
- Beschreibungen mit App-Link
- Community-Engagement

## 🐛 Bekannte Probleme

- Video-Aufnahme funktioniert nur in modernen Browsern
- Mobile Performance kann bei vielen Charakteren langsamer sein
- Safari benötigt HTTPS für MediaRecorder

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
- Icons von Lucide React
- Animationen mit Framer Motion
- Glassmorphism-Design inspiriert von modernen UI-Trends

---

**Viel Spaß beim Erstellen deiner YouTube-Videos! 🎬✨** 