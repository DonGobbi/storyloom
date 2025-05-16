import React from 'react';
import styled from 'styled-components';

interface PlaceholderProps {
  type: 'background' | 'avatar';
  name: string;
  className?: string;
}

const PlaceholderContainer = styled.div<{ $isAvatar: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.$isAvatar ? '#3a506b' : '#1c2541'};
  color: white;
  text-align: center;
  font-size: ${props => props.$isAvatar ? '0.8rem' : '1.2rem'};
  width: 100%;
  height: 100%;
  border-radius: ${props => props.$isAvatar ? '50%' : '0'};
  padding: 10px;
  overflow: hidden;
`;

const Placeholder: React.FC<PlaceholderProps> = ({ type, name, className }) => {
  const isAvatar = type === 'avatar';
  
  return (
    <PlaceholderContainer $isAvatar={isAvatar} className={className}>
      {isAvatar ? name : `Scene: ${name}`}
    </PlaceholderContainer>
  );
};

export default Placeholder;
