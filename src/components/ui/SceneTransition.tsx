import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface SceneTransitionProps {
  children: React.ReactNode;
  transitionType?: 'fade' | 'slide' | 'zoom';
  duration?: number;
  isNewScene?: boolean;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const zoomIn = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const zoomOut = keyframes`
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(1.2); opacity: 0; }
`;

const TransitionContainer = styled.div<{ 
  $animationType: 'fadeIn' | 'fadeOut' | 'slideIn' | 'slideOut' | 'zoomIn' | 'zoomOut';
  $duration: number;
  $isVisible: boolean;
}>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${props => {
    switch(props.$animationType) {
      case 'fadeIn': return fadeIn;
      case 'fadeOut': return fadeOut;
      case 'slideIn': return slideIn;
      case 'slideOut': return slideOut;
      case 'zoomIn': return zoomIn;
      case 'zoomOut': return zoomOut;
      default: return fadeIn;
    }
  }} ${props => props.$duration}s ease-in-out;
  animation-fill-mode: forwards;
  display: ${props => props.$isVisible ? 'block' : 'none'};
`;

const SceneTransition: React.FC<SceneTransitionProps> = ({ 
  children, 
  transitionType = 'fade',
  duration = 0.5,
  isNewScene = false
}) => {
  // Use refs to prevent double effects
  const isFirstMount = React.useRef(true);
  const prevChildrenRef = React.useRef(children);
  const transitioningRef = React.useRef(false);
  
  // Always start visible to prevent blank screen
  const [isVisible, setIsVisible] = useState(true);
  const [currentChildren, setCurrentChildren] = useState(children);
  
  useEffect(() => {
    // Skip everything on first mount to prevent initial animation
    if (isFirstMount.current) {
      isFirstMount.current = false;
      setCurrentChildren(children);
      return;
    }
    
    // Prevent double transitions
    if (transitioningRef.current) {
      return;
    }
    
    // Check if children have actually changed
    if (prevChildrenRef.current === children) {
      return;
    }
    
    // Update ref to current children
    prevChildrenRef.current = children;
    
    // Only animate if we're explicitly told it's a new scene
    if (isNewScene) {
      transitioningRef.current = true;
      
      // Briefly fade out
      setIsVisible(false);
      
      // Update children and fade back in
      const timer = setTimeout(() => {
        setCurrentChildren(children);
        setIsVisible(true);
        
        // Reset transitioning flag after animation completes
        setTimeout(() => {
          transitioningRef.current = false;
        }, duration * 500);
      }, duration * 300); // Use shorter duration for faster transitions
      
      return () => {
        clearTimeout(timer);
        transitioningRef.current = false;
      };
    } else {
      // If not a new scene, just update children without animation
      setCurrentChildren(children);
    }
  }, [children, isNewScene, duration]);
  
  let animationType: 'fadeIn' | 'fadeOut' | 'slideIn' | 'slideOut' | 'zoomIn' | 'zoomOut';
  if (isVisible) {
    if (transitionType === 'fade') animationType = 'fadeIn';
    else if (transitionType === 'slide') animationType = 'slideIn';
    else if (transitionType === 'zoom') animationType = 'zoomIn';
    else animationType = 'fadeIn';
  } else {
    if (transitionType === 'fade') animationType = 'fadeOut';
    else if (transitionType === 'slide') animationType = 'slideOut';
    else if (transitionType === 'zoom') animationType = 'zoomOut';
    else animationType = 'fadeOut';
  }
  
  return (
    <TransitionContainer 
      $animationType={animationType} 
      $duration={duration}
      $isVisible={isVisible}
    >
      {currentChildren}
    </TransitionContainer>
  );
};

export default SceneTransition;
