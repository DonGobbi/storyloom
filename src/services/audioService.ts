class AudioService {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private music: HTMLAudioElement | null = null;
  private isMuted = false;
  private audioAvailable = true;
  private soundsLoaded = false;

  loadSound(id: string, url: string): void {
    try {
      console.log(`Loading sound: ${id} from /sounds/${url}`);
      const baseUrl = process.env.PUBLIC_URL || '';
const audio = new Audio(`${baseUrl}/sounds/${url}`);
      
      // Add error handler
      audio.addEventListener('error', (e) => {
        console.warn(`Error loading sound ${id}:`, e);
      });
      
      this.sounds.set(id, audio);
    } catch (err) {
      console.warn(`Failed to load sound ${id}:`, err);
    }
  }
  
  preloadCommonSounds(): void {
    if (this.soundsLoaded) return;
    
    const baseUrl = process.env.PUBLIC_URL || '';
this.loadSound('click', 'click.mp3');
this.loadSound('transition', 'transition.mp3');
this.loadSound('choice', 'choice.mp3');

this.soundsLoaded = true;
console.log('Preloaded common sounds');
  }

  playSound(id: string): void {
    if (this.isMuted || !this.audioAvailable) return;
    
    // Make sure common sounds are loaded
    if (!this.soundsLoaded) {
      this.preloadCommonSounds();
    }
    
    const sound = this.sounds.get(id);
    if (sound) {
      sound.currentTime = 0;
      sound.play()
        .then(() => console.log(`Playing sound: ${id}`))
        .catch(err => {
          console.warn(`Error playing sound ${id}:`, err);
          // If we get an error, we might be in a browser that doesn't support audio
          this.audioAvailable = false;
        });
    } else {
      console.warn(`Sound not found: ${id}`);
    }
  }

  playMusic(url: string, loop = true): void {
    if (!this.audioAvailable) return;
    
    try {
      if (this.music) {
        this.music.pause();
      }
      
      console.log(`Loading music: ${url}`);
      const baseUrl = process.env.PUBLIC_URL || '';
this.music = new Audio(`${baseUrl}/music/${url}`);
      this.music.loop = loop;
      
      // Add error handler
      this.music.addEventListener('error', (e) => {
        console.warn(`Error loading music ${url}:`, e);
        this.audioAvailable = false;
      });
      
      if (!this.isMuted) {
        this.music.play()
          .then(() => console.log(`Playing music: ${url}`))
          .catch(err => {
            console.warn(`Error playing music ${url}:`, err);
            this.audioAvailable = false;
          });
      }
    } catch (err) {
      console.warn(`Failed to load music ${url}:`, err);
      this.audioAvailable = false;
    }
  }

  stopMusic(): void {
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0;
    }
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    
    if (this.music) {
      if (this.isMuted) {
        this.music.pause();
      } else {
        this.music.play().catch(err => console.warn('Error playing music after unmute:', err));
      }
    }
    
    return this.isMuted;
  }

  isMutedStatus(): boolean {
    return this.isMuted;
  }
}

export default new AudioService();
