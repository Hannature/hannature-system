import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: { name: '@storybook/react-vite', options: {} },
  addons: [],
  typescript: { reactDocgen: false },
  viteFinal: (cfg) =>
    mergeConfig(cfg, {
      css: {
        postcss: resolve(here, 'postcss.config.cjs'),
      },
    }),
};

export default config;
