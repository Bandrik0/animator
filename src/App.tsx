import React, { useState, useEffect } from 'react';
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
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 1024) {
        setIsMobile(true);
        setRightSidebarVisible(false);
      } else if (width < 1280) {
        setIsMobile(false);
        setRightSidebarVisible(false);
      } else {
        setIsMobile(false);
        setRightSidebarVisible(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'e') {
        e.preventDefault();
        setRightSidebarVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      {/* Left Sidebar */}
      <div className="w-60 flex-shrink-0 overflow-y-auto">
        <Sidebar2D />
      </div>

      {/* Stage and Panels */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top Controls */}
        <div className="flex-shrink-0 p-2 flex gap-2">
          <MicControl />
          <RecordControl canvasRef={canvasRef} />
          <GlobalPlayButton />
          <button
            onClick={() => setRightSidebarVisible(!rightSidebarVisible)}
            className="xl:hidden px-3 py-2 bg-white/20 rounded text-white hover:bg-white/30 transition-colors"
            title="Eigenschaften ein/ausblenden (Alt+E)"
          >
            ⚙️ {rightSidebarVisible ? 'Schließen' : 'Eigenschaften'}
          </button>
        </div>

        {/* Stage Area */}
        <div className="flex-1 min-h-0 overflow-hidden" style={{ minHeight: '40vh' }}>
          <Stage2D ref={canvasRef} />
        </div>

        {/* Bottom Panels */}
        <div className="flex-shrink-0 grid grid-flow-col auto-cols-fr gap-4 p-4 overflow-x-auto">
          <div className="panel-container">
            <Timeline />
          </div>
          <div className="panel-container">
            <ExportPanel />
          </div>
          <div className="panel-container">
            <HelpPanel />
          </div>
        </div>
      </div>

      {/* Right Sidebar - Properties Panel */}
      <div
        className={`${
          isMobile ? 'fixed inset-y-0 right-0 z-50' : 'flex-shrink-0 w-72'
        } transition-transform duration-300 ${
          rightSidebarVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <PropertiesPanel
          isVisible={rightSidebarVisible}
          onToggle={() => setRightSidebarVisible(!rightSidebarVisible)}
          className={isMobile ? 'shadow-2xl w-72' : 'w-72'}
        />
      </div>

      {isMobile && rightSidebarVisible && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setRightSidebarVisible(false)}
        />
      )}
    </div>
  );
};

export default App; 