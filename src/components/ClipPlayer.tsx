import React, { useRef, useState } from 'react';
import { Clip, useSpriteStore } from '../store2d';

interface Props {
  spriteId: string;
  clip: Clip;
  label: string;
}

const ClipPlayer: React.FC<Props> = ({ spriteId, clip, label }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const setAudioLevel = useSpriteStore((s) => s.setAudioLevel);
  const deleteClip = useSpriteStore((s)=>s.deleteClip);
  const moveClip = useSpriteStore((s)=>s.moveClip);

  const handlePlay = () => {
    if (!audioRef.current) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const src = ctx.createMediaElementSource(audioRef.current);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    src.connect(analyser);
    analyser.connect(ctx.destination);

    const data = new Uint8Array(analyser.frequencyBinCount);
    const loop = () => {
      if (!audioRef.current || audioRef.current.paused) {
        setAudioLevel(spriteId, 0);
        return;
      }
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      setAudioLevel(spriteId, avg / 255);
      requestAnimationFrame(loop);
    };
    loop();
  };

  return (
    <div className="flex items-center gap-1 w-full min-w-0">
      <span className="text-xs w-8">{label}</span>
      <audio
        ref={audioRef}
        src={clip.url}
        onPlay={() => { setPlaying(true); handlePlay(); }}
        onPause={() => { setPlaying(false); setAudioLevel(spriteId, 0); }}
        className="h-6 flex-1 w-full"
        controls
      />
      <button onClick={()=>moveClip(spriteId, clip.id, -1)} className="text-white text-xs px-1">⬆️</button>
      <button onClick={()=>moveClip(spriteId, clip.id, 1)} className="text-white text-xs px-1">⬇️</button>
      <button onClick={()=>deleteClip(spriteId, clip.id)} className="text-red-500 text-xs px-1">🗑️</button>
    </div>
  );
};

export default ClipPlayer; 