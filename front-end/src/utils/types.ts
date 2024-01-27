export interface CategoryInterface {
  id: number;
  label: string;
  value: string;
}

export interface BrandInterface {
  id: number;
  name: string;
  image_url: string;
}
export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  brand_id: number;
  category_id: number;
  category?: CategoryInterface;
  brand?: BrandInterface;
}

export interface FetchProductsInterface {
  name?: string;
  category?: number[];
  category_name?: string;
}

export interface CategoryProductsCountInterface {
  id: number;
  label: string;
  products_count: number;
}
