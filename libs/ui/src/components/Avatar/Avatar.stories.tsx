import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar.js';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  args: { alt: 'Sophie Martin' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const InitialsFallback: Story = {};
export const FromSource: Story = {
  args: {
    source: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80',
  },
};
export const Large: Story = { args: { size: 'lg' } };
