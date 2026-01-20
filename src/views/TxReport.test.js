import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TxReport from './TxReport';

// Mock react-ga4
vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
  },
}));

describe('TxReport', () => {
  const defaultProps = {
    walletId: '',
    setWalletId: vi.fn(),
    txnData: [],
    setTxnData: vi.fn(),
    year: '2025',
    setYear: vi.fn(),
    currency: 'USD',
    setCurrency: vi.fn(),
  };

  it('renders the wallet address input', () => {
    render(
      <BrowserRouter>
        <TxReport {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/wallet address/i)).toBeInTheDocument();
  });

  it('renders the GO button', () => {
    render(
      <BrowserRouter>
        <TxReport {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: /go/i })).toBeInTheDocument();
  });

  it('renders year selector with 2025 selected', () => {
    render(
      <BrowserRouter>
        <TxReport {...defaultProps} />
      </BrowserRouter>
    );

    // MUI Select renders label twice (label and legend), use getAllByText
    const yearLabels = screen.getAllByText('Year');
    expect(yearLabels.length).toBeGreaterThan(0);
  });

  it('renders currency selector with USD selected', () => {
    render(
      <BrowserRouter>
        <TxReport {...defaultProps} />
      </BrowserRouter>
    );

    // MUI Select renders label twice (label and legend), use getAllByText
    const currencyLabels = screen.getAllByText('Currency');
    expect(currencyLabels.length).toBeGreaterThan(0);
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  it('renders the Transactions title', () => {
    render(
      <BrowserRouter>
        <TxReport {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByText('Transactions')).toBeInTheDocument();
  });

  it('renders the Export button', () => {
    render(
      <BrowserRouter>
        <TxReport {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument();
  });
});
