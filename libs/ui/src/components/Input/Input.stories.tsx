import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input.js';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  args: { label: 'Email', placeholder: 'you@example.com' },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const WithHelper: Story = {
  args: { helperText: 'We will never share your email.' },
};
export const Errored: Story = { args: { error: 'This field is required.' } };
export const Disabled: Story = { args: { disabled: true } };
