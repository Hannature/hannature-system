import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayTile } from './DayTile.js';

const meta: Meta<typeof DayTile> = {
  title: 'Molecules/DayTile',
  component: DayTile,
  tags: ['autodocs'],
  args: {
    dayNumber: 5,
    dateLabel: 'Mon 28',
    status: 'upcoming',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['locked', 'upcoming', 'today', 'completed'],
    },
    starsEarned: { control: { type: 'number', min: 0, max: 5 } },
  },
};

export default meta;
type Story = StoryObj<typeof DayTile>;

export const Locked: Story = { args: { status: 'locked' } };
export const Upcoming: Story = { args: { status: 'upcoming' } };
export const Today: Story = {
  args: { status: 'today', onPress: () => undefined },
};
export const Completed: Story = { args: { status: 'completed' } };
export const CompletedWithStars: Story = {
  args: { status: 'completed', starsEarned: 3 },
};
