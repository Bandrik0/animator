import React, { useState } from 'react';
import { useSpriteStore } from '../store2d';

const GlobalPlayButton: React.FC = () => {
  const sprites = useSpriteStore((s) => s.sprites);
  const setAudioLevel = useSpriteStore((s) => s.setAudioLevel);
  const [playing, setPlaying] = useState(false);

  const playSequential = () => {
    const queue: Array<{ spriteId: string; url: string }> = [];
    sprites.forEach((sp) => {
      sp.clips.forEach((c) => queue.push({ spriteId: sp.id, url: c.url }));
    });
    if (!queue.length) return;

    let index = 0;
    const playNext = () => {
      if (index >= queue.length) {
        setPlaying(false);
        sprites.forEach((sp) => setAudioLevel(sp.id, 0));
        return;
      }
      const { spriteId, url } = queue[index++];
      const audio = new Audio(url);
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const src = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      src.connect(analyser);
      analyser.connect(ctx.destination);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const loop = () => {
        if (audio.paused || audio.ended) {
          setAudioLevel(spriteId, 0);
          return;
        }
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        setAudioLevel(spriteId, avg / 255);
        requestAnimationFrame(loop);
      };
      audio.onended = playNext;
      audio.play();
      loop();
    };
    setPlaying(true);
    playNext();
  };

  return (
    <button
      className={`px-3 py-2 rounded text-white ${playing ? 'bg-yellow-600' : 'bg-white/20'}`}
      onClick={() => {
        if (!playing) playSequential();
      }}
      disabled={playing}
    >
      ▶️ Play All
    </button>
  );
};

export default GlobalPlayButton; 