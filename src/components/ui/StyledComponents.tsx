import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const GameContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

export const BackgroundImage = styled.div<{ $background: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => `/images/${props.$background}`});
  background-size: cover;
  background-position: center;
  transition: opacity 1s ease-in-out;
  z-index: 0;
`;

export const DialogueBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  z-index: 10;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.5s ease-out;
`;

export const CharacterName = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #FFD700;
`;

export const DialogueText = styled.div`
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const ChoicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
`;

export const ChoiceButton = styled.button`
  background-color: rgba(70, 130, 180, 0.8);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
  font-size: 1rem;
  animation: ${fadeIn} 0.5s ease-out;
  transform-origin: center;

  &:hover {
    background-color: rgba(70, 130, 180, 1);
    animation: ${pulse} 0.5s infinite;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

export const CharacterAvatar = styled.div<{ $avatar: string }>`
  position: absolute;
  bottom: 220px;
  left: 50px;
  width: 150px;
  height: 150px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 3px solid #FFD700;
  z-index: 5;
  animation: ${fadeIn} 0.8s ease-out;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

export const ContinueButton = styled.button`
  align-self: flex-end;
  background-color: rgba(255, 215, 0, 0.8);
  color: black;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;

  &:hover {
    background-color: rgba(255, 215, 0, 1);
  }
`;

export const RestartButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(220, 20, 60, 0.8);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 20;

  &:hover {
    background-color: rgba(220, 20, 60, 1);
  }
`;

export const TitleScreen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  z-index: 30;
  position: relative;
  background-color: #0a1128;
`;

export const TitleText = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  animation: ${slideUp} 1s ease-out;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const StartButton = styled.button`
  background-color: rgba(255, 215, 0, 0.8);
  color: black;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 20px;
  animation: ${pulse} 2s infinite;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);

  &:hover {
    background-color: rgba(255, 215, 0, 1);
    transform: scale(1.1);
    box-shadow: 0 0 25px rgba(255, 215, 0, 0.8);
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  max-width: 600px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
`;
