// @ts-nocheck
import React, { forwardRef } from 'react';
import { Stage, Sprite } from '@pixi/react';
import { useMicStore } from '../micStore';
import { useSpriteStore } from '../store2d';
import { backgrounds } from '../data/backgrounds';

const Stage2D = forwardRef<HTMLCanvasElement>((props, ref) => {
  const sprites = useSpriteStore((s) => s.sprites);
  const selected = useSpriteStore((s) => s.selectedId);
  const select = useSpriteStore((s) => s.select);
  const update = useSpriteStore((s) => s.updateSprite);
  const bgUrl = useSpriteStore((s) => s.background);
  const micLevel = useMicStore((s) => s.level);
  const micEnabled = useMicStore((s)=>s.enabled);

  return (
    <Stage ref={ref as any} width={window.innerWidth - 240} height={window.innerHeight - 60} options={{ backgroundColor: 0x1e1e1e }}>
      {/* Background */}
      {bgUrl && (
        <Sprite image={bgUrl} x={0} y={0} width={window.innerWidth - 240} height={window.innerHeight - 60} />
      )}
      {sprites.map((sp) => {
        const volSrc = sp.audioLevel ?? (micEnabled ? micLevel : 0);
        const vol = Math.min(volSrc * 4, 1);
        const mouthIndex = vol < 0.07 ? 0 : vol < 0.25 ? 1 : 2;
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
      })}
    </Stage>
  );
});

export default Stage2D; 