import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Badge } from './Badge.js';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders accent tone', () => {
    render(<Badge tone="accent">Star</Badge>);
    expect(screen.getByText('Star').className).toMatch(/bg-cta/);
  });

  it('passes axe a11y checks', async () => {
    const { container } = render(<Badge>label</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
