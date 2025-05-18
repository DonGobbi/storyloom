import React, { useState, useEffect } from 'react';
import { GameContainer, RestartButton } from '../ui/StyledComponents';
import Scene from './Scene';
import TitleScreen from './TitleScreen';
import { useStory } from '../../contexts/StoryContext';
import { useAudio } from '../../contexts/AudioContext';

const Game: React.FC = () => {
  const [showTitle, setShowTitle] = useState(true);
  const { restart } = useStory();
  const { playSound, playMusic } = useAudio();

  const handleStart = () => {
    playSound('click');
    setShowTitle(false);
    playMusic('background.mp3');
  };

  const handleRestart = () => {
    playSound('click');
    restart();
    setShowTitle(true);
  };
  
  // We'll only play music after user interaction
  // This is handled in the handleStart and handleRestart functions
  // No automatic music playback on load to avoid browser restrictions

  return (
    <GameContainer>
      {showTitle ? (
        <TitleScreen onStart={handleStart} />
      ) : (
        <>
          <Scene />
          <RestartButton onClick={handleRestart}>Restart</RestartButton>
        </>
      )}
    </GameContainer>
  );
};

export default Game;
