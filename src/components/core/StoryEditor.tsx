import React, { useState } from 'react';
import styled from 'styled-components';
import AIStoryGenerator from '../ai/AIStoryGenerator';
import { Link } from 'react-router-dom';

const EditorContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Header = styled.header`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: #333;
`;

const BackButton = styled(Link)`
  background-color: #4a90e2;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    background-color: #357ab8;
  }
`;

const ContentSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const AISection = styled.div`
  max-height: 100vh;
  overflow-y: auto;
  padding-right: 10px;
  
  @media (max-width: 1024px) {
    max-height: 50vh;
  }
  
  @media (max-width: 768px) {
    padding-right: 5px;
  }
  
  @media (max-width: 480px) {
    padding-right: 0;
  }
`;

const EditorSection = styled.div`
  max-height: 100vh;
  overflow-y: auto;
  padding-right: 10px;
  
  @media (max-width: 1024px) {
    max-height: none;
  }
  
  @media (max-width: 768px) {
    padding-right: 5px;
  }
  
  @media (max-width: 480px) {
    padding-right: 0;
  }
`;

const StoryPreview = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    border-radius: 6px;
    margin-top: 10px;
  }
`;

const SceneEditor = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    border-radius: 6px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  font-family: inherit;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 15px;
  display: block;
  
  &:hover {
    background-color: #45a049;
  }
  
  &.blue {
    background-color: #4a90e2;
    
    &:hover {
      background-color: #357ab8;
    }
  }
  
  &.add-choice {
    margin-top: 10px;
    font-weight: bold;
    display: inline-block;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const ChoiceInput = styled(FormInput)`
  width: 70%;
  margin-right: 10px;
`;

const NextSceneInput = styled(FormInput)`
  width: 25%;
`;

const ChoiceContainer = styled.div`
  margin-bottom: 10px;
`;

const PreviewContainer = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
`;

interface SceneData {
  id: string;
  text: string;
  dialogueText: string;
  choices: Array<{
    text: string;
    nextSceneId: string;
  }>;
}

const StoryEditor: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneData>({
    id: '',
    text: '',
    dialogueText: '',
    choices: []
  });
  
  const [sceneId, setSceneId] = useState('');
  
  const handleGeneratedContent = (content: string) => {
    setCurrentScene(prev => ({
      ...prev,
      text: content
    }));
  };
  
  const handleGeneratedChoices = (choices: string[]) => {
    const formattedChoices = choices.map((choice, index) => ({
      text: choice,
      nextSceneId: `scene_${index + 1}`
    }));
    
    setCurrentScene(prev => ({
      ...prev,
      choices: formattedChoices
    }));
  };
  
  const handleGeneratedDialogue = (dialogue: string) => {
    setCurrentScene(prev => ({
      ...prev,
      dialogueText: dialogue
    }));
  };
  
  const handleSaveScene = () => {
    if (!sceneId) {
      alert('Please enter a scene ID');
      return;
    }
    
    const sceneToSave = {
      ...currentScene,
      id: sceneId
    };
    
    // In a real application, you would save this to your storyData.ts file
    // For now, we'll just log it to the console
    console.log('Scene to save:', sceneToSave);
    alert('Scene data logged to console. In a real app, this would be saved to your story data.');
  };
  
  const handleSceneIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSceneId(e.target.value);
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentScene(prev => ({
      ...prev,
      text: e.target.value
    }));
  };
  
  const handleDialogueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentScene(prev => ({
      ...prev,
      dialogueText: e.target.value
    }));
  };
  
  return (
    <EditorContainer>
      <Header>
        <Title>Story Editor</Title>
        <BackButton to="/">Back to Game</BackButton>
      </Header>
      
      <ContentSection>
        <AISection>
          <AIStoryGenerator 
            onGeneratedContent={handleGeneratedContent}
            onGeneratedChoices={handleGeneratedChoices}
          />
        </AISection>
        
        <EditorSection>
          <SceneEditor>
            <h2>Scene Editor</h2>
            
            <FormGroup>
              <FormLabel>
                Scene ID:
              </FormLabel>
              <FormInput 
                type="text" 
                value={sceneId}
                onChange={handleSceneIdChange}
                placeholder="Enter a unique scene ID (e.g., 'start', 'village_attack')"
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>
                Scene Description:
              </FormLabel>
              <TextArea 
                value={currentScene.text}
                onChange={handleTextChange}
                placeholder="Enter scene description text..."
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>
                Character Dialogue:
              </FormLabel>
              <TextArea 
                value={currentScene.dialogueText}
                onChange={handleDialogueChange}
                placeholder="Enter character dialogue..."
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>
                Choices:
              </FormLabel>
              {currentScene.choices.map((choice, index) => (
                <ChoiceContainer key={index}>
                  <ChoiceInput 
                    type="text" 
                    value={choice.text}
                    onChange={(e) => {
                      const updatedChoices = [...currentScene.choices];
                      updatedChoices[index].text = e.target.value;
                      setCurrentScene(prev => ({
                        ...prev,
                        choices: updatedChoices
                      }));
                    }}
                  />
                  <NextSceneInput 
                    type="text" 
                    value={choice.nextSceneId}
                    onChange={(e) => {
                      const updatedChoices = [...currentScene.choices];
                      updatedChoices[index].nextSceneId = e.target.value;
                      setCurrentScene(prev => ({
                        ...prev,
                        choices: updatedChoices
                      }));
                    }}
                    placeholder="Next scene ID"
                  />
                </ChoiceContainer>
              ))}
              <Button 
                className="blue add-choice"
                onClick={() => {
                  setCurrentScene(prev => ({
                    ...prev,
                    choices: [...prev.choices, { text: '', nextSceneId: '' }]
                  }));
                }}
              >
                + Add Choice
              </Button>
            </FormGroup>
            
            <Button onClick={handleSaveScene}>Save Scene</Button>
          </SceneEditor>
          
          <StoryPreview>
            <h2>Preview</h2>
            <PreviewContainer>
              <h3>Scene: {sceneId || '[No ID]'}</h3>
              <p><strong>Description:</strong> {currentScene.text || '[No description]'}</p>
              <p><strong>Dialogue:</strong> {currentScene.dialogueText || '[No dialogue]'}</p>
              
              {currentScene.choices.length > 0 && (
                <div>
                  <p><strong>Choices:</strong></p>
                  <ul>
                    {currentScene.choices.map((choice, index) => (
                      <li key={index}>
                        {choice.text} → {choice.nextSceneId}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </PreviewContainer>
          </StoryPreview>
        </EditorSection>
      </ContentSection>
    </EditorContainer>
  );
};

export default StoryEditor;
