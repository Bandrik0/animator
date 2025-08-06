import React from 'react';
import { Sprite } from '@pixi/react';

interface AnimatedCharacterProps {
  x: number;
  y: number;
  scale: number;
  audioLevel: number;
  characterName: string;
  interactive?: boolean;
  onPointerDown?: () => void;
  onPointerMove?: (e: any) => void;
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({
  x,
  y,
  scale,
  audioLevel,
  characterName,
  interactive = false,
  onPointerDown,
  onPointerMove,
}) => {
  // Berechne Animationen basierend auf Audio-Level
  const mouthOpen = Math.min(audioLevel * 3, 1);
  const armSwing = Math.sin(Date.now() * 0.01) * (audioLevel * 0.3);
  const legSwing = Math.sin(Date.now() * 0.008) * (audioLevel * 0.2);
  const bodyBob = Math.sin(Date.now() * 0.012) * (audioLevel * 0.1);

  // SVG für animierten Charakter
  const characterSVG = `
    <svg width="200" height="300" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <!-- Körper -->
      <ellipse cx="100" cy="${150 + bodyBob * 10}" rx="40" ry="60" fill="#4A90E2" stroke="#357ABD" stroke-width="2"/>
      
      <!-- Kopf -->
      <circle cx="100" cy="${80 + bodyBob * 5}" r="35" fill="#FFD4B3" stroke="#E6B894" stroke-width="2"/>
      
      <!-- Augen -->
      <circle cx="90" cy="75" r="4" fill="#2C3E50"/>
      <circle cx="110" cy="75" r="4" fill="#2C3E50"/>
      
      <!-- Mund - animiert basierend auf Audio -->
      <ellipse cx="100" cy="${90 + mouthOpen * 15}" rx="${8 + mouthOpen * 12}" ry="${3 + mouthOpen * 8}" fill="#E74C3C"/>
      
      <!-- Arme - animiert -->
      <ellipse cx="${60 + armSwing * 10}" cy="${130 + bodyBob * 8}" rx="15" ry="40" fill="#4A90E2" stroke="#357ABD" stroke-width="2" transform="rotate(${armSwing * 20} ${60 + armSwing * 10} ${130 + bodyBob * 8})"/>
      <ellipse cx="${140 - armSwing * 10}" cy="${130 + bodyBob * 8}" rx="15" ry="40" fill="#4A90E2" stroke="#357ABD" stroke-width="2" transform="rotate(${-armSwing * 20} ${140 - armSwing * 10} ${130 + bodyBob * 8})"/>
      
      <!-- Hände -->
      <circle cx="${55 + armSwing * 8}" cy="${170 + bodyBob * 6}" r="8" fill="#FFD4B3" stroke="#E6B894" stroke-width="1"/>
      <circle cx="${145 - armSwing * 8}" cy="${170 + bodyBob * 6}" r="8" fill="#FFD4B3" stroke="#E6B894" stroke-width="1"/>
      
      <!-- Beine - animiert -->
      <ellipse cx="${80 + legSwing * 5}" cy="${220 + bodyBob * 4}" rx="12" ry="50" fill="#2C3E50" stroke="#1A252F" stroke-width="2" transform="rotate(${legSwing * 15} ${80 + legSwing * 5} ${220 + bodyBob * 4})"/>
      <ellipse cx="${120 - legSwing * 5}" cy="${220 + bodyBob * 4}" rx="12" ry="50" fill="#2C3E50" stroke="#1A252F" stroke-width="2" transform="rotate(${-legSwing * 15} ${120 - legSwing * 5} ${220 + bodyBob * 4})"/>
      
      <!-- Füße -->
      <ellipse cx="${75 + legSwing * 4}" cy="${270 + bodyBob * 2}" rx="15" ry="8" fill="#34495E" stroke="#2C3E50" stroke-width="1"/>
      <ellipse cx="${125 - legSwing * 4}" cy="${270 + bodyBob * 2}" rx="15" ry="8" fill="#34495E" stroke="#2C3E50" stroke-width="1"/>
      
      <!-- Audio-Wellen um den Kopf -->
      ${audioLevel > 0.1 ? `
        <circle cx="100" cy="80" r="${40 + audioLevel * 30}" fill="none" stroke="#E74C3C" stroke-width="2" opacity="${0.3 - audioLevel * 0.2}"/>
        <circle cx="100" cy="80" r="${50 + audioLevel * 40}" fill="none" stroke="#E74C3C" stroke-width="1" opacity="${0.2 - audioLevel * 0.15}"/>
      ` : ''}
    </svg>
  `;

  // Erstelle Blob URL für das SVG
  const svgBlob = new Blob([characterSVG], { type: 'image/svg+xml' });
  const svgUrl = URL.createObjectURL(svgBlob);

  return (
    <Sprite
      image={svgUrl}
      x={x}
      y={y}
      scale={scale}
      anchor={0.5}
      interactive={interactive}
      pointerdown={onPointerDown}
      pointermove={onPointerMove}
      buttonMode={interactive}
    />
  );
};

export default AnimatedCharacter;