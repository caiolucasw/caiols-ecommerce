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

export interface ProductImage {
  id: number;
  name: string;
  image_url: string;
  product_id: string;
  created_at: string;
  updated: string;
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
  product_images?: ProductImage[];
}

export interface FetchProductsInterface {
  name?: string;
  category?: string[];
  brand?: string[];
  category_name?: string;
}

export interface CategoryProductsCountInterface {
  id: number;
  label: string;
  products_count: number;
}

export interface BrandProductsCountInterface {
  id: number;
  name: string;
  products_count: number;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: string;
  quantity: number;
  created_at: string | null;
  updated_at: string | null;
  product: ProductInterface;
}

export interface Cart {
  id: number;
  user_id: number;
  created_at: string | null;
  updated_at: string | null;
  cart_items: CartItem[];
}

export interface User {
  id: number;
  name: string;
  created_at: string;
  email: string;
  email_verified_at: string;
  updated_at: string;
}
