import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar.js';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  args: { value: 7, max: 20, label: 'Stars earned' },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Full: Story = { args: { value: 20 } };
