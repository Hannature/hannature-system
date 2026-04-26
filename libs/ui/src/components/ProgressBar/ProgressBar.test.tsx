import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { ProgressBar } from './ProgressBar.js';

describe('ProgressBar', () => {
  it('exposes WAI-ARIA progressbar values', () => {
    render(<ProgressBar value={7} max={20} label="Stars earned" />);
    const bar = screen.getByRole('progressbar', { name: 'Stars earned' });
    expect(bar).toHaveAttribute('aria-valuenow', '7');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '20');
  });

  it('clamps overflow values', () => {
    render(<ProgressBar value={999} max={20} label="overflow" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '20');
  });

  it('passes axe a11y checks', async () => {
    const { container } = render(<ProgressBar value={5} max={20} label="progress" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
