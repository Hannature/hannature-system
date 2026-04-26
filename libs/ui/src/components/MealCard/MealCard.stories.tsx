import type { Meta, StoryObj } from '@storybook/react-vite';
import { MealCard } from './MealCard.js';

const meta: Meta<typeof MealCard> = {
  title: 'Molecules/MealCard',
  component: MealCard,
  tags: ['autodocs'],
  args: {
    title: 'Greek yogurt bowl',
    description: 'With seasonal berries, honey, and crushed almonds.',
    mealType: 'breakfast',
    onValidate: () => undefined,
  },
  argTypes: {
    mealType: {
      control: 'select',
      options: ['breakfast', 'lunch', 'dinner', 'snack'],
    },
    completed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MealCard>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=600',
    imageAlt: 'Yogurt bowl topped with berries',
  },
};

export const Completed: Story = {
  args: { completed: true },
};

export const Snack: Story = {
  args: {
    title: 'Apple & almond butter',
    description: 'A handful of almonds with sliced apple.',
    mealType: 'snack',
  },
};
