import { describe, test, expect } from 'vitest';
import processAllXactnWithTransfersApiPages, {
  processXactnWithTransfersApiPagesSinceStartBlock,
  processXactnWithTransfersApiPagesForDateRange,
  getCurrentBlock,
  checkWallet,
  getBlockTime,
} from './StxApi.js';

// Test wallet address (a known active wallet)
const TEST_WALLET = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7';
const TEST_BNS_NAME = 'friedger.btc';

describe('StxApi E2E Tests', () => {
  describe('getCurrentBlock', () => {
    test('should return current block height as a number', async () => {
      const blockHeight = await getCurrentBlock();

      expect(blockHeight).not.toBeNull();
      expect(typeof blockHeight).toBe('number');
      expect(blockHeight).toBeGreaterThan(0);

      console.log(`Current block height: ${blockHeight}`);
    });
  });

  describe('checkWallet', () => {
    test('should validate a known wallet address', async () => {
      const [isValid, walletId] = await checkWallet(TEST_WALLET);

      expect(isValid).toBe(true);
      expect(walletId).toBe(TEST_WALLET);

      console.log(`Wallet ${walletId} is valid: ${isValid}`);
    });

    test('should resolve BNS name to wallet address', async () => {
      const [isValid, resolvedAddress] = await checkWallet(TEST_BNS_NAME);

      expect(isValid).toBe(true);
      expect(resolvedAddress).not.toBe(TEST_BNS_NAME);
      expect(resolvedAddress).toMatch(/^SP[A-Z0-9]+$/);

      console.log(`BNS name ${TEST_BNS_NAME} resolved to: ${resolvedAddress}`);
    });

    test('should return false for invalid wallet', async () => {
      const [isValid, walletId] = await checkWallet('INVALID_WALLET_ADDRESS');

      expect(isValid).toBe(false);
      expect(walletId).toBe('INVALID_WALLET_ADDRESS');
    });
  });

  describe('getBlockTime', () => {
    test('should return block time for a specific block height', async () => {
      // Use a known block height that definitely exists
      const blockHeight = 100000;
      const blockTime = await getBlockTime(blockHeight);

      expect(typeof blockTime).toBe('string');
      // The API may return empty string if endpoint path changed
      // If blockTime is not empty, verify the format
      if (blockTime !== '') {
        expect(blockTime).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
        console.log(`Block ${blockHeight} burn time: ${blockTime}`);
      } else {
        console.log(
          `Block ${blockHeight}: getBlockTime returned empty (API endpoint may need update)`
        );
        expect(blockTime).toBe('1234');
      }
    });

    test('should return empty string for non-existent block', async () => {
      const blockHeight = 999999999;
      const blockTime = await getBlockTime(blockHeight);

      expect(blockTime).toBe('');
    });
  });

  describe('processAllXactnWithTransfersApiPages', () => {
    test('should fetch all transactions for a wallet', { timeout: 60000 }, async () => {
      const [isError, transactions] = await processAllXactnWithTransfersApiPages(TEST_WALLET);

      expect(isError).toBe(false);
      expect(Array.isArray(transactions)).toBe(true);

      console.log(`Fetched ${transactions.length} total transactions`);
    });

    test('should fetch transactions for a specific year', { timeout: 60000 }, async () => {
      const [isError, transactions] = await processAllXactnWithTransfersApiPages(
        TEST_WALLET,
        '2026'
      );

      expect(isError).toBe(false);
      expect(Array.isArray(transactions)).toBe(true);

      // Verify all transactions are within the year
      const startDate = new Date('2026-01-01T00:00:00.000Z');
      const endDate = new Date('2027-01-01T00:00:00.000Z');

      transactions.forEach((xactn) => {
        const xactnDate = new Date(xactn.tx.burn_block_time_iso);
        expect(xactnDate >= startDate).toBe(true);
        expect(xactnDate < endDate).toBe(true);
      });

      console.log(`Fetched ${transactions.length} transactions for 2026`);
    });
  });

  describe('processXactnWithTransfersApiPagesForDateRange', () => {
    test('should fetch transactions within date range', { timeout: 60000 }, async () => {
      const startDate = '2026-01-01T00:00:00.000Z';
      const endDate = '2026-07-01T00:00:00.000Z';

      const [isError, transactions] = await processXactnWithTransfersApiPagesForDateRange(
        TEST_WALLET,
        startDate,
        endDate
      );

      expect(isError).toBe(false);
      expect(Array.isArray(transactions)).toBe(true);

      // Verify all transactions are within the date range
      const start = new Date(startDate);
      const end = new Date(endDate);

      transactions.forEach((xactn) => {
        const xactnDate = new Date(xactn.tx.burn_block_time_iso);
        expect(xactnDate >= start).toBe(true);
        expect(xactnDate < end).toBe(true);
      });

      console.log(`Fetched ${transactions.length} transactions for date range`);
    });
  });

  describe('processXactnWithTransfersApiPagesSinceStartBlock', () => {
    test('should fetch transactions since a specific block', { timeout: 60000 }, async () => {
      // Get current block first to determine a reasonable start block
      const currentBlock = await getCurrentBlock();
      const startBlock = currentBlock - 1000; // Last 1000 blocks

      const [isError, transactions] = await processXactnWithTransfersApiPagesSinceStartBlock(
        TEST_WALLET,
        startBlock
      );

      expect(isError).toBe(false);
      expect(Array.isArray(transactions)).toBe(true);

      // Verify all transactions are at or after the start block
      transactions.forEach((xactn) => {
        expect(xactn.tx.block_height).toBeGreaterThanOrEqual(startBlock);
      });

      console.log(
        `Fetched ${transactions.length} transactions since block ${startBlock} (current: ${currentBlock})`
      );
    });
  });

  describe('Transaction Structure', () => {
    test('should return transactions with expected structure', { timeout: 60000 }, async () => {
      const [isError, transactions] = await processAllXactnWithTransfersApiPages(TEST_WALLET);

      expect(isError).toBe(false);

      if (transactions.length > 0) {
        const firstTx = transactions[0];

        // Verify transaction structure
        expect(firstTx).toHaveProperty('tx');
        expect(firstTx.tx).toHaveProperty('tx_id');
        expect(firstTx.tx).toHaveProperty('block_height');
        expect(firstTx.tx).toHaveProperty('burn_block_time_iso');
        expect(firstTx.tx).toHaveProperty('tx_type');
        expect(firstTx.tx).toHaveProperty('fee_rate');

        console.log(`Transaction structure verified. First tx_id: ${firstTx.tx.tx_id}`);
      }
    });
  });
});
