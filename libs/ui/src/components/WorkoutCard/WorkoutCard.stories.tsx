import type { Meta, StoryObj } from '@storybook/react-vite';
import { WorkoutCard } from './WorkoutCard.js';

const meta: Meta<typeof WorkoutCard> = {
  title: 'Molecules/WorkoutCard',
  component: WorkoutCard,
  tags: ['autodocs'],
  args: {
    title: 'Morning flow',
    durationMinutes: 30,
    intensity: 'moderate',
    status: 'upcoming',
    onStart: () => undefined,
  },
  argTypes: {
    intensity: {
      control: 'select',
      options: ['gentle', 'moderate', 'vigorous'],
    },
    status: {
      control: 'select',
      options: ['upcoming', 'in-progress', 'completed'],
    },
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof WorkoutCard>;

export const Upcoming: Story = {};

export const InProgress: Story = {
  args: { status: 'in-progress', progress: 40 },
};

export const Completed: Story = {
  args: { status: 'completed', progress: 100 },
};

export const WithProgress: Story = {
  args: { status: 'in-progress', progress: 65, intensity: 'vigorous' },
};
