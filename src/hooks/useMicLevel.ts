import { useEffect, useRef, useState } from 'react';
import { useMicStore } from '../micStore';

export const useMicLevel = () => {
  const level = useMicStore((s:any) => s.level);
  const enabled = useMicStore((s:any) => s.enabled);
  const setLevel = useMicStore((s:any)=>s.setLevel);
  const setEnabled = useMicStore((s:any)=>s.setEnabled);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number>();

  const start = async () => {
    if (enabled) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      const mic = ctx.createMediaStreamSource(stream);
      mic.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const loop = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
        setLevel(avg / 255);
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      setEnabled(true);
    } catch (e) {
      console.error('mic error', e);
    }
  };

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    audioCtxRef.current?.close();
    setEnabled(false);
    setLevel(0);
  };

  useEffect(() => {
    return () => stop();
  }, []);

  return { level, enabled, start, stop };
}; 