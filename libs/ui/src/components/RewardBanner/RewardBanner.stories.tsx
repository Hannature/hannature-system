import type { Meta, StoryObj } from '@storybook/react-vite';
import { RewardBanner } from './RewardBanner.js';

const meta: Meta<typeof RewardBanner> = {
  title: 'Molecules/RewardBanner',
  component: RewardBanner,
  tags: ['autodocs'],
  args: {
    title: '20 stars unlocked',
    description: 'You earned a 10% off code on your next order.',
    onClaim: () => undefined,
  },
  argTypes: {
    dismissible: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RewardBanner>;

export const Default: Story = {};

export const WithCode: Story = {
  args: { code: 'HANNAH10' },
};

export const WithExpiry: Story = {
  args: { code: 'HANNAH10', expiresAt: '2026-05-15T00:00:00Z' },
};

export const Dismissible: Story = {
  args: {
    dismissible: true,
    onDismiss: () => undefined,
    code: 'HANNAH10',
  },
};
