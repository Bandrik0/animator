import React from 'react';
import Stage2D from './components/Stage2D';
import Sidebar2D from './components/Sidebar2D';
import PropertiesPanel from './components/PropertiesPanel';
import Timeline from './components/Timeline';
import ExportPanel from './components/ExportPanel';
import HelpPanel from './components/HelpPanel';
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
      <div className="flex flex-1 min-w-0">
        <div className="flex-shrink-0 w-60">
          <Sidebar2D />
        </div>
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 min-h-0">
            <Stage2D ref={canvasRef} />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <div className="panel-container flex-shrink-0 w-80">
              <Timeline />
            </div>
            <div className="panel-container flex-shrink-0 w-64">
              <ExportPanel />
            </div>
            <div className="panel-container flex-shrink-0 w-64">
              <HelpPanel />
            </div>
          </div>
        </main>
        <div className="flex-shrink-0 w-60">
          <PropertiesPanel />
        </div>
      </div>
    </div>
  );
};

export default App; 