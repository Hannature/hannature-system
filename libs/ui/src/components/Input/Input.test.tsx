import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Input } from './Input.js';

describe('Input', () => {
  it('associates the label with the input', () => {
    render(<Input label="Email" testID="email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('fires onChangeText with the new value', () => {
    const onChangeText = vi.fn();
    render(<Input label="Name" onChangeText={onChangeText} />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Hannah' } });
    expect(onChangeText).toHaveBeenCalledWith('Hannah');
  });

  it('exposes the error via aria-invalid + role=alert', () => {
    render(<Input label="Email" error="Required" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('passes axe a11y checks', async () => {
    const { container } = render(<Input label="Email" helperText="we never share" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
