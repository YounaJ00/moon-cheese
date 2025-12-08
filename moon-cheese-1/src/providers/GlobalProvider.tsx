import { EnhancedToastProvider } from '@/ui-lib/components/toast';
import { CurrencyProvider } from './CurrencyProvider';

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CurrencyProvider>
      <EnhancedToastProvider>{children}</EnhancedToastProvider>
    </CurrencyProvider>
  );
};

export default GlobalProvider;
