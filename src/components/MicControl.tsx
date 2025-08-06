import React from 'react';
import { useMicLevel } from '../hooks/useMicLevel';

const MicControl: React.FC = () => {
  const { enabled, level, start, stop } = useMicLevel();
  return (
    <button
      className={`flex items-center gap-2 px-3 py-2 rounded text-white ${
        enabled ? 'bg-green-600' : 'bg-white/20'
      }`}
      onClick={enabled ? stop : start}
    >
      {enabled ? '🎤 Mic On' : '🎙️ Enable Mic'}
      {enabled && (
        <span className="w-20 h-2 bg-white/20 rounded overflow-hidden">
          <span
            className="block h-full bg-green-400"
            style={{ width: `${level * 100}%` }}
          />
        </span>
      )}
    </button>
  );
};

export default MicControl; 