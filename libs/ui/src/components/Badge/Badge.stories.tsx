import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge.js';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  args: { children: 'New' },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'accent', 'success'] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { tone: 'neutral' } };
export const Accent: Story = { args: { tone: 'accent' } };
export const Success: Story = { args: { tone: 'success', children: 'Validated' } };
