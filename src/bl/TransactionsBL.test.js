import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import * as TransactionsBL from './TransactionsBL.js';
import { EURPrice } from '../bo/fiatprices/EurPrice.js';

const inputArray = [
  {
    burnDate: '2026-01-17T22:53:37.000Z',
    rowId: 1,
    inSymbol: 'STX',
    inAmount: '258.596',
    outSymbol: '',
    outAmount: 0,
    xactnFee: 0,
    inCoinPrice: '0.372',
    outCoinPrice: '',
    xactnFeeCoinPrice: '',
    xactnType: 'Stacking Reward',
    xactnTypeDetail: 'Fast Pool',
    xactnId: '0x0640793ffdaa779e6900432a945274f54e02bf86b53f2f5b0209fdbed31c6bfd',
    inAmountRaw: '258595838',
    outAmountRaw: 0,
    xactnFeeRaw: 0,
    isNftIn: false,
    isNftOut: '',
    contract: '',
    contractFunction: '',
    sender: 'SP21YTSM60CAY6D011EZVEVNKXVW8FVZE198XEFFP',
    recipient: '',
    memo: '',
  },
  {
    burnDate: '2026-01-16T13:29:25.000Z',
    rowId: 2,
    inSymbol: 'sBTC',
    inAmount: '0.00051895',
    outSymbol: '',
    outAmount: 0,
    xactnFee: 0,
    inCoinPrice: '95584.83',
    outCoinPrice: '',
    xactnFeeCoinPrice: '',
    xactnType: 'Dual Stacking',
    xactnTypeDetail: 'Rewards v2',
    xactnId: '0xde0c9ea1d6af5c3bd02830781b7c820ae5a52fbe5cb0e0b6ee7f02502f2400a8',
    inAmountRaw: '51895',
    outAmountRaw: 0,
    xactnFeeRaw: 0,
    isNftIn: false,
    isNftOut: '',
    contract: '',
    contractFunction: '',
    sender: 'SP1HFCRKEJ8BYW4D0E3FAWHFDX8A25PPAA83HWWZ9.dual-stacking-v2_0_2',
    recipient: '',
    memo: '',
  },
  {
    burnDate: '2026-01-05T13:13:23.000Z',
    rowId: 3,
    inSymbol: 'STX',
    inAmount: '260.680',
    outSymbol: '',
    outAmount: 0,
    xactnFee: 0,
    inCoinPrice: '0.357',
    outCoinPrice: '',
    xactnFeeCoinPrice: '',
    xactnType: 'Stacking Reward',
    xactnTypeDetail: 'Fast Pool',
    xactnId: '0xc601aea3d8e5967c0e866b6db25002f7117c5bf4a285cbb7d209e9ea76f553f6',
    inAmountRaw: '260680397',
    outAmountRaw: 0,
    xactnFeeRaw: 0,
    isNftIn: false,
    isNftOut: '',
    contract: '',
    contractFunction: '',
    sender: 'SP21YTSM60CAY6D011EZVEVNKXVW8FVZE198XEFFP',
    recipient: '',
    memo: '',
  },
  {
    burnDate: '2026-01-01T11:04:54.000Z',
    rowId: 4,
    inSymbol: 'sBTC',
    inAmount: '0.00057649',
    outSymbol: '',
    outAmount: 0,
    xactnFee: 0,
    inCoinPrice: '87520.18',
    outCoinPrice: '',
    xactnFeeCoinPrice: '',
    xactnType: 'Dual Stacking',
    xactnTypeDetail: 'Rewards v2',
    xactnId: '0x49cd57392b0331a8caf66ddfa9591eba1e09220ab26008515825e4beed79a869',
    inAmountRaw: '57649',
    outAmountRaw: 0,
    xactnFeeRaw: 0,
    isNftIn: false,
    isNftOut: '',
    contract: '',
    contractFunction: '',
    sender: 'SP1HFCRKEJ8BYW4D0E3FAWHFDX8A25PPAA83HWWZ9.dual-stacking-v2_0_2',
    recipient: '',
    memo: '',
  },
];

describe('ConvertArrayCurrency', () => { 
  test('converts USD prices to EUR using mocked EUR rate', async () => {
    // Deep clone the input to avoid mutating the original
    const input = JSON.parse(JSON.stringify(inputArray));

    // compute EUR price per row and expected result per row using the precise EUR price returned for that date
    const eurPriceRow1 = parseFloat(await TransactionsBL.getCoinPrice('EUR', input[0].burnDate));
    const eurPriceRow2 = parseFloat(await TransactionsBL.getCoinPrice('EUR', input[1].burnDate));
    const eurPriceRow3 = parseFloat(await TransactionsBL.getCoinPrice('EUR', input[2].burnDate));
    const eurPriceRow4 = parseFloat(await TransactionsBL.getCoinPrice('EUR', input[3].burnDate));

    const result = await TransactionsBL.ConvertArrayCurrency(input, 'EUR');

    const expectedRow1 = (parseFloat('0.372') / eurPriceRow1).toFixed(3);
    const expectedRow2 = (parseFloat('95584.83') / eurPriceRow2).toFixed(2);
    const expectedRow3 = (parseFloat('0.357') / eurPriceRow3).toFixed(3);
    const expectedRow4 = (parseFloat('87520.18') / eurPriceRow4).toFixed(2);

    expect(result[0].inCoinPrice).toBe(expectedRow1);
    expect(result[1].inCoinPrice).toBe(expectedRow2);
    expect(result[2].inCoinPrice).toBe(expectedRow3);
    expect(result[3].inCoinPrice).toBe(expectedRow4);

    // xactnFeeCoinPrice should stay empty because original value was empty
    expect(result[0].xactnFeeCoinPrice).toBe('');
    expect(result[0].outCoinPrice).toBe('');
  });

  test('does not change object for currency USD', async () => {
    const input = JSON.parse(JSON.stringify(inputArray));
    const before = JSON.stringify(input);

    const result = await TransactionsBL.ConvertArrayCurrency(input, 'USD');

    // Ensure the returned value equals the original (no change)
    expect(JSON.stringify(result)).toBe(before);
    expect(JSON.stringify(input)).toBe(before);
  });
});
