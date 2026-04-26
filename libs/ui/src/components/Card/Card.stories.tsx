import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card.js';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  args: { children: 'Reassuring card content' },
  argTypes: {
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};
export const Tight: Story = { args: { padding: 'sm' } };
export const Spacious: Story = { args: { padding: 'lg' } };
