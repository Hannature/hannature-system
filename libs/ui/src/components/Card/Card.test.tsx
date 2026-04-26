import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Card } from './Card.js';

describe('Card', () => {
  it('renders children', () => {
    render(<Card testID="card">hello</Card>);
    expect(screen.getByTestId('card')).toHaveTextContent('hello');
  });

  it('passes axe a11y checks', async () => {
    const { container } = render(<Card>content</Card>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
