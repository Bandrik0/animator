import React from 'react';
import Stage2D from './components/Stage2D';
import Sidebar2D from './components/Sidebar2D';
import MicControl from './components/MicControl';
import RecordControl from './components/RecordControl';
import GlobalPlayButton from './components/GlobalPlayButton';

const App: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-500 to-purple-700">
      <div className="p-2 flex gap-2">
        <MicControl />
        <RecordControl canvasRef={canvasRef} />
        <GlobalPlayButton />
      </div>
      <div className="flex flex-1">
        <Sidebar2D />
        <main className="flex-1">
          <Stage2D ref={canvasRef} />
        </main>
      </div>
    </div>
  );
};

export default App; 