import React from 'react';
import { Sprite } from '@pixi/react';

interface AnimatedCharacter2Props {
  x: number;
  y: number;
  scale: number;
  audioLevel: number;
  characterName: string;
  interactive?: boolean;
  onPointerDown?: () => void;
  onPointerMove?: (e: any) => void;
}

const AnimatedCharacter2: React.FC<AnimatedCharacter2Props> = ({
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
  const hairSwing = Math.sin(Date.now() * 0.015) * (audioLevel * 0.1);

  // SVG für animierten weiblichen Charakter
  const characterSVG = `
    <svg width="200" height="300" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <!-- Körper -->
      <ellipse cx="100" cy="${150 + bodyBob * 10}" rx="35" ry="55" fill="#E91E63" stroke="#C2185B" stroke-width="2"/>
      
      <!-- Kopf -->
      <circle cx="100" cy="${80 + bodyBob * 5}" r="32" fill="#FFD4B3" stroke="#E6B894" stroke-width="2"/>
      
      <!-- Haare -->
      <path d="M 68 ${50 + hairSwing * 3} Q 100 ${30 + hairSwing * 2} 132 ${50 + hairSwing * 3} Q 140 ${70 + hairSwing * 2} 135 ${90 + hairSwing * 1} Q 130 ${110} 125 ${115} Q 120 ${120} 115 ${118} Q 110 ${116} 105 ${115} Q 100 ${114} 95 ${115} Q 90 ${116} 85 ${118} Q 80 ${120} 75 ${115} Q 70 ${110} 65 ${90 + hairSwing * 1} Q 60 ${70 + hairSwing * 2} 68 ${50 + hairSwing * 3} Z" fill="#8D6E63" stroke="#6D4C41" stroke-width="1"/>
      
      <!-- Augen -->
      <circle cx="90" cy="75" r="4" fill="#2C3E50"/>
      <circle cx="110" cy="75" r="4" fill="#2C3E50"/>
      <circle cx="92" cy="73" r="1.5" fill="#FFFFFF"/>
      <circle cx="112" cy="73" r="1.5" fill="#FFFFFF"/>
      
      <!-- Mund - animiert basierend auf Audio -->
      <ellipse cx="100" cy="${90 + mouthOpen * 15}" rx="${8 + mouthOpen * 12}" ry="${3 + mouthOpen * 8}" fill="#E74C3C"/>
      
      <!-- Arme - animiert -->
      <ellipse cx="${60 + armSwing * 10}" cy="${130 + bodyBob * 8}" rx="12" ry="35" fill="#E91E63" stroke="#C2185B" stroke-width="2" transform="rotate(${armSwing * 20} ${60 + armSwing * 10} ${130 + bodyBob * 8})"/>
      <ellipse cx="${140 - armSwing * 10}" cy="${130 + bodyBob * 8}" rx="12" ry="35" fill="#E91E63" stroke="#C2185B" stroke-width="2" transform="rotate(${-armSwing * 20} ${140 - armSwing * 10} ${130 + bodyBob * 8})"/>
      
      <!-- Hände -->
      <circle cx="${55 + armSwing * 8}" cy="${165 + bodyBob * 6}" r="7" fill="#FFD4B3" stroke="#E6B894" stroke-width="1"/>
      <circle cx="${145 - armSwing * 8}" cy="${165 + bodyBob * 6}" r="7" fill="#FFD4B3" stroke="#E6B894" stroke-width="1"/>
      
      <!-- Beine - animiert -->
      <ellipse cx="${80 + legSwing * 5}" cy="${220 + bodyBob * 4}" rx="10" ry="45" fill="#2C3E50" stroke="#1A252F" stroke-width="2" transform="rotate(${legSwing * 15} ${80 + legSwing * 5} ${220 + bodyBob * 4})"/>
      <ellipse cx="${120 - legSwing * 5}" cy="${220 + bodyBob * 4}" rx="10" ry="45" fill="#2C3E50" stroke="#1A252F" stroke-width="2" transform="rotate(${-legSwing * 15} ${120 - legSwing * 5} ${220 + bodyBob * 4})"/>
      
      <!-- Füße -->
      <ellipse cx="${75 + legSwing * 4}" cy="${265 + bodyBob * 2}" rx="12" ry="6" fill="#34495E" stroke="#2C3E50" stroke-width="1"/>
      <ellipse cx="${125 - legSwing * 4}" cy="${265 + bodyBob * 2}" rx="12" ry="6" fill="#34495E" stroke="#2C3E50" stroke-width="1"/>
      
      <!-- Kleid -->
      <path d="M 65 ${120 + bodyBob * 8} Q 100 ${140 + bodyBob * 8} 135 ${120 + bodyBob * 8} L 130 ${200 + bodyBob * 4} Q 100 ${210 + bodyBob * 4} 70 ${200 + bodyBob * 4} Z" fill="#9C27B0" stroke="#7B1FA2" stroke-width="1"/>
      
      <!-- Audio-Wellen um den Kopf -->
      ${audioLevel > 0.1 ? `
        <circle cx="100" cy="80" r="${40 + audioLevel * 30}" fill="none" stroke="#E91E63" stroke-width="2" opacity="${0.3 - audioLevel * 0.2}"/>
        <circle cx="100" cy="80" r="${50 + audioLevel * 40}" fill="none" stroke="#E91E63" stroke-width="1" opacity="${0.2 - audioLevel * 0.15}"/>
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

export default AnimatedCharacter2;