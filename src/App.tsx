import React from 'react';
import { StoryProvider } from './contexts/StoryContext';
import Game from './components/core/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <StoryProvider>
        <Game />
      </StoryProvider>
    </div>
  );
}

export default App;
