import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { TransformControls } from '@react-three/drei';
import { PrimitiveProps } from '@react-three/fiber';
import { ThreeEvent } from '@react-three/fiber';

interface Props {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

const Character: React.FC<Props & { selected: boolean; onSelect: () => void; onChange: (pos: [number, number, number]) => void; }> = ({ url, position, rotation, scale, selected, onSelect, onChange }) => {
  const { scene } = useGLTF(url);
  return (
    <Suspense fallback={null}>
      {selected ? (
        <TransformControls
          position={position}
          rotation={rotation}
          scale={scale}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onMouseUp={(e: any) => {
            const p = (e.eventObject as any).position;
            onChange([p.x, p.y, p.z]);
          }}
        >
          <primitive object={scene} />
        </TransformControls>
      ) : (
        <primitive
          object={scene}
          position={position}
          rotation={rotation}
          scale={scale}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={(e: any) => {
            e.stopPropagation();
            onSelect();
          }}
        />
      )}
    </Suspense>
  );
};

export default Character;

useGLTF.preload('/'); 