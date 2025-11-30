import type { CurrencyType, ExchangeRate, ExchangeRateResponse } from '@/types/currency';
import { http } from '@/utils/http';
import React, { createContext, useContext, useEffect, useState } from 'react';

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
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
}

const DEFAULT_CURRENCY: CurrencyType = 'USD';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyType>(DEFAULT_CURRENCY);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [isLoadingExchangeRate, setIsLoadingExchangeRate] = useState(true);
  const [exchangeRateError, setExchangeRateError] = useState<Error | null>(null);

  useEffect(() => {
    loadExchangeRate();
  }, []);

  async function loadExchangeRate() {
    setIsLoadingExchangeRate(true);
    setExchangeRateError(null);
    try {
      const response = await http.get<ExchangeRateResponse>('/api/exchange-rate');
      setExchangeRate(response.exchangeRate);
    } catch (error) {
      setExchangeRateError(error instanceof Error ? error : new Error('Failed to load exchanhe rate'));
    } finally {
      setIsLoadingExchangeRate(false);
    }
  }

  const value: CurrencyContextType = {
    currency,
    setCurrency,
    exchangeRate,
    isLoadingExchangeRate,
    exchangeRateError,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}
