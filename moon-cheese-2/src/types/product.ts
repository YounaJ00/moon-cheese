export type Grade = 'EXPLORER' | 'PILOT' | 'COMMANDER';
export type Currency = 'USD' | 'KRW';

export interface GradePoint {
  type: Grade;
  minPoint: number;
}

export interface Product {
  id: number;
  images: string[];
  name: string;
  price: number;
  category: 'CHEESE' | 'CRACKER' | 'TEA';
  stock: number;
  description: string;
  detailDescription: string;
  rating: number;
}

export interface CheeseProduct extends Product {
  category: 'CHEESE';
}

export interface CrackerProduct extends Product {
  category: 'CRACKER';
  isGlutenFree?: boolean;
}

export interface TeaProduct extends Product {
  category: 'TEA';
  isCaffeineFree?: boolean;
}

export type ProductType = CheeseProduct | CrackerProduct | TeaProduct;
