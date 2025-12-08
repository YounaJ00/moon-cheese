export type CurrencyType = 'USD' | 'KRW';

export type ExchangeRate = {
  USD: number;
  KRW: number;
};

export type ExchangeRateResponse = {
  exchangeRate: ExchangeRate;
};
 