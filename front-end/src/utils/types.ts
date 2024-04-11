export interface CategoryInterface {
  id: number;
  label: string;
  value: string;
  updated_at?: string;
  created_at?: string;
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
  quantity?: number;
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

export interface CartItemNotLogged {
  product: string;
  quantity: number;
}

export interface Cart {
  id: number;
  user_id: number;
  created_at: string | null;
  updated_at: string | null;
  cart_items: CartItem[];
}

export interface User {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  date_birth: string;
}

export interface Address {
  id: number;
  person_name: string;
  last_name?: string;
  zip_code: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  default: number;
}

export interface Step {
  id: number;
  label: string;
  value: string;
}

export interface OrderItem {
  id: number;
  user_id?: number;
  status: string;
  updated_at?: string;
  created_at?: string;
  invoice_id?: string;
}

export type ProductExtendedInterface = ProductInterface & { quantity: number };

export interface CartItemLS {
  product: string;
  quantity: number;
}
