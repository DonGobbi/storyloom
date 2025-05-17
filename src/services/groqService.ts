import axios from 'axios';

// Define types for Groq API responses
interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqChoice {
  index: number;
  message: GroqMessage;
  finish_reason: string;
}

interface GroqResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: GroqChoice[];
}

// Create a service for Groq API interactions
class GroqService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.REACT_APP_GROQ_API_KEY || '';
    this.baseUrl = 'https://api.groq.com/openai/v1/chat/completions';
    
    if (!this.apiKey) {
      console.error('GROQ API key is not set. Please check your .env file.');
    }
  }

  /**
   * Generate text using the Groq API
   * @param prompt The user prompt to send to the API
   * @param systemPrompt Optional system prompt to guide the AI
   * @returns The generated text
   */
  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    try {
      const messages: GroqMessage[] = [];
      
      // Add system prompt if provided
      if (systemPrompt) {
        messages.push({
          role: 'system',
          content: systemPrompt
        });
      }
      
      // Add user prompt
      messages.push({
        role: 'user',
        content: prompt
      });
      
      const response = await axios.post<GroqResponse>(
        this.baseUrl,
        {
          model: 'llama3-8b-8192', // Using Llama 3 8B model
          messages,
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content.trim();
      } else {
        throw new Error('No response from Groq API');
      }
    } catch (error) {
      console.error('Error calling Groq API:', error);
      return 'I apologize, but I was unable to generate content at this time.';
    }
  }

  /**
   * Generate a story segment based on the current scene and player choices
   * @param currentScene The current scene in the story
   * @param playerChoices Previous choices made by the player
   * @returns A generated story segment
   */
  async generateStorySegment(currentScene: string, playerChoices: string[]): Promise<string> {
    const choicesContext = playerChoices.length > 0 
      ? `Previous choices: ${playerChoices.join(', ')}.` 
      : 'This is the beginning of the story.';
    
    const prompt = `Current scene: ${currentScene}\n${choicesContext}\nContinue the story with a brief, engaging paragraph:`;
    
    const systemPrompt = 
      `You are a storyteller for a visual novel about a refugee's journey. 
      Your writing should be emotional, descriptive, and appropriate for a visual novel format.
      Focus on the character's internal thoughts and feelings as well as their surroundings.
      Keep your response concise (1-3 sentences) and end at a natural point that could lead to player choices.`;
    
    return this.generateText(prompt, systemPrompt);
  }

  /**
   * Generate character dialogue based on the situation and character
   * @param character The character who is speaking
   * @param situation The current situation in the story
   * @returns Generated dialogue for the character
   */
  async generateCharacterDialogue(character: string, situation: string): Promise<string> {
    const prompt = `Character: ${character}\nSituation: ${situation}\nGenerate dialogue:`;
    
    const systemPrompt = 
      `You are writing dialogue for a character in a visual novel about refugees.
      Write realistic, emotionally resonant dialogue that reflects the character's personality and situation.
      Keep the dialogue concise (1-2 sentences) and authentic to how a real person would speak.`;
    
    return this.generateText(prompt, systemPrompt);
  }

  /**
   * Generate choices for the player based on the current situation
   * @param situation The current situation in the story
   * @param numChoices The number of choices to generate (default: 2)
   * @returns An array of generated choices
   */
  async generateChoices(situation: string, numChoices: number = 2): Promise<string[]> {
    const prompt = `Situation: ${situation}\nGenerate ${numChoices} meaningful choices for the player:`;
    
    const systemPrompt = 
      `You are creating choices for a visual novel about a refugee's journey.
      Generate ${numChoices} distinct, meaningful choices that could lead to different story paths.
      Each choice should be brief (5-10 words) and represent a clear decision.
      Format your response as a numbered list with each choice on a new line.`;
    
    const response = await this.generateText(prompt, systemPrompt);
    
    // Parse the response into separate choices
    const choices = response
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.match(/^\d+[\.\)]\s+/) || line.match(/^-\s+/))
      .map(line => line.replace(/^\d+[\.\)]\s+|-\s+/, ''));
    
    // If parsing failed, create default choices
    if (choices.length < numChoices) {
      return [
        'Continue cautiously',
        'Take a risk'
      ].slice(0, numChoices);
    }
    
    return choices.slice(0, numChoices);
  }
}

export default new GroqService();
