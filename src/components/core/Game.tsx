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
  
  // Play title screen music when the game loads
  useEffect(() => {
    if (showTitle) {
      playMusic('title.mp3');
    }
  }, [showTitle, playMusic]);

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
