import React, { useRef } from 'react';
import { useRecordStore } from '../recordStore';
import { Stage } from '@pixi/react';

const RecordControl: React.FC<{ canvasRef: React.RefObject<HTMLCanvasElement> }> = ({ canvasRef }) => {
  const recording = useRecordStore((s) => s.recording);
  const url = useRecordStore((s) => s.url);
  const start = useRecordStore((s) => s.start);
  const stop = useRecordStore((s) => s.stop);

  return (
    <div className="flex items-center gap-2">
      <button
        className={`px-3 py-2 rounded text-white ${recording ? 'bg-red-600' : 'bg-white/20'}`}
        onClick={() => (recording ? stop() : canvasRef.current && start(canvasRef.current))}
      >
        {recording ? '⏹ Stop' : '⏺ Record'}
      </button>
      {url && (
        <a
          href={url}
          download="animation.webm"
          className="px-3 py-2 bg-green-600 rounded text-white"
        >
          ⬇️ Download
        </a>
      )}
    </div>
  );
};

export default RecordControl; 