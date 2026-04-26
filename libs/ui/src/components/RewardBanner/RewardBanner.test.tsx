import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { RewardBanner } from './RewardBanner.js';

describe('RewardBanner', () => {
  it('renders title and description', () => {
    render(
      <RewardBanner
        title="20 stars unlocked"
        description="You earned a 10% off code."
      />,
    );
    expect(screen.getByRole('heading', { name: '20 stars unlocked' })).toBeInTheDocument();
    expect(screen.getByText('You earned a 10% off code.')).toBeInTheDocument();
  });

  it('renders the code and a "Discount code" label when code is provided', () => {
    render(<RewardBanner title="Reward" code="HANNAH10" />);
    expect(screen.getByText('HANNAH10')).toBeInTheDocument();
    expect(screen.getByText('Discount code')).toBeInTheDocument();
  });

  it('renders a formatted expiry when expiresAt is provided', () => {
    render(<RewardBanner title="Reward" expiresAt="2026-05-01T00:00:00Z" />);
    expect(screen.getByText(/Expires/)).toBeInTheDocument();
  });

  it('uses role="status" with aria-live="polite"', () => {
    render(<RewardBanner title="Reward" />);
    const banner = screen.getByRole('status');
    expect(banner).toHaveAttribute('aria-live', 'polite');
  });

  it('fires onClaim when the action button is clicked', () => {
    const onClaim = vi.fn();
    render(<RewardBanner title="Reward" onClaim={onClaim} />);
    screen.getByRole('button', { name: 'Claim reward' }).click();
    expect(onClaim).toHaveBeenCalledTimes(1);
  });

  it('renders a dismiss button when dismissible and fires onDismiss', () => {
    const onDismiss = vi.fn();
    render(<RewardBanner title="Reward" dismissible onDismiss={onDismiss} />);
    screen.getByRole('button', { name: 'Dismiss reward' }).click();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('passes axe a11y checks', async () => {
    const { container } = render(
      <RewardBanner
        title="20 stars unlocked"
        description="You earned a 10% off code."
        code="HANNAH10"
        expiresAt="2026-05-01T00:00:00Z"
        onClaim={() => undefined}
        dismissible
        onDismiss={() => undefined}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
