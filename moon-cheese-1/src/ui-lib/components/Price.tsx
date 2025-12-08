import { useCurrency } from '@/providers/CurrencyProvider';
import { formatPrice } from '@/utils/currency';

export function Price({ usd }: { usd: number }) {
  const { currency, exchangeRate } = useCurrency();
  return <span>{formatPrice(usd, currency, exchangeRate)}</span>;
}
