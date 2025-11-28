// import type { CurrencyType, ExchangeRate } from '@/types/currency';

import type { CurrencyType, ExchangeRate } from '@/types/currency';

const USD_DECIMAL_PLACES = 2;
const KRW_DECIMAL_PLACES = 0;

export function formatPrice(priceInUSD: number, currency: CurrencyType, exchangeRate: ExchangeRate | null): string {
  if (currency === 'USD') {
    return formatUSDPrice(priceInUSD);
  }
  return formatKRWPrice(priceInUSD, exchangeRate);
}

function formatUSDPrice(price: number): string {
  return `$${price.toLocaleString('en-US', {
    minimumFractionDigits: USD_DECIMAL_PLACES,
    maximumFractionDigits: USD_DECIMAL_PLACES,
  })}`;
}

function formatKRWPrice(priceInUSD: number, exchangeRate: ExchangeRate | null): string {
  if (!exchangeRate) {
    return '환율 오류';
  }
  const priceInKRW = Math.round(priceInUSD * exchangeRate.KRW);
  return `₩${priceInKRW.toLocaleString('ko-KR', {
    minimumFractionDigits: KRW_DECIMAL_PLACES,
    maximumFractionDigits: KRW_DECIMAL_PLACES,
  })}`;
}
