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
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setRightSidebarVisible(false);
      } else {
        setRightSidebarVisible(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Keyboard shortcut Alt+E to toggle properties panel
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'e') {
        e.preventDefault();
        setRightSidebarVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      {/* Top Controls */}
      <div className="flex-shrink-0 p-2 flex gap-2">
        <MicControl />
        <RecordControl canvasRef={canvasRef} />
        <GlobalPlayButton />
        {/* Properties Panel Toggle for smaller screens */}
        <button
          onClick={() => setRightSidebarVisible(!rightSidebarVisible)}
          className="lg:hidden px-3 py-2 bg-white/20 rounded text-white hover:bg-white/30 transition-colors"
          title="Eigenschaften ein/ausblenden (Alt+E)"
        >
          ⚙️ {rightSidebarVisible ? 'Schließen' : 'Eigenschaften'}
        </button>
      </div>
      
      {/* Main Layout */}
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <div className="flex-shrink-0 w-60">
          <Sidebar2D />
        </div>
        
        {/* Main Content Area */}
        <main className={`flex-1 flex flex-col min-h-0 min-w-0 transition-all duration-300 ${rightSidebarVisible && !isMobile ? 'mr-60' : ''}`}>
          {/* Stage Area */}
          <div className="flex-1 min-h-0 overflow-hidden" style={{ minHeight: '40vh' }}>
            <Stage2D ref={canvasRef} />
          </div>
          
          {/* Bottom Panels */}
          <div className="flex-shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-2 p-2 overflow-x-auto">
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
        </main>
        
        {/* Right Sidebar - Properties Panel */}
        <div className={`${isMobile ? 'fixed inset-y-0 right-0 z-50' : 'flex-shrink-0'} w-60 transition-all duration-300 ${rightSidebarVisible ? 'translate-x-0' : 'translate-x-full'}`}>
          <PropertiesPanel 
            isVisible={rightSidebarVisible}
            onToggle={() => setRightSidebarVisible(!rightSidebarVisible)}
            className={isMobile ? 'shadow-2xl' : ''}
          />
        </div>
        
        {/* Mobile Overlay */}
        {isMobile && rightSidebarVisible && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setRightSidebarVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App; 