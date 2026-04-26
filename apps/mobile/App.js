// Defensive re-export so Expo's fallback entry resolver (which probes
// `<projectRoot>/App.*` when `node_modules/expo/AppEntry.js` imports
// `../../App`) can find the real component regardless of how Metro was
// launched. Normally `index.js` is the entry via the package.json `main`
// field — this file is only used if that resolution path is bypassed.
export { default } from './src/app/App';
