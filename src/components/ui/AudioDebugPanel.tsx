import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAudio } from '../../contexts/AudioContext';
import audioService from '../../services/audioService';

const DebugContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  font-size: 12px;
  z-index: 1000;
  max-width: 300px;
  max-height: 400px;
  overflow-y: auto;
`;

const DebugButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: #357ab8;
  }
`;

const LogContainer = styled.div`
  margin-top: 10px;
  border-top: 1px solid #666;
  padding-top: 10px;
`;

const LogEntry = styled.div`
  margin-bottom: 5px;
  word-break: break-word;
`;

const AudioDebugPanel: React.FC = () => {
  const { playSound, playMusic, toggleMute, isMuted } = useAudio();
  const [logs, setLogs] = useState<string[]>([]);
  const [showPanel, setShowPanel] = useState(true);
  
  // Override console.log to capture audio-related logs
  useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    
    console.log = (...args) => {
      originalLog(...args);
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      
      if (message.includes('audio') || message.includes('sound') || message.includes('music')) {
        setLogs(prev => [...prev, `LOG: ${message}`].slice(-20));
      }
    };
    
    console.warn = (...args) => {
      originalWarn(...args);
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      
      if (message.includes('audio') || message.includes('sound') || message.includes('music')) {
        setLogs(prev => [...prev, `WARN: ${message}`].slice(-20));
      }
    };
    
    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
    };
  }, []);
  
  const testClickSound = () => {
    addLog('Testing click sound');
    playSound('click');
  };
  
  const testTransitionSound = () => {
    addLog('Testing transition sound');
    playSound('transition');
  };
  
  const testChoiceSound = () => {
    addLog('Testing choice sound');
    playSound('choice');
  };
  
  const testTitleMusic = () => {
    addLog('Testing title music');
    playMusic('title.mp3');
  };
  
  const testBackgroundMusic = () => {
    addLog('Testing background music');
    playMusic('background.mp3');
  };
  
  const addLog = (message: string) => {
    setLogs(prev => [...prev, message].slice(-20));
  };
  
  return (
    <DebugContainer>
      <h3>Audio Debug Panel</h3>
      <div>
        <DebugButton onClick={() => setShowPanel(!showPanel)}>
          {showPanel ? 'Hide Panel' : 'Show Panel'}
        </DebugButton>
        <DebugButton onClick={toggleMute}>
          {isMuted ? 'Unmute' : 'Mute'}
        </DebugButton>
      </div>
      
      {showPanel && (
        <>
          <div>
            <DebugButton onClick={testClickSound}>Test Click</DebugButton>
            <DebugButton onClick={testTransitionSound}>Test Transition</DebugButton>
            <DebugButton onClick={testChoiceSound}>Test Choice</DebugButton>
          </div>
          <div>
            <DebugButton onClick={testTitleMusic}>Test Title Music</DebugButton>
            <DebugButton onClick={testBackgroundMusic}>Test Background Music</DebugButton>
          </div>
          
          <LogContainer>
            <h4>Audio Logs:</h4>
            {logs.map((log, index) => (
              <LogEntry key={index}>{log}</LogEntry>
            ))}
          </LogContainer>
        </>
      )}
    </DebugContainer>
  );
};

export default AudioDebugPanel;
