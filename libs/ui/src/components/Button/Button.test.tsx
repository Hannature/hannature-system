import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Button } from './Button.js';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('fires onPress when clicked', () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Press</Button>);
    screen.getByRole('button').click();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPress = vi.fn();
    render(
      <Button onPress={onPress} disabled>
        Press
      </Button>,
    );
    screen.getByRole('button').click();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies the secondary variant class', () => {
    render(<Button variant="secondary">Outline</Button>);
    expect(screen.getByRole('button').className).toMatch(/border/);
  });

  it('uses accessibilityLabel as aria-label', () => {
    render(<Button accessibilityLabel="hidden label">x</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'hidden label');
  });

  it('passes axe a11y checks', async () => {
    const { container } = render(<Button>Accessible</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
