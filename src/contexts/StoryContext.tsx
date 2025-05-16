import React, { createContext, useContext, useState, useEffect } from 'react';
import { Scene, StoryState } from '../types';
import { scenes, initialState } from '../data/storyData';

interface StoryContextType {
  state: StoryState;
  currentScene: Scene | undefined;
  makeChoice: (nextSceneId: string) => void;
  restart: () => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<StoryState>(initialState);
  const [currentScene, setCurrentScene] = useState<Scene | undefined>(
    scenes.find(scene => scene.id === initialState.currentSceneId)
  );

  useEffect(() => {
    const scene = scenes.find(scene => scene.id === state.currentSceneId);
    setCurrentScene(scene);
  }, [state.currentSceneId]);

  const makeChoice = (nextSceneId: string) => {
    // Validate that the nextSceneId exists in our scenes
    const nextScene = scenes.find(scene => scene.id === nextSceneId);
    
    if (!nextScene) {
      console.error(`Scene with ID "${nextSceneId}" not found!`);
      return;
    }
    
    console.log(`Transitioning to scene: ${nextSceneId}`);
    
    setState(prevState => ({
      ...prevState,
      currentSceneId: nextSceneId,
      visitedScenes: [...prevState.visitedScenes, prevState.currentSceneId]
    }));
  };

  const restart = () => {
    setState(initialState);
  };

  return (
    <StoryContext.Provider value={{ state, currentScene, makeChoice, restart }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = (): StoryContextType => {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};
