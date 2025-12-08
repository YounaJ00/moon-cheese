import { EnhancedToastProvider } from '@/ui-lib/components/toast';
import { QueryProvider } from './query-provider';
import { CurrencyProvider } from './currency-provider';
import { CartProvider } from './cart-provider';

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <CurrencyProvider>
        <CartProvider>
          <EnhancedToastProvider>{children}</EnhancedToastProvider>
        </CartProvider>
      </CurrencyProvider>
    </QueryProvider>
  );
};

export default GlobalProvider;
