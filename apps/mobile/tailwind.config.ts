import type { Config } from 'tailwindcss';
import nativewindPreset from 'nativewind/preset';
import preset from '@hannature/design-tokens/tailwind';

const config: Config = {
  presets: [nativewindPreset, preset],
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
};

export default config;
