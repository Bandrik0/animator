// @ts-nocheck
import React, { forwardRef } from 'react';
import { Stage, Sprite } from '@pixi/react';
import { useMicStore } from '../micStore';
import { useSpriteStore } from '../store2d';
import { backgrounds } from '../data/backgrounds';
import AnimatedCharacter from './AnimatedCharacter';
import AnimatedCharacter2 from './AnimatedCharacter2';
import RobotCharacter from './RobotCharacter';

const Stage2D = forwardRef<HTMLCanvasElement>((props, ref) => {
  const sprites = useSpriteStore((s) => s.sprites);
  const selected = useSpriteStore((s) => s.selectedId);
  const select = useSpriteStore((s) => s.select);
  const update = useSpriteStore((s) => s.updateSprite);
  const bgUrl = useSpriteStore((s) => s.background);
  const micLevel = useMicStore((s) => s.level);
  const micEnabled = useMicStore((s)=>s.enabled);

  const renderCharacter = (sp: any) => {
    const volSrc = sp.audioLevel ?? (micEnabled ? micLevel : 0);
    const vol = Math.min(volSrc * 4, 1);
    const mouthIndex = vol < 0.07 ? 0 : vol < 0.25 ? 1 : 2;

    // Wähle die richtige Charakter-Komponente basierend auf dem Typ
    if (sp.def.type === 'animated' && sp.def.characterType === 'bob') {
      return (
        <AnimatedCharacter
          key={sp.id}
          x={sp.x}
          y={sp.y}
          scale={sp.scale}
          audioLevel={vol}
          characterName={sp.def.name}
          interactive
          onPointerDown={() => select(sp.id)}
          onPointerMove={(e) => {
            if (selected === sp.id && e.data.buttons === 1) {
              const pos = e.data.getLocalPosition(e.target.parent);
              update(sp.id, { x: pos.x, y: pos.y });
            }
          }}
        />
      );
    } else if (sp.def.type === 'animated' && sp.def.characterType === 'lisa') {
      return (
        <AnimatedCharacter2
          key={sp.id}
          x={sp.x}
          y={sp.y}
          scale={sp.scale}
          audioLevel={vol}
          characterName={sp.def.name}
          interactive
          onPointerDown={() => select(sp.id)}
          onPointerMove={(e) => {
            if (selected === sp.id && e.data.buttons === 1) {
              const pos = e.data.getLocalPosition(e.target.parent);
              update(sp.id, { x: pos.x, y: pos.y });
            }
          }}
        />
      );
    } else if (sp.def.type === 'robot') {
      return (
        <RobotCharacter
          key={sp.id}
          x={sp.x}
          y={sp.y}
          scale={sp.scale}
          audioLevel={vol}
          characterName={sp.def.name}
          interactive
          onPointerDown={() => select(sp.id)}
          onPointerMove={(e) => {
            if (selected === sp.id && e.data.buttons === 1) {
              const pos = e.data.getLocalPosition(e.target.parent);
              update(sp.id, { x: pos.x, y: pos.y });
            }
          }}
        />
      );
    } else {
      // Fallback für normale Avatar-Charaktere
      return (
        <Sprite
          key={sp.id}
          image={sp.def.frames[mouthIndex]}
          x={sp.x}
          y={sp.y}
          scale={sp.scale}
          anchor={0.5}
          interactive
          pointerdown={() => select(sp.id)}
          buttonMode
          pointermove={(e) => {
            if (selected === sp.id && e.data.buttons === 1) {
              const pos = e.data.getLocalPosition(e.target.parent);
              update(sp.id, { x: pos.x, y: pos.y });
            }
          }}
        />
      );
    }
  };

  return (
    <Stage ref={ref as any} width={window.innerWidth - 240} height={window.innerHeight - 60} options={{ backgroundColor: 0x1e1e1e }}>
      {/* Background */}
      {bgUrl && (
        <Sprite image={bgUrl} x={0} y={0} width={window.innerWidth - 240} height={window.innerHeight - 60} />
      )}
      {sprites.map(renderCharacter)}
    </Stage>
  );
});

export default Stage2D; 