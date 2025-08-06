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

  const [dimensions, setDimensions] = React.useState({ width: 800, height: 600 });

  React.useEffect(() => {
    const updateDimensions = () => {
      const sidebarWidth = 240; // 120px for each sidebar
      const topBarHeight = 60;
      const bottomBarHeight = 200; // Approximate height for timeline panels
      
      setDimensions({
        width: Math.max(400, window.innerWidth - sidebarWidth),
        height: Math.max(300, window.innerHeight - topBarHeight - bottomBarHeight)
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <Stage ref={ref as any} width={dimensions.width} height={dimensions.height} options={{ backgroundColor: 0x1e1e1e }}>
      {/* Background */}
      {bgUrl && (
        <Sprite image={bgUrl} x={0} y={0} width={dimensions.width} height={dimensions.height} />
      )}
      {sprites.map(renderCharacter)}
    </Stage>
  );
});

export default Stage2D; 