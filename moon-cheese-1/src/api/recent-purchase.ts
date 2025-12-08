import { http } from '@/utils/http';

export type RecentProduct = {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
};

export type RecentProductListResponse = {
  recentProducts: RecentProduct[];
};

export async function fetchRecentProducts(): Promise<RecentProductListResponse> {
  return http.get<RecentProductListResponse>('/api/recent/product/list');
}
