// Database model interfaces
export interface Customer {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  category_id: number;
  active: boolean;
  created_at: Date;
}

export interface Inventory {
  product_id: number;
  stock: number;
}

export interface Order {
  id: number;
  customer_id: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  created_at: Date;
  shipped_at?: Date;
  shipping_address: Record<string, any>;
}

export interface OrderItem {
  order_id: number;
  product_id: number;
  qty: number;
  price: number;
}

// Request interfaces
export interface CreateCustomerRequest {
  name: string;
  email: string;
}

export interface UpdateCustomerRequest {
  name?: string;
  email?: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  name?: string;
}

export interface CreateProductRequest {
  sku: string;
  name: string;
  price: number;
  category_id: number;
  active?: boolean;
}

export interface UpdateProductRequest {
  sku?: string;
  name?: string;
  price?: number;
  category_id?: number;
  active?: boolean;
}

export interface UpdateInventoryRequest {
  stock: number;
}

export interface CreateOrderRequest {
  customer_id: number;
  status?: 'pending' | 'paid' | 'shipped' | 'cancelled';
  shipping_address?: Record<string, any>;
  items: CreateOrderItemRequest[];
}

export interface CreateOrderItemRequest {
  product_id: number;
  qty: number;
}

export interface UpdateOrderRequest {
  status?: 'pending' | 'paid' | 'shipped' | 'cancelled';
  shipped_at?: Date;
  shipping_address?: Record<string, any>;
}