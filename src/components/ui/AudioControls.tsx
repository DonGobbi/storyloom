import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import audioService from '../../services/audioService';

const ControlsContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  gap: 10px;
`;

const ControlButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
  }
`;

interface AudioControlsProps {
  className?: string;
}

const AudioControls: React.FC<AudioControlsProps> = ({ className }) => {
  const [isMuted, setIsMuted] = useState<boolean>(audioService.isMutedStatus());
  
  const handleToggleMute = () => {
    const newMuteStatus = audioService.toggleMute();
    setIsMuted(newMuteStatus);
  };
  
  return (
    <ControlsContainer className={className}>
      <ControlButton onClick={handleToggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
        {isMuted ? '🔇' : '🔊'}
      </ControlButton>
    </ControlsContainer>
  );
};

export default AudioControls;
