import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Avatar } from './Avatar.js';

describe('Avatar', () => {
  it('renders derived initials when no source is provided', () => {
    render(<Avatar alt="Sophie Martin" testID="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveTextContent('SM');
  });

  it('uses explicit initials when given', () => {
    render(<Avatar initials="HZ" alt="Hannah Zucker" testID="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveTextContent('HZ');
  });

  it('renders the image when source is present', () => {
    render(<Avatar source="https://example.com/a.png" alt="Avatar" />);
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/a.png',
    );
  });

  it('passes axe a11y checks', async () => {
    const { container } = render(<Avatar alt="Sophie" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
