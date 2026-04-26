import type { Config } from 'tailwindcss';
import preset from '@hannature/design-tokens/tailwind';

const config: Config = {
  presets: [preset],
  content: [
    './libs/ui/src/**/*.{ts,tsx}',
    './libs/ui/.storybook/**/*.{ts,tsx}',
  ],
};

export default config;
