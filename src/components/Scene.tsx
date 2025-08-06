import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stage } from '@react-three/drei';
import { useStore } from '../store';
import Character from './Character';

const Scene: React.FC = () => {
  const characters = useStore((s) => s.characters);
  const env = useStore((s)=>s.environment);
  const selectedId = useStore((s)=>s.selectedId);
  const selectCharacter = useStore((s)=>s.selectCharacter);
  const updateCharacter = useStore((s)=>s.updateCharacter);

  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
      {/* remove solid background to allow HDRI */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Stage>
        {characters.map((c) => (
          <Character
            key={c.id}
            {...c}
            selected={c.id === selectedId}
            onSelect={() => selectCharacter(c.id)}
            onChange={(pos) => updateCharacter(c.id, { position: pos })}
          />
        ))}
      </Stage>
      <OrbitControls />
      <Environment preset={env as any} background />
    </Canvas>
  );
};

export default Scene; 