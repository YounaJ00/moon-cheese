import type { Currency } from '@/types/product';

export const formatPriceByCurrency = (price: number, currency: Currency, rate: Record<Currency, number>) => {
  const value = currency === 'USD' ? price : Math.round(price * rate.KRW);
  switch (currency) {
    case 'KRW':
      return `${value.toLocaleString('ko-KR')}원`;
    case 'USD': {
      const hasDecimal = value % 1 !== 0;
      const decimal = hasDecimal ? 2 : 0;
      return `$${value.toLocaleString('en-US', {
        minimumFractionDigits: decimal,
        maximumFractionDigits: decimal,
      })}`;
    }
    default:
      currency satisfies never;
      return;
  }
};
