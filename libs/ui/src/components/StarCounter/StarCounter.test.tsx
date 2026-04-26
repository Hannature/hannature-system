import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { StarCounter } from './StarCounter.js';

describe('StarCounter', () => {
  it('renders count and default threshold of 20', () => {
    render(<StarCounter count={5} />);
    expect(screen.getByText('5 / 20')).toBeInTheDocument();
  });

  it('honours a custom threshold', () => {
    render(<StarCounter count={3} threshold={10} />);
    expect(screen.getByText('3 / 10')).toBeInTheDocument();
  });

  it('clamps the count between 0 and threshold', () => {
    render(<StarCounter count={-2} threshold={20} />);
    expect(screen.getByText('0 / 20')).toBeInTheDocument();
  });

  it('clamps an over-threshold count to the threshold', () => {
    render(<StarCounter count={25} threshold={20} />);
    expect(screen.getByText('20 / 20')).toBeInTheDocument();
  });

  it('renders a ProgressBar with correct aria-valuenow', () => {
    render(<StarCounter count={7} threshold={20} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '7');
    expect(bar).toHaveAttribute('aria-valuemax', '20');
  });

  it('hides the progress bar when showProgress is false', () => {
    render(<StarCounter count={7} threshold={20} showProgress={false} />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('exposes a descriptive default a11y label on the group', () => {
    render(<StarCounter count={4} threshold={20} />);
    expect(screen.getByRole('group', { name: '4 of 20 stars earned' })).toBeInTheDocument();
  });

  it('passes axe a11y checks', async () => {
    const { container } = render(<StarCounter count={6} threshold={20} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
