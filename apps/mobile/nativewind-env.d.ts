/// <reference types="nativewind/types" />

// CSS side-effect imports (e.g. `import './global.css'`) are processed by
// Metro's NativeWind plugin at bundle time; TypeScript needs a stub module
// declaration so it doesn't error on the side-effect import.
declare module '*.css';
