import type { CurrencyType, ExchangeRate } from '@/types/currency';
import { createContext, useContext } from 'react';

export type CurrencyContextType = {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  exchangeRate: ExchangeRate | null;
  isLoadingExchangeRate: boolean;
  exchangeRateError: Error | null;
};
export const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency 는 CurrencyProvider 안에서만 사용 가능합니다.');
  }
  return context;
}
