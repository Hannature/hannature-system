import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { WorkoutCard } from './WorkoutCard.js';

describe('WorkoutCard', () => {
  it('renders title and formatted duration', () => {
    render(<WorkoutCard title="Morning flow" durationMinutes={45} />);
    expect(screen.getByRole('heading', { name: 'Morning flow' })).toBeInTheDocument();
    expect(screen.getByText('45 min')).toBeInTheDocument();
  });

  it('formats durations >= 60 min in hours', () => {
    render(<WorkoutCard title="Long ride" durationMinutes={75} />);
    expect(screen.getByText('1 h 15 min')).toBeInTheDocument();
  });

  it('renders the intensity badge when provided', () => {
    render(
      <WorkoutCard title="Mobility" durationMinutes={20} intensity="gentle" />,
    );
    expect(screen.getByText('Gentle')).toBeInTheDocument();
  });

  it('renders a ProgressBar when progress is provided', () => {
    render(
      <WorkoutCard title="Run" durationMinutes={30} progress={42} />,
    );
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '42');
  });

  it('fires onStart when the action button is clicked', () => {
    const onStart = vi.fn();
    render(<WorkoutCard title="Run" durationMinutes={30} onStart={onStart} />);
    screen.getByRole('button', { name: 'Start workout' }).click();
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('disables the button when status is completed', () => {
    const onStart = vi.fn();
    render(
      <WorkoutCard
        title="Run"
        durationMinutes={30}
        status="completed"
        onStart={onStart}
      />,
    );
    const button = screen.getByRole('button', { name: 'Completed' });
    expect(button).toBeDisabled();
    button.click();
    expect(onStart).not.toHaveBeenCalled();
  });

  it('passes axe a11y checks', async () => {
    const { container } = render(
      <WorkoutCard
        title="Morning flow"
        durationMinutes={45}
        intensity="moderate"
        progress={30}
        onStart={() => undefined}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
