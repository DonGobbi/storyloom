# Journey to Home - A Visual Novel

A React-based visual novel that tells the story of Amina, a young refugee girl from Malawi, as she journeys through challenges, hope, and resilience trying to find safety and rebuild her life.

## About the Project

"Journey to Home" is an interactive visual novel that allows players to make choices that affect Amina's path, relationships, and future. The story is divided into four acts:

1. **The Departure** - Amina's village is affected by conflict, and she must decide whether to stay or flee.
2. **The Journey** - Amina travels to a refugee camp, facing various challenges along the way.
3. **The Camp** - Life in the refugee camp, including friendships, learning, and struggles.
4. **New Beginnings** - Amina gets a chance for education or resettlement, and must make difficult choices.

## Features

- Interactive storytelling with meaningful choices
- Multiple branching paths leading to different endings
- Character relationship system
- Emotional state tracking
- Visual novel style presentation with backgrounds and character portraits

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

- `src/components/core` - Core game components (Scene, Game, TitleScreen)
- `src/components/ui` - UI components and styled components
- `src/contexts` - React context for managing game state
- `src/data` - Story data, including scenes, characters, and choices
- `src/types` - TypeScript type definitions
- `src/assets` - Images and audio files (placeholder)

## Adding Content

### Adding New Scenes

To add new scenes to the story, edit the `src/data/storyData.ts` file and add new scene objects to the `scenes` array.

### Adding Characters

To add new characters, edit the `characters` array in the `src/data/storyData.ts` file.

## Technologies Used

- React
- TypeScript
- Styled Components
- React Router

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the real stories of refugees around the world
- Created to raise awareness about refugee experiences and build empathy
