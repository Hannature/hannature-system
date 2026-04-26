import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { MealCard } from './MealCard.js';

describe('MealCard', () => {
  it('renders title and description', () => {
    render(<MealCard title="Greek yogurt bowl" description="With berries and honey" />);
    expect(screen.getByRole('heading', { name: 'Greek yogurt bowl' })).toBeInTheDocument();
    expect(screen.getByText('With berries and honey')).toBeInTheDocument();
  });

  it('renders the meal-type badge when mealType is set', () => {
    render(<MealCard title="Salad" mealType="lunch" />);
    expect(screen.getByText('Lunch')).toBeInTheDocument();
  });

  it('renders an image when imageUrl is provided', () => {
    render(<MealCard title="Toast" imageUrl="/img.jpg" imageAlt="A slice of toast" />);
    expect(screen.getByRole('img', { name: 'A slice of toast' })).toBeInTheDocument();
  });

  it('fires onValidate when the action button is clicked', () => {
    const onValidate = vi.fn();
    render(<MealCard title="Soup" onValidate={onValidate} />);
    screen.getByRole('button', { name: 'Mark complete' }).click();
    expect(onValidate).toHaveBeenCalledTimes(1);
  });

  it('disables the action and reflects pressed state when completed', () => {
    const onValidate = vi.fn();
    render(<MealCard title="Soup" onValidate={onValidate} completed />);
    const button = screen.getByRole('button', { name: 'Completed' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-pressed', 'true');
    button.click();
    expect(onValidate).not.toHaveBeenCalled();
  });

  it('passes axe a11y checks', async () => {
    const { container } = render(
      <MealCard
        title="Greek yogurt bowl"
        description="With berries and honey"
        mealType="breakfast"
        onValidate={() => undefined}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
