import React, { useState, useEffect } from 'react';
import { useStory } from '../../contexts/StoryContext';
import { useAudio } from '../../contexts/AudioContext';
import { characters } from '../../data/storyData';
import {
  BackgroundImage,
  DialogueBox,
  CharacterName,
  DialogueText,
  ChoicesContainer,
  ChoiceButton,
  CharacterAvatar,
  ContinueButton
} from '../ui/StyledComponents';
import Placeholder from '../ui/Placeholder';
import TypewriterText from '../ui/TextAnimation';

const Scene: React.FC = () => {
  const { currentScene, makeChoice } = useStory();
  const { playSound } = useAudio();
  const [showChoices, setShowChoices] = useState(false);
  
  // Simple flag to prevent multiple clicks
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Reset state when scene changes
  useEffect(() => {
    if (!currentScene) return;
    
    // Reset processing state immediately
    setIsProcessing(false);
    
    // Hide choices initially until typewriter completes
    setShowChoices(false);
    
    // Play scene transition sound if not the first scene
    if (currentScene.id !== 'start') {
      playSound('transition');
    }
  }, [currentScene && currentScene.id, playSound]);

  if (!currentScene) {
    return <div>Loading scene...</div>;
  }

  const character = currentScene.character 
    ? characters.find(c => c.id === currentScene.character) 
    : undefined;

  const handleContinue = () => {
    // Prevent clicking if already processing or if choices aren't shown yet
    if (isProcessing || !showChoices) return;
    
    if (currentScene && currentScene.nextSceneId) {
      // Play transition sound
      playSound('transition');
      
      // Set processing flag to prevent multiple clicks
      setIsProcessing(true);
      
      // Navigate to next scene
      makeChoice(currentScene.nextSceneId);
    }
  };
  
  const handleChoiceClick = (nextSceneId: string) => {
    // Prevent clicking if already processing or if choices aren't shown yet
    if (isProcessing || !showChoices) return;
    
    // Play choice sound
    playSound('choice');
    
    // Set processing flag to prevent multiple clicks
    setIsProcessing(true);
    
    // Navigate to next scene
    makeChoice(nextSceneId);
  };

  return (
    <div className="scene-container">
      <BackgroundImage $background={currentScene.background}>
        <Placeholder type="background" name={currentScene.background.replace('.jpg', '').replace('_', ' ')} />
      </BackgroundImage>
      
      {character && (
        <CharacterAvatar $avatar={character.avatar || 'placeholder.png'}>
          {character.avatar ? null : <Placeholder type="avatar" name={character.name} />}
        </CharacterAvatar>
      )}
      
      <DialogueBox>
        {character && (
          <CharacterName>{character.name}</CharacterName>
        )}
        
        <DialogueText>
          <TypewriterText 
            text={currentScene.dialogueText || currentScene.text || ''} 
            speed={20} /* Faster speed for better responsiveness */
            onComplete={() => setShowChoices(true)}
          />
        </DialogueText>
        
        {currentScene.choices ? (
          <ChoicesContainer style={{ opacity: showChoices ? 1 : 0 }}>
            {currentScene.choices.map((choice, index) => (
              <ChoiceButton 
                key={index} 
                onClick={() => handleChoiceClick(choice.nextSceneId)}
                className={`choice-${index}`}
                disabled={isProcessing}
              >
                {choice.text}
              </ChoiceButton>
            ))}
          </ChoicesContainer>
        ) : currentScene.nextSceneId ? (
          <ContinueButton 
            onClick={handleContinue}
            style={{ opacity: showChoices ? 1 : 0 }}
            disabled={isProcessing}
          >
            Continue
          </ContinueButton>
        ) : null}
      </DialogueBox>
    </div>
  );
};

export default Scene;
