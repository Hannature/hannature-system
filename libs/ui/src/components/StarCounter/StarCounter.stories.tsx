import type { Meta, StoryObj } from '@storybook/react-vite';
import { StarCounter } from './StarCounter.js';

const meta: Meta<typeof StarCounter> = {
  title: 'Molecules/StarCounter',
  component: StarCounter,
  tags: ['autodocs'],
  args: {
    count: 6,
    threshold: 20,
    size: 'md',
    showProgress: true,
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    count: { control: { type: 'number', min: 0, max: 30 } },
    threshold: { control: { type: 'number', min: 1, max: 50 } },
    showProgress: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof StarCounter>;

export const Empty: Story = { args: { count: 0 } };
export const InProgress: Story = { args: { count: 6 } };
export const NearThreshold: Story = { args: { count: 18 } };
export const Completed: Story = { args: { count: 20 } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
