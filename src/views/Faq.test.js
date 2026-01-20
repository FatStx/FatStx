import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Faq from './Faq';

// Mock react-ga4
vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
  },
}));

describe('Faq', () => {
  it('renders the FAQs title', () => {
    render(<Faq />);

    expect(screen.getByText('FAQs')).toBeInTheDocument();
  });

  it('renders FAQ questions', () => {
    render(<Faq />);

    // Check for actual FAQ questions in the app
    expect(screen.getByText(/site is taking forever to load/i)).toBeInTheDocument();
    expect(screen.getByText(/valid wallet address/i)).toBeInTheDocument();
  });

  it('renders accordion elements', () => {
    render(<Faq />);

    // Check that accordions are present (they have expandable buttons)
    const accordions = screen.getAllByRole('button');
    expect(accordions.length).toBeGreaterThan(0);
  });
});
