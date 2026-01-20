import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Home from './Home';

// Mock react-ga4
vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
  },
}));

describe('Home', () => {
  it('renders the FATSTX header', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText('FAT')).toBeInTheDocument();
    expect(screen.getByText('STX')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /transactions/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /stacking \(v1\)/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /stacking \(v2\)/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /stacking \(v3\)/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /faq/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('renders support us button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: /support us/i })).toBeInTheDocument();
  });
});
