# Modules

Modules contain the core game logic. Each module represents a feature of the game.

Most modules consist of the following file structure:

- `/actions` - Redux action creators and thunks<br>
   *(all action creators are suffixed with `...Action.js`)*
- `/reducers` - Redux reducers
- `/selectors` - State selectors
- `definitions.js` - Contains entity default values
- `index.js` - Exports all actions + selectors that are considered public
- `streams.js` - Provides observable streams for other modules
- `subscriptions.js` - Subscriptions to other modules
