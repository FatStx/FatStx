import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Disclaimer from './Disclaimer';

// Mock react-ga4
vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
  },
}));

describe('Disclaimer', () => {
  it('renders the About heading', () => {
    render(<Disclaimer />);

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('renders builder credits', () => {
    render(<Disclaimer />);

    // Multiple @eparrot mentions exist, so use getAllByText
    const eparrotLinks = screen.getAllByText(/@eparrot/i);
    expect(eparrotLinks.length).toBeGreaterThan(0);
  });

  it('renders disclaimer text', () => {
    render(<Disclaimer />);

    expect(screen.getByText(/disclaimer/i)).toBeInTheDocument();
  });
});
