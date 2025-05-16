import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  display: inline-block;
`;

const Character = styled.span<{ $delay: number }>`
  opacity: 0;
  animation: ${fadeIn} 0.1s ease forwards;
  animation-delay: ${props => props.$delay}s;
`;

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 30, 
  delay = 0,
  onComplete
}) => {
  const [mounted, setMounted] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Reset state when text changes
  useEffect(() => {
    setMounted(true);
    setCompleted(false);
    
    // Call onComplete after the text is fully displayed
    const totalDuration = Math.min((text.length * speed) + delay, 3000); // Cap at 3 seconds max
    const timer = setTimeout(() => {
      setCompleted(true);
      if (onComplete) onComplete();
    }, totalDuration);
    
    return () => clearTimeout(timer);
  }, [text, speed, delay, onComplete]);
  
  // If not mounted or if animation is complete but we need to show the full text immediately
  if (!mounted || completed) return <div>{text}</div>;
  
  return (
    <Container>
      {text.split('').map((char, index) => (
        <Character 
          key={index} 
          $delay={(index * speed) / 1000 + delay}
        >
          {char}
        </Character>
      ))}
    </Container>
  );
};

export default TypewriterText;
