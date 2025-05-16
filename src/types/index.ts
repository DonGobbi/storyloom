export interface Choice {
  text: string;
  nextSceneId: string;
}

export interface Scene {
  id: string;
  background: string;
  text?: string;
  dialogueText?: string;
  character?: string;
  choices?: Choice[];
  nextSceneId?: string;
}

export interface Character {
  id: string;
  name: string;
  avatar?: string;
}

export interface StoryState {
  currentSceneId: string;
  visitedScenes: string[];
  emotionalState: number; // -5 to 5 scale for emotional state
  relationships: Record<string, number>; // Character ID to relationship value (-5 to 5)
}
