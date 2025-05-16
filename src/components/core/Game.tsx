import React, { useState } from 'react';
import { GameContainer, RestartButton } from '../ui/StyledComponents';
import Scene from './Scene';
import TitleScreen from './TitleScreen';
import { useStory } from '../../contexts/StoryContext';

const Game: React.FC = () => {
  const [showTitle, setShowTitle] = useState(true);
  const { restart } = useStory();

  const handleStart = () => {
    setShowTitle(false);
  };

  const handleRestart = () => {
    restart();
    setShowTitle(true);
  };

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
