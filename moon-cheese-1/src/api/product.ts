import { http } from '@/utils/http';
import type { Product } from '@/server/data';

export type ProductListResponse = {
  products: Product[];
};

export async function fetchProductList(): Promise<ProductListResponse> {
  return http.get<ProductListResponse>('/api/product/list');
}

