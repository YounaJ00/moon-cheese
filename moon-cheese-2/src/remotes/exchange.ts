import { http } from '@/utils/http';

export interface ExchangeRate {
  KRW: number;
  USD: number;
}
interface ExchangeRateResponse {
  exchangeRate: ExchangeRate;
}

export const getExchangeRate = async (): Promise<ExchangeRate> => {
  const response = await http.get<ExchangeRateResponse>('/api/exchange-rate');
  return response.exchangeRate;
};
