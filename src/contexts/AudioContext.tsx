import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import audioService from '../services/audioService';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (id: string) => void;
  playMusic: (url: string, loop?: boolean) => void;
  stopMusic: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(audioService.isMutedStatus());
  
  const toggleMute = () => {
    const newMuteStatus = audioService.toggleMute();
    setIsMuted(newMuteStatus);
  };
  
  const playSound = (id: string) => {
    audioService.playSound(id);
  };
  
  const playMusic = (url: string, loop = true) => {
    audioService.playMusic(url, loop);
  };
  
  const stopMusic = () => {
    audioService.stopMusic();
  };
  
  // Initialize audio system when the app starts
  useEffect(() => {
    // Use preloaded sounds instead of trying to load files that don't exist yet
    audioService.preloadCommonSounds();
    
    // Initialize with a silent audio to unlock audio on iOS/Safari
    const unlockAudio = () => {
      audioService.playSound('click');
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
    
    document.addEventListener('click', unlockAudio, { once: true });
    document.addEventListener('touchstart', unlockAudio, { once: true });
    
    console.log('Audio context initialized');
  }, []);
  
  return (
    <AudioContext.Provider value={{ 
      isMuted, 
      toggleMute, 
      playSound, 
      playMusic, 
      stopMusic 
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
