# XO Game

A neon-themed Tic-Tac-Toe experience built with vanilla HTML, CSS, and JavaScript. Players can enter their names, pick their marker, and start a stylish duel right in the browser.

## Features
- Player name and marker selection in a modal before the first move
- Responsive neon UI with animated gradient background
- Winner and tie detection with instant status updates
- Reset button to clear the board without reloading the page

## Project Structure
```
XO-Game
├── index.html   # Main markup, game board, and start modal
├── style.css    # Gradient background, neon tiles, modal styling
└── scripts.js   # Game logic, player handling, rendering helpers
```

## Getting Started
1. Clone the repository or download the files.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, etc.).
3. Fill in player names and choose Player 1's marker in the modal, then press `Start`.
4. Click the tiles to play. The status text shows whose turn it is or who won.
5. Use the `Reset` button anytime to begin a new round immediately.

## Development Notes
- All gameplay logic lives in `scripts.js`; tweak win conditions, modal behavior, or rendering here.
- UI polish (colors, animations, button glow) is handled in `style.css`.

## Future Enhancements
1. Add an AI opponent with multiple difficulty levels.
2. Persist match history or scores using `localStorage`.
3. Trigger celebratory animations or sounds for wins and ties.
