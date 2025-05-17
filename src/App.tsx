import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { StoryProvider } from './contexts/StoryContext';
import Game from './components/core/Game';
import StoryEditor from './components/core/StoryEditor';
import './App.css';

function App() {
  return (
    <div className="App">
      <StoryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/editor" element={<StoryEditor />} />
          </Routes>
        </Router>
      </StoryProvider>
    </div>
  );
}

export default App;
