import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { StoryProvider } from './contexts/StoryContext';
import { AudioProvider } from './contexts/AudioContext';
import Game from './components/core/Game';
import StoryEditor from './components/core/StoryEditor';
import AudioControls from './components/ui/AudioControls';
import AudioDebugPanel from './components/ui/AudioDebugPanel';
import './App.css';

function App() {
  const [showDebug] = useState(true); // Set to false in production
  
  return (
    <div className="App">
      <AudioProvider>
        <StoryProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Game />} />
              <Route path="/editor" element={<StoryEditor />} />
            </Routes>
            <AudioControls />
            
          </Router>
        </StoryProvider>
      </AudioProvider>
    </div>
  );
}

export default App;
