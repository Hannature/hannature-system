import type { Config } from 'tailwindcss';
import preset from '@hannature/design-tokens/tailwind';

const config: Config = {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
};

export default config;
