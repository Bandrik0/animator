import React from 'react';
import { Sprite } from '@pixi/react';

interface RobotCharacterProps {
  x: number;
  y: number;
  scale: number;
  audioLevel: number;
  characterName: string;
  interactive?: boolean;
  onPointerDown?: () => void;
  onPointerMove?: (e: any) => void;
}

const RobotCharacter: React.FC<RobotCharacterProps> = ({
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
  const eyeBlink = Math.sin(Date.now() * 0.02) > 0.8 ? 0 : 1;
  const antennaSwing = Math.sin(Date.now() * 0.015) * (audioLevel * 0.2);

  // SVG für Roboter-Charakter
  const characterSVG = `
    <svg width="200" height="300" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <!-- Körper - Metall -->
      <rect x="60" y="${120 + bodyBob * 10}" width="80" height="100" fill="#607D8B" stroke="#455A64" stroke-width="3" rx="10"/>
      
      <!-- Kopf - Metall -->
      <rect x="70" y="${70 + bodyBob * 5}" width="60" height="60" fill="#78909C" stroke="#546E7A" stroke-width="3" rx="8"/>
      
      <!-- Antenne -->
      <line x1="100" y1="${70 + bodyBob * 5}" x2="${100 + antennaSwing * 5}" y2="${40 + antennaSwing * 3}" stroke="#455A64" stroke-width="2"/>
      <circle cx="${100 + antennaSwing * 5}" cy="${40 + antennaSwing * 3}" r="3" fill="#FF5722"/>
      
      <!-- Augen - LED -->
      <circle cx="85" cy="95" r="6" fill="#00BCD4" stroke="#0097A7" stroke-width="2" opacity="${eyeBlink}"/>
      <circle cx="115" cy="95" r="6" fill="#00BCD4" stroke="#0097A7" stroke-width="2" opacity="${eyeBlink}"/>
      <circle cx="87" cy="93" r="2" fill="#FFFFFF" opacity="${eyeBlink}"/>
      <circle cx="117" cy="93" r="2" fill="#FFFFFF" opacity="${eyeBlink}"/>
      
      <!-- Mund - mechanisch -->
      <rect x="90" y="${105 + mouthOpen * 10}" width="20" height="${5 + mouthOpen * 8}" fill="#FF5722" stroke="#E64A19" stroke-width="1" rx="2"/>
      
      <!-- Arme - mechanisch -->
      <rect x="${40 + armSwing * 10}" y="${130 + bodyBob * 8}" width="25" height="60" fill="#607D8B" stroke="#455A64" stroke-width="2" rx="5" transform="rotate(${armSwing * 15} ${40 + armSwing * 10} ${130 + bodyBob * 8})"/>
      <rect x="${135 - armSwing * 10}" y="${130 + bodyBob * 8}" width="25" height="60" fill="#607D8B" stroke="#455A64" stroke-width="2" rx="5" transform="rotate(${-armSwing * 15} ${135 - armSwing * 10} ${130 + bodyBob * 8})"/>
      
      <!-- Hände - Greifer -->
      <rect x="${35 + armSwing * 8}" y="${190 + bodyBob * 6}" width="15" height="20" fill="#455A64" stroke="#37474F" stroke-width="1" rx="3"/>
      <rect x="${150 - armSwing * 8}" y="${190 + bodyBob * 6}" width="15" height="20" fill="#455A64" stroke="#37474F" stroke-width="1" rx="3"/>
      
      <!-- Beine - mechanisch -->
      <rect x="${75 + legSwing * 5}" y="${220 + bodyBob * 4}" width="20" height="60" fill="#607D8B" stroke="#455A64" stroke-width="2" rx="5" transform="rotate(${legSwing * 10} ${75 + legSwing * 5} ${220 + bodyBob * 4})"/>
      <rect x="${105 - legSwing * 5}" y="${220 + bodyBob * 4}" width="20" height="60" fill="#607D8B" stroke="#455A64" stroke-width="2" rx="5" transform="rotate(${-legSwing * 10} ${105 - legSwing * 5} ${220 + bodyBob * 4})"/>
      
      <!-- Füße - Metall -->
      <rect x="${70 + legSwing * 4}" y="${280 + bodyBob * 2}" width="25" height="15" fill="#455A64" stroke="#37474F" stroke-width="1" rx="3"/>
      <rect x="${105 - legSwing * 4}" y="${280 + bodyBob * 2}" width="25" height="15" fill="#455A64" stroke="#37474F" stroke-width="1" rx="3"/>
      
      <!-- Schrauben und Details -->
      <circle cx="75" cy="85" r="2" fill="#37474F"/>
      <circle cx="125" cy="85" r="2" fill="#37474F"/>
      <circle cx="75" cy="140" r="2" fill="#37474F"/>
      <circle cx="125" cy="140" r="2" fill="#37474F"/>
      
      <!-- Energie-Anzeige -->
      <rect x="65" y="160" width="70" height="8" fill="#37474F" stroke="#263238" stroke-width="1" rx="4"/>
      <rect x="67" y="162" width="${66 * audioLevel}" height="4" fill="#4CAF50" rx="2"/>
      
      <!-- Audio-Wellen - digital -->
      ${audioLevel > 0.1 ? `
        <rect x="85" y="50" width="30" height="${3 + audioLevel * 10}" fill="#FF5722" opacity="0.7"/>
        <rect x="95" y="45" width="10" height="${5 + audioLevel * 15}" fill="#FF5722" opacity="0.7"/>
        <rect x="105" y="40" width="10" height="${7 + audioLevel * 20}" fill="#FF5722" opacity="0.7"/>
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

export default RobotCharacter;