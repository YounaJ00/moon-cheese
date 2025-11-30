import type { CurrencyType, ExchangeRate } from '@/types/currency';

const USD_WITH_DECIMAL = 2;
const USD_NO_DECIMAL = 0;
const KRW_DECIMAL = 0;

export function formatPrice(priceInUSD: number, currency: CurrencyType, exchangeRate: ExchangeRate | null): string {
  if (currency === 'USD') {
    return formatUSDPrice(priceInUSD);
  }
  return formatKRWPrice(priceInUSD, exchangeRate);
}

function formatUSDPrice(price: number): string {
  const hasDecimal = price % 1 !== 0;
  const decimalPlaces = hasDecimal ? USD_WITH_DECIMAL : USD_NO_DECIMAL;

  return `$${price.toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  })}`;
}

function formatKRWPrice(priceInUSD: number, exchangeRate: ExchangeRate | null): string {
  if (!exchangeRate) {
    return '환율 오류';
  }
  const priceInKRW = Math.round(priceInUSD * exchangeRate.KRW);
  return `${priceInKRW.toLocaleString('ko-KR', {
    minimumFractionDigits: KRW_DECIMAL,
    maximumFractionDigits: KRW_DECIMAL,
  })}원`;
}
