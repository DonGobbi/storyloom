# Audio System for StoryLoom

This document explains how to use the audio system in the StoryLoom visual novel application.

## Overview

The audio system provides sound effects and background music for the visual novel. It includes:

- Background music for the title screen and gameplay
- Sound effects for user interactions (clicks, choices, transitions)
- Volume control and mute functionality

## Directory Structure

```
public/
  ├── sounds/       # Sound effects (short audio clips)
  │   ├── click.mp3
  │   ├── choice.mp3
  │   └── transition.mp3
  │
  └── music/        # Background music (longer audio tracks)
      ├── title.mp3
      └── background.mp3
```

## How to Use

### Playing Sound Effects

```typescript
import { useAudio } from '../contexts/AudioContext';

const MyComponent = () => {
  const { playSound } = useAudio();
  
  const handleButtonClick = () => {
    playSound('click');
    // Your other code here
  };
  
  return <button onClick={handleButtonClick}>Click Me</button>;
};
```

### Playing Background Music

```typescript
import { useAudio } from '../contexts/AudioContext';

const MyComponent = () => {
  const { playMusic } = useAudio();
  
  useEffect(() => {
    playMusic('background.mp3', true); // Second parameter is for looping (default: true)
    
    return () => {
      // Clean up when component unmounts
      stopMusic();
    };
  }, []);
  
  return <div>My Component</div>;
};
```

### Toggling Mute

```typescript
import { useAudio } from '../contexts/AudioContext';

const MuteButton = () => {
  const { isMuted, toggleMute } = useAudio();
  
  return (
    <button onClick={toggleMute}>
      {isMuted ? 'Unmute' : 'Mute'}
    </button>
  );
};
```

## Adding New Audio Files

1. Place sound effects in the `public/sounds/` directory
2. Place music tracks in the `public/music/` directory
3. Update the `audioService.ts` file to preload any commonly used sounds:

```typescript
// In src/services/audioService.ts
useEffect(() => {
  audioService.loadSound('my_new_sound', 'my_new_sound.mp3');
}, []);
```

## Best Practices

1. Keep sound effects short and small in file size
2. Compress audio files to reduce loading times
3. Consider providing alternative formats (MP3 and OGG) for better browser compatibility
4. Always provide visual feedback along with audio feedback for accessibility
5. Remember that audio may not play on mobile devices without user interaction first
