import React, { useState } from 'react';
import groqService from '../../services/groqService';
import styled from 'styled-components';

const GeneratorContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    border-radius: 6px;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px;
  
  @media (max-width: 768px) {
    padding: 8px;
    min-height: 80px;
  }
  
  @media (max-width: 480px) {
    padding: 6px;
    min-height: 60px;
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
  @media (max-width: 768px) {
    padding: 8px;
  }
  
  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
  
  &:hover {
    background-color: #357ab8;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  &.small {
    padding: 5px 10px;
    font-size: 0.9em;
    margin-left: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  clear: both;
  overflow: hidden;
  margin-bottom: 20px;
  
  ul {
    max-height: 300px;
    overflow-y: auto;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  
  @media (max-width: 768px) {
    margin-top: 15px;
    padding: 12px;
    margin-bottom: 15px;
    
    ul {
      max-height: 250px;
      padding-left: 15px;
    }
    
    li {
      margin-bottom: 8px;
    }
  }
  
  @media (max-width: 480px) {
    margin-top: 12px;
    padding: 10px;
    margin-bottom: 12px;
    font-size: 0.9rem;
    
    ul {
      max-height: 200px;
      padding-left: 10px;
    }
    
    li {
      margin-bottom: 6px;
    }
  }
`;

interface AIStoryGeneratorProps {
  onGeneratedContent?: (content: string) => void;
  onGeneratedChoices?: (choices: string[]) => void;
}

const AIStoryGenerator: React.FC<AIStoryGeneratorProps> = ({ 
  onGeneratedContent,
  onGeneratedChoices
}) => {
  const [currentScene, setCurrentScene] = useState('');
  const [character, setCharacter] = useState('');
  const [situation, setSituation] = useState('');
  const [numChoices, setNumChoices] = useState(2);
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedChoices, setGeneratedChoices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playerChoices, setPlayerChoices] = useState<string[]>([]);

  const handleGenerateStory = async () => {
    if (!currentScene) return;
    
    setIsLoading(true);
    try {
      const content = await groqService.generateStorySegment(currentScene, playerChoices);
      setGeneratedContent(content);
      
      if (onGeneratedContent) {
        onGeneratedContent(content);
      }
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateDialogue = async () => {
    if (!character || !situation) return;
    
    setIsLoading(true);
    try {
      const dialogue = await groqService.generateCharacterDialogue(character, situation);
      setGeneratedContent(dialogue);
      
      if (onGeneratedContent) {
        onGeneratedContent(dialogue);
      }
    } catch (error) {
      console.error('Error generating dialogue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateChoices = async () => {
    if (!situation) return;
    
    setIsLoading(true);
    try {
      const choices = await groqService.generateChoices(situation, numChoices);
      setGeneratedChoices(choices);
      
      if (onGeneratedChoices) {
        onGeneratedChoices(choices);
      }
    } catch (error) {
      console.error('Error generating choices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addPlayerChoice = (choice: string) => {
    setPlayerChoices([...playerChoices, choice]);
  };

  return (
    <GeneratorContainer>
      <h2>AI Story Generator</h2>
      
      <InputGroup>
        <Label>Current Scene Description:</Label>
        <TextArea 
          value={currentScene}
          onChange={(e) => setCurrentScene(e.target.value)}
          placeholder="Describe the current scene or situation..."
        />
      </InputGroup>
      
      <InputGroup>
        <Label>Character Name:</Label>
        <Input 
          type="text"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          placeholder="Enter character name..."
        />
      </InputGroup>
      
      <InputGroup>
        <Label>Situation:</Label>
        <TextArea 
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder="Describe the situation..."
        />
      </InputGroup>
      
      <InputGroup>
        <Label>Number of Choices:</Label>
        <Input 
          type="number"
          min={1}
          max={5}
          value={numChoices}
          onChange={(e) => setNumChoices(parseInt(e.target.value))}
        />
      </InputGroup>
      
      <ButtonContainer>
        <Button 
          onClick={handleGenerateStory} 
          disabled={isLoading || !currentScene}
        >
          Generate Story
        </Button>
        
        <Button 
          onClick={handleGenerateDialogue} 
          disabled={isLoading || !character || !situation}
        >
          Generate Dialogue
        </Button>
        
        <Button 
          onClick={handleGenerateChoices} 
          disabled={isLoading || !situation}
        >
          Generate Choices
        </Button>
      </ButtonContainer>
      
      {generatedContent && (
        <ResultContainer>
          <h3>Generated Content:</h3>
          <p>{generatedContent}</p>
        </ResultContainer>
      )}
      
      {generatedChoices.length > 0 && (
        <ResultContainer>
          <h3>Generated Choices:</h3>
          <ul>
            {generatedChoices.map((choice, index) => (
              <li key={index}>
                {choice}
                <Button 
                  className="small"
                  onClick={() => addPlayerChoice(choice)}
                >
                  Add to History
                </Button>
              </li>
            ))}
          </ul>
        </ResultContainer>
      )}
      
      {playerChoices.length > 0 && (
        <ResultContainer>
          <h3>Player Choice History:</h3>
          <ul>
            {playerChoices.map((choice, index) => (
              <li key={index}>{choice}</li>
            ))}
          </ul>
        </ResultContainer>
      )}
    </GeneratorContainer>
  );
};

export default AIStoryGenerator;
