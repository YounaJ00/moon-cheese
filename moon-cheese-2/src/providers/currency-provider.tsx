import { createContext, useContext, useState } from 'react';
import type { Currency } from '@/type';
import { getExchangeRateQueryOptions } from '@/remotes/queries/exchange';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { ExchangeRate } from '@/remotes/exchange';

type CurrencyContextType = {
  currency: Currency;
  exchangeRate: ExchangeRate;
  setCurrency: (currency: Currency) => void;
};

const currencyContext = createContext<Pick<CurrencyContextType, 'currency' | 'exchangeRate'>>({
  currency: 'USD',
  exchangeRate: {
    KRW: 1,
    USD: 1,
  },
});

const currencyActionContext = createContext<Pick<CurrencyContextType, 'setCurrency'>>({
  setCurrency: () => {},
});

const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: exchangeRate } = useSuspenseQuery(getExchangeRateQueryOptions());
  const [currency, setCurrency] = useState<Currency>('USD');
  return (
    <currencyContext.Provider value={{ currency, exchangeRate }}>
      <currencyActionContext.Provider value={{ setCurrency }}>{children}</currencyActionContext.Provider>
    </currencyContext.Provider>
  );
};

const useCurrency = () => {
  return useContext(currencyContext);
};

const useSetCurrency = () => {
  return useContext(currencyActionContext);
};

export { CurrencyProvider, useCurrency, useSetCurrency };
