import React from 'react';
import { useStory } from '../../contexts/StoryContext';
import {
  TitleScreen as TitleScreenContainer,
  TitleText,
  Subtitle,
  StartButton
} from '../ui/StyledComponents';
import Placeholder from '../ui/Placeholder';
import styled from 'styled-components';

const PlaceholderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const BackgroundPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1c2541;
`;

interface TitleScreenProps {
  onStart: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
  const { restart } = useStory();

  const handleStart = () => {
    restart(); // Reset the story state
    onStart(); // Signal to parent component that we're starting
  };

  return (
    <TitleScreenContainer>
      <PlaceholderWrapper>
        {/* Empty background placeholder that doesn't show text */}
        <BackgroundPlaceholder />
      </PlaceholderWrapper>
      <TitleText>Journey to Home</TitleText>
      <Subtitle>
        Follow Amina's story of resilience, hope, and the search for belonging
        as she navigates life as a refugee from Congo to Malawi to Australia.
      </Subtitle>
      <StartButton onClick={handleStart}>Begin Journey</StartButton>
    </TitleScreenContainer>
  );
};

export default TitleScreen;
