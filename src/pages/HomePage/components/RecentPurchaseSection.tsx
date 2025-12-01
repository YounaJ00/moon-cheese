import { Flex, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import { useEffect, useState } from 'react';
import { fetchRecentProducts, type RecentProduct } from '@/api/recent-purchase';
import ErrorSection from '@/components/ErrorSection';
import { useCurrency } from '@/providers/CurrencyProvider';
import { formatPrice } from '@/utils/currency';

function RecentPurchaseSection() {
  const { currency, exchangeRate } = useCurrency();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);

  useEffect(() => {
    loadRecentProducts();
  }, []);

  async function loadRecentProducts() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchRecentProducts();
      setRecentProducts(response.recentProducts);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Failed to load recent products'));
    } finally {
      setIsLoading(false);
    }
  }

  if (error) {
    return (
      <styled.section css={{ px: 5, py: 4 }}>
        <ErrorSection onRetry={loadRecentProducts} />
      </styled.section>
    );
  }

  if (isLoading) {
    return null;
  }
  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>

      <Spacing size={4} />

      <Flex
        css={{
          bg: 'background.01_white',
          px: 5,
          py: 4,
          gap: 4,
          rounded: '2xl',
        }}
        direction={'column'}
      >
        {recentProducts.map(product => (
          <RecentProductItem key={product.id} product={product} currency={currency} exchangeRate={exchangeRate} />
        ))}
      </Flex>
    </styled.section>
  );
}

type RecentProductItemProps = {
  product: RecentProduct;
  currency: 'USD' | 'KRW';
  exchangeRate: { USD: number; KRW: number } | null;
};

function RecentProductItem({ product, currency, exchangeRate }: RecentProductItemProps) {
  const formattedPrice = formatPrice(product.price, currency, exchangeRate);

  return (
    <Flex
      css={{
        gap: 4,
      }}
    >
      <styled.img
        src={product.thumbnail}
        alt={product.name}
        css={{
          w: '60px',
          h: '60px',
          objectFit: 'cover',
          rounded: 'xl',
        }}
      />

      <Flex flexDir="column" gap={1}>
        <Text variant="B2_Medium">{product.name}</Text>
        <Text variant="H1_Bold">{formattedPrice}</Text>
      </Flex>
    </Flex>
  );
}

export default RecentPurchaseSection;
