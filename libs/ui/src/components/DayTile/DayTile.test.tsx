import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { DayTile } from './DayTile.js';

describe('DayTile', () => {
  it('renders the dateLabel when provided', () => {
    render(<DayTile dayNumber={3} dateLabel="Mon 28" />);
    expect(screen.getByText('Mon 28')).toBeInTheDocument();
  });

  it('falls back to dayNumber when no dateLabel', () => {
    render(<DayTile dayNumber={7} />);
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('renders as a button when onPress is set and status is interactive', () => {
    const onPress = vi.fn();
    render(<DayTile dayNumber={1} status="upcoming" onPress={onPress} />);
    const button = screen.getByRole('button');
    button.click();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not render as a button when locked', () => {
    const onPress = vi.fn();
    render(<DayTile dayNumber={1} status="locked" onPress={onPress} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByRole('gridcell')).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows the star count when completed with starsEarned', () => {
    render(<DayTile dayNumber={5} status="completed" starsEarned={3} />);
    expect(screen.getByText('★ 3')).toBeInTheDocument();
  });

  it('shows a checkmark when completed without starsEarned', () => {
    render(<DayTile dayNumber={5} status="completed" />);
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('uses a descriptive default a11y label for completed days', () => {
    render(<DayTile dayNumber={5} status="completed" starsEarned={2} dateLabel="Fri 2" />);
    expect(screen.getByLabelText(/Fri 2.*completed.*2 stars earned/)).toBeInTheDocument();
  });

  it('passes axe a11y checks', async () => {
    const { container } = render(
      <DayTile dayNumber={5} status="today" dateLabel="Mon 28" onPress={() => undefined} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
