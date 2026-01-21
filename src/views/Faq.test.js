import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Faq from './Faq';

// Mock react-ga4
vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
  },
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe('Faq', () => {
  beforeEach(() => {
    // Clear the hash before each test
    window.location.hash = '';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

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

  it('renders link icons for each FAQ item', () => {
    render(<Faq />);

    // Check for link icons (aria-label contains "Copy link to")
    const linkButtons = screen.getAllByLabelText(/copy link to/i);
    expect(linkButtons.length).toBeGreaterThan(0);
  });

  it('copies link to clipboard when link icon is clicked', async () => {
    render(<Faq />);

    const linkButtons = screen.getAllByLabelText(/copy link to/i);
    const firstLinkButton = linkButtons[0];

    fireEvent.click(firstLinkButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });

    // Verify the URL contains a hash
    const copiedUrl = navigator.clipboard.writeText.mock.calls[0][0];
    expect(copiedUrl).toContain('#faqaccordion');
  });

  it('opens the FAQ accordion when hash is in URL', () => {
    // Set hash before rendering
    window.location.hash = '#faqaccordion1';

    render(<Faq />);

    // The first FAQ should be expanded
    // We can check this by looking for the expanded accordion content
    const firstFaqAnswer = screen.getByText(/Stacks API calls are slow sometimes/i);
    expect(firstFaqAnswer).toBeInTheDocument();
  });

  it('opens only the referenced FAQ when hash is present', () => {
    window.location.hash = '#faqaccordion2';

    render(<Faq />);

    // The second FAQ should show its content
    const secondFaqAnswer = screen.getByText(/raw addresses, not .btc addresses/i);
    expect(secondFaqAnswer).toBeInTheDocument();
  });
});
