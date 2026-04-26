import type { Preview } from '@storybook/react-vite';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    backgrounds: {
      default: 'cream',
      values: [
        { name: 'cream', value: '#f9faf1' },
        { name: 'surface', value: '#ffffff' },
      ],
    },
  },
};

export default preview;
