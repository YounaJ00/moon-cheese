import type { Product } from '@/types/product';
import { http } from '@/utils/http';

interface GetRecentProductListResponse {
  recentProducts: Product[];
}

export const getRecentProductList = async () => {
  const response = await http.get<GetRecentProductListResponse>('/api/recent/product/list');
  return response;
};

interface GetProductList {
  products: Product[];
}

export const getProductList = async () => {
  const response = await http.get<GetProductList>('/api/product/list');
  return response;
};
